import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { BrandProfile, StrategyPack, WeeklyPack } from "@/hooks/useStudioBrandStrategy";
import type { AthleteSource } from "@/hooks/useStudioSources";

interface StudioCopilotTabProps {
  brandProfile: BrandProfile | null;
  strategyPack: StrategyPack | null;
  weeklyPacks: WeeklyPack[];
  generating: boolean;
  onOpenStrategy: () => void;
  onGenerateWeeklyPack: (context: string, strategyPackData: Record<string, any>) => Promise<void>;
  onNavigatePublish: (draft?: { title: string; body: string; type: string }) => void;
  sources: AthleteSource[];
  onOpenSources: () => void;
}

export const StudioCopilotTab = ({
  brandProfile,
  strategyPack,
  weeklyPacks,
  generating,
  onOpenStrategy,
  onGenerateWeeklyPack,
  onNavigatePublish,
  sources,
  onOpenSources,
}: StudioCopilotTabProps) => {
  const [context, setContext] = useState("training");

  const strategyDone = !!(strategyPack?.pack_json && (strategyPack.pack_json as any)?.positioning_statement);
  const strategyInProgress = !strategyDone && brandProfile?.answers_json && Object.keys(brandProfile.answers_json as any).length > 0;

  const latestPack = weeklyPacks[0];
  const posts = (latestPack?.pack_json as any)?.posts || [];

  const connectedSources = sources.filter((s) => s.status === "connected").length;
  const hasPublishedPosts = false; // Could be passed in if needed

  const handleGenerate = () => {
    onGenerateWeeklyPack(context, strategyPack?.pack_json || {});
  };

  // Build next actions
  const nextActions: { label: string; cta: string; onClick: () => void }[] = [];
  if (connectedSources === 0) {
    nextActions.push({ label: "Connect your first source to unlock smarter suggestions.", cta: "Connect sources", onClick: onOpenSources });
  }
  if (!strategyDone) {
    nextActions.push({ label: "Complete your brand audit for more targeted content.", cta: "Start audit", onClick: onOpenStrategy });
  }
  if (posts.length > 0) {
    nextActions.push({ label: "You have suggested posts ready — publish one now.", cta: "Publish a post", onClick: () => onNavigatePublish() });
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Brand & Strategy card */}
      <StudioCard
        title="Brand & Strategy"
        subtitle={
          strategyDone
            ? "Your strategy pack is ready."
            : strategyInProgress
            ? "Brand profile started — continue to generate strategy."
            : "Run a brand audit and generate your positioning strategy."
        }
        ctaLabel={strategyDone ? "View" : (strategyInProgress ? "Continue" : "Start audit")}
        onCtaClick={onOpenStrategy}
      />

      {/* Weekly pack card */}
      <StudioCard
        title="Weekly pack"
        subtitle={
          !strategyDone
            ? "Basic pack — complete your brand audit for better suggestions."
            : "AI-suggested posts for this week based on your strategy."
        }
        hero
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Select value={context} onValueChange={setContext}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="competition">Competition week</SelectItem>
                <SelectItem value="training">Training block</SelectItem>
                <SelectItem value="rest">Rest / off-season</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="h-9" onClick={handleGenerate} disabled={generating}>
              {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate weekly pack"}
            </Button>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-2">
              {posts.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/60 border border-border/30">
                  <div className="min-w-0 flex-1 mr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge variant="secondary" className="text-[10px] font-normal px-1.5 py-0">{item.type}</Badge>
                      <span className="text-sm font-medium truncate">{item.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.why}</p>
                    {item.best_day && <p className="text-[10px] text-muted-foreground/70 mt-0.5">{item.best_day} · {item.format}</p>}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 shrink-0"
                    onClick={() => onNavigatePublish({ title: item.title, body: item.body_draft || "", type: item.type?.toLowerCase() || "bts" })}
                  >
                    Create
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-4">
              {weeklyPacks.length === 0
                ? "No weekly pack yet. Select your week context and generate."
                : "No posts in the latest pack."}
            </p>
          )}
        </div>
      </StudioCard>

      {/* Next actions */}
      {nextActions.length > 0 && (
        <StudioCard title="Next actions" subtitle="Suggested steps to grow your Halo.">
          <div className="space-y-2">
            {nextActions.slice(0, 3).map((action, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                <p className="text-sm text-muted-foreground flex-1 mr-3">{action.label}</p>
                <Button variant="outline" size="sm" className="h-9 shrink-0" onClick={action.onClick}>
                  {action.cta}
                </Button>
              </div>
            ))}
          </div>
        </StudioCard>
      )}
    </div>
  );
};
