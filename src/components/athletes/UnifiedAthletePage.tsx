import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";
import { useStudioRole } from "@/hooks/useStudioRole";
import { getEventsBySport } from "@/data/sportEvents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FallingEmojiOverlay } from "@/components/feed/FallingEmojiOverlay";
import { UnifiedFeedItem } from "./feed/FeedCards";
import { buildUnifiedFeed } from "./feed/buildUnifiedFeed";
import { athleteSponsors } from "@/data/athleteSponsors";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  BarChart3,
  Rss,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Athlete } from "@/data/athletes";

/* ─── Tabs ─── */
const TABS = [
  { id: "events", label: "Events", icon: Calendar },
  { id: "feed", label: "Feed", icon: Rss },
  { id: "datahub", label: "Data Hub", icon: BarChart3 },
] as const;
type TabId = (typeof TABS)[number]["id"];

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

/* ─── Placeholder top fans ─── */
const TOP_FANS = [
  { id: 1, name: "Léa M.", initials: "LM", hue: 210 },
  { id: 2, name: "Marc D.", initials: "MD", hue: 220 },
  { id: 3, name: "Sophie R.", initials: "SR", hue: 200 },
  { id: 4, name: "Thomas B.", initials: "TB", hue: 230 },
  { id: 5, name: "Emma L.", initials: "EL", hue: 195 },
  { id: 6, name: "Jules P.", initials: "JP", hue: 240 },
  { id: 7, name: "Camille V.", initials: "CV", hue: 205 },
  { id: 8, name: "Hugo F.", initials: "HF", hue: 215 },
  { id: 9, name: "Chloé G.", initials: "CG", hue: 225 },
  { id: 10, name: "Raphaël N.", initials: "RN", hue: 235 },
];

const TopFanAvatar = ({ fan }: { fan: (typeof TOP_FANS)[number] }) => {
  const rankColors = ["bg-primary", "bg-muted-foreground/70", "bg-muted-foreground/50"];
  const badgeBg = fan.id <= 3 ? rankColors[fan.id - 1] : "bg-muted-foreground/40";
  return (
    <div className="flex flex-col items-center gap-1 shrink-0 w-14">
      <div className="relative">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-[13px] font-bold text-primary-foreground" style={{ background: `hsl(${fan.hue}, 45%, 35%)` }}>
          {fan.initials}
        </div>
        <span className={cn("absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground border-2 border-background", badgeBg)}>
          {fan.id}
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground truncate w-full text-center">{fan.name}</span>
    </div>
  );
};

/* ─── Event Card ─── */
const EventCard = ({ event, past }: { event: any; past?: boolean }) => {
  const isMajor = event.category?.includes("Grand Slam") || event.category?.includes("Major") || event.category?.includes("Finals");
  return (
    <article className={cn("bg-card border border-border/40 rounded-2xl overflow-hidden flex", past && "opacity-60")}>
      <div className={cn("w-16 shrink-0 flex flex-col items-center justify-center py-3", isMajor ? "bg-primary text-primary-foreground" : "bg-primary/60 text-primary-foreground")}>
        <span className="text-[10px] font-semibold uppercase tracking-wider">{event.month}</span>
        <span className="text-2xl font-bold leading-none my-0.5">{event.date}</span>
        <span className="text-[10px] opacity-80">{event.year}</span>
      </div>
      <div className="flex-1 px-3 py-3 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-base">{event.countryFlag}</span>
          <h4 className="text-[14px] font-semibold text-foreground line-clamp-1">{event.name}</h4>
        </div>
        <Badge className={cn(event.categoryColor, "text-primary-foreground border-0 text-[10px] font-semibold shadow-sm")}>
          {isMajor && "🏆 "}{event.category}
        </Badge>
        <div className="flex items-center gap-1 text-muted-foreground text-[11px] mt-1.5">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
      </div>
    </article>
  );
};

/* ─── Props ─── */
interface UnifiedAthletePageProps {
  athlete: Athlete;
  fromStudio?: boolean;
  dataHubComponent?: ReactNode;
}

export const UnifiedAthletePage = ({ athlete, fromStudio = false, dataHubComponent }: UnifiedAthletePageProps) => {
  const navigate = useNavigate();
  const { avatarUrl, bannerUrl, bio, studioPosts } = useAthleteProfile(athlete.id);
  const { hasAccess: hasStudioAccess } = useStudioRole();

  const resolvedAvatar = avatarUrl || athlete.avatar;
  const resolvedBanner = bannerUrl || athlete.banner;
  const resolvedBio = bio || athlete.bio;

  const [activeTab, setActiveTab] = useState<TabId>("feed");
  const [isFan, setIsFan] = useState(false);

  const handleBeAFan = () => {
    setIsFan(!isFan);
    toast({
      title: isFan ? "Unfollowed" : "You're a fan! 🎉",
      description: isFan ? `You unfollowed ${athlete.name}` : `You're now following ${athlete.name}`,
    });
  };

  /* ─── Unified feed ─── */
  const allFeedItems = buildUnifiedFeed(athlete, studioPosts);

  /* ─── Sponsors ─── */
  const sponsors = athleteSponsors[athlete.id] || [];

  /* ─── Events ─── */
  const events = athlete.events || getEventsBySport(athlete.sport, athlete.gender);
  const now = new Date();
  const monthToNum: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const sortedEvents = [...events].sort((a, b) => {
    const da = new Date(parseInt(a.year), monthToNum[a.month] || 0, parseInt(a.date));
    const db = new Date(parseInt(b.year), monthToNum[b.month] || 0, parseInt(b.date));
    return da.getTime() - db.getTime();
  });
  const upcoming = sortedEvents.filter((e) => new Date(parseInt(e.year), monthToNum[e.month] || 0, parseInt(e.date)) >= now);
  const recent = sortedEvents.filter((e) => new Date(parseInt(e.year), monthToNum[e.month] || 0, parseInt(e.date)) < now).reverse();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FallingEmojiOverlay />
      {/* ─── 1. Hero Banner ─── */}
      <section className="relative h-[44vh] min-h-[260px] max-h-[400px] overflow-hidden">
        <img src={resolvedBanner} alt={`${athlete.name} banner`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

        {/* Back button + Studio return */}
        <div className="absolute top-0 left-0 right-0 z-50 px-3 pt-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/50 backdrop-blur-sm hover:bg-background/70 h-10 w-10 rounded-full"
            onClick={() => navigate(fromStudio ? "/studio" : "/home")}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          {fromStudio && hasStudioAccess && (
            <Button
              variant="secondary"
              size="sm"
              className="bg-background/50 backdrop-blur-sm hover:bg-background/70 text-xs h-8"
              onClick={() => navigate("/studio")}
            >
              ← Back to Studio
            </Button>
          )}
        </div>

        {/* Hero content – centered */}
        <div className="absolute bottom-0 inset-x-0 px-4 pb-4 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-background shadow-xl mb-3">
            <img src={resolvedAvatar} alt={athlete.name} className="w-full h-full object-cover object-top" />
          </div>
          <h1 className="font-display text-[22px] font-bold text-foreground drop-shadow-lg leading-tight">{athlete.name}</h1>
          <p className="text-[13px] text-foreground/70 mt-1 line-clamp-2 max-w-xs">{resolvedBio}</p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-2 text-[12px] text-foreground/60">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span className="font-semibold text-foreground/80">{formatNumber(athlete.followers)}</span>
              <span>Fans</span>
            </div>
          </div>

          {/* Sponsors strip */}
          {sponsors.length > 0 && (
            <div className="flex items-center gap-3 mt-3">
              {sponsors.map((s) => (
                <img key={s.alt} src={s.src} alt={s.alt} className="h-4 object-contain opacity-60" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── 2. BE A FAN CTA ─── */}
      <div className="px-4 py-4">
        <button
          onClick={handleBeAFan}
          className={cn(
            "w-full min-h-[52px] rounded-full text-[16px] font-bold tracking-wide transition-all duration-200 relative overflow-hidden",
            isFan
              ? "bg-primary/15 text-primary border border-primary/30 hover:bg-primary/20"
              : "text-primary-foreground hover:brightness-110 active:brightness-90"
          )}
          style={
            !isFan
              ? {
                  background: "linear-gradient(135deg, hsl(220 85% 45%), hsl(217 91% 60%), hsl(210 100% 70%))",
                  boxShadow: "0 0 24px hsl(217 91% 60% / 0.35), 0 4px 12px hsl(220 85% 45% / 0.3)",
                }
              : undefined
          }
        >
          {isFan ? "✓  FAN" : "BE A FAN"}
        </button>
      </div>

      {/* ─── 3. Top Fans This Week ─── */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-semibold text-foreground">Top fans this week</h2>
          <button onClick={() => navigate(`/athlete/${athlete.id}/fans`)} className="text-[13px] text-primary font-medium min-h-[44px] flex items-center">See more</button>
        </div>
        <ScrollArea className="w-full">
          <div className="flex gap-3 pb-1">
            {TOP_FANS.map((fan) => (
              <TopFanAvatar key={fan.id} fan={fan} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* ─── 4. Sticky Tabs ─── */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-y border-border/40">
        <div className="flex justify-center gap-1 px-3 py-2">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all min-h-[44px] shrink-0",
                activeTab === id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── 5. Tab Content ─── */}
      <main className="px-4 py-4 md:px-8 md:py-6 max-w-3xl mx-auto pb-20">
        {/* FEED */}
        {activeTab === "feed" && (
          <div className="space-y-4 animate-fade-in">
            {allFeedItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground text-[14px]">
                <Rss className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p>No posts yet.</p>
              </div>
            ) : (
              allFeedItems.map((item) => (
                <UnifiedFeedItem
                  key={item.id}
                  item={item}
                  avatarSrc={resolvedAvatar}
                  name={athlete.name}
                  athleteSlug={athlete.id}
                />
              ))
            )}
          </div>
        )}

        {/* EVENTS */}
        {activeTab === "events" && (
          <div className="space-y-4 animate-fade-in">
            {upcoming.length === 0 && recent.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground text-[14px]">
                <Calendar className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p>No events scheduled.</p>
              </div>
            ) : (
              <>
                {upcoming.length > 0 && (
                  <>
                    <h3 className="text-[16px] font-semibold text-foreground">Upcoming</h3>
                    {upcoming.map((event) => <EventCard key={event.id} event={event} />)}
                  </>
                )}
                {recent.length > 0 && (
                  <>
                    <h3 className="text-[16px] font-semibold text-foreground mt-6">Recent</h3>
                    {recent.slice(0, 5).map((event) => <EventCard key={event.id} event={event} past />)}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* DATA HUB */}
        {activeTab === "datahub" && (
          <div className="animate-fade-in">
            {dataHubComponent || (
              <div className="text-center py-16 text-muted-foreground text-[14px]">
                <BarChart3 className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p>Data Hub coming soon for {athlete.name}.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
