import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getAthleteById } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface FanRow {
  id: string;
  user_id: string;
  reactions_count: number;
  comments_count: number;
  participation_count: number;
  score: number;
}

/* Demo names for seed UUIDs */
const DEMO_NAMES: Record<string, { name: string; initials: string }> = {
  "a0000001-0000-0000-0000-000000000001": { name: "Léa Martin", initials: "LM" },
  "a0000001-0000-0000-0000-000000000002": { name: "Marc Dupont", initials: "MD" },
  "a0000001-0000-0000-0000-000000000003": { name: "Sophie Richard", initials: "SR" },
  "a0000001-0000-0000-0000-000000000004": { name: "Thomas Bernard", initials: "TB" },
  "a0000001-0000-0000-0000-000000000005": { name: "Emma Laurent", initials: "EL" },
  "a0000001-0000-0000-0000-000000000006": { name: "Jules Petit", initials: "JP" },
  "a0000001-0000-0000-0000-000000000007": { name: "Camille Vidal", initials: "CV" },
  "a0000001-0000-0000-0000-000000000008": { name: "Hugo Faure", initials: "HF" },
  "a0000001-0000-0000-0000-000000000009": { name: "Chloé Garcia", initials: "CG" },
  "a0000001-0000-0000-0000-000000000010": { name: "Raphaël Noir", initials: "RN" },
  "a0000001-0000-0000-0000-000000000011": { name: "Inès Moreau", initials: "IM" },
  "a0000001-0000-0000-0000-000000000012": { name: "Lucas Roux", initials: "LR" },
  "a0000001-0000-0000-0000-000000000013": { name: "Manon Simon", initials: "MS" },
  "a0000001-0000-0000-0000-000000000014": { name: "Nathan Michel", initials: "NM" },
  "a0000001-0000-0000-0000-000000000015": { name: "Clara Leroy", initials: "CL" },
  "a0000001-0000-0000-0000-000000000016": { name: "Louis Girard", initials: "LG" },
  "a0000001-0000-0000-0000-000000000017": { name: "Alice Bonnet", initials: "AB" },
  "a0000001-0000-0000-0000-000000000018": { name: "Théo Duval", initials: "TD" },
  "a0000001-0000-0000-0000-000000000019": { name: "Jade Mercier", initials: "JM" },
  "a0000001-0000-0000-0000-000000000020": { name: "Maxime Colin", initials: "MC" },
};

function getWeekStart(): string {
  const now = new Date();
  const day = now.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + diff));
  return monday.toISOString().split("T")[0];
}

function fanMeta(userId: string) {
  const demo = DEMO_NAMES[userId];
  if (demo) return demo;
  const short = userId.slice(0, 4).toUpperCase();
  return { name: `Fan ${short}`, initials: short.slice(0, 2) };
}

function hueFromId(userId: string): number {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  return ((hash % 60) + 200) % 360; // keep in blue range
}

const TopFansPage = () => {
  const { id: slug } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const athlete = slug ? getAthleteById(slug) : null;
  const [fans, setFans] = useState<FanRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [segment, setSegment] = useState<"all" | "friends">("all");

  useEffect(() => {
    if (!slug) return;
    const weekStart = getWeekStart();
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("fan_engagement_weekly")
        .select("*")
        .eq("athlete_id", slug)
        .eq("week_start_date", weekStart)
        .order("score", { ascending: false })
        .order("participation_count", { ascending: false })
        .order("comments_count", { ascending: false })
        .order("reactions_count", { ascending: false })
        .limit(50);
      if (!error && data) setFans(data as unknown as FanRow[]);
      setLoading(false);
    })();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full shrink-0"
            onClick={() => navigate(slug ? `/athlete/${slug}` : -1 as any)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[17px] font-bold text-foreground leading-tight">Top fans</h1>
            <p className="text-[13px] text-muted-foreground truncate">
              {athlete?.name || slug} · This week
            </p>
          </div>
        </div>

        {/* Segment control */}
        <div className="flex gap-1 px-4 pb-3">
          {(["all", "friends"] as const).map((seg) => (
            <button
              key={seg}
              onClick={() => setSegment(seg)}
              className={cn(
                "flex-1 py-2 rounded-full text-[13px] font-medium transition-all min-h-[44px]",
                segment === seg
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground"
              )}
            >
              {seg === "all" ? "All" : "Friends"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="px-4 py-4 pb-24 max-w-lg mx-auto">
        {segment === "friends" ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-[14px]">Friends leaderboard coming soon</p>
            <p className="text-muted-foreground/60 text-[12px] mt-1">Connect with friends to see their rankings</p>
          </div>
        ) : loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : fans.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-[14px]">No fans ranked this week yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {fans.map((fan, index) => {
              const rank = index + 1;
              const meta = fanMeta(fan.user_id);
              const hue = hueFromId(fan.user_id);
              const isTop3 = rank <= 3;
              const isTop10 = rank <= 10;

              return (
                <div
                  key={fan.id}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
                    isTop3
                      ? "bg-primary/10 border border-primary/20"
                      : isTop10
                        ? "bg-card border border-border/40"
                        : "bg-card/50"
                  )}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold text-primary-foreground"
                      style={{ background: `hsl(${hue}, 45%, 35%)` }}
                    >
                      {meta.initials}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-foreground truncate">{meta.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {fan.reactions_count} reactions · {fan.comments_count} comments · {fan.participation_count} participations
                    </p>
                  </div>

                  {/* Rank badge */}
                  <div className="shrink-0">
                    {isTop3 ? (
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold text-primary-foreground",
                        rank === 1 && "bg-primary shadow-md shadow-primary/30",
                        rank === 2 && "bg-muted-foreground/70",
                        rank === 3 && "bg-muted-foreground/50"
                      )}>
                        {rank}
                      </div>
                    ) : isTop10 ? (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold text-foreground bg-muted/60">
                        {rank}
                      </div>
                    ) : (
                      <span className="text-[13px] text-muted-foreground font-medium w-8 text-center block">
                        {rank}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default TopFansPage;
