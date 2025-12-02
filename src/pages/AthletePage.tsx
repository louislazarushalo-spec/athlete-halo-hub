import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAthleteById, MediaFeedItem } from "@/data/athletes";
import { 
  UserPlus, 
  Users, 
  Heart, 
  Dumbbell, 
  Package, 
  Play, 
  Lock, 
  Trophy, 
  MessageCircle,
  Camera,
  ShoppingCart,
  Check
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Athlete } from "@/data/athletes";
import { ShoppableGearSection } from "@/components/fan/sections/ShoppableGearSection";

// Helper functions for formatting
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

// MediaFeedCard component
const MediaFeedCard = ({ item, athlete }: { item: MediaFeedItem; athlete: Athlete }) => {
  const config = platformConfig[item.platform];

  // Social Post (Instagram/Twitter)
  if (item.type === "social") {
    const isTwitter = item.platform === "twitter";
    return (
      <article className="glass-card overflow-hidden">
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <img src={athlete.avatar} alt={athlete.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{athlete.name}</span>
              <Badge variant="secondary" className="text-xs">{config.label}</Badge>
            </div>
            <span className="text-xs text-muted-foreground">
              {isTwitter ? `@${athlete.name.toLowerCase().replace(' ', '_')}` : item.timestamp}
            </span>
          </div>
        </div>
        {item.image && (
          <div className={`relative ${isTwitter ? "" : "aspect-square"}`}>
            {!isTwitter && <img src={item.image} alt="Post" className="w-full h-full object-cover" />}
          </div>
        )}
        <div className="p-4">
          {isTwitter ? (
            <>
              <p className="text-base mb-3">{item.content}</p>
              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="text-sm">💬 {formatNumber(item.stats?.comments || 0)}</span>
                <span className="text-sm">🔄 {formatNumber(item.stats?.shares || 0)}</span>
                <span className="text-sm">❤️ {formatNumber(item.stats?.likes || 0)}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-3">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{formatNumber(item.stats?.likes || 0)}</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{formatNumber(item.stats?.comments || 0)}</span>
                </button>
              </div>
              <p className="text-sm">
                <span className="font-semibold">{athlete.name.toLowerCase().replace(' ', '')}</span>{' '}
                {item.content}
              </p>
            </>
          )}
        </div>
      </article>
    );
  }

  // Video (YouTube/ESPN)
  if (item.type === "video") {
    return (
      <article className="glass-card overflow-hidden">
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <div className={`w-10 h-10 rounded-full ${config.bgClass} flex items-center justify-center font-bold ${config.textClass} text-sm`}>
            {config.icon || <Play className="h-5 w-5" fill="white" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{config.label}</span>
              <Badge variant="secondary" className="text-xs bg-red-600/20 text-red-400">Video</Badge>
            </div>
            <span className="text-xs text-muted-foreground">
              {item.platform === "youtube" ? "Official Highlights" : "Sports Coverage"}
            </span>
          </div>
        </div>
        <div className="relative aspect-video group cursor-pointer">
          <img src={item.image} alt="Video thumbnail" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Play className="h-7 w-7 text-white ml-1" fill="white" />
            </div>
          </div>
          {item.stats?.duration && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 rounded text-xs font-medium">
              {item.stats.duration}
            </div>
          )}
        </div>
        <div className="p-4">
          <h4 className="font-semibold mb-1">{item.title}</h4>
          <p className="text-sm text-muted-foreground">
            {formatNumber(item.stats?.views || 0)} views • {item.timestamp}
          </p>
        </div>
      </article>
    );
  }

  // Article (L'Équipe/ESPN/BBC)
  if (item.type === "article") {
    return (
      <article className="glass-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all">
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <div className={`w-10 h-10 rounded-full ${config.bgClass} flex items-center justify-center font-bold ${config.textClass} text-sm`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{config.label}</span>
              <Badge variant="secondary" className="text-xs">Article</Badge>
            </div>
            <span className="text-xs text-muted-foreground">Sports News</span>
          </div>
        </div>
        <div className="flex gap-4 p-4">
          <div className="flex-1">
            <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.content}
            </p>
            <span className="text-xs text-muted-foreground mt-2 block">{item.stats?.readTime}</span>
          </div>
          <img src={item.image} alt="Article" className="w-24 h-24 rounded-lg object-cover" />
        </div>
      </article>
    );
  }

  return null;
};

const AthletePage = () => {
  const { id } = useParams<{ id: string }>();
  const athlete = getAthleteById(id || "");
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeLifeTab, setActiveLifeTab] = useState<"feed" | "media" | "community">("feed");
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  if (!athlete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Athlete not found</h1>
          <Link to="/athletes">
            <Button variant="gold">Browse Athletes</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following!",
      description: isFollowing 
        ? `You unfollowed ${athlete.name}` 
        : `You're now following ${athlete.name}`,
    });
  };

  const handleAddToCart = (product: typeof athlete.products[0]) => {
    addToCart(product);
    setAddedProducts(prev => new Set([...prev, product.id]));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Sample media items for the Media section
  const mediaItems = [
    { id: 1, type: "photo", image: athlete.banner, caption: "Match day vibes" },
    { id: 2, type: "photo", image: athlete.life[0]?.image || athlete.banner, caption: "Behind the scenes" },
    { id: 3, type: "photo", image: athlete.training[0]?.image || athlete.banner, caption: "Training session" },
    { id: 4, type: "photo", image: athlete.gear[0]?.image || athlete.banner, caption: "Gear check" },
  ];

  return (
    <Layout>
      {/* Hero Banner - Full Width */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <img
          src={athlete.banner}
          alt={`${athlete.name} banner`}
          className="w-full h-full object-cover"
        />
        {/* Grey transparent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-muted/40" />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              {/* Large Avatar */}
              <div className="relative">
                <img
                  src={athlete.avatar}
                  alt={athlete.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-2xl object-cover border-4 border-background shadow-2xl"
                />
                <Badge className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground">
                  {athlete.sport}
                </Badge>
              </div>

              {/* Athlete Info */}
              <div className="flex-1 pb-2">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-foreground drop-shadow-lg">
                  {athlete.name}
                </h1>
                <p className="text-foreground/90 text-lg sm:text-xl mb-4 max-w-2xl drop-shadow-md">
                  {athlete.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Users className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {athlete.followers.toLocaleString()} followers
                    </span>
                  </div>
                  <Button
                    variant={isFollowing ? "secondary" : "gold"}
                    size="lg"
                    onClick={handleFollow}
                    className="shadow-lg"
                  >
                    {isFollowing ? <Check className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                    {isFollowing ? "Following" : "Follow Athlete"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-8 bg-background sticky-tabs">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="life" className="w-full">
            {/* Main Tab Navigation */}
            <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-4 mb-8 h-14 bg-muted/50">
              <TabsTrigger value="life" className="flex items-center gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Heart className="h-5 w-5" />
                <span>My Life</span>
              </TabsTrigger>
              <TabsTrigger value="gear" className="flex items-center gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Package className="h-5 w-5" />
                <span>My Gear</span>
              </TabsTrigger>
              <TabsTrigger value="training" className="flex items-center gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Dumbbell className="h-5 w-5" />
                <span>My Training</span>
              </TabsTrigger>
              <TabsTrigger value="cause" className="flex items-center gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Heart className="h-5 w-5" />
                <span>My Cause</span>
              </TabsTrigger>
            </TabsList>

            {/* MY LIFE TAB */}
            <TabsContent value="life" className="animate-fade-in">
              {/* Sub-tabs for Life section */}
              <div className="flex gap-2 mb-8 border-b border-border pb-4">
                <Button
                  variant={activeLifeTab === "feed" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveLifeTab("feed")}
                  className="rounded-full"
                >
                  Lifestyle Feed
                </Button>
                <Button
                  variant={activeLifeTab === "media" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveLifeTab("media")}
                  className="rounded-full"
                >
                  <Camera className="h-4 w-4 mr-1" />
                  Media
                </Button>
                <Button
                  variant={activeLifeTab === "community" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveLifeTab("community")}
                  className="rounded-full"
                >
                  <Lock className="h-4 w-4 mr-1" />
                  Community & Rewards
                </Button>
              </div>

              {/* Media Feed */}
              {activeLifeTab === "feed" && (
                <div className="max-w-3xl mx-auto space-y-6">
                  {athlete.mediaFeed.map((item) => (
                    <MediaFeedCard key={item.id} item={item} athlete={athlete} />
                  ))}
                </div>
              )}

              {/* Media Gallery */}
              {activeLifeTab === "media" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Photos & Moments</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mediaItems.map(item => (
                      <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                        <img
                          src={item.image}
                          alt={item.caption}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-sm text-foreground font-medium">{item.caption}</p>
                        </div>
                      </div>
                    ))}
                    {/* More media placeholders */}
                    {[...Array(4)].map((_, idx) => (
                      <div key={`placeholder-${idx}`} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                        <img
                          src={athlete.training[idx % athlete.training.length]?.image || athlete.banner}
                          alt="Gallery item"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-sm text-foreground font-medium">Behind the scenes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Community & Rewards (Premium Locked) */}
              {activeLifeTab === "community" && (
                <div className="relative">
                  {/* Blurred preview content */}
                  <div className="blur-sm pointer-events-none select-none">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Prize Contests */}
                      <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Trophy className="h-6 w-6 text-primary" />
                          <h3 className="text-xl font-semibold">Prize Contests</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-1">Win Signed Gear</h4>
                            <p className="text-sm text-muted-foreground">Enter for a chance to win authentic signed equipment.</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-1">Training Session Giveaway</h4>
                            <p className="text-sm text-muted-foreground">Exclusive 1-on-1 virtual training session.</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-1">Meet & Greet Opportunity</h4>
                            <p className="text-sm text-muted-foreground">VIP access to meet the athlete in person.</p>
                          </div>
                        </div>
                      </div>

                      {/* Fan Discussions */}
                      <div className="glass-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <MessageCircle className="h-6 w-6 text-primary" />
                          <h3 className="text-xl font-semibold">Fan Discussions</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-1">Match Analysis Thread</h4>
                            <p className="text-sm text-muted-foreground">Discuss recent performances with other fans.</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-1">Training Tips Q&A</h4>
                            <p className="text-sm text-muted-foreground">Community discussion on training methods.</p>
                          </div>
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-1">Fan Meetup Planning</h4>
                            <p className="text-sm text-muted-foreground">Organize meetups with fellow supporters.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lock Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-xl">
                    <div className="text-center p-8 max-w-md">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Lock className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Premium Exclusive</h3>
                      <p className="text-muted-foreground mb-6">
                        Unlock contests, discussions, and deeper access to {athlete.name}'s world.
                      </p>
                      <Button variant="gold" size="lg">
                        Upgrade to Premium
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="gear" className="animate-fade-in">
              <ShoppableGearSection
                athleteName={athlete.name}
                actionImage={athlete.gear[0]?.image || athlete.banner}
                products={athlete.products.map((p, idx) => {
                  // Hotspot coordinates for Arthur Cazaux's gear
                  const hotspots: Record<string, { x: number; y: number }> = {
                    'ac-p1': { x: 50, y: 12 },  // Hat
                    'ac-p2': { x: 50, y: 32 },  // Polo/Top
                    'ac-p3': { x: 50, y: 52 },  // Shorts
                    'ac-p4': { x: 28, y: 42 },  // Racquet
                    'ac-p5': { x: 50, y: 72 },  // Socks
                    'ac-p6': { x: 50, y: 85 }   // Shoes
                  };
                  return {
                    ...p,
                    hotspot: hotspots[p.id] || (Math.random() > 0.5 ? {
                      x: 20 + Math.random() * 60,
                      y: 20 + Math.random() * 60
                    } : undefined)
                  };
                })}
              />
            </TabsContent>

            {/* MY TRAINING TAB */}
            <TabsContent value="training" className="animate-fade-in">
              <div>
                <h3 className="text-xl font-semibold mb-4">Training Programs & Routines</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {athlete.training.map(post => (
                    <article key={post.id} className="glass-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                            <Play className="h-6 w-6 text-primary-foreground ml-1" />
                          </div>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-accent">Training Program</Badge>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {post.description}
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          View Program
                        </Button>
                      </div>
                    </article>
                  ))}
                  {/* Seed additional training content */}
                  {[
                    { title: "Explosive Speed & Agility Routine", desc: "Build game-changing acceleration and quick feet." },
                    { title: "Strength & Mobility Session", desc: "Balance power with flexibility for peak performance." },
                    { title: "Recovery & Regeneration Protocol", desc: "Essential recovery techniques for optimal readiness." },
                    { title: "Mental Performance Workshop", desc: "Develop focus and resilience under pressure." }
                  ].slice(0, Math.max(0, 6 - athlete.training.length)).map((item, idx) => (
                    <article key={`seed-training-${idx}`} className="glass-card overflow-hidden group cursor-pointer hover:border-primary/30 transition-all">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={`https://images.unsplash.com/photo-${['1571019614242-c5c5dee9f50b', '1534438327276-14e5300c3a48', '1544367567-0f2fcb009e0b', '1517836357463-d25dfeac3438'][idx]}?w=800&h=500&fit=crop`}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                            <Play className="h-6 w-6 text-primary-foreground ml-1" />
                          </div>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-accent">Training Program</Badge>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {item.desc}
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          View Program
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* MY CAUSE TAB */}
            <TabsContent value="cause" className="animate-fade-in">
              <div className="max-w-4xl mx-auto">
                <div className="glass-card overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto">
                      <img
                        src={athlete.cause.image}
                        alt={athlete.cause.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden md:block" />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <span className="text-xs text-primary font-medium uppercase tracking-wide mb-2 block">
                        Support Their Cause
                      </span>
                      <h3 className="font-display text-2xl font-semibold mb-4">
                        {athlete.cause.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {athlete.cause.story}
                      </p>

                      {/* Progress */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            {athlete.cause.currency}{athlete.cause.raised.toLocaleString()} / {athlete.cause.currency}{athlete.cause.target.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (athlete.cause.raised / athlete.cause.target) * 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {((athlete.cause.raised / athlete.cause.target) * 100).toFixed(0)}% of goal reached
                        </p>
                      </div>

                      <Link to={`/athlete/${athlete.id}/cause`}>
                        <Button variant="gold" size="lg" className="w-full">
                          <Heart className="h-4 w-4" />
                          Support this Cause
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default AthletePage;