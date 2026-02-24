import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { StudioAthleteProfile, StudioPost } from "@/hooks/useStudioAthlete";
import type { AthleteSource } from "@/hooks/useStudioSources";
import type { StrategyPack, WeeklyPack } from "@/hooks/useStudioBrandStrategy";
import type { TabId } from "./StudioLayout";

interface ChecklistStep {
  key: string;
  title: string;
  why: string;
  status: "done" | "in_progress" | "not_started";
  ctaLabel: string;
  onCta: () => void;
}

interface OnboardingBannerProps {
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
  athleteSlug: string;
}

const DISMISS_KEY_PREFIX = "halo_onboarding_dismissed_";

export const OnboardingBanner = ({
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
  athleteSlug,
}: OnboardingBannerProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      const raw = localStorage.getItem(DISMISS_KEY_PREFIX + athleteSlug);
      if (!raw) return false;
      const ts = parseInt(raw, 10);
      return Date.now() - ts < 24 * 60 * 60 * 1000; // 24h
    } catch {
      return false;
    }
  });

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
      onCta: () => { setSheetOpen(false); onNavigate("my-halo"); },
    },
    {
      key: "sources",
      title: "Connect sources",
      why: "Let Halo pull social + web coverage automatically.",
      status: sourcesDone ? "done" : (sources.length > 0 ? "in_progress" : "not_started"),
      ctaLabel: sourcesDone ? "Done" : "Connect",
      onCta: () => { setSheetOpen(false); onOpenSources(); },
    },
    {
      key: "strategy",
      title: "Brand & Strategy",
      why: "Define your voice and what to publish each week.",
      status: strategyDone ? "done" : (strategyInProgress ? "in_progress" : "not_started"),
      ctaLabel: strategyDone ? "Done" : (strategyInProgress ? "Continue" : "Start"),
      onCta: () => { setSheetOpen(false); onOpenStrategy(); },
    },
    {
      key: "weekly",
      title: "Weekly pack",
      why: "Get suggested posts for this week.",
      status: weeklyPackDone ? "done" : "not_started",
      ctaLabel: weeklyPackDone ? "Done" : "Generate",
      onCta: () => { setSheetOpen(false); if (!weeklyPackDone) onGenerateWeeklyPack(); else onNavigate("copilot"); },
    },
    {
      key: "publish",
      title: "First publish",
      why: "Publish your first post to your fan feed.",
      status: firstPublishDone ? "done" : "not_started",
      ctaLabel: firstPublishDone ? "Done" : "Publish",
      onCta: () => { setSheetOpen(false); onNavigatePublish(); },
    },
  ];

  const doneCount = steps.filter((s) => s.status === "done").length;
  const allDone = doneCount === steps.length;
  const progressPct = (doneCount / steps.length) * 100;

  if (allDone || dismissed) return null;

  const STATUS_STYLES: Record<string, { label: string; className: string }> = {
    done: { label: "Done", className: "bg-green-500/10 text-green-400" },
    in_progress: { label: "In progress", className: "bg-primary/10 text-primary" },
    not_started: { label: "Not started", className: "bg-muted text-muted-foreground" },
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY_PREFIX + athleteSlug, Date.now().toString());
    } catch {}
    setDismissed(true);
  };

  return (
    <>
      {/* Slim glass banner */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 backdrop-blur-xl p-4 mb-4 shadow-[0_0_20px_hsl(var(--primary)/0.15),0_0_40px_hsl(var(--primary)/0.05)]">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold mb-0.5">Finish setup</h3>
            <p className="text-xs text-muted-foreground">Get your Halo live in under 10 minutes.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{doneCount}/{steps.length} complete</span>
            <Progress value={progressPct} className="h-1.5 w-20 bg-primary/10 [&>div]:bg-primary" />
            <Button size="sm" className="h-9 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20" onClick={() => setSheetOpen(true)}>
              Continue setup
            </Button>
            <button onClick={handleDismiss} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Dismiss
            </button>
          </div>
        </div>
      </div>

      {/* Checklist drawer */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Setup checklist</SheetTitle>
            <p className="text-sm text-muted-foreground">{doneCount}/{steps.length} complete</p>
            <Progress value={progressPct} className="h-1.5" />
          </SheetHeader>
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
        </SheetContent>
      </Sheet>
    </>
  );
};
