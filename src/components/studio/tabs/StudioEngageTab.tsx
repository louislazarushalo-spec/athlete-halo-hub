import { StudioCard } from "../StudioCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ENGAGE_CARDS = [
  { title: "Poll", subtitle: "Ask fans a quick question with multiple choices.", cta: "Create poll" },
  { title: "Predictor", subtitle: "Let fans predict match scores or outcomes.", cta: "Create predictor" },
  { title: "Q&A", subtitle: "Open a question round and answer fan questions.", cta: "Start Q&A" },
  { title: "Live discussion", subtitle: "Fan-to-fan thread during a match — you post before and after.", cta: "Start live discussion" },
  { title: "Fan Spotlight", subtitle: "Highlight a fan story, question, or moment.", cta: "Create spotlight" },
  { title: "Community Challenge", subtitle: "Launch a challenge for fans to participate in.", cta: "Create challenge" },
];

const ACTIVE_MOMENTS = [
  { title: "Pre-match poll: Who wins today?", type: "Poll", status: "active", responses: 1243 },
  { title: "Q&A: Ask me anything", type: "Q&A", status: "active", responses: 87 },
];

export const StudioEngageTab = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Engage your fans</h2>

      {/* Engagement cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ENGAGE_CARDS.map((card) => (
          <StudioCard
            key={card.title}
            title={card.title}
            subtitle={card.subtitle}
            ctaLabel={card.cta}
            onCtaClick={() => {}}
          />
        ))}
      </div>

      {/* Active moments */}
      {ACTIVE_MOMENTS.length > 0 && (
        <StudioCard
          title="Active moments"
          subtitle="Currently running engagement features."
        >
          <div className="space-y-2">
            {ACTIVE_MOMENTS.map((m, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="min-w-0 flex-1 mr-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{m.type}</Badge>
                    <span className="text-sm font-medium truncate">{m.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{m.responses} responses</p>
                </div>
                <Button variant="outline" size="sm" className="h-9 shrink-0">Manage</Button>
              </div>
            ))}
          </div>
        </StudioCard>
      )}
    </div>
  );
};
