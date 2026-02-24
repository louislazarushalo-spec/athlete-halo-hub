const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { athlete_id, content_items, brand_answers } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const contentSummary = (content_items || []).slice(0, 20).map((item: any) =>
      `- ${item.type}: "${item.title || 'Untitled'}" (${item.published_at || 'no date'})`
    ).join("\n");

    const brandContext = brand_answers ? JSON.stringify(brand_answers, null, 2) : "No brand profile defined yet.";

    const prompt = `You are a sports brand strategist. Based on the athlete's content performance and brand definition, generate a comprehensive Brand Strategy Pack.

ATHLETE: ${athlete_id}

CONTENT INVENTORY:
${contentSummary || "No content items available yet."}

BRAND DEFINITION:
${brandContext}

Generate a JSON strategy pack with this exact structure:
{
  "positioning_statement": "One clear sentence",
  "pillars": [
    { "name": "Pillar name", "description": "What this pillar means", "examples": ["Example content idea 1", "Example 2"] }
  ],
  "voice_guide": {
    "tone": "Description of voice tone",
    "do": ["Do this", "Do that"],
    "dont": ["Don't do this"],
    "boundaries": ["Boundary 1"]
  },
  "formats_cadence": {
    "recommended_formats": ["BTS video", "Training recap"],
    "posting_cadence": "3-5 posts per week",
    "best_times": "Evenings and weekends"
  },
  "signature_series": [
    { "name": "Series name", "description": "What this recurring series is about", "frequency": "Weekly" }
  ],
  "community_loops": [
    { "name": "Loop name", "description": "How this drives community engagement" }
  ],
  "audit_summary": {
    "patterns_that_work": ["Pattern 1", "Pattern 2"],
    "perception_summary": "How the athlete is perceived based on content",
    "opportunities": ["Opportunity 1", "Opportunity 2", "Opportunity 3"]
  }
}

Return ONLY valid JSON, no markdown.`;

    const response = await fetch("https://ai-gateway.lovable.dev/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`AI request failed: ${response.status} ${errText}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "{}";
    
    // Parse JSON from response (handle potential markdown wrapping)
    let pack;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      pack = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      pack = { raw: content };
    }

    return new Response(
      JSON.stringify({ success: true, pack }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Strategy generation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Generation failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
