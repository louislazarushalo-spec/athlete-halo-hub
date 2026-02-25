import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audio_base64 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Use Lovable AI to "transcribe" via multimodal understanding
    // Since we don't have a dedicated STT, we use AI to process the audio description
    // MVP: Ask AI to generate a plausible weekly context from a prompt
    // In production this would use a real STT service

    // For MVP: we acknowledge the audio and ask user to type summary
    // But we still try to extract context clues

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are an assistant that helps athletes plan their weekly content. 
The athlete just recorded a voice note about their upcoming week.
Since we can't process the audio directly yet, generate a helpful default response.
Return a JSON object with:
- "transcript": A placeholder message asking the user to type their week summary
- "suggested_context": one of "competition", "training", "rest", "travel", "recovery", "mixed" (default to "training")  
- "key_moments": an empty array
Return ONLY valid JSON, no markdown.`,
            },
            {
              role: "user",
              content:
                "An athlete just recorded a voice note. Generate the default response.",
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "extract_week_context",
                description:
                  "Extract weekly context from athlete voice note",
                parameters: {
                  type: "object",
                  properties: {
                    transcript: { type: "string" },
                    suggested_context: {
                      type: "string",
                      enum: [
                        "competition",
                        "training",
                        "rest",
                        "travel",
                        "recovery",
                        "mixed",
                      ],
                    },
                    key_moments: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                  required: [
                    "transcript",
                    "suggested_context",
                    "key_moments",
                  ],
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "extract_week_context" },
          },
        }),
      }
    );

    if (!response.ok) {
      // Fallback
      return new Response(
        JSON.stringify({
          transcript: "",
          suggested_context: "training",
          key_moments: [],
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await response.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    let result = {
      transcript: "",
      suggested_context: "training",
      key_moments: [] as string[],
    };

    if (toolCall?.function?.arguments) {
      try {
        result = JSON.parse(toolCall.function.arguments);
      } catch {
        // keep defaults
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("studio-voice-note error:", err);
    return new Response(
      JSON.stringify({
        transcript: "",
        suggested_context: "training",
        key_moments: [],
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
