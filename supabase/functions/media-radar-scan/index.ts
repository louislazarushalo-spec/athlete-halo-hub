const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const userId = user.id;

    const { athlete_id, api_key, cx_id } = await req.json();
    if (!athlete_id || !api_key || !cx_id) {
      return new Response(JSON.stringify({ error: "Missing athlete_id, api_key, or cx_id" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Create scan record
    const { data: scan, error: scanErr } = await supabase
      .from("media_scans")
      .insert({ athlete_id, status: "running" })
      .select()
      .single();
    if (scanErr) throw scanErr;

    // Get queries for this athlete
    const { data: queries } = await supabase
      .from("media_radar_queries")
      .select("*")
      .eq("athlete_id", athlete_id)
      .eq("is_enabled", true);

    if (!queries || queries.length === 0) {
      await supabase.from("media_scans").update({ status: "error", error_message: "No queries configured", finished_at: new Date().toISOString() }).eq("id", scan.id);
      return new Response(JSON.stringify({ error: "No queries configured" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let totalMentions = 0;
    const allTitles: string[] = [];
    const allSnippets: string[] = [];

    for (const q of queries) {
      try {
        const params = new URLSearchParams({
          key: api_key,
          cx: cx_id,
          q: q.query_text,
          num: "10",
          sort: "date",
        });

        const res = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
        if (!res.ok) {
          const errText = await res.text();
          console.error(`Google CSE error for "${q.query_text}": ${res.status} ${errText}`);
          continue;
        }

        const data = await res.json();
        const items = data.items || [];

        for (const item of items) {
          const url = item.link;
          const title = item.title || "Untitled";
          const snippet = item.snippet || "";
          const publisher = item.displayLink || new URL(url).hostname;
          const imageUrl = item.pagemap?.cse_image?.[0]?.src || null;

          // Upsert (dedupe by athlete_id + url)
          const { error: upsertErr } = await supabase
            .from("media_mentions")
            .upsert(
              {
                athlete_id,
                query_id: q.id,
                title,
                publisher,
                url,
                snippet,
                image_url: imageUrl,
                relevance_status: "unknown",
                raw_json: item,
              },
              { onConflict: "athlete_id,url" }
            );

          if (!upsertErr) {
            totalMentions++;
            allTitles.push(title);
            allSnippets.push(snippet);
          }
        }
      } catch (queryErr) {
        console.error(`Error processing query "${q.query_text}":`, queryErr);
      }
    }

    // Generate narratives using AI
    let narratives: string[] = [];
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (LOVABLE_API_KEY && allTitles.length > 0) {
      try {
        const titlesSnippets = allTitles.slice(0, 30).map((t, i) => `- ${t}: ${allSnippets[i]?.slice(0, 100) || ""}`).join("\n");
        const narrativePrompt = `Analyze these media mentions about an athlete and extract 3-5 key narrative themes. Return ONLY a JSON array of strings, each being a concise narrative bullet (max 15 words each).

MENTIONS:
${titlesSnippets}

Return format: ["Narrative 1", "Narrative 2", ...]`;

        const aiRes = await fetch("https://ai-gateway.lovable.dev/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "google/gemini-2.5-flash-lite", messages: [{ role: "user", content: narrativePrompt }], temperature: 0.5 }),
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          const content = aiData.choices?.[0]?.message?.content || "[]";
          const arrMatch = content.match(/\[[\s\S]*\]/);
          if (arrMatch) narratives = JSON.parse(arrMatch[0]);
        }
      } catch (aiErr) {
        console.error("Narrative generation error:", aiErr);
      }
    }

    // Update scan record
    await supabase.from("media_scans").update({
      status: "success",
      finished_at: new Date().toISOString(),
      mention_count: totalMentions,
      narratives,
    }).eq("id", scan.id);

    return new Response(
      JSON.stringify({ success: true, mention_count: totalMentions, narratives, scan_id: scan.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Media radar scan error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Scan failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
