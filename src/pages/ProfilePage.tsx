import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useFollowedAthletes } from "@/hooks/useFollowedAthletes";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Settings, ChevronDown, ChevronUp, Loader2, Heart, MessageCircle, Trophy, Pencil } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { format } from "date-fns";

const SPORTS_OPTIONS = [
  "Triathlon", "Tennis", "Rugby", "Football",
  "Formula 1", "Cycling", "Basketball", "Running", "Swimming",
];

interface WeeklyStats {
  reactions: number;
  comments: number;
  topAthleteName: string | null;
}

const ProfilePage = () => {
  const { user, isAuthenticated, profile, getFullName, getDisplayName } = useAuth();
  const navigate = useNavigate();
  const { followedIds, loading: followLoading } = useFollowedAthletes();
  const { athletes, resolve } = useAthleteProfiles();
  const [sportsPrefs, setSportsPrefs] = useState<string[]>([]);
  const [chipsExpanded, setChipsExpanded] = useState(false);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({ reactions: 0, comments: 0, topAthleteName: null });
  const [loading, setLoading] = useState(true);

  // Auth is handled by ProtectedRoute wrapper

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setLoading(true);
      // Fetch sports prefs
      const { data: prof } = await supabase
        .from("profiles")
        .select("sports_preferences, created_at")
        .eq("id", user.id)
        .maybeSingle();
      if (prof?.sports_preferences) setSportsPrefs(prof.sports_preferences);

      // Fetch weekly stats
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      const iso = weekStart.toISOString();

      const [reactionsRes, commentsRes] = await Promise.all([
        supabase.from("post_reactions").select("id", { count: "exact", head: true }).eq("user_id", user.id).gte("created_at", iso),
        supabase.from("post_comments").select("id", { count: "exact", head: true }).eq("user_id", user.id).gte("created_at", iso),
      ]);

      // Top athlete = first followed
      const topName = followedIds.length > 0
        ? athletes.find(a => a.id === followedIds[0])?.name ?? null
        : null;

      setWeeklyStats({
        reactions: reactionsRes.count ?? 0,
        comments: commentsRes.count ?? 0,
        topAthleteName: topName,
      });
      setLoading(false);
    };
    load();
  }, [user, followedIds, athletes]);

  const followedAthletes = athletes.filter(a => followedIds.includes(a.id));
  const memberSince = user?.created_at ? format(new Date(user.created_at), "MMM yyyy") : null;
  const displayEmail = user?.email ? `@${user.email.split("@")[0]}` : "";

  // Chips logic: show max 2 rows (~6 items) then expand
  const MAX_CHIPS = 6;
  const visibleSports = chipsExpanded ? sportsPrefs : sportsPrefs.slice(0, MAX_CHIPS);
  const hasMoreChips = sportsPrefs.length > MAX_CHIPS;

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      {/* Subtle dark gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse at 50% 0%, hsl(217 91% 60% / 0.06) 0%, transparent 60%)"
      }} />

      <div className="relative z-10 flex flex-col flex-1 pb-[env(safe-area-inset-bottom)]">
        {/* 1. Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 bg-background/80 backdrop-blur-md border-b border-border/30" style={{ height: 52, minHeight: 52 }}>
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-11 h-11 -ml-1 rounded-full active:bg-muted/40 transition-colors">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <span className="text-base font-semibold text-foreground">Profile</span>
          <Link to="/account" className="flex items-center justify-center w-11 h-11 -mr-1 rounded-full active:bg-muted/40 transition-colors">
            <Settings className="h-5 w-5 text-foreground" />
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto px-4 pt-5 pb-8 space-y-5">
          {/* 2. Hero identity */}
          <div className="flex flex-col items-center text-center">
            <div className="w-[68px] h-[68px] rounded-full ring-2 ring-primary/40 ring-offset-2 ring-offset-background overflow-hidden mb-2.5">
              <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
                {getDisplayName().charAt(0).toUpperCase()}
              </div>
            </div>
            <h1 className="text-xl font-bold text-foreground truncate max-w-[260px] leading-tight">
              {getFullName()}
            </h1>
            <p className="text-sm text-muted-foreground truncate max-w-[220px] mt-0.5">
              {displayEmail}
            </p>
            {memberSince && (
              <p className="text-xs text-muted-foreground/60 mt-1">
                Member since {memberSince}
              </p>
            )}
          </div>

          {/* 3. KPI tiles */}
          <div className="grid grid-cols-2 gap-2.5">
            <KPITile value={followedIds.length} label="Athletes followed" icon={<Heart className="h-3.5 w-3.5" />} />
            <KPITile value={weeklyStats.reactions} label="Reactions" icon={<Trophy className="h-3.5 w-3.5" />} />
            <div className="col-span-2">
              <KPITile value={weeklyStats.comments} label="Comments" icon={<MessageCircle className="h-3.5 w-3.5" />} />
            </div>
          </div>

          {/* 4. Interest chips */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-foreground">Interests</h2>
              <Link to="/account" className="text-xs text-primary font-medium flex items-center gap-1 min-h-[44px] px-2">
                <Pencil className="h-3 w-3" /> Edit
              </Link>
            </div>
            {sportsPrefs.length === 0 ? (
              <div className="flex flex-wrap gap-2">
                {["Add sport", "Tennis?", "Football?"].map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-full border border-dashed border-border text-xs text-muted-foreground">{t}</span>
                ))}
                <Link to="/account" className="px-3 py-1.5 rounded-full border border-primary/40 text-xs text-primary font-medium">
                  Edit
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {visibleSports.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-full bg-secondary text-xs text-secondary-foreground font-medium">{s}</span>
                  ))}
                </div>
                {hasMoreChips && (
                  <button onClick={() => setChipsExpanded(v => !v)} className="mt-2 text-xs text-primary font-medium flex items-center gap-0.5 min-h-[44px]">
                    {chipsExpanded ? <><ChevronUp className="h-3 w-3" /> Less</> : <><ChevronDown className="h-3 w-3" /> +{sportsPrefs.length - MAX_CHIPS} more</>}
                  </button>
                )}
              </>
            )}
          </section>

          {/* 5. This week activity summary */}
          <section className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 p-4">
            <h2 className="text-sm font-semibold text-foreground mb-0.5">This week</h2>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">Your activity across your athletes.</p>
            <div className="space-y-2.5">
              {weeklyStats.topAthleteName && (
                <ActivityRow label="Top athlete" value={weeklyStats.topAthleteName} />
              )}
              <ActivityRow label="Reactions" value={String(weeklyStats.reactions)} />
              <ActivityRow label="Comments" value={String(weeklyStats.comments)} />
            </div>
          </section>

          {/* 6. My athletes */}
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-sm font-semibold text-foreground">My athletes</h2>
              <Link to="/athletes" className="text-xs text-primary font-medium min-h-[44px] flex items-center px-2">
                See all
              </Link>
            </div>
            {followLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : followedAthletes.length === 0 ? (
              <div className="rounded-2xl border border-border/30 bg-card/40 p-5 text-center">
                <p className="text-sm text-muted-foreground mb-3">No athletes followed yet.</p>
                <Link to="/athletes" className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                  Explore athletes
                </Link>
              </div>
            ) : (
              <ScrollArea className="w-full">
                <div className="flex gap-3 pb-1">
                  {followedAthletes.map(athlete => (
                    <Link
                      key={athlete.id}
                      to={`/athlete/${athlete.id}`}
                      className="flex flex-col items-center gap-1 shrink-0"
                      style={{ width: 56 }}
                    >
                      <img
                        src={athlete.avatar}
                        alt={athlete.name}
                        className="w-12 h-12 rounded-full object-cover object-top ring-1.5 ring-primary/30"
                      />
                      <span className="text-[10px] text-muted-foreground truncate w-full text-center leading-tight">
                        {athlete.name.split(" ")[0]}
                      </span>
                    </Link>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

/* ---- Sub-components ---- */

function KPITile({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 p-3.5 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className="text-muted-foreground/70">{icon}</span>
        <span className="text-2xl font-bold text-foreground leading-none">{value}</span>
      </div>
      <span className="text-xs text-muted-foreground leading-tight">{label}</span>
    </div>
  );
}

function ActivityRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground truncate max-w-[140px]">{value}</span>
    </div>
  );
}

export default ProfilePage;
