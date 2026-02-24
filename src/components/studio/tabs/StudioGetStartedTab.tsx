import { StudioCard } from "../StudioCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { StudioAthleteProfile, StudioPost } from "@/hooks/useStudioAthlete";
import type { AthleteSource } from "@/hooks/useStudioSources";
import type { StrategyPack, WeeklyPack } from "@/hooks/useStudioBrandStrategy";
import type { TabId } from "../StudioLayout";

interface ChecklistStep {
  key: string;
  title: string;
  why: string;
  status: "done" | "in_progress" | "not_started";
  ctaLabel: string;
  onCta: () => void;
}

interface StudioGetStartedTabProps {
  profile: StudioAthleteProfile | null;
  sources: AthleteSource[];
  strategyPack: StrategyPack | null;
  brandProfileAnswers: Record<string, any> | null;
  weeklyPacks: WeeklyPack[];
  posts: StudioPost[];
  onNavigate: (tab: TabId) => void;
  onOpenSources: () => void;
  onOpenStrategy: () => void;
  onGenerateWeeklyPack: () => void;
  onNavigatePublish: () => void;
  loading: boolean;
}

export const StudioGetStartedTab = ({
  profile,
  sources,
  strategyPack,
  brandProfileAnswers,
  weeklyPacks,
  posts,
  onNavigate,
  onOpenSources,
  onOpenStrategy,
  onGenerateWeeklyPack,
  onNavigatePublish,
  loading,
}: StudioGetStartedTabProps) => {
  // Completion logic
  const profileDone = !!(profile?.bio && profile?.avatar_url && profile?.banner_url);
  const sourcesDone = sources.filter((s) => s.status === "connected").length > 0;
  const strategyDone = !!(strategyPack?.pack_json && (strategyPack.pack_json as any)?.positioning_statement);
  const strategyInProgress = !strategyDone && brandProfileAnswers && Object.keys(brandProfileAnswers).length > 0;
  const weeklyPackDone = weeklyPacks.length > 0;
  const firstPublishDone = posts.some((p) => p.status === "published");

  const steps: ChecklistStep[] = [
    {
      key: "profile",
      title: "Profile basics",
      why: "Set the banner, avatar and bio fans will see.",
      status: profileDone ? "done" : (profile?.bio || profile?.avatar_url ? "in_progress" : "not_started"),
      ctaLabel: profileDone ? "Done" : "Complete",
      onCta: () => onNavigate("my-halo"),
    },
    {
      key: "sources",
      title: "Connect sources",
      why: "Let Halo pull social + web coverage automatically.",
      status: sourcesDone ? "done" : (sources.length > 0 ? "in_progress" : "not_started"),
      ctaLabel: sourcesDone ? "Done" : "Connect",
      onCta: onOpenSources,
    },
    {
      key: "strategy",
      title: "Brand & Strategy",
      why: "Define your voice and what to publish each week.",
      status: strategyDone ? "done" : (strategyInProgress ? "in_progress" : "not_started"),
      ctaLabel: strategyDone ? "Done" : (strategyInProgress ? "Continue" : "Start"),
      onCta: onOpenStrategy,
    },
    {
      key: "weekly",
      title: "Weekly pack",
      why: "Get suggested posts for this week.",
      status: weeklyPackDone ? "done" : "not_started",
      ctaLabel: weeklyPackDone ? "Done" : "Generate",
      onCta: weeklyPackDone ? () => onNavigate("copilot") : onGenerateWeeklyPack,
    },
    {
      key: "publish",
      title: "First publish",
      why: "Publish your first post to your fan feed.",
      status: firstPublishDone ? "done" : "not_started",
      ctaLabel: firstPublishDone ? "Done" : "Publish",
      onCta: onNavigatePublish,
    },
  ];

  const doneCount = steps.filter((s) => s.status === "done").length;
  const allDone = doneCount === steps.length;
  const progressPct = (doneCount / steps.length) * 100;

  const firstIncomplete = steps.find((s) => s.status !== "done");

  const STATUS_STYLES: Record<string, { label: string; className: string }> = {
    done: { label: "Done", className: "bg-green-500/10 text-green-400" },
    in_progress: { label: "In progress", className: "bg-primary/10 text-primary" },
    not_started: { label: "Not started", className: "bg-muted text-muted-foreground" },
  };

  if (allDone) {
    return (
      <div className="space-y-4">
        <StudioCard title="You're live" hero>
          <div className="text-center py-6">
            <span className="text-4xl block mb-3">🚀</span>
            <p className="text-sm text-muted-foreground mb-4">
              Your Halo is fully set up. Head to Copilot for your weekly operating loop.
            </p>
            <Button size="sm" className="h-9" onClick={() => onNavigate("copilot")}>
              Go to Copilot
            </Button>
          </div>
        </StudioCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Setup progress */}
      <StudioCard
        title="Setup progress"
        subtitle={`${doneCount}/${steps.length} complete — get your Halo live in under 10 minutes.`}
        ctaLabel="Continue setup"
        onCtaClick={firstIncomplete?.onCta}
      >
        <Progress value={progressPct} className="h-2" />
      </StudioCard>

      {/* Checklist */}
      <StudioCard title="Checklist" subtitle="Complete each step to go live.">
        <div className="space-y-2">
          {steps.map((step) => {
            const style = STATUS_STYLES[step.status];
            return (
              <div
                key={step.key}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30"
              >
                <div className="min-w-0 flex-1 mr-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium">{step.title}</span>
                    <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0", style.className)}>
                      {style.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{step.why}</p>
                </div>
                <Button
                  variant={step.status === "done" ? "ghost" : "outline"}
                  size="sm"
                  className="h-9 shrink-0"
                  disabled={step.status === "done"}
                  onClick={step.onCta}
                >
                  {step.ctaLabel}
                </Button>
              </div>
            );
          })}
        </div>
      </StudioCard>
    </div>
  );
};
