import { createClient } from "https://esm.sh/@supabase/supabase-js@2.86.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { athlete_id } = await req.json();
    if (!athlete_id) {
      return new Response(JSON.stringify({ error: "athlete_id required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Fetch connected sources
    const { data: sources, error: srcErr } = await supabase
      .from("athlete_sources")
      .select("*")
      .eq("athlete_id", athlete_id)
      .eq("status", "connected");

    if (srcErr) throw srcErr;

    let itemsFound = 0;

    for (const source of sources || []) {
      try {
        // For social sources with a handle/url, create placeholder content items
        // In production, this would call platform APIs
        if (source.category === "social" && (source.handle || source.url)) {
          const handle = source.handle || source.url;
          
          // Check for existing items from this source to avoid duplicates
          const { data: existing } = await supabase
            .from("athlete_content_items")
            .select("external_url")
            .eq("source_id", source.id);

          const existingUrls = new Set((existing || []).map((e: any) => e.external_url));

          // Create a placeholder item showing connection works
          const profileUrl = `https://${source.subtype}.com/${handle}`;
          if (!existingUrls.has(profileUrl)) {
            await supabase.from("athlete_content_items").insert({
              athlete_id,
              source_id: source.id,
              type: "social_post",
              title: `${source.subtype} profile connected`,
              text_snippet: `Connected via handle: ${handle}`,
              external_url: profileUrl,
              published_at: new Date().toISOString(),
            });
            itemsFound++;
          }
        }

        // For owned/earned channels with URLs, try to discover content
        if ((source.category === "owned" || source.category === "earned") && source.url) {
          const { data: existing } = await supabase
            .from("athlete_content_items")
            .select("external_url")
            .eq("source_id", source.id);

          const existingUrls = new Set((existing || []).map((e: any) => e.external_url));

          if (!existingUrls.has(source.url)) {
            await supabase.from("athlete_content_items").insert({
              athlete_id,
              source_id: source.id,
              type: "article",
              title: `Content from ${source.metadata_json?.publisher_name || source.subtype}`,
              text_snippet: `Source URL: ${source.url}`,
              external_url: source.url,
              published_at: new Date().toISOString(),
            });
            itemsFound++;
          }
        }

        // Update source status
        await supabase
          .from("athlete_sources")
          .update({ last_synced_at: new Date().toISOString(), status: "connected" })
          .eq("id", source.id);

      } catch (sourceErr) {
        console.error(`Error syncing source ${source.id}:`, sourceErr);
        await supabase
          .from("athlete_sources")
          .update({ status: "error" })
          .eq("id", source.id);
      }
    }

    return new Response(
      JSON.stringify({ success: true, items_found: itemsFound }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Sync error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Sync failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
