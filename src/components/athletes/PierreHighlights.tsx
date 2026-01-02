import { ExternalLink, Instagram, Heart, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import pierreGaslyImg from "@/assets/pierre-gasly.png";

// Import highlight images
import pierreHighlight1 from "@/assets/pierre-highlight-1.jpg";
import pierreHighlight2 from "@/assets/pierre-highlight-2.jpg";
import pierreHighlight3 from "@/assets/pierre-highlight-3.png";
import pierreHighlight4 from "@/assets/pierre-highlight-4.png";
import pierreHighlight5 from "@/assets/pierre-highlight-5.png";
import pierreHighlight6 from "@/assets/pierre-highlight-6.png";

interface HighlightItem {
  id: string;
  type: "social" | "article";
  platform: "instagram" | "formula1" | "motorsport" | "autosport" | "skysports" | "lequipe";
  date: string;
  displayDate: string;
  source: string;
  title: string;
  summary?: string;
  url: string;
  image?: string;
}

// Platform configuration matching Arthur's style exactly
const platformConfig: Record<string, { label: string; bgClass: string; textClass: string; icon?: string }> = {
  instagram: { label: "Instagram", bgClass: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400", textClass: "text-white" },
  formula1: { label: "Formula 1", bgClass: "bg-red-600", textClass: "text-white", icon: "F1" },
  motorsport: { label: "Motorsport.com", bgClass: "bg-blue-700", textClass: "text-white", icon: "MS" },
  autosport: { label: "Autosport", bgClass: "bg-green-600", textClass: "text-white", icon: "AS" },
  skysports: { label: "Sky Sports F1", bgClass: "bg-blue-800", textClass: "text-white", icon: "SKY" },
  lequipe: { label: "L'Équipe", bgClass: "bg-blue-600", textClass: "text-white", icon: "L'É" },
};

// Feed items sorted by date (most recent first)
const highlightsData: HighlightItem[] = [
  {
    id: "instagram-2025-12-28",
    type: "social",
    platform: "instagram",
    date: "2025-12-28",
    displayDate: "Dec 28, 2025",
    source: "Instagram",
    title: "Race week vibes 🛴 Getting around the paddock in style",
    url: "https://www.instagram.com/p/pierregasly/",
    image: pierreHighlight1
  },
  {
    id: "formula1-2025-12-26",
    type: "article",
    platform: "formula1",
    date: "2025-12-26",
    displayDate: "Dec 26, 2025",
    source: "Formula 1",
    title: "Gasly reflects on Alpine's strongest season yet",
    summary: "The French driver looks back on the team's progress and discusses expectations for the 2026 regulation changes.",
    url: "https://www.formula1.com/en/latest/article.gasly-reflects-alpine-2025.html",
    image: pierreHighlight3
  },
  {
    id: "instagram-2025-12-22",
    type: "social",
    platform: "instagram",
    date: "2025-12-22",
    displayDate: "Dec 22, 2025",
    source: "Instagram",
    title: "Track run with the crew 🏃‍♂️ Staying sharp in the off-season",
    url: "https://www.instagram.com/p/pierregasly/",
    image: pierreHighlight2
  },
  {
    id: "motorsport-2025-12-18",
    type: "article",
    platform: "motorsport",
    date: "2025-12-18",
    displayDate: "Dec 18, 2025",
    source: "Motorsport.com",
    title: "Gasly: Alpine can fight for podiums in 2026",
    summary: "Pierre Gasly believes the new regulations give Alpine a fresh opportunity to challenge the frontrunners.",
    url: "https://www.motorsport.com/f1/news/gasly-alpine-podiums-2026/",
    image: pierreHighlight5
  },
  {
    id: "lequipe-2025-12-14",
    type: "article",
    platform: "lequipe",
    date: "2025-12-14",
    displayDate: "Dec 14, 2025",
    source: "L'Équipe",
    title: "Pierre Gasly : « Mon objectif reste un titre mondial »",
    summary: "Le pilote français se confie sur ses ambitions et son travail avec l'équipe Alpine pour la saison à venir.",
    url: "https://www.lequipe.fr/Formule-1/Article/Gasly-interview-2025/",
    image: pierreHighlight4
  },
  {
    id: "instagram-2025-12-10",
    type: "social",
    platform: "instagram",
    date: "2025-12-10",
    displayDate: "Dec 10, 2025",
    source: "Instagram",
    title: "New lid for the new season 🪖 Special design by Bell Helmets",
    url: "https://www.instagram.com/p/pierregasly/",
    image: pierreHighlight6
  },
  {
    id: "skysports-2025-12-05",
    type: "article",
    platform: "skysports",
    date: "2025-12-05",
    displayDate: "Dec 5, 2025",
    source: "Sky Sports F1",
    title: "Gasly's evolution: From Red Bull to Alpine leader",
    summary: "How the Frenchman rebuilt his career and became the cornerstone of Alpine's F1 project.",
    url: "https://www.skysports.com/f1/news/gasly-alpine-evolution/",
    image: pierreHighlight5
  },
  {
    id: "autosport-2025-11-28",
    type: "article",
    platform: "autosport",
    date: "2025-11-28",
    displayDate: "Nov 28, 2025",
    source: "Autosport",
    title: "Why Alpine's 2026 car could be a game-changer",
    summary: "Technical analysis of Alpine's approach to the new regulations and Gasly's input in development.",
    url: "https://www.autosport.com/f1/news/alpine-2026-analysis/",
    image: pierreHighlight3
  }
];

// Social Post Card - matches Arthur's Instagram/social card exactly
const SocialFeedCard = ({ item, index }: { item: HighlightItem; index: number }) => {
  const config = platformConfig[item.platform];
  
  return (
    <article 
      className="glass-card overflow-hidden group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="p-3 md:p-4 flex items-center gap-2 md:gap-3 border-b border-border/50">
        <img 
          src={pierreGaslyImg} 
          alt="Pierre Gasly" 
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-primary/20" 
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <span className="font-semibold text-sm md:text-base text-foreground truncate">Pierre Gasly</span>
            <Badge variant="secondary" className="text-[10px] md:text-xs bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300">
              {config.label}
            </Badge>
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground">{item.displayDate}</span>
        </div>
      </div>
      
      {/* Instagram image area */}
      <div className="relative aspect-square overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt="Post" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
            <div className="text-center p-6">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${config.bgClass} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <Instagram className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <p className="text-sm text-muted-foreground">View this post on Instagram</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 md:p-4 space-y-2 md:space-y-3">
        <div className="flex items-center gap-3 md:gap-4">
          <button className="flex items-center gap-1 md:gap-1.5 text-muted-foreground hover:text-red-400 transition-all duration-200 hover:scale-110">
            <Heart className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button className="flex items-center gap-1 md:gap-1.5 text-muted-foreground hover:text-blue-400 transition-all duration-200 hover:scale-110">
            <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
        <p className="text-xs md:text-sm leading-relaxed">
          <span className="font-semibold text-foreground">pierregasly</span>{' '}
          <span className="text-foreground/90">{item.title}</span>
        </p>
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View on Instagram
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
};

// Article Card - matches Arthur's article card exactly
const ArticleFeedCard = ({ item, index }: { item: HighlightItem; index: number }) => {
  const config = platformConfig[item.platform];
  
  return (
    <a 
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <article 
        className="glass-card overflow-hidden group cursor-pointer hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <div className="p-3 md:p-4 flex items-center gap-2 md:gap-3 border-b border-border/50">
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${config.bgClass} flex items-center justify-center font-bold ${config.textClass} text-xs md:text-sm shadow-lg`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="font-semibold text-sm md:text-base text-foreground">{config.label}</span>
              <Badge variant="secondary" className="text-[10px] md:text-xs border-primary/20">Article</Badge>
            </div>
            <span className="text-[10px] md:text-xs text-muted-foreground">F1 News • {item.displayDate}</span>
          </div>
        </div>
        <div className="flex gap-3 md:gap-4 p-3 md:p-4">
          <div className="flex-1 space-y-1 md:space-y-2">
            <h4 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
              {item.title}
            </h4>
            {item.summary && (
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            )}
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground pt-1">
              <span>3 min read</span>
              <span>•</span>
              <span className="text-primary">Read more →</span>
            </div>
          </div>
          <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-lg overflow-hidden">
            {item.image ? (
              <img 
                src={item.image} 
                alt="Article" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground/50" />
              </div>
            )}
          </div>
        </div>
      </article>
    </a>
  );
};

// Follow Card - matches Arthur's pattern
const FollowCard = () => (
  <article className="glass-card overflow-hidden group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in">
    <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center shrink-0 shadow-lg">
          <Instagram className="h-6 w-6 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-base sm:text-lg text-foreground">
            Follow Pierre on Instagram
          </h4>
          <p className="text-sm text-muted-foreground">
            @pierregasly
          </p>
        </div>
      </div>
      <a href="https://www.instagram.com/pierregasly/" target="_blank" rel="noopener noreferrer">
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white border-0 h-9 shadow-lg"
        >
          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
          Open profile
        </Button>
      </a>
    </div>
  </article>
);

export const PierreHighlights = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {highlightsData.map((item, index) => (
        <div key={item.id}>
          {item.type === "social" ? (
            <SocialFeedCard item={item} index={index} />
          ) : (
            <ArticleFeedCard item={item} index={index} />
          )}
        </div>
      ))}
      <FollowCard />
    </div>
  );
};
