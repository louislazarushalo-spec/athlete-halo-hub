import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAthleteById, MediaFeedItem } from "@/data/athletes";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";
import { getEventsBySport } from "@/data/sportEvents";
import { ArthurDataHub } from "./DataHub/ArthurDataHub";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Heart,
  MessageCircle,
  Play,
  Users,
  UserPlus,
  Check,
  BarChart3,
  Rss,
  ExternalLink,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import sponsorLacoste from "@/assets/sponsor-lacoste.png";
import sponsorBabolat from "@/assets/sponsor-babolat.png";
import sponsorExtia from "@/assets/sponsor-extia.png";

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

const platformConfig: Record<string, { label: string; bgClass: string; textClass: string; icon?: string }> = {
  instagram: { label: "Instagram", bgClass: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400", textClass: "text-white" },
  twitter: { label: "X", bgClass: "bg-foreground", textClass: "text-background" },
  youtube: { label: "YouTube", bgClass: "bg-red-600", textClass: "text-white" },
  lequipe: { label: "L'Équipe", bgClass: "bg-blue-600", textClass: "text-white", icon: "L'É" },
  espn: { label: "ESPN", bgClass: "bg-gradient-to-br from-purple-600 to-pink-500", textClass: "text-white", icon: "ESPN" },
  bbc: { label: "BBC Sport", bgClass: "bg-orange-600", textClass: "text-white", icon: "BBC" },
};

/* ─── Media Frame (only 1:1 and 4:5) ─── */
const MediaFrame = ({ src, alt, ratio = "1:1" }: { src: string; alt: string; ratio?: "1:1" | "4:5" }) => (
  <div className={cn("relative w-full overflow-hidden bg-muted", ratio === "4:5" ? "aspect-[4/5]" : "aspect-square")}>
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
    />
  </div>
);

/* ─── Feed Card ─── */
const FeedCard = ({ item, avatarSrc, name }: { item: MediaFeedItem; avatarSrc: string; name: string }) => {
  const config = platformConfig[item.platform] || platformConfig.instagram;

  if (item.type === "social") {
    const hasImage = !!item.image;
    return (
      <article className="bg-card border border-border/40 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
          <img src={avatarSrc} alt={name} className="w-8 h-8 rounded-full object-cover object-top ring-1 ring-border" />
          <div className="flex-1 min-w-0">
            <span className="text-[13px] font-semibold text-foreground truncate block">{name}</span>
            <span className="text-[11px] text-muted-foreground">{config.label} · {item.timestamp}</span>
          </div>
        </div>
        {hasImage && <MediaFrame src={item.image} alt="Post" ratio="1:1" />}
        <div className="px-4 py-3 space-y-2">
          <p className="text-[14px] leading-[1.45] text-foreground/90 line-clamp-3">{item.content}</p>
          <div className="flex items-center gap-5 text-muted-foreground text-[12px]">
            {item.stats?.likes != null && (
              <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" />{formatNumber(item.stats.likes)}</span>
            )}
            {item.stats?.comments != null && (
              <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" />{formatNumber(item.stats.comments)}</span>
            )}
          </div>
        </div>
      </article>
    );
  }

  if (item.type === "video") {
    return (
      <article className="bg-card border border-border/40 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold", config.bgClass, config.textClass)}>
            {config.icon || <Play className="h-4 w-4" fill="white" />}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[13px] font-semibold text-foreground truncate block">{config.label}</span>
            <span className="text-[11px] text-muted-foreground">{item.timestamp}</span>
          </div>
          <Badge variant="secondary" className="text-[10px] bg-red-600/20 text-red-400 border-red-500/20">Video</Badge>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <img src={item.image} alt={item.title || "Video"} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl">
              <Play className="h-6 w-6 text-white ml-0.5" fill="white" />
            </div>
          </div>
          {item.stats?.duration && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-background/90 backdrop-blur-sm rounded text-[11px] font-semibold">{item.stats.duration}</div>
          )}
        </div>
        <div className="px-4 py-3">
          <h4 className="text-[14px] font-semibold text-foreground line-clamp-2 leading-snug">{item.title}</h4>
          <p className="text-[12px] text-muted-foreground mt-1">{formatNumber(item.stats?.views || 0)} views</p>
        </div>
      </article>
    );
  }

  if (item.type === "article") {
    return (
      <article className="bg-card border border-border/40 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold", config.bgClass, config.textClass)}>
            {config.icon}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[13px] font-semibold text-foreground truncate block">{config.label}</span>
            <span className="text-[11px] text-muted-foreground">{item.timestamp}</span>
          </div>
          <Badge variant="secondary" className="text-[10px]">Article</Badge>
        </div>
        <div className="flex gap-3 px-4 py-3">
          <div className="flex-1 min-w-0 space-y-1.5">
            <h4 className="text-[14px] font-semibold text-foreground leading-snug line-clamp-2">{item.title}</h4>
            <p className="text-[12px] text-muted-foreground line-clamp-2">{item.content}</p>
            {item.stats?.readTime && <span className="text-[11px] text-primary font-medium">{item.stats.readTime}</span>}
          </div>
          {item.image && (
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
              <img src={item.image} alt="Article" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
            </div>
          )}
        </div>
      </article>
    );
  }

  return null;
};

/* ─── Main Page ─── */
export const ArthurNewPage = () => {
  const navigate = useNavigate();
  const athlete = getAthleteById("arthur-cazaux")!;
  const { avatarUrl, bannerUrl, bio, studioPosts } = useAthleteProfile("arthur-cazaux");

  const resolvedAvatar = avatarUrl || athlete.avatar;
  const resolvedBanner = bannerUrl || athlete.banner;
  const resolvedBio = bio || athlete.bio;

  const [activeTab, setActiveTab] = useState<TabId>("feed");
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({ title: isFollowing ? "Unfollowed" : "Following!", description: isFollowing ? `You unfollowed ${athlete.name}` : `You're now following ${athlete.name}` });
  };

  /* ─── Programs from training posts ─── */
  const programs = athlete.training || [];

  /* ─── Cause ─── */
  const cause = athlete.cause;

  /* ─── Feed data (unified: social + video + article + programs + causes) ─── */
  const socialItems: (MediaFeedItem & { _cardType?: string })[] = [
    ...studioPosts.map((p) => ({
      id: p.id,
      type: (p.type === "video" ? "video" : p.type === "article" ? "article" : "social") as MediaFeedItem["type"],
      platform: "instagram" as MediaFeedItem["platform"],
      title: p.title,
      content: p.body || "",
      image: p.media?.[0] || "",
      timestamp: p.published_at ? new Date(p.published_at).toLocaleDateString() : "",
      stats: {},
    })),
    ...athlete.mediaFeed,
  ];

  const programItems: (MediaFeedItem & { _cardType?: string })[] = programs.map((p, i) => ({
    id: `program-${i}`,
    type: "social" as MediaFeedItem["type"],
    platform: "instagram" as MediaFeedItem["platform"],
    title: p.title,
    content: p.description || "",
    image: p.image || "",
    timestamp: "",
    stats: {},
    _cardType: "program",
  }));

  const causeItems: (MediaFeedItem & { _cardType?: string })[] = cause
    ? [{
        id: "cause-main",
        type: "social" as MediaFeedItem["type"],
        platform: "instagram" as MediaFeedItem["platform"],
        title: cause.title,
        content: cause.story || "",
        image: cause.image || "",
        timestamp: "",
        stats: {},
        _cardType: "cause",
      }]
    : [];

  const allFeedItems = [...socialItems, ...programItems, ...causeItems];

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
      {/* ─── Hero Banner ─── */}
      <section className="relative h-[52vh] min-h-[300px] max-h-[480px] overflow-hidden">
        <img src={resolvedBanner} alt={`${athlete.name} banner`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Top bar: Back + Follow */}
        <div className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-3 pt-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/50 backdrop-blur-sm hover:bg-background/70 h-10 w-10 rounded-full"
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/home"))}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant={isFollowing ? "secondary" : "default"}
            size="sm"
            onClick={handleFollow}
            className="h-9 text-[13px] rounded-full px-5 shadow-lg"
          >
            {isFollowing ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <UserPlus className="h-3.5 w-3.5 mr-1.5" />}
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Hero content – centered on mobile */}
        <div className="absolute bottom-0 inset-x-0 px-4 pb-4 flex flex-col items-center text-center md:items-start md:text-left md:px-8 md:pb-6">
          {/* Avatar — clean, no overlays, no badges */}
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-[3px] border-background shadow-xl mb-3">
            <img src={resolvedAvatar} alt={athlete.name} className="w-full h-full object-cover object-top" />
          </div>

          <h1 className="font-display text-[22px] md:text-4xl font-bold text-foreground drop-shadow-lg leading-tight">{athlete.name}</h1>
          <p className="text-[13px] md:text-base text-foreground/80 mt-1 line-clamp-2 max-w-md">{resolvedBio}</p>

          {/* Fans count */}
          <div className="flex items-center gap-1 text-foreground/70 text-[12px] mt-2">
            <Users className="h-3.5 w-3.5" />
            <span>{athlete.followers.toLocaleString()} fans</span>
          </div>

          {/* Sponsors strip */}
          <div className="flex items-center gap-3 mt-3 overflow-x-auto max-w-full">
            <img src={sponsorLacoste} alt="Lacoste" className="h-4 md:h-6 object-contain opacity-70" />
            <img src={sponsorBabolat} alt="Babolat" className="h-4 md:h-6 object-contain opacity-70" />
            <img src={sponsorExtia} alt="Extia" className="h-4 md:h-6 object-contain opacity-70" />
          </div>
        </div>
      </section>

      {/* ─── Sticky Tabs ─── */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/40">
        <ScrollArea className="w-full">
          <div className="flex justify-start md:justify-center gap-1 px-3 py-2 min-w-max">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-all min-h-[44px] shrink-0",
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
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* ─── Tab Content ─── */}
      <main className="px-4 py-4 md:px-8 md:py-6 max-w-3xl mx-auto pb-20">
        {/* ── FEED (no filter chips) ── */}
        {activeTab === "feed" && (
          <div className="space-y-4 animate-fade-in">
            {allFeedItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground text-[14px]">
                <Rss className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p>No posts yet.</p>
              </div>
            ) : (
              allFeedItems.map((item) => {
                const extended = item as any;
                if (extended._cardType === "program") {
                  return (
                    <article key={item.id} className="bg-card border border-border/40 rounded-2xl overflow-hidden">
                      {item.image && <MediaFrame src={item.image} alt={item.title || "Program"} ratio="1:1" />}
                      <div className="px-4 py-3 space-y-2">
                        <Badge variant="secondary" className="text-[10px]">Program</Badge>
                        <h4 className="text-[15px] font-semibold text-foreground line-clamp-1">{item.title}</h4>
                        <p className="text-[13px] text-muted-foreground line-clamp-2">{item.content}</p>
                        <Link to={`/training/arthur-cazaux`}>
                          <Button variant="outline" size="sm" className="h-9 text-[13px] rounded-full mt-1">
                            View program <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                          </Button>
                        </Link>
                      </div>
                    </article>
                  );
                }
                if (extended._cardType === "cause") {
                  return (
                    <article key={item.id} className="bg-card border border-border/40 rounded-2xl overflow-hidden">
                      {item.image && <MediaFrame src={item.image} alt={item.title || "Cause"} ratio="1:1" />}
                      <div className="px-4 py-3 space-y-2">
                        <Badge variant="secondary" className="text-[10px]">Cause</Badge>
                        <h4 className="text-[15px] font-semibold text-foreground line-clamp-1">{item.title}</h4>
                        <p className="text-[13px] text-muted-foreground line-clamp-2">{item.content}</p>
                        <Button variant="outline" size="sm" className="h-9 text-[13px] rounded-full mt-1">
                          Learn more <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                        </Button>
                      </div>
                    </article>
                  );
                }
                return <FeedCard key={item.id} item={item} avatarSrc={resolvedAvatar} name={athlete.name} />;
              })
            )}
          </div>
        )}

        {/* ── EVENTS ── */}
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
                    {upcoming.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </>
                )}
                {recent.length > 0 && (
                  <>
                    <h3 className="text-[16px] font-semibold text-foreground mt-6">Recent</h3>
                    {recent.slice(0, 5).map((event) => (
                      <EventCard key={event.id} event={event} past />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* ── DATA HUB ── */}
        {activeTab === "datahub" && (
          <div className="animate-fade-in">
            <ArthurDataHub />
          </div>
        )}
      </main>
    </div>
  );
};

/* ─── Event Card ─── */
const EventCard = ({ event, past }: { event: any; past?: boolean }) => {
  const isMajor = event.category?.includes("Grand Slam") || event.category?.includes("Major") || event.category?.includes("Finals");
  return (
    <article className={cn(
      "bg-card border border-border/40 rounded-2xl overflow-hidden flex",
      past && "opacity-60"
    )}>
      <div className={cn(
        "w-16 shrink-0 flex flex-col items-center justify-center py-3 text-white",
        isMajor ? "bg-gradient-to-b from-primary to-primary/70" : "bg-gradient-to-b from-blue-600 to-blue-800"
      )}>
        <span className="text-[10px] font-semibold uppercase tracking-wider">{event.month}</span>
        <span className="text-2xl font-bold leading-none my-0.5">{event.date}</span>
        <span className="text-[10px] opacity-80">{event.year}</span>
      </div>
      <div className="flex-1 px-3 py-3 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-base">{event.countryFlag}</span>
          <h4 className="text-[14px] font-semibold text-foreground line-clamp-1">{event.name}</h4>
        </div>
        <Badge className={cn(event.categoryColor, "text-white border-0 text-[10px] font-semibold shadow-sm")}>
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
