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

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsErr } = await supabase.auth.getClaims(token);
    if (claimsErr || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const userId = claimsData.claims.sub;

    const { athlete_id, athlete_name, sport, club_team, language, api_key, cx_id } = await req.json();
    if (!athlete_id || !athlete_name) {
      return new Response(JSON.stringify({ error: "Missing athlete_id or athlete_name" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // If no API key provided, check if user has one saved (we can't scan without it)
    const effectiveApiKey = api_key;
    const effectiveCxId = cx_id;

    if (!effectiveApiKey || !effectiveCxId) {
      return new Response(JSON.stringify({ error: "Google CSE API key and CX ID are required. Add them in Advanced settings." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Step 1: AI generates optimized queries
    const queryGenPrompt = `You are a media monitoring expert. Generate 6-10 Google search queries to find news articles, interviews, and press coverage about this athlete.

ATHLETE: ${athlete_name}
SPORT: ${sport || "unknown"}
TEAM/CLUB: ${club_team || "unknown"}
LANGUAGE: ${language || "all"}

Rules:
- Include the athlete's full name in most queries
- Add sport-specific terms
- Include interview/profile variants
- Add exclusion terms to reduce noise (e.g. -fantasy -betting -game)
- If language is "fr", add French queries too
- Return ONLY a JSON array of strings

Example: ["Arthur Cazaux tennis", "Arthur Cazaux interview -fantasy", ...]`;

    const queryRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "google/gemini-2.5-flash-lite", messages: [{ role: "user", content: queryGenPrompt }], temperature: 0.4 }),
    });

    let generatedQueries: string[] = [];
    if (queryRes.ok) {
      const qd = await queryRes.json();
      const content = qd.choices?.[0]?.message?.content || "[]";
      const arrMatch = content.match(/\[[\s\S]*\]/);
      if (arrMatch) {
        try { generatedQueries = JSON.parse(arrMatch[0]); } catch { /* fallback below */ }
      }
    }

    // Fallback if AI query gen fails
    if (generatedQueries.length === 0) {
      generatedQueries = [
        athlete_name,
        `${athlete_name} interview`,
        `${athlete_name} results`,
      ];
      if (sport) generatedQueries.push(`${athlete_name} ${sport}`);
      if (club_team) generatedQueries.push(`${athlete_name} ${club_team}`);
    }

    // Upsert config
    await supabase.from("media_radar_config").upsert({
      athlete_id,
      user_id: userId,
      provider: "google_cse",
      language: language || "all",
    } as any, { onConflict: "athlete_id" });

    // Clear old queries and insert AI-generated ones
    await supabase.from("media_radar_queries").delete().eq("athlete_id", athlete_id);
    for (const qt of generatedQueries) {
      await supabase.from("media_radar_queries").insert({ athlete_id, query_text: qt } as any);
    }

    // Create scan record
    const { data: scan, error: scanErr } = await supabase
      .from("media_scans")
      .insert({ athlete_id, status: "running" })
      .select()
      .single();
    if (scanErr) throw scanErr;

    // Step 2: Fetch results from Google CSE
    const allResults: any[] = [];
    for (const q of generatedQueries) {
      try {
        const params = new URLSearchParams({
          key: effectiveApiKey,
          cx: effectiveCxId,
          q,
          num: "10",
          sort: "date",
        });
        const res = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
        if (!res.ok) {
          const errText = await res.text();
          console.error(`Google CSE error for "${q}": ${res.status} ${errText}`);
          continue;
        }
        const data = await res.json();
        const items = data.items || [];
        for (const item of items) {
          allResults.push({
            query: q,
            url: item.link,
            title: item.title || "Untitled",
            snippet: item.snippet || "",
            publisher: item.displayLink || "",
            imageUrl: item.pagemap?.cse_image?.[0]?.src || null,
            raw: item,
          });
        }
      } catch (err) {
        console.error(`Query error "${q}":`, err);
      }
    }

    // Step 3: AI auto-triage - classify relevance and tag narratives
    let triageResults: any[] = [];
    let narratives: string[] = [];
    let digest = "";

    if (allResults.length > 0) {
      const resultsForAI = allResults.slice(0, 40).map((r, i) => `[${i}] "${r.title}" — ${r.publisher} — ${r.snippet?.slice(0, 120)}`).join("\n");

      const triagePrompt = `You are a media analyst. Analyze these search results about "${athlete_name}" (${sport || "athlete"}).

RESULTS:
${resultsForAI}

Tasks:
1. Classify each result as "relevant" (actually about this specific person), "uncertain" (might be about them), or "irrelevant" (not about them, different person, or unrelated).
2. From the RELEVANT results, identify 3-5 key narrative themes (e.g. "Career momentum after tournament win", "Partnership with brand X").
3. For each narrative, list the indices of supporting articles.
4. Write a 2-3 sentence weekly digest summary of what the press is saying.

Return ONLY valid JSON:
{
  "classifications": [{"index": 0, "status": "relevant"}, ...],
  "narratives": [{"theme": "...", "evidence_indices": [0, 3, 5]}, ...],
  "digest": "..."
}`;

      const triageRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "google/gemini-2.5-flash", messages: [{ role: "user", content: triagePrompt }], temperature: 0.3 }),
      });

      if (triageRes.ok) {
        const td = await triageRes.json();
        const triageContent = td.choices?.[0]?.message?.content || "{}";
        const jsonMatch = triageContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]);
            triageResults = parsed.classifications || [];
            narratives = (parsed.narratives || []).map((n: any) => n.theme);
            digest = parsed.digest || "";

            // Map narrative tags to results
            for (const narr of (parsed.narratives || [])) {
              for (const idx of (narr.evidence_indices || [])) {
                if (allResults[idx]) {
                  allResults[idx].narrative_tag = narr.theme;
                }
              }
            }
          } catch { /* use defaults */ }
        }
      }
    }

    // Step 4: Store mentions with relevance
    let totalMentions = 0;
    for (let i = 0; i < allResults.length; i++) {
      const r = allResults[i];
      const classification = triageResults.find((c: any) => c.index === i);
      const relevanceStatus = classification?.status || "unknown";

      const { error: upsertErr } = await supabase
        .from("media_mentions")
        .upsert(
          {
            athlete_id,
            title: r.title,
            publisher: r.publisher,
            url: r.url,
            snippet: r.snippet,
            image_url: r.imageUrl,
            relevance_status: relevanceStatus,
            raw_json: { ...r.raw, narrative_tag: r.narrative_tag || null },
          },
          { onConflict: "athlete_id,url" }
        );

      if (!upsertErr) totalMentions++;
    }

    // Step 5: Update scan record
    await supabase.from("media_scans").update({
      status: "success",
      finished_at: new Date().toISOString(),
      mention_count: totalMentions,
      narratives: narratives as any,
    }).eq("id", scan.id);

    return new Response(
      JSON.stringify({
        success: true,
        mention_count: totalMentions,
        narratives,
        digest,
        queries_generated: generatedQueries.length,
        scan_id: scan.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI Media radar scan error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "AI scan failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
