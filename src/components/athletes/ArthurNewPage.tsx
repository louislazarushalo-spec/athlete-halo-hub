import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAthleteById, MediaFeedItem } from "@/data/athletes";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";
import { getEventsBySport } from "@/data/sportEvents";
import { arthurTrainingData, arthurExclusiveZoneData } from "@/data/athleteContent";
import { ArthurDataHub } from "./DataHub/ArthurDataHub";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ReactionBar } from "@/components/feed/ReactionBar";
import { CommentsSheet } from "@/components/feed/CommentsSheet";
import { FallingEmojiOverlay } from "@/components/feed/FallingEmojiOverlay";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Play,
  Users,
  BarChart3,
  Rss,
  ExternalLink,
  Trophy,
  MessageCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import sponsorLacoste from "@/assets/sponsor-lacoste.png";
import sponsorBabolat from "@/assets/sponsor-babolat.png";
import sponsorExtia from "@/assets/sponsor-extia.png";

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

const platformConfig: Record<string, { label: string; bgClass: string; textClass: string; icon?: string }> = {
  instagram: { label: "Instagram", bgClass: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400", textClass: "text-white" },
  twitter: { label: "X", bgClass: "bg-foreground", textClass: "text-background" },
  youtube: { label: "YouTube", bgClass: "bg-red-600", textClass: "text-white" },
  lequipe: { label: "L'Équipe", bgClass: "bg-blue-600", textClass: "text-white", icon: "L'É" },
  espn: { label: "ESPN", bgClass: "bg-gradient-to-br from-purple-600 to-pink-500", textClass: "text-white", icon: "ESPN" },
  bbc: { label: "BBC Sport", bgClass: "bg-orange-600", textClass: "text-white", icon: "BBC" },
};

/* ─── Media Frame ─── */
const MediaFrame = ({ src, alt, ratio = "1:1" }: { src: string; alt: string; ratio?: "1:1" | "4:5" }) => (
  <div className={cn("relative w-full overflow-hidden bg-muted", ratio === "4:5" ? "aspect-[4/5]" : "aspect-square")}>
    <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
  </div>
);

/* ─── Feed Card ─── */
const FeedCard = ({ item, avatarSrc, name }: { item: MediaFeedItem; avatarSrc: string; name: string }) => {
  const config = platformConfig[item.platform] || platformConfig.instagram;
  const [commentOpen, setCommentOpen] = useState(false);

  if (item.type === "social") {
    return (
      <article className="bg-card border border-border/40 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
          <img src={avatarSrc} alt={name} className="w-8 h-8 rounded-full object-cover object-top ring-1 ring-border" />
          <div className="flex-1 min-w-0">
            <span className="text-[13px] font-semibold text-foreground truncate block">{name}</span>
            <span className="text-[11px] text-muted-foreground">{config.label} · {item.timestamp}</span>
          </div>
        </div>
        {item.image && <MediaFrame src={item.image} alt="Post" ratio="1:1" />}
        <div className="px-4 py-3">
          <p className="text-[14px] leading-[1.45] text-foreground/90 line-clamp-3">{item.content}</p>
        </div>
        <ReactionBar postId={item.id} onCommentClick={() => setCommentOpen(true)} />
        <CommentsSheet postId={item.id} open={commentOpen} onOpenChange={setCommentOpen} />
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
          <Badge variant="secondary" className="text-[10px] bg-destructive/20 text-destructive border-destructive/20">Video</Badge>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <img src={item.image} alt={item.title || "Video"} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-destructive flex items-center justify-center shadow-2xl">
              <Play className="h-6 w-6 text-destructive-foreground ml-0.5" fill="currentColor" />
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
        <ReactionBar postId={item.id} onCommentClick={() => setCommentOpen(true)} />
        <CommentsSheet postId={item.id} open={commentOpen} onOpenChange={setCommentOpen} />
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
        <ReactionBar postId={item.id} onCommentClick={() => setCommentOpen(true)} />
        <CommentsSheet postId={item.id} open={commentOpen} onOpenChange={setCommentOpen} />
      </article>
    );
  }

  return null;
};

/* ─── Program Feed Card (with category tag) ─── */
const ProgramFeedCard = ({ item, avatarSrc, name }: { item: MediaFeedItem & { _category?: string }; avatarSrc: string; name: string }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  return (
    <article className="bg-card border border-border/40 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
        <img src={avatarSrc} alt={name} className="w-8 h-8 rounded-full object-cover object-top ring-1 ring-border" />
        <div className="flex-1 min-w-0">
          <span className="text-[13px] font-semibold text-foreground truncate block">{name}</span>
          <span className="text-[11px] text-muted-foreground">Program</span>
        </div>
        <div className="flex items-center gap-1.5">
          {(item as any)._category && (
            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">{(item as any)._category}</Badge>
          )}
          <Badge variant="secondary" className="text-[10px]">Program</Badge>
        </div>
      </div>
      {item.image && <MediaFrame src={item.image} alt={item.title || "Program"} ratio="1:1" />}
      <div className="px-4 py-3 space-y-2">
        <h4 className="text-[15px] font-semibold text-foreground line-clamp-1">{item.title}</h4>
        <p className="text-[13px] text-muted-foreground line-clamp-2">{item.content}</p>
        <Link to="/training/arthur-cazaux">
          <Button variant="outline" size="sm" className="h-9 text-[13px] rounded-full mt-1">
            View program <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
      <ReactionBar postId={item.id} onCommentClick={() => setCommentOpen(true)} />
      <CommentsSheet postId={item.id} open={commentOpen} onOpenChange={setCommentOpen} />
    </article>
  );
};

/* ─── Cause Feed Card ─── */
const CauseFeedCard = ({ item, avatarSrc, name }: { item: MediaFeedItem; avatarSrc: string; name: string }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  return (
    <article className="bg-card border border-border/40 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
        <img src={avatarSrc} alt={name} className="w-8 h-8 rounded-full object-cover object-top ring-1 ring-border" />
        <div className="flex-1 min-w-0">
          <span className="text-[13px] font-semibold text-foreground truncate block">{name}</span>
          <span className="text-[11px] text-muted-foreground">Cause</span>
        </div>
        <Badge variant="secondary" className="text-[10px]">Cause</Badge>
      </div>
      {item.image && <MediaFrame src={item.image} alt={item.title || "Cause"} ratio="1:1" />}
      <div className="px-4 py-3 space-y-2">
        <h4 className="text-[15px] font-semibold text-foreground line-clamp-1">{item.title}</h4>
        <p className="text-[13px] text-muted-foreground line-clamp-2">{item.content}</p>
        <Button variant="outline" size="sm" className="h-9 text-[13px] rounded-full mt-1">
          Learn more <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
        </Button>
      </div>
      <ReactionBar postId={item.id} onCommentClick={() => setCommentOpen(true)} />
      <CommentsSheet postId={item.id} open={commentOpen} onOpenChange={setCommentOpen} />
    </article>
  );
};

/* ─── Prize Draw Feed Card ─── */
const PrizeDrawFeedCard = ({ item, avatarSrc, name }: { item: MediaFeedItem & { _badge?: string }; avatarSrc: string; name: string }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  return (
    <article className="bg-card border border-border/40 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
        <img src={avatarSrc} alt={name} className="w-8 h-8 rounded-full object-cover object-top ring-1 ring-border" />
        <div className="flex-1 min-w-0">
          <span className="text-[13px] font-semibold text-foreground truncate block">{name}</span>
          <span className="text-[11px] text-muted-foreground">Prize draw</span>
        </div>
        <Badge variant="secondary" className="text-[10px] bg-primary/15 text-primary border-primary/30">
          <Trophy className="h-3 w-3 mr-1" />Prize draw
        </Badge>
      </div>
      <div className="px-4 py-3 space-y-2">
        <h4 className="text-[15px] font-semibold text-foreground line-clamp-2">{item.title}</h4>
        <p className="text-[13px] text-muted-foreground line-clamp-2">{item.content}</p>
        {(item as any)._badge && (
          <span className="text-[11px] text-primary font-medium">{(item as any)._badge}</span>
        )}
        <div>
          <Button variant="outline" size="sm" className="h-9 text-[13px] rounded-full mt-1" onClick={() => toast({ title: "Prize draw", description: "Entry flow coming soon!" })}>
            Enter <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
      <ReactionBar postId={item.id} onCommentClick={() => setCommentOpen(true)} />
      <CommentsSheet postId={item.id} open={commentOpen} onOpenChange={setCommentOpen} />
    </article>
  );
};

/* ─── Live Discussion Feed Card ─── */
const LiveDiscussionFeedCard = ({ item, avatarSrc, name }: { item: MediaFeedItem & { _participants?: number; _lastActive?: string }; avatarSrc: string; name: string }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  return (
    <article className="bg-card border border-border/40 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
        <img src={avatarSrc} alt={name} className="w-8 h-8 rounded-full object-cover object-top ring-1 ring-border" />
        <div className="flex-1 min-w-0">
          <span className="text-[13px] font-semibold text-foreground truncate block">{name}</span>
          <span className="text-[11px] text-muted-foreground">Discussion</span>
        </div>
        <Badge variant="secondary" className="text-[10px] bg-accent/15 text-accent-foreground border-accent/30">
          <MessageCircle className="h-3 w-3 mr-1" />Live
        </Badge>
      </div>
      <div className="px-4 py-3 space-y-2">
        <h4 className="text-[15px] font-semibold text-foreground line-clamp-2">{item.title}</h4>
        <p className="text-[13px] text-muted-foreground line-clamp-2">{item.content}</p>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          {(item as any)._participants && <span><Users className="h-3 w-3 inline mr-1" />{(item as any)._participants} fans</span>}
          {(item as any)._lastActive && <span>Active {(item as any)._lastActive}</span>}
        </div>
        <div>
          <Button variant="outline" size="sm" className="h-9 text-[13px] rounded-full mt-1" onClick={() => toast({ title: "Live discussion", description: "Join flow coming soon!" })}>
            Join <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
      <ReactionBar postId={item.id} onCommentClick={() => setCommentOpen(true)} />
      <CommentsSheet postId={item.id} open={commentOpen} onOpenChange={setCommentOpen} />
    </article>
  );
};

const TopFanAvatar = ({ fan }: { fan: typeof TOP_FANS[number] }) => {
  const rankColors = ["bg-primary", "bg-muted-foreground/70", "bg-muted-foreground/50"];
  const badgeBg = fan.id <= 3 ? rankColors[fan.id - 1] : "bg-muted-foreground/40";
  return (
    <div className="flex flex-col items-center gap-1 shrink-0 w-14">
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-[13px] font-bold text-primary-foreground"
          style={{ background: `hsl(${fan.hue}, 45%, 35%)` }}
        >
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

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
export const ArthurNewPage = () => {
  const navigate = useNavigate();
  const athlete = getAthleteById("arthur-cazaux")!;
  const { avatarUrl, bannerUrl, bio, studioPosts } = useAthleteProfile("arthur-cazaux");

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

  /* ─── Cause ─── */
  const cause = athlete.cause;

  /* ─── Feed data ─── */
  type ExtendedFeedItem = MediaFeedItem & { _cardType?: string; _category?: string; _badge?: string; _participants?: number; _lastActive?: string };

  const socialItems: ExtendedFeedItem[] = [
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

  /* Map ALL programs from arthurTrainingData (16 total: 4 categories × 4 programs) */
  const programItems: ExtendedFeedItem[] = arthurTrainingData.categories.flatMap((cat) =>
    cat.programs.map((p) => ({
      id: `program-${cat.id}-${p.id}`,
      type: "social" as MediaFeedItem["type"],
      platform: "instagram" as MediaFeedItem["platform"],
      title: p.title,
      content: p.description || "",
      image: p.image || "",
      timestamp: "",
      stats: {},
      _cardType: "program",
      _category: cat.title,
    }))
  );

  /* Map ALL prize draws from arthurExclusiveZoneData (4 total) */
  const prizeDrawItems: ExtendedFeedItem[] = arthurExclusiveZoneData.prizeDraws.map((pd) => ({
    id: `prize-draw-${pd.id}`,
    type: "social" as MediaFeedItem["type"],
    platform: "instagram" as MediaFeedItem["platform"],
    title: pd.title,
    content: pd.description,
    image: "",
    timestamp: "",
    stats: {},
    _cardType: "prize_draw",
    _badge: pd.badge,
  }));

  /* Map ALL discussion threads from arthurExclusiveZoneData (4 total) */
  const discussionItems: ExtendedFeedItem[] = arthurExclusiveZoneData.discussionThreads.map((dt) => ({
    id: `discussion-${dt.id}`,
    type: "social" as MediaFeedItem["type"],
    platform: "instagram" as MediaFeedItem["platform"],
    title: dt.title,
    content: dt.description,
    image: "",
    timestamp: "",
    stats: {},
    _cardType: "live_discussion",
    _participants: dt.participants,
    _lastActive: dt.lastActive,
  }));

  const causeItems: ExtendedFeedItem[] = cause
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

  const allFeedItems: ExtendedFeedItem[] = [...socialItems, ...programItems, ...prizeDrawItems, ...discussionItems, ...causeItems];

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

        {/* Back button */}
        <div className="absolute top-0 left-0 z-50 px-3 pt-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/50 backdrop-blur-sm hover:bg-background/70 h-10 w-10 rounded-full"
            onClick={() => navigate("/home")}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
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
          <div className="flex items-center gap-3 mt-3">
            <img src={sponsorLacoste} alt="Lacoste" className="h-4 object-contain opacity-60" />
            <img src={sponsorBabolat} alt="Babolat" className="h-4 object-contain opacity-60" />
            <img src={sponsorExtia} alt="Extia" className="h-4 object-contain opacity-60" />
          </div>
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
          <button onClick={() => navigate("/athlete/arthur-cazaux/fans")} className="text-[13px] text-primary font-medium min-h-[44px] flex items-center">See more</button>
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
              allFeedItems.map((item) => {
                if (item._cardType === "program") {
                  return <ProgramFeedCard key={item.id} item={item} avatarSrc={resolvedAvatar} name={athlete.name} />;
                }
                if (item._cardType === "cause") {
                  return <CauseFeedCard key={item.id} item={item} avatarSrc={resolvedAvatar} name={athlete.name} />;
                }
                if (item._cardType === "prize_draw") {
                  return <PrizeDrawFeedCard key={item.id} item={item} avatarSrc={resolvedAvatar} name={athlete.name} />;
                }
                if (item._cardType === "live_discussion") {
                  return <LiveDiscussionFeedCard key={item.id} item={item} avatarSrc={resolvedAvatar} name={athlete.name} />;
                }
                return <FeedCard key={item.id} item={item} avatarSrc={resolvedAvatar} name={athlete.name} />;
              })
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
    <article className={cn("bg-card border border-border/40 rounded-2xl overflow-hidden flex", past && "opacity-60")}>
      <div className={cn(
        "w-16 shrink-0 flex flex-col items-center justify-center py-3",
        isMajor ? "bg-primary text-primary-foreground" : "bg-primary/60 text-primary-foreground"
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