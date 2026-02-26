import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReactionBar } from "@/components/feed/ReactionBar";
import { CommentsSheet } from "@/components/feed/CommentsSheet";
import { ShoppableMediaOverlay } from "@/components/feed/ShoppableMediaOverlay";
import {
  Play,
  Trophy,
  MessageCircle,
  Users,
  ExternalLink,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import type { MediaFeedItem } from "@/data/athletes";

/* ─── Extended feed item (unified) ─── */
export type ExtendedFeedItem = MediaFeedItem & {
  _cardType?: string;
  _category?: string;
  _badge?: string;
  _participants?: number;
  _lastActive?: string;
  _athleteSlug?: string;
  _products?: Array<{ name: string; brand?: string; image?: string }>;
  /** Full product objects for shoppable feed items */
  _shoppableProducts?: import("@/data/athletes").Product[];
  /** Hotspot positions keyed by product ID {x: 0-100, y: 0-100} */
  _hotspots?: Record<string, { x: number; y: number }>;
  /** Collection name for shoppable items */
  _collectionName?: string;
};

const platformConfig: Record<string, { label: string; bgClass: string; textClass: string; icon?: string }> = {
  instagram: { label: "Instagram", bgClass: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400", textClass: "text-white" },
  twitter: { label: "X", bgClass: "bg-foreground", textClass: "text-background" },
  youtube: { label: "YouTube", bgClass: "bg-red-600", textClass: "text-white" },
  lequipe: { label: "L'Équipe", bgClass: "bg-blue-600", textClass: "text-white", icon: "L'É" },
  espn: { label: "ESPN", bgClass: "bg-gradient-to-br from-purple-600 to-pink-500", textClass: "text-white", icon: "ESPN" },
  bbc: { label: "BBC Sport", bgClass: "bg-orange-600", textClass: "text-white", icon: "BBC" },
  golfcom: { label: "GOLF.com", bgClass: "bg-emerald-600", textClass: "text-white", icon: "GOLF" },
  golfmagic: { label: "Golf Magic", bgClass: "bg-green-600", textClass: "text-white", icon: "GM" },
  bunkered: { label: "Bunkered", bgClass: "bg-slate-700", textClass: "text-white", icon: "B" },
  insidegolf: { label: "Inside Golf", bgClass: "bg-teal-600", textClass: "text-white", icon: "IG" },
  yahoosports: { label: "Yahoo Sports", bgClass: "bg-purple-600", textClass: "text-white", icon: "Y!" },
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

/* ─── Media Frame ─── */
const MediaFrame = ({ src, alt, ratio = "1:1" }: { src: string; alt: string; ratio?: "1:1" | "4:5" }) => (
  <div className={cn("relative w-full overflow-hidden bg-muted", ratio === "4:5" ? "aspect-[4/5]" : "aspect-square")}>
    <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
  </div>
);

/* ─── Standard Feed Card (social / video / article) ─── */
export const FeedCard = ({ item, avatarSrc, name }: { item: MediaFeedItem; avatarSrc: string; name: string }) => {
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

/* ─── Program Feed Card ─── */
export const ProgramFeedCard = ({ item, avatarSrc, name, athleteSlug }: { item: ExtendedFeedItem; avatarSrc: string; name: string; athleteSlug?: string }) => {
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
          {item._category && (
            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">{item._category}</Badge>
          )}
          <Badge variant="secondary" className="text-[10px]">Program</Badge>
        </div>
      </div>
      {item.image && <MediaFrame src={item.image} alt={item.title || "Program"} ratio="1:1" />}
      <div className="px-4 py-3 space-y-2">
        <h4 className="text-[15px] font-semibold text-foreground line-clamp-1">{item.title}</h4>
        <p className="text-[13px] text-muted-foreground line-clamp-2">{item.content}</p>
        {athleteSlug && (
          <Link to={`/athlete/${athleteSlug}/training/overview`}>
            <Button variant="outline" size="sm" className="h-9 text-[13px] rounded-full mt-1">
              View program <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
        )}
      </div>
      <ReactionBar postId={item.id} onCommentClick={() => setCommentOpen(true)} />
      <CommentsSheet postId={item.id} open={commentOpen} onOpenChange={setCommentOpen} />
    </article>
  );
};

/* ─── Cause Feed Card ─── */
export const CauseFeedCard = ({ item, avatarSrc, name }: { item: ExtendedFeedItem; avatarSrc: string; name: string }) => {
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
export const PrizeDrawFeedCard = ({ item, avatarSrc, name }: { item: ExtendedFeedItem; avatarSrc: string; name: string }) => {
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
        {item._badge && <span className="text-[11px] text-primary font-medium">{item._badge}</span>}
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
export const LiveDiscussionFeedCard = ({ item, avatarSrc, name }: { item: ExtendedFeedItem; avatarSrc: string; name: string }) => {
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
          {item._participants && <span><Users className="h-3 w-3 inline mr-1" />{item._participants} fans</span>}
          {item._lastActive && <span>Active {item._lastActive}</span>}
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

/* ─── Kit Room Feed Card ─── */
export const KitRoomFeedCard = ({ item, avatarSrc, name }: { item: ExtendedFeedItem; avatarSrc: string; name: string }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  // Build hotspot array from the map
  const hotspots = item._hotspots
    ? Object.entries(item._hotspots).map(([productId, pos]) => ({
        productId,
        x: pos.x,
        y: pos.y,
      }))
    : [];

  return (
    <article className="bg-card border border-border/40 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/30">
        <img src={avatarSrc} alt={name} className="w-8 h-8 rounded-full object-cover object-top ring-1 ring-border" />
        <div className="flex-1 min-w-0">
          <span className="text-[13px] font-semibold text-foreground truncate block">{name}</span>
          <span className="text-[11px] text-muted-foreground">Kit Room</span>
        </div>
        <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">
          <ShoppingBag className="h-3 w-3 mr-1" />Kit Room
        </Badge>
      </div>

      {/* Shoppable media with hotspots */}
      {item.image && item._shoppableProducts && item._shoppableProducts.length > 0 ? (
        <ShoppableMediaOverlay
          src={item.image}
          alt={item.title || "Kit Room"}
          products={item._shoppableProducts}
          hotspots={hotspots}
          collectionName={item._collectionName}
          ratio="1:1"
        />
      ) : item.image ? (
        <MediaFrame src={item.image} alt={item.title || "Kit Room"} ratio="1:1" />
      ) : null}

      <div className="px-4 py-3 space-y-2">
        <h4 className="text-[15px] font-semibold text-foreground line-clamp-1">{item.title}</h4>
        <p className="text-[13px] text-muted-foreground line-clamp-2">{item.content}</p>
        {item._products && item._products.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {item._products.slice(0, 3).map((p, i) => (
              <Badge key={i} variant="outline" className="text-[10px]">{p.name}</Badge>
            ))}
            {item._products.length > 3 && (
              <Badge variant="outline" className="text-[10px]">+{item._products.length - 3} more</Badge>
            )}
          </div>
        )}
      </div>
      <ReactionBar postId={item.id} onCommentClick={() => setCommentOpen(true)} />
      <CommentsSheet postId={item.id} open={commentOpen} onOpenChange={setCommentOpen} />
    </article>
  );
};

/* ─── Unified Feed Renderer ─── */
export const UnifiedFeedItem = ({ item, avatarSrc, name, athleteSlug }: { item: ExtendedFeedItem; avatarSrc: string; name: string; athleteSlug: string }) => {
  if (item._cardType === "program") return <ProgramFeedCard item={item} avatarSrc={avatarSrc} name={name} athleteSlug={athleteSlug} />;
  if (item._cardType === "cause") return <CauseFeedCard item={item} avatarSrc={avatarSrc} name={name} />;
  if (item._cardType === "prize_draw") return <PrizeDrawFeedCard item={item} avatarSrc={avatarSrc} name={name} />;
  if (item._cardType === "live_discussion") return <LiveDiscussionFeedCard item={item} avatarSrc={avatarSrc} name={name} />;
  if (item._cardType === "kit_room") return <KitRoomFeedCard item={item} avatarSrc={avatarSrc} name={name} />;
  return <FeedCard item={item} avatarSrc={avatarSrc} name={name} />;
};
