import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { PublishStepper } from "../publish/PublishStepper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const STEPS = ["Type", "Build", "Preview", "Post"];

const WEEK_TYPES = [
  { id: "competition", label: "Competition week" },
  { id: "training", label: "Training block" },
  { id: "rest", label: "Rest / off-season" },
  { id: "travel", label: "Travel week" },
  { id: "recovery", label: "Recovery" },
  { id: "mixed", label: "Mixed" },
];

const POST_COUNT_OPTIONS = [3, 5, 7];
const FORMAT_OPTIONS = ["Photo", "Video", "Text", "Audio"];

interface WeeklyPackFlowProps {
  onBack: () => void;
  generating: boolean;
  onGenerate: (context: string, strategyPackData: Record<string, any>) => Promise<void>;
  strategyPackData: Record<string, any>;
  onNavigatePublish: (draft?: { title: string; body: string; type: string }) => void;
  // Voice note prefill
  voiceTranscript?: string;
  suggestedContext?: string;
  keyMoments?: string[];
}

export const WeeklyPackFlow = ({
  onBack,
  generating,
  onGenerate,
  strategyPackData,
  onNavigatePublish,
  voiceTranscript,
  suggestedContext,
  keyMoments = [],
}: WeeklyPackFlowProps) => {
  const [step, setStep] = useState(0);
  const [weekType, setWeekType] = useState(suggestedContext || "training");
  const [postCount, setPostCount] = useState(5);
  const [formats, setFormats] = useState<string[]>(["Photo", "Video", "Text"]);
  const [includeEngagement, setIncludeEngagement] = useState(true);
  const [generatedPosts, setGeneratedPosts] = useState<any[]>([]);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const toggleFormat = (f: string) => {
    setFormats((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  const handleGenerate = async () => {
    await onGenerate(weekType, strategyPackData);
    // For now, move to step 2 (Preview) — the parent will update weeklyPacks
    setStep(2);
  };

  return (
    <div className="space-y-3">
      <PublishStepper steps={STEPS} currentStep={step} onBack={onBack} confirmLeave={step > 0} />

      {/* Voice note transcript summary */}
      {voiceTranscript && step < 3 && (
        <Collapsible open={summaryOpen} onOpenChange={setSummaryOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-primary/5 border border-primary/20 text-xs">
            <span className="font-medium text-primary">Your week summary</span>
            <ChevronDown className={`h-3.5 w-3.5 text-primary transition-transform ${summaryOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-3 pt-2 pb-1">
            <p className="text-xs text-muted-foreground leading-relaxed">{voiceTranscript}</p>
            {keyMoments.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {keyMoments.map((m, i) => (
                  <Badge key={i} variant="secondary" className="text-[10px] font-normal">
                    {m}
                  </Badge>
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Step 0 — Type */}
      {step === 0 && (
        <StudioCard title="What kind of week?" subtitle="Select the context for your weekly pack.">
          <div className="space-y-2 mt-1">
            {WEEK_TYPES.map((wt) => (
              <button
                key={wt.id}
                onClick={() => setWeekType(wt.id)}
                className={`w-full text-left p-3 rounded-xl border transition-colors min-h-[44px] text-sm font-medium ${
                  weekType === wt.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/40 hover:border-primary/30"
                }`}
              >
                {wt.label}
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button size="sm" className="h-11 text-sm" onClick={() => setStep(1)}>
              Next
            </Button>
          </div>
        </StudioCard>
      )}

      {/* Step 1 — Build */}
      {step === 1 && (
        <StudioCard title="Configure your pack" subtitle="Set preferences for AI-generated post ideas.">
          <div className="space-y-4 mt-1">
            {/* Post count */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">How many posts?</p>
              <div className="flex gap-2">
                {POST_COUNT_OPTIONS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setPostCount(n)}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors min-h-[44px] ${
                      postCount === n
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/40 hover:border-primary/30"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Formats */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Formats</p>
              <div className="flex flex-wrap gap-2">
                {FORMAT_OPTIONS.map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFormat(f)}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors min-h-[36px] ${
                      formats.includes(f)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/40 hover:border-primary/30 text-muted-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Engagement */}
            <button
              onClick={() => setIncludeEngagement(!includeEngagement)}
              className={`w-full text-left p-3 rounded-xl border transition-colors min-h-[44px] ${
                includeEngagement
                  ? "border-primary bg-primary/10"
                  : "border-border/40"
              }`}
            >
              <p className="text-sm font-medium">Include an engagement prompt?</p>
              <p className="text-xs text-muted-foreground">{includeEngagement ? "Yes — poll, Q&A, or challenge" : "No"}</p>
            </button>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button
              size="sm"
              className="h-11 text-sm"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate"}
            </Button>
          </div>
        </StudioCard>
      )}

      {/* Step 2 — Preview */}
      {step === 2 && (
        <StudioCard title="Your weekly pack" subtitle="AI-suggested posts for this week. Tap Create to start drafting.">
          {generating ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
              <span className="text-sm text-muted-foreground">Generating ideas…</span>
            </div>
          ) : generatedPosts.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-6">
              Pack generated! Check Copilot for your suggested posts.
            </p>
          ) : (
            <div className="space-y-2 mt-1">
              {generatedPosts.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-background/10 border border-border/20"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge variant="secondary" className="text-[10px] font-normal px-1.5 py-0 shrink-0">
                        {item.type}
                      </Badge>
                      <span className="text-[13px] md:text-sm font-medium truncate">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">{item.why}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 h-8 text-[12px]"
                    onClick={() =>
                      onNavigatePublish({
                        title: item.title,
                        body: item.body_draft || "",
                        type: item.type?.toLowerCase() || "bts",
                      })
                    }
                  >
                    Create
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button size="sm" className="h-11 text-sm" onClick={() => setStep(3)}>
              Save pack
            </Button>
          </div>
        </StudioCard>
      )}

      {/* Step 3 — Saved */}
      {step === 3 && (
        <StudioCard title="Pack saved" subtitle="Your weekly pack is ready on Copilot.">
          <div className="text-center py-6">
            <span className="text-4xl mb-3 block">📋</span>
            <p className="text-sm text-muted-foreground mb-4">
              Head back to Copilot to see your suggested posts and start creating.
            </p>
            <Button size="sm" className="h-11 text-sm" onClick={onBack}>
              Back to Copilot
            </Button>
          </div>
        </StudioCard>
      )}
    </div>
  );
};
