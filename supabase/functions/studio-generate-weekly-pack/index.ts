const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { athlete_id, context, strategy_pack, media_narratives } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const strategyContext = strategy_pack ? JSON.stringify(strategy_pack, null, 2) : "No strategy pack available.";
    const narrativesContext = media_narratives?.length > 0 ? `\nMEDIA NARRATIVES (what the press is talking about):\n${media_narratives.map((n: string) => `- ${n}`).join("\n")}\nConsider referencing these narratives in post suggestions (e.g., "Press is talking about X → create a BTS post about X").` : "";

    const prompt = `You are a sports content strategist. Generate a weekly content pack for an athlete.

ATHLETE: ${athlete_id}
WEEK CONTEXT: ${context} (the athlete is currently in a ${context} phase)

STRATEGY PACK:
${strategyContext}
${narrativesContext}

Generate exactly 6-8 suggested posts as a JSON array. Each post should have:
{
  "posts": [
    {
      "type": "BTS" | "Access" | "Participate" | "Training" | "Recap" | "Program" | "Lifestyle",
      "title": "Post title",
      "body_draft": "A short draft body text for the post",
      "why": "Why this post will perform well (one sentence)",
      "best_day": "Monday" | "Tuesday" | etc,
      "format": "Photo" | "Video" | "Carousel" | "Story" | "Poll"
    }
  ]
}

Make the suggestions specific, actionable, and varied. Return ONLY valid JSON, no markdown.`;

    const response = await fetch("https://ai-gateway.lovable.dev/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`AI request failed: ${response.status} ${errText}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "{}";

    let pack;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      pack = jsonMatch ? JSON.parse(jsonMatch[0]) : { posts: [] };
    } catch {
      pack = { posts: [], raw: content };
    }

    return new Response(
      JSON.stringify({ success: true, pack }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Weekly pack error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Generation failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
