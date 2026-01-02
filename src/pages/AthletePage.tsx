import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AthleteHeader } from "@/components/layout/AthleteHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAthleteById, MediaFeedItem, AthleteEvent } from "@/data/athletes";
import { getEventsBySport } from "@/data/sportEvents";
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
  ShoppingCart,
  Check,
  Instagram,
  Calendar,
  MapPin,
  Music,
  Newspaper,
  Camera,
  ShoppingBag,
  Star,
  BarChart3,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Athlete } from "@/data/athletes";
import { ShoppableGearSection } from "@/components/fan/sections/ShoppableGearSection";
import { RegistrationGate } from "@/components/auth/RegistrationGate";
import { ArthurTrainingSection } from "@/components/athletes/ArthurTrainingSection";
import { ArthurDataHub } from "@/components/athletes/DataHub/ArthurDataHub";
import { CassandreDataHub } from "@/components/athletes/DataHub/CassandreDataHub";
import { MatthieuTrainingSection } from "@/components/athletes/MatthieuTrainingSection";
import { CassandreTrainingSection } from "@/components/athletes/CassandreTrainingSection";
import { PierreTrainingSection } from "@/components/athletes/PierreTrainingSection";
import { TommyTrainingSection } from "@/components/athletes/TommyTrainingSection";
import { PremiumLockedContent } from "@/components/athletes/PremiumLockedContent";
import { ArthurExclusiveZone } from "@/components/athletes/ArthurExclusiveZone";
import { MatthieuExclusiveZone } from "@/components/athletes/MatthieuExclusiveZone";
import { CassandreExclusiveZone } from "@/components/athletes/CassandreExclusiveZone";
import { PierreExclusiveZone } from "@/components/athletes/PierreExclusiveZone";
import { TommyExclusiveZone } from "@/components/athletes/TommyExclusiveZone";
import { CassandreHighlights } from "@/components/athletes/CassandreHighlights";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Sponsor logos for Arthur Cazaux
import sponsorLacoste from "@/assets/sponsor-lacoste.png";
import sponsorBabolat from "@/assets/sponsor-babolat.png";
import sponsorExtia from "@/assets/sponsor-extia.png";

// Sponsor logos for Matthieu Jalibert
import sponsorAdidas from "@/assets/sponsor-adidas.png";
import sponsorUBB from "@/assets/sponsor-ubb.png";

// Sponsor logos for Cassandre Beaugrand
import sponsorOakley from "@/assets/sponsor-oakley.png";
import sponsorSpecialized from "@/assets/sponsor-specialized.png";
import sponsorWeleda from "@/assets/sponsor-weleda.png";
import sponsorNutripure from "@/assets/sponsor-nutripure.png";
import sponsorHuawei from "@/assets/sponsor-huawei.png";

// Sponsor logos for Tommy Fleetwood
import sponsorNike from "@/assets/sponsor-nike.png";
import sponsorTaylormade from "@/assets/sponsor-taylormade.png";
import sponsorTagheuer from "@/assets/sponsor-tagheuer.png";

// Sponsor logos for Pierre Gasly
import sponsorGivenchy from "@/assets/sponsor-givenchy.jpeg";
import sponsorAix from "@/assets/sponsor-aix.jpeg";
import sponsorHawkers from "@/assets/sponsor-hawkers.jpeg";
import sponsorIntegraconnect from "@/assets/sponsor-integraconnect.jpeg";
import sponsorMoser from "@/assets/sponsor-moser.jpeg";
import sponsorReebok from "@/assets/sponsor-reebok.jpeg";
import sponsorSonic from "@/assets/sponsor-sonic.jpeg";

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
  golfcom: { label: "GOLF.com", bgClass: "bg-emerald-600", textClass: "text-white", icon: "GOLF" },
  golfmagic: { label: "Golf Magic", bgClass: "bg-green-600", textClass: "text-white", icon: "GM" },
  bunkered: { label: "Bunkered", bgClass: "bg-slate-700", textClass: "text-white", icon: "B" },
  insidegolf: { label: "Inside Golf", bgClass: "bg-teal-600", textClass: "text-white", icon: "IG" },
  yahoosports: { label: "Yahoo Sports", bgClass: "bg-purple-600", textClass: "text-white", icon: "Y!" },
};

// MediaFeedCard component
const MediaFeedCard = ({ item, athlete }: { item: MediaFeedItem; athlete: Athlete }) => {
  const config = platformConfig[item.platform];

  // Social Post (Instagram/Twitter)
  if (item.type === "social") {
    const isTwitter = item.platform === "twitter";
    const isInstagram = item.platform === "instagram";
    
    const socialContent = (
      <article className="glass-card overflow-hidden group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in">
        <div className="p-3 md:p-4 flex items-center gap-2 md:gap-3 border-b border-border/50">
          <img src={athlete.avatar} alt={athlete.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-primary/20" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              <span className="font-semibold text-sm md:text-base text-foreground truncate">{athlete.name}</span>
              <Badge variant="secondary" className={`text-[10px] md:text-xs ${isInstagram ? 'bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300' : ''}`}>
                {config.label}
              </Badge>
            </div>
            <span className="text-[10px] md:text-xs text-muted-foreground">
              {isTwitter ? `@${athlete.name.toLowerCase().replace(' ', '_')}` : item.timestamp}
            </span>
          </div>
        </div>
        {item.image && (
          <div className={`relative ${isTwitter ? "" : "aspect-square"} overflow-hidden`}>
            {!isTwitter && (
              <img 
                src={item.image} 
                alt="Post" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            )}
          </div>
        )}
        <div className="p-3 md:p-4 space-y-2 md:space-y-3">
          {isTwitter ? (
            <>
              <p className="text-sm md:text-base leading-relaxed">{item.content}</p>
              <div className="flex items-center gap-4 md:gap-6 text-muted-foreground text-xs md:text-sm pt-2">
                <button className="flex items-center gap-1 md:gap-1.5 hover:text-blue-400 transition-colors">
                  <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>{formatNumber(item.stats?.comments || 0)}</span>
                </button>
                <button className="flex items-center gap-1 md:gap-1.5 hover:text-green-400 transition-colors">
                  <span>🔄</span>
                  <span>{formatNumber(item.stats?.shares || 0)}</span>
                </button>
                <button className="flex items-center gap-1 md:gap-1.5 hover:text-red-400 transition-colors">
                  <Heart className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>{formatNumber(item.stats?.likes || 0)}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <button className="flex items-center gap-1 md:gap-1.5 text-muted-foreground hover:text-red-400 transition-all duration-200 hover:scale-110">
                    <Heart className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-xs md:text-sm font-medium">{formatNumber(item.stats?.likes || 0)}</span>
                  </button>
                  <button className="flex items-center gap-1 md:gap-1.5 text-muted-foreground hover:text-blue-400 transition-all duration-200 hover:scale-110">
                    <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-xs md:text-sm font-medium">{formatNumber(item.stats?.comments || 0)}</span>
                  </button>
                </div>
                {item.url && isInstagram && (
                  <span className="text-xs md:text-sm text-primary font-medium">View on Instagram →</span>
                )}
              </div>
              <p className="text-xs md:text-sm leading-relaxed">
                <span className="font-semibold text-foreground">{athlete.name.toLowerCase().replace(' ', '')}</span>{' '}
                <span className="text-foreground/90">{item.content}</span>
              </p>
            </>
          )}
        </div>
      </article>
    );

    if (item.url) {
      return (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
          {socialContent}
        </a>
      );
    }
    return socialContent;
  }

  // Video (YouTube/ESPN)
  if (item.type === "video") {
    return (
      <article className="glass-card overflow-hidden group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in">
        <div className="p-3 md:p-4 flex items-center gap-2 md:gap-3 border-b border-border/50">
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${config.bgClass} flex items-center justify-center font-bold ${config.textClass} text-xs md:text-sm shadow-lg`}>
            {config.icon || <Play className="h-4 w-4 md:h-5 md:w-5" fill="white" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="font-semibold text-sm md:text-base text-foreground">{config.label}</span>
              <Badge variant="secondary" className="text-[10px] md:text-xs bg-red-600/20 text-red-400 border-red-500/20">Video</Badge>
            </div>
            <span className="text-[10px] md:text-xs text-muted-foreground">
              {item.platform === "youtube" ? "Official Highlights" : "Sports Coverage"}
            </span>
          </div>
        </div>
        <div className="relative aspect-video cursor-pointer overflow-hidden">
          <img src={item.image} alt="Video thumbnail" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent flex items-center justify-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 transition-all duration-300 shadow-2xl">
              <Play className="h-5 w-5 md:h-7 md:w-7 text-white ml-0.5 md:ml-1" fill="white" />
            </div>
          </div>
          {item.stats?.duration && (
            <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 px-2 py-0.5 md:py-1 bg-background/90 backdrop-blur-sm rounded text-[10px] md:text-xs font-semibold">
              {item.stats.duration}
            </div>
          )}
        </div>
        <div className="p-3 md:p-4 space-y-1 md:space-y-2">
          <h4 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">{item.title}</h4>
          <p className="text-xs md:text-sm text-muted-foreground">
            {formatNumber(item.stats?.views || 0)} views • {item.timestamp}
          </p>
        </div>
      </article>
    );
  }

  // Article (L'Équipe/ESPN/BBC/Golf sites)
  if (item.type === "article") {
    const articleContent = (
      <article className="glass-card overflow-hidden group cursor-pointer hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in">
        <div className="p-3 md:p-4 flex items-center gap-2 md:gap-3 border-b border-border/50">
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${config.bgClass} flex items-center justify-center font-bold ${config.textClass} text-xs md:text-sm shadow-lg`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="font-semibold text-sm md:text-base text-foreground">{config.label}</span>
              <Badge variant="secondary" className="text-[10px] md:text-xs border-primary/20">Article</Badge>
            </div>
            <span className="text-[10px] md:text-xs text-muted-foreground">Sports News • {item.timestamp}</span>
          </div>
        </div>
        <div className="flex gap-3 md:gap-4 p-3 md:p-4">
          <div className="flex-1 space-y-1 md:space-y-2">
            <h4 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
              {item.title}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {item.content}
            </p>
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground pt-1">
              <span>{item.stats?.readTime}</span>
              <span>•</span>
              <span className="text-primary font-medium">Read article →</span>
            </div>
          </div>
          <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-lg overflow-hidden">
            <img 
              src={item.image} 
              alt="Article" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
        </div>
      </article>
    );

    if (item.url) {
      return (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
          {articleContent}
        </a>
      );
    }
    return articleContent;
  }

  return null;
};

const AthletePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const athlete = getAthleteById(id || "");
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<string>("life");
  const [activeLifeTab, setActiveLifeTab] = useState<"events" | "news" | "music" | "community" | "datahub">("events");
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { isSubscribed, unsubscribe } = useSubscription();
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  
  const isPremiumSubscribed = athlete ? isSubscribed(athlete.id) : false;

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

  const handleGoBackFromPremium = () => {
    setActiveMainTab("life");
  };

  const isArthurCazaux = athlete.id === "arthur-cazaux";
  const isMatthieuJalibert = athlete.id === "matthieu-jalibert";
  const isCassandreBeaugrand = athlete.id === "cassandre-beaugrand";
  const isPierreGasly = athlete.id === "pierre-gasly";
  const isTommyFleetwood = athlete.id === "tommy-fleetwood";
  const isCustomAthlete = isArthurCazaux || isMatthieuJalibert || isCassandreBeaugrand || isPierreGasly || isTommyFleetwood;

  const content = (
    <>
      {/* Registration Gate Overlay for unauthenticated users */}
      {!isAuthenticated && <RegistrationGate athleteName={athlete.name} />}
      
      {/* Main content - blurred when not authenticated */}
      <div className={!isAuthenticated ? "blur-lg pointer-events-none select-none" : ""}>
        {/* Hero Banner - Full Width */}
        <section className={`relative ${isCustomAthlete ? "h-[62vh] min-h-[420px]" : "h-[40vh] min-h-[300px]"} sm:h-[45vh] md:h-[50vh] sm:min-h-[350px] md:min-h-[400px] max-h-[700px] overflow-hidden`}>
          <img
            src={athlete.banner}
            alt={`${athlete.name} banner`}
            className="w-full h-full object-cover"
          />
          {/* Grey transparent gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-muted/40" />
          
          {/* Back Button - right on mobile to avoid avatar overlap */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 sm:right-auto sm:left-4 bg-background/60 backdrop-blur-sm hover:bg-background/80 z-50 h-10 w-10 touch-manipulation"
            onClick={() => {
              if (window.history.length > 1) navigate(-1);
              else navigate("/home");
            }}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-2 sm:pb-6 md:pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
              {/* Large Avatar - pushed below header on mobile */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-background shadow-2xl ring-2 ring-primary/20">
                  <img
                    src={athlete.avatar}
                    alt={athlete.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <Badge className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-primary text-primary-foreground text-[10px] sm:text-xs shadow-lg">
                  {athlete.sport}
                </Badge>
              </div>

              {/* Athlete Info */}
              <div className="flex-1 pb-0 sm:pb-2">
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 text-foreground drop-shadow-lg">
                  {athlete.name}
                </h1>
                <p className="text-foreground/90 text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 max-w-2xl drop-shadow-md line-clamp-2 sm:line-clamp-none">
                  {athlete.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-foreground/80">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">
                      {athlete.followers.toLocaleString()} fans
                    </span>
                  </div>
                  <Button
                    variant={isFollowing ? "secondary" : "outline"}
                    size="sm"
                    onClick={handleFollow}
                    className="shadow-lg border-foreground/20 hover:bg-foreground/10 text-xs sm:text-sm h-8 sm:h-9"
                  >
                    {isFollowing ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                    <span className="hidden xs:inline">{isFollowing ? "Following" : "Follow for Free"}</span>
                    <span className="xs:hidden">{isFollowing ? "Following" : "Follow"}</span>
                  </Button>
                  {!isPremiumSubscribed && (isArthurCazaux || isCassandreBeaugrand) && (
                    <Link to={`/subscribe/${athlete.id}`}>
                      <Button
                        size="sm"
                        className="group relative premium-button bg-gradient-to-r from-primary via-primary to-blue-400 hover:from-primary/90 hover:via-primary/90 hover:to-blue-400/90 text-primary-foreground shadow-lg hover:shadow-glow-blue hover:-translate-y-0.5 transition-all duration-300 animate-glow-pulse h-8 sm:h-9 text-xs sm:text-sm"
                      >
                        <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-lock-glow group-hover:hidden" />
                        <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 hidden group-hover:block" />
                        <span className="group-hover:hidden">Subscribe</span>
                        <span className="hidden group-hover:inline">Unlock Premium</span>
                      </Button>
                    </Link>
                  )}
                  {!isPremiumSubscribed && !isArthurCazaux && !isCassandreBeaugrand && (
                    <Link to={`/subscribe/${athlete.id}`}>
                      <Button
                        variant="gold"
                        size="sm"
                        className="shadow-lg h-8 sm:h-9 text-xs sm:text-sm"
                      >
                        <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Subscribe
                      </Button>
                    </Link>
                  )}
                  {isPremiumSubscribed && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge 
                          className="bg-primary/20 text-primary border-primary/30 px-2 sm:px-3 py-0.5 sm:py-1 cursor-pointer hover:bg-destructive/20 hover:text-destructive hover:border-destructive/30 transition-colors text-[10px] sm:text-xs"
                          onClick={() => {
                            unsubscribe(athlete.id);
                            toast({
                              title: "Premium removed",
                              description: `You've reverted to free follower mode for ${athlete.name}.`,
                            });
                          }}
                        >
                          <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                          Premium Member
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to remove premium access</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                {/* Social Media Links */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Instagram - shown for all */}
                  <a 
                    href={isCassandreBeaugrand ? "https://instagram.com/cassandrebeaugrand" : `https://instagram.com/arthurcazauxoff`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white hover:scale-110 transition-transform duration-200 shadow-md"
                  >
                    <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                  {/* Facebook - shown for all */}
                  <a 
                    href={isCassandreBeaugrand ? "https://facebook.com/cassandrebeaugrand" : `https://facebook.com/${athlete.name.toLowerCase().replace(' ', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#1877F2] text-white hover:scale-110 transition-transform duration-200 shadow-md"
                  >
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  {/* X (Twitter) - shown for all */}
                  <a 
                    href={isCassandreBeaugrand ? "https://twitter.com/CassBeaugrand" : `https://twitter.com/${athlete.name.toLowerCase().replace(' ', '_')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-foreground text-background hover:scale-110 transition-transform duration-200 shadow-md"
                  >
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  {/* TikTok - only shown for non-Cassandre and non-Tommy athletes */}
                  {!isCassandreBeaugrand && !isTommyFleetwood && (
                    <a 
                      href={`https://tiktok.com/@${athlete.name.toLowerCase().replace(' ', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-foreground text-background hover:scale-110 transition-transform duration-200 shadow-md"
                    >
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    </a>
                  )}
                </div>
                {/* Sponsor Logos - Only for custom athletes */}
                {isCustomAthlete && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 mt-3 sm:mt-4">
                    <span className="text-[10px] sm:text-xs text-foreground/60 uppercase tracking-wider shrink-0">Partners</span>
                    <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
                      {isArthurCazaux && (
                        <>
                          <img src={sponsorLacoste} alt="Lacoste" className="h-3.5 sm:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorBabolat} alt="Babolat" className="h-3.5 sm:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorExtia} alt="Extia Conseil" className="h-3.5 sm:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </>
                      )}
                      {isMatthieuJalibert && (
                        <>
                          <img src={sponsorAdidas} alt="Adidas" className="h-3.5 sm:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorUBB} alt="UBB" className="h-3.5 sm:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </>
                      )}
                      {isCassandreBeaugrand && (
                        <>
                          <img src={sponsorAdidas} alt="Adidas" className="h-3 sm:h-5 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorOakley} alt="Oakley" className="h-3 sm:h-5 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorSpecialized} alt="Specialized" className="h-3 sm:h-5 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorWeleda} alt="Weleda" className="h-3 sm:h-5 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorNutripure} alt="Nutripure" className="h-3 sm:h-5 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorHuawei} alt="Huawei" className="h-3 sm:h-5 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </>
                      )}
                      {isTommyFleetwood && (
                        <>
                          <img src={sponsorNike} alt="Nike" className="h-4 sm:h-7 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorTaylormade} alt="TaylorMade" className="h-3 sm:h-5 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorTagheuer} alt="TAG Heuer" className="h-4 sm:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </>
                      )}
                      {isPierreGasly && (
                        <>
                          <img src={sponsorReebok} alt="Reebok" className="h-4 sm:h-7 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorGivenchy} alt="Givenchy" className="h-4 sm:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorMoser} alt="H. Moser & Cie" className="h-3 sm:h-5 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorHawkers} alt="Hawkers" className="h-3 sm:h-5 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorAix} alt="AIX Investissement" className="h-4 sm:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorIntegraconnect} alt="IntegraConnect" className="h-4 sm:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                          <img src={sponsorSonic} alt="Sonic" className="h-4 sm:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-4 sm:py-6 md:py-8 bg-background sticky-tabs">
        <div className="container mx-auto px-4">
          <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
            {/* Main Tab Navigation - Horizontal scroll on mobile */}
            <div className="overflow-x-auto -mx-4 px-4 pb-2 mb-4 sm:mb-6 md:mb-8">
              <TabsList className="w-max min-w-full sm:w-full max-w-5xl mx-auto flex sm:grid sm:grid-cols-5 gap-1 h-11 sm:h-12 md:h-14 bg-muted/50">
                <TabsTrigger value="life" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Inside My World</span>
                  <span className="sm:hidden">World</span>
                </TabsTrigger>
                <TabsTrigger value="gear" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">My Kit Room</span>
                  <span className="sm:hidden">Kit</span>
                </TabsTrigger>
                {isArthurCazaux ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger 
                        value="training" 
                        className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${!isPremiumSubscribed ? 'locked-tab' : ''}`}
                      >
                        {isPremiumSubscribed ? (
                          <Dumbbell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        ) : (
                          <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-lock-glow text-primary" />
                        )}
                        <span className="hidden sm:inline">Performance Lab</span>
                        <span className="sm:hidden">Lab</span>
                      </TabsTrigger>
                    </TooltipTrigger>
                    {!isPremiumSubscribed && (
                      <TooltipContent side="bottom" className="bg-card border-primary/30">
                        <p className="text-sm font-medium">Premium Access Required</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                ) : (
                  <TabsTrigger value="training" className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${!isPremiumSubscribed ? 'locked-tab' : ''}`}>
                    {isPremiumSubscribed ? (
                      <Dumbbell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-lock-glow text-primary" />
                    )}
                    <span className="hidden sm:inline">Performance Lab</span>
                    <span className="sm:hidden">Lab</span>
                  </TabsTrigger>
                )}
                {isArthurCazaux ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger 
                        value="exclusive" 
                        className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${!isPremiumSubscribed ? 'locked-tab' : ''}`}
                      >
                        {isPremiumSubscribed ? (
                          <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        ) : (
                          <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-lock-glow text-primary" />
                        )}
                        <span className="hidden sm:inline">Exclusive Zone</span>
                        <span className="sm:hidden">Exclusive</span>
                      </TabsTrigger>
                    </TooltipTrigger>
                    {!isPremiumSubscribed && (
                      <TooltipContent side="bottom" className="bg-card border-primary/30">
                        <p className="text-sm font-medium">Premium Access Required</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                ) : (
                  <TabsTrigger value="exclusive" className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${!isPremiumSubscribed ? 'locked-tab' : ''}`}>
                    {isPremiumSubscribed ? (
                      <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-lock-glow text-primary" />
                    )}
                    <span className="hidden sm:inline">Exclusive Zone</span>
                    <span className="sm:hidden">Exclusive</span>
                  </TabsTrigger>
                )}
                <TabsTrigger value="cause" className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">My Causes</span>
                  <span className="sm:hidden">Causes</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* MY LIFE TAB */}
            <TabsContent value="life" className="animate-fade-in">
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h2 className="text-2xl font-bold mb-2">Inside My World</h2>
                <p className="text-muted-foreground text-sm">
                  Follow my journey — from upcoming competitions to behind-the-scenes moments and the soundtrack to my life.
                </p>
              </div>
              
              {/* Sub-tabs for Life section */}
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 md:mb-8 border-b border-border pb-3 sm:pb-4 overflow-x-auto -mx-4 px-4">
                <Button
                  variant={activeLifeTab === "events" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveLifeTab("events")}
                  className="rounded-full shrink-0 h-8 sm:h-9 text-xs sm:text-sm"
                >
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                  Events
                </Button>
                <Button
                  variant={activeLifeTab === "news" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveLifeTab("news")}
                  className="rounded-full shrink-0 h-8 sm:h-9 text-xs sm:text-sm"
                >
                  <Newspaper className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                  Highlights
                </Button>
                <Button
                  variant={activeLifeTab === "music" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveLifeTab("music")}
                  className="rounded-full shrink-0 h-8 sm:h-9 text-xs sm:text-sm"
                >
                  {isPremiumSubscribed ? (
                    <Music className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                  ) : (
                    <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                  )}
                  Playlist
                </Button>
                {(isArthurCazaux || isCassandreBeaugrand) && (
                  <Button
                    variant={activeLifeTab === "datahub" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveLifeTab("datahub")}
                    className="rounded-full shrink-0 h-8 sm:h-9 text-xs sm:text-sm"
                  >
                    <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                    Data Hub
                  </Button>
                )}
              </div>

              {/* My Events - Upcoming Tournaments */}
              {activeLifeTab === "events" && (
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">Upcoming Events</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {(athlete.events || getEventsBySport(athlete.sport, athlete.gender)).map((event, index) => {
                      const isMajor = event.category.includes("Grand Slam") || event.category.includes("Major") || event.category.includes("Finals") || event.category.includes("World") || event.category.includes("Ryder") || event.category.includes("Solheim");
                      return (
                        <article 
                          key={event.id} 
                          className="glass-card overflow-hidden group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex flex-col sm:flex-row">
                            <div className={`sm:w-28 md:w-32 ${isMajor ? 'bg-gradient-to-br from-primary to-primary/70' : 'bg-gradient-to-br from-blue-600 to-blue-800'} text-white p-3 sm:p-4 md:p-6 flex flex-row sm:flex-col items-center justify-center sm:justify-center text-center gap-2 sm:gap-0`}>
                              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">{event.month}</span>
                              <span className="text-2xl sm:text-3xl md:text-4xl font-bold sm:my-1">{event.date}</span>
                              <span className="text-[10px] sm:text-xs opacity-90">{event.year}</span>
                            </div>
                            <div className="flex-1 p-4 sm:p-5 md:p-6">
                              <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                                <span className="text-lg sm:text-2xl">{event.countryFlag}</span>
                                <h4 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                  {event.name}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                                <Badge className={`${event.categoryColor} text-white border-0 text-[10px] sm:text-xs font-bold shadow-md`}>
                                  {isMajor && '🏆 '}{event.category}
                                </Badge>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span className="text-xs sm:text-sm">{event.location}</span>
                                </div>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                                {event.description}
                              </p>
                              <div className="flex gap-2 sm:gap-3 flex-wrap">
                                <Button variant="outline" size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
                                  Get Tickets
                                </Button>
                                {athlete.sport.toLowerCase() === "triathlon" ? (
                                  <>
                                    <a href="https://www.triathlonlive.tv/" target="_blank" rel="noopener noreferrer">
                                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
                                        Where to watch
                                      </Button>
                                    </a>
                                    <a href="https://triathlon.org/events/wtcs" target="_blank" rel="noopener noreferrer">
                                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
                                        Register to race
                                      </Button>
                                    </a>
                                  </>
                                ) : (
                                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
                                    Where to watch
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* My News Feed / Highlights */}
              {activeLifeTab === "news" && (
                isCassandreBeaugrand ? (
                  <CassandreHighlights />
                ) : (
                  <div className="max-w-3xl mx-auto space-y-5">
                    {athlete.mediaFeed.map((item, index) => (
                      <div 
                        key={item.id} 
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <MediaFeedCard item={item} athlete={athlete} />
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* My Music/Podcasts - Premium Locked */}
              {activeLifeTab === "music" && (
                isPremiumSubscribed ? (
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-6 text-foreground">My Music & Playlists</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Spotify Playlist */}
                      <article className="glass-card p-6 group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shrink-0 shadow-lg">
                            <Music className="h-10 w-10 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Pre-Match Pump Up</h4>
                            <p className="text-sm text-muted-foreground mb-3">My go-to playlist before stepping on court</p>
                            <Button size="sm" variant="outline" className="w-full">
                              <Play className="h-4 w-4 mr-2" />
                              Listen on Spotify
                            </Button>
                          </div>
                        </div>
                      </article>

                      {/* Training Mix */}
                      <article className="glass-card p-6 group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shrink-0 shadow-lg">
                            <Dumbbell className="h-10 w-10 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Training Motivation</h4>
                            <p className="text-sm text-muted-foreground mb-3">High-energy tracks for intense workouts</p>
                            <Button size="sm" variant="outline" className="w-full">
                              <Play className="h-4 w-4 mr-2" />
                              Listen on Spotify
                            </Button>
                          </div>
                        </div>
                      </article>

                      {/* Podcast Appearance */}
                      <article className="glass-card p-6 group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 md:col-span-2">
                        <div className="flex items-start gap-4">
                          <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0 shadow-lg">
                            <MessageCircle className="h-12 w-12 text-white" />
                          </div>
                          <div className="flex-1">
                            <Badge variant="secondary" className="mb-2">Latest Episode</Badge>
                            <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                              Behind the Baseline Podcast
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Arthur discusses his journey from Montpellier to the ATP Tour, his training routines, and what drives him to compete at the highest level.
                            </p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Play className="h-4 w-4 mr-2" />
                                Listen Now
                              </Button>
                              <span className="text-sm text-muted-foreground flex items-center">
                                42 min • Dec 2024
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                ) : (
                  <PremiumLockedContent athleteId={athlete.id} athleteName={athlete.name}>
                    <div className="max-w-4xl mx-auto">
                      <h3 className="text-2xl font-bold mb-6 text-foreground">My Music & Playlists</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <article className="glass-card p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shrink-0">
                              <Music className="h-10 w-10 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg mb-1">Pre-Match Pump Up</h4>
                              <p className="text-sm text-muted-foreground mb-3">My go-to playlist before stepping on court</p>
                            </div>
                          </div>
                        </article>
                        <article className="glass-card p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shrink-0">
                              <Dumbbell className="h-10 w-10 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg mb-1">Training Motivation</h4>
                              <p className="text-sm text-muted-foreground mb-3">High-energy tracks for intense workouts</p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </PremiumLockedContent>
                )
              )}

              {/* Data Hub - Arthur Cazaux & Cassandre Beaugrand */}
              {activeLifeTab === "datahub" && isArthurCazaux && (
                <ArthurDataHub />
              )}
              {activeLifeTab === "datahub" && isCassandreBeaugrand && (
                <CassandreDataHub />
              )}

            </TabsContent>

            <TabsContent value="gear" className="animate-fade-in">
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h2 className="text-2xl font-bold mb-2">My Kit Room</h2>
                <p className="text-muted-foreground text-sm">
                  This is the gear I trust to compete at the highest level. Shop my exact setup.
                </p>
              </div>
              
              {athlete.gearCollections && athlete.gearCollections.length > 0 ? (
                <div className="space-y-16">
                  {/* Gear Collections Feed */}
                  {athlete.gearCollections.map((collection, index) => (
                    <div key={collection.id} className="space-y-6">
                      {index > 0 && <div className="border-t border-border/50" />}
                      <ShoppableGearSection
                        athleteName={athlete.name}
                        actionImage={collection.actionImage}
                        title={collection.name}
                        description={collection.description}
                        products={collection.products.map(p => ({
                          ...p,
                          hotspot: collection.hotspots?.[p.id]
                        }))}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <ShoppableGearSection
                  athleteName={athlete.name}
                  actionImage={athlete.gear[0]?.image || athlete.banner}
                  products={athlete.products.map((p, idx) => {
                    return {
                      ...p,
                      hotspot: Math.random() > 0.5 ? {
                        x: 20 + Math.random() * 60,
                        y: 20 + Math.random() * 60
                      } : undefined
                    };
                  })}
                />
              )}
            </TabsContent>

            {/* MY TRAINING TAB - Premium Locked */}
            <TabsContent value="training" className="animate-fade-in">
              {isPremiumSubscribed ? (
                isCustomAthlete ? (
                  isArthurCazaux ? <ArthurTrainingSection /> : isMatthieuJalibert ? <MatthieuTrainingSection /> : isCassandreBeaugrand ? <CassandreTrainingSection /> : isPierreGasly ? <PierreTrainingSection /> : isTommyFleetwood ? <TommyTrainingSection /> : <PierreTrainingSection />
                ) : (
                  <div className="space-y-6">
                    {/* Header with Premium Badge */}
                    <div className="text-center max-w-2xl mx-auto mb-6">
                      <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Premium Members Only</Badge>
                      <h2 className="text-2xl font-bold mb-2">Performance Lab</h2>
                      <p className="text-muted-foreground text-sm">
                        Train like me. My complete fitness, skills, nutrition, and mental routines — all in one place.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {athlete.training.map(post => (
                        <article 
                          key={post.id} 
                          className="relative rounded-xl overflow-hidden group cursor-pointer h-64"
                        >
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url(${post.image})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                          <div className="absolute inset-0 p-5 flex flex-col justify-end">
                            <h4 className="font-semibold text-lg text-white mb-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-white/80 text-sm mb-4 line-clamp-2">
                              {post.description}
                            </p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-fit bg-white/10 border-white/20 text-white hover:bg-white/20"
                            >
                              View Program
                            </Button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <PremiumLockedContent athleteId={athlete.id} athleteName={athlete.name} onGoBack={handleGoBackFromPremium}>
                  {isCustomAthlete ? (
                    isArthurCazaux ? <ArthurTrainingSection /> : isMatthieuJalibert ? <MatthieuTrainingSection /> : isCassandreBeaugrand ? <CassandreTrainingSection /> : isPierreGasly ? <PierreTrainingSection /> : isTommyFleetwood ? <TommyTrainingSection /> : <PierreTrainingSection />
                  ) : (
                    <div className="space-y-6">
                      {/* Header with Premium Badge */}
                      <div className="text-center max-w-2xl mx-auto mb-6">
                        <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Premium Members Only</Badge>
                        <h2 className="text-2xl font-bold mb-2">Performance Lab</h2>
                        <p className="text-muted-foreground text-sm">
                          Train like me. My complete fitness, skills, nutrition, and mental routines — all in one place.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {athlete.training.slice(0, 4).map(post => (
                          <article 
                            key={post.id} 
                            className="relative rounded-xl overflow-hidden h-64"
                          >
                            <div 
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${post.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                            <div className="absolute inset-0 p-5 flex flex-col justify-end">
                              <h4 className="font-semibold text-lg text-white mb-2">
                                {post.title}
                              </h4>
                              <p className="text-white/80 text-sm mb-4 line-clamp-2">
                                {post.description}
                              </p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </PremiumLockedContent>
              )}
            </TabsContent>

            {/* MY CAUSE TAB */}
            <TabsContent value="cause" className="animate-fade-in">
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h2 className="text-2xl font-bold mb-2">My Causes</h2>
                <p className="text-muted-foreground text-sm">
                  These are the causes I care about. Join me in making a difference.
                </p>
              </div>
              
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

            {/* EXCLUSIVE ZONE TAB - All Athletes */}
            <TabsContent value="exclusive" className="animate-fade-in">
              {isPremiumSubscribed ? (
                isCustomAthlete ? (
                  isArthurCazaux ? <ArthurExclusiveZone /> : isMatthieuJalibert ? <MatthieuExclusiveZone /> : isCassandreBeaugrand ? <CassandreExclusiveZone /> : isPierreGasly ? <PierreExclusiveZone /> : isTommyFleetwood ? <TommyExclusiveZone /> : <PierreExclusiveZone />
                ) : (
                  <div className="space-y-6 max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto">
                      <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Premium Members Only</Badge>
                      <h2 className="text-2xl font-bold mb-2">Exclusive Zone</h2>
                      <p className="text-muted-foreground text-sm">
                        Win prizes, access content you won't find anywhere else, and connect with the community.
                      </p>
                    </div>
                    
                    {/* Coming Soon Content */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <article className="glass-card p-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-md">
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-semibold mb-2">Prize Draws</h4>
                        <p className="text-sm text-muted-foreground">Win signed gear and exclusive experiences</p>
                      </article>
                      <article className="glass-card p-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-md">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-semibold mb-2">Exclusive Content</h4>
                        <p className="text-sm text-muted-foreground">Behind-the-scenes and premium features</p>
                      </article>
                      <article className="glass-card p-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-md">
                          <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-semibold mb-2">Fan Discussions</h4>
                        <p className="text-sm text-muted-foreground">Connect with other fans in the community</p>
                      </article>
                    </div>
                  </div>
                )
              ) : (
                <PremiumLockedContent 
                  athleteId={athlete.id} 
                  athleteName={athlete.name}
                  onGoBack={handleGoBackFromPremium}
                  customSubtitle={
                    isArthurCazaux 
                      ? "Unlock prize draws, curated premium content, and members-only tennis discussions."
                      : isCassandreBeaugrand
                      ? "Unlock prize draws, curated premium content, and members-only triathlon discussions."
                      : isMatthieuJalibert
                      ? "Unlock prize draws, curated premium content, and members-only rugby discussions."
                      : isPierreGasly
                      ? "Unlock prize draws, curated premium content, and members-only F1 discussions."
                      : isTommyFleetwood
                      ? "Unlock prize draws, curated premium content, and members-only golf discussions."
                      : `Unlock prize draws, curated premium content, and members-only ${athlete.sport.toLowerCase()} discussions.`
                  }
                >
                  {isCustomAthlete ? (
                    isArthurCazaux ? <ArthurExclusiveZone /> : isMatthieuJalibert ? <MatthieuExclusiveZone /> : isCassandreBeaugrand ? <CassandreExclusiveZone /> : isPierreGasly ? <PierreExclusiveZone /> : isTommyFleetwood ? <TommyExclusiveZone /> : <PierreExclusiveZone />
                  ) : (
                    <div className="space-y-6 max-w-5xl mx-auto">
                      <div className="text-center max-w-2xl mx-auto">
                        <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Premium Members Only</Badge>
                        <h2 className="text-2xl font-bold mb-2">Exclusive Zone</h2>
                        <p className="text-muted-foreground text-sm">
                          Win prizes, access content you won't find anywhere else, and connect with the community.
                        </p>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <article className="glass-card p-6 text-center">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-md">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <h4 className="font-semibold mb-2">Prize Draws</h4>
                          <p className="text-sm text-muted-foreground">Win signed gear and exclusive experiences</p>
                        </article>
                        <article className="glass-card p-6 text-center">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-md">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                          <h4 className="font-semibold mb-2">Exclusive Content</h4>
                          <p className="text-sm text-muted-foreground">Behind-the-scenes and premium features</p>
                        </article>
                        <article className="glass-card p-6 text-center">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-md">
                            <MessageCircle className="h-6 w-6 text-white" />
                          </div>
                          <h4 className="font-semibold mb-2">Fan Discussions</h4>
                          <p className="text-sm text-muted-foreground">Connect with other fans in the community</p>
                        </article>
                      </div>
                    </div>
                  )}
                </PremiumLockedContent>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
      </div>
    </>
  );

  // For custom athletes, use minimal header without nav links
  if (isCustomAthlete) {
    return (
      <div className="min-h-screen flex flex-col">
        <AthleteHeader />
        <main className="flex-1 pt-16">
          {content}
        </main>
        <Footer />
      </div>
    );
  }

  // For other athletes, use standard Layout
  return <Layout>{content}</Layout>;
};

export default AthletePage;