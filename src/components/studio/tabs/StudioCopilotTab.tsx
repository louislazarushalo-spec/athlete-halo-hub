import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import type { BrandProfile, StrategyPack, WeeklyPack } from "@/hooks/useStudioBrandStrategy";
import type { AthleteSource } from "@/hooks/useStudioSources";
import { WeeklyPackFlow } from "../copilot/WeeklyPackFlow";

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

const glowCardStyle = {
  background: "linear-gradient(155deg, hsl(220 30% 14%) 0%, hsl(220 40% 9%) 100%)",
  border: "1.5px solid hsl(220 60% 40% / 0.45)",
  boxShadow:
    "0 0 0 0.5px hsl(220 60% 50% / 0.15), " +
    "inset 0 1px 0 0 hsl(220 60% 60% / 0.1), " +
    "0 0 20px -2px hsl(220 80% 55% / 0.25), " +
    "0 6px 24px -6px hsl(0 0% 0% / 0.5)",
};

type View = "landing" | "weekly-pack-flow";

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
  const [view, setView] = useState<View>("landing");

  const strategyDone = !!(strategyPack?.pack_json && (strategyPack.pack_json as any)?.positioning_statement);
  const strategyInProgress = !strategyDone && brandProfile?.answers_json && Object.keys(brandProfile.answers_json as any).length > 0;
  const strategyCta = strategyDone ? "View" : strategyInProgress ? "Resume" : "Start audit";

  const connectedSources = sources.filter((s) => s.status === "connected").length;

  if (view === "weekly-pack-flow") {
    return (
      <WeeklyPackFlow
        onBack={() => setView("landing")}
        generating={generating}
        onGenerate={onGenerateWeeklyPack}
        strategyPackData={strategyPack?.pack_json || {}}
        onNavigatePublish={onNavigatePublish}
      />
    );
  }

  return (
    <div className="space-y-3">
      {/* ── 1) Connect sources ── */}
      <div className="rounded-2xl p-4 md:p-5" style={glowCardStyle}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-tight line-clamp-1">
              Connect sources
            </h3>
            <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 leading-snug line-clamp-2">
              Link your social + web coverage so Halo can learn what performs best.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="shrink-0 h-9 text-[13px] md:text-sm"
            onClick={onOpenSources}
          >
            {connectedSources > 0 ? "Manage" : "Connect"}
          </Button>
        </div>
      </div>

      {/* ── 2) Brand & Strategy ── */}
      <div className="rounded-2xl p-4 md:p-5" style={glowCardStyle}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-tight line-clamp-1">
              Brand & Strategy
            </h3>
            <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 leading-snug line-clamp-2">
              Define your voice and what to publish each week.
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

      {/* ── 3) Weekly pack (Publish-style tappable card) ── */}
      <button
        onClick={() => setView("weekly-pack-flow")}
        className="w-full text-left rounded-2xl p-5 md:p-6 transition-all hover:scale-[1.01] active:scale-[0.99]"
        style={glowCardStyle}
      >
        <div className="flex flex-col items-center text-center gap-2 py-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-1">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-tight">
            Weekly pack
          </h3>
          <p className="text-[12px] md:text-sm text-muted-foreground leading-snug max-w-[260px]">
            Get 3–6 post ideas for this week, tailored to your schedule.
          </p>
        </div>
      </button>
    </div>
  );
};
