import { StudioCard } from "./StudioCard";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import type { useMediaRadar } from "@/hooks/useMediaRadar";

interface MediaRadarCardProps {
  mediaRadar: ReturnType<typeof useMediaRadar>;
  onOpen: () => void;
}

export const MediaRadarCard = ({ mediaRadar, onOpen }: MediaRadarCardProps) => {
  const isConfigured = !!mediaRadar.config;
  const hasMentions = mediaRadar.mentions.length > 0;
  const lastScan = mediaRadar.latestScan;

  return (
    <StudioCard
      title="Media Radar"
      subtitle="Track articles and coverage about you across the web."
      ctaLabel={isConfigured && hasMentions ? "Open" : "Set up with AI"}
      onCtaClick={onOpen}
    >
      {isConfigured && hasMentions ? (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/40 p-3 text-center">
              <p className="text-lg font-semibold">{mediaRadar.mentions30d.length}</p>
              <p className="text-xs text-muted-foreground">Mentions (30d)</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 text-center">
              <p className="text-sm font-medium truncate">
                {mediaRadar.topPublishers[0]?.[0] || "—"}
              </p>
              <p className="text-xs text-muted-foreground">Top publisher</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 text-center">
              <p className="text-sm font-medium">
                {lastScan ? (
                  <Badge variant={lastScan.status === "success" ? "secondary" : "destructive"} className="text-[10px]">
                    {lastScan.status}
                  </Badge>
                ) : "—"}
              </p>
              <p className="text-xs text-muted-foreground">Last scan</p>
            </div>
          </div>
          {mediaRadar.latestNarratives.length > 0 && (
            <div className="space-y-1">
              {mediaRadar.latestNarratives.slice(0, 2).map((n, i) => (
                <p key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span> {n}
                </p>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <Sparkles className="h-5 w-5 text-primary shrink-0" />
          <p className="text-sm text-muted-foreground">
            AI will generate search queries, scan the web, classify results, and extract key narratives — all in one click.
          </p>
        </div>
      )}
    </StudioCard>
  );
};
