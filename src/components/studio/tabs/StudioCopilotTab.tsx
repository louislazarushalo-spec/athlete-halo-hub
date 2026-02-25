import { useState } from "react";
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

/* ── Shared blue-glow card style (same as Publish / Monetize) ── */
const glowCardStyle = {
  background: "linear-gradient(155deg, hsl(220 30% 14%) 0%, hsl(220 40% 9%) 100%)",
  border: "1.5px solid hsl(220 60% 40% / 0.45)",
  boxShadow:
    "0 0 0 0.5px hsl(220 60% 50% / 0.15), " +
    "inset 0 1px 0 0 hsl(220 60% 60% / 0.1), " +
    "0 0 20px -2px hsl(220 80% 55% / 0.25), " +
    "0 6px 24px -6px hsl(0 0% 0% / 0.5)",
};

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

  const handleGenerate = () => {
    onGenerateWeeklyPack(context, strategyPack?.pack_json || {});
  };

  // Status for Brand & Strategy
  const strategyStatus = strategyDone ? "Complete" : strategyInProgress ? "In progress" : "Not started";
  const strategyStatusVariant: "default" | "secondary" | "outline" =
    strategyDone ? "default" : strategyInProgress ? "secondary" : "outline";
  const strategyCta = strategyDone ? "View" : strategyInProgress ? "Resume" : "Start audit";

  // Build next actions
  const nextActions: { label: string; helper: string; cta: string; onClick: () => void }[] = [];
  if (connectedSources === 0) {
    nextActions.push({ label: "Connect sources", helper: "Unlock smarter AI suggestions.", cta: "Connect", onClick: onOpenSources });
  }
  if (!strategyDone) {
    nextActions.push({ label: "Brand audit", helper: "Complete it for targeted content.", cta: "Start", onClick: onOpenStrategy });
  }
  if (posts.length > 0) {
    nextActions.push({ label: "Publish a post", helper: "You have suggested posts ready.", cta: "Publish", onClick: () => onNavigatePublish() });
  }

  return (
    <div className="space-y-3">
      {/* ── A) Brand & Strategy ── */}
      <div className="rounded-2xl p-4 md:p-5" style={glowCardStyle}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-tight line-clamp-1">
                Brand & Strategy
              </h3>
              <Badge variant={strategyStatusVariant} className="text-[10px] shrink-0 capitalize">
                {strategyStatus}
              </Badge>
            </div>
            <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 leading-snug line-clamp-2">
              {strategyDone
                ? "Your positioning strategy is ready."
                : "Run a brand audit to generate your positioning strategy."}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="shrink-0 h-9 text-[13px] md:text-sm"
            onClick={onOpenStrategy}
          >
            {strategyCta}
          </Button>
        </div>
      </div>

      {/* ── B) Weekly Pack ── */}
      <div className="rounded-2xl p-4 md:p-5" style={glowCardStyle}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-tight line-clamp-1">
              Weekly pack
            </h3>
            <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 leading-snug line-clamp-2">
              AI-suggested posts based on your strategy.
            </p>
          </div>
          <Button
            size="sm"
            className="shrink-0 h-9 text-[13px] md:text-sm"
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate"}
          </Button>
        </div>

        {/* Context selector row */}
        <div className="mt-3">
          <Select value={context} onValueChange={setContext}>
            <SelectTrigger className="w-full h-9 text-[13px] bg-background/30 border-border/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="competition">Competition week</SelectItem>
              <SelectItem value="training">Training block</SelectItem>
              <SelectItem value="rest">Rest / off-season</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posts list or empty state */}
        {posts.length > 0 ? (
          <div className="space-y-2 mt-3">
            {posts.map((item: any, i: number) => (
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
                  {item.best_day && (
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                      {item.best_day} · {item.format}
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 h-8 text-[12px] md:text-[13px]"
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
        ) : (
          <p className="text-[11px] text-muted-foreground text-center py-4 mt-2">
            No weekly pack yet. Choose a context and generate.
          </p>
        )}
      </div>

      {/* ── C) Next Actions ── */}
      {nextActions.length > 0 && (
        <div className="rounded-2xl p-4 md:p-5" style={glowCardStyle}>
          <div className="mb-3">
            <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-tight">
              Next actions
            </h3>
            <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 leading-snug">
              Suggested steps to grow your Halo.
            </p>
          </div>
          <div className="space-y-2">
            {nextActions.slice(0, 3).map((action, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-background/10 border border-border/20"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] md:text-sm font-medium text-foreground line-clamp-1">
                    {action.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">{action.helper}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 h-8 text-[12px] md:text-[13px]"
                  onClick={action.onClick}
                >
                  {action.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
