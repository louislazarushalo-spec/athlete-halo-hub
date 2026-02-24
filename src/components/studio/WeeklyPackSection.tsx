import { useState } from "react";
import { StudioCard } from "./StudioCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { WeeklyPack, StrategyPack } from "@/hooks/useStudioBrandStrategy";

interface WeeklyPackSectionProps {
  weeklyPacks: WeeklyPack[];
  strategyPack: StrategyPack | null;
  generating: boolean;
  onGenerate: (context: string, strategyPackData: Record<string, any>) => Promise<void>;
  onNavigatePublish: (draft?: { title: string; body: string; type: string }) => void;
}

export const WeeklyPackSection = ({
  weeklyPacks,
  strategyPack,
  generating,
  onGenerate,
  onNavigatePublish,
}: WeeklyPackSectionProps) => {
  const [context, setContext] = useState("training");

  const latestPack = weeklyPacks[0];
  const posts = (latestPack?.pack_json as any)?.posts || [];

  const handleGenerate = () => {
    onGenerate(context, strategyPack?.pack_json || {});
  };

  return (
    <StudioCard
      title="Weekly pack"
      subtitle="AI-suggested posts for this week — based on your strategy and what performs."
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
  );
};
