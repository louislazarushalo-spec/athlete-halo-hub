import { ExternalLink, Instagram, Heart, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import cassandreBeaugrandImg from "@/assets/cassandre-beaugrand.jpeg";

interface HighlightItem {
  id: string;
  type: "social" | "article";
  platform: "instagram" | "slowtwitch" | "220triathlon" | "worldtriathlon" | "tri247" | "eurosport";
  date: string;
  displayDate: string;
  source: string;
  title: string;
  summary?: string;
  url: string;
  cmsImageIndex?: number; // Index to map to CMS images
}

// Platform configuration matching Arthur's style exactly
const platformConfig: Record<string, { label: string; bgClass: string; textClass: string; icon?: string }> = {
  instagram: { label: "Instagram", bgClass: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400", textClass: "text-white" },
  slowtwitch: { label: "Slowtwitch", bgClass: "bg-blue-700", textClass: "text-white", icon: "ST" },
  "220triathlon": { label: "220 Triathlon", bgClass: "bg-green-600", textClass: "text-white", icon: "220" },
  worldtriathlon: { label: "World Triathlon", bgClass: "bg-blue-600", textClass: "text-white", icon: "WT" },
  tri247: { label: "TRI247", bgClass: "bg-orange-600", textClass: "text-white", icon: "TRI" },
  eurosport: { label: "Eurosport", bgClass: "bg-blue-800", textClass: "text-white", icon: "ES" },
};

// Feed items sorted by date (most recent first) with CMS image indices
const highlightsData: HighlightItem[] = [
  {
    id: "slowtwitch-2025-12-27",
    type: "article",
    platform: "slowtwitch",
    date: "2025-12-27",
    displayDate: "Dec 27, 2025",
    source: "Slowtwitch",
    title: "A Year in Triathlon: The Biggest Losses of 2025",
    summary: "A retrospective look at the most significant setbacks and challenges faced by top triathletes this season.",
    url: "https://slowtwitch.com/triathlon/a-year-in-triathlon-the-biggest-losses-of-2025/",
    cmsImageIndex: 0
  },
  {
    id: "220triathlon-2025-12-26",
    type: "article",
    platform: "220triathlon",
    date: "2025-12-26",
    displayDate: "Dec 26, 2025",
    source: "220 Triathlon Magazine",
    title: "The parisienne powerhouse",
    summary: "In-depth profile of Cassandre Beaugrand and her journey to becoming an Olympic champion.",
    url: "https://gb.readly.com/magazines/220-triathlon/2025-12-26/693c11d681cf24c7608d452b",
    cmsImageIndex: 1
  },
  {
    id: "instagram-2025-12-19",
    type: "social",
    platform: "instagram",
    date: "2025-12-19",
    displayDate: "Dec 19, 2025",
    source: "Instagram",
    title: "Instagram post",
    url: "https://www.instagram.com/p/CldV_WastvT/",
    cmsImageIndex: 2
  },
  {
    id: "instagram-2025-12-14",
    type: "social",
    platform: "instagram",
    date: "2025-12-14",
    displayDate: "Dec 14, 2025",
    source: "Instagram",
    title: "Instagram post",
    url: "https://www.instagram.com/p/DQeNRghkqhz/?hl=en",
    cmsImageIndex: 3
  },
  {
    id: "worldtriathlon-2025-11-04",
    type: "article",
    platform: "worldtriathlon",
    date: "2025-11-04",
    displayDate: "Nov 4, 2025",
    source: "World Triathlon",
    title: "The top stats of the female stars of the 2025 WTCS",
    summary: "Statistical breakdown of the leading women in WTCS 2025, featuring Beaugrand's performance metrics.",
    url: "https://triathlon.org/news/the-top-stats-of-the-female-stars-of-the-2025-wtcs",
    cmsImageIndex: 4
  },
  {
    id: "tri247-2025-10-22",
    type: "article",
    platform: "tri247",
    date: "2025-10-22",
    displayDate: "Oct 22, 2025",
    source: "TRI247",
    title: "Olympic champ Beaugrand on Wollongong DNF and why showing vulnerability is not a weakness",
    summary: "Candid interview with Beaugrand reflecting on her WTCS Grand Final experience and the importance of mental openness.",
    url: "https://www.tri247.com/triathlon-news/elite/wtcs-wollongong-2025-cassandre-beaugrand-reaction",
    cmsImageIndex: 5
  },
  {
    id: "worldtriathlon-2025-10-15",
    type: "article",
    platform: "worldtriathlon",
    date: "2025-10-15",
    displayDate: "Oct 15, 2025",
    source: "World Triathlon",
    title: "Beaugrand and Potter set for another epic title tussle in The 'Gong",
    summary: "Official preview and season narrative heading into the WTCS Grand Final showdown.",
    url: "https://triathlon.org/news/cassandre-beaugrand-and-beth-potter-set-for-another-epic-title-tussle-in-the-gong",
    cmsImageIndex: 6
  },
  {
    id: "worldtriathlon-2025-09-17",
    type: "article",
    platform: "worldtriathlon",
    date: "2025-09-17",
    displayDate: "Sep 17, 2025",
    source: "World Triathlon",
    title: "How WTCS Karlovy Vary shook up the 2025 WTCS rankings",
    summary: "Analysis of the ranking changes following the Karlovy Vary race and implications for the season finale.",
    url: "https://triathlon.org/news/how-wtcs-karlovy-vary-shook-up-the-2025-wtcs-rankings",
    cmsImageIndex: 7
  }
];

// Social Post Card - matches Arthur's Instagram/social card exactly
const SocialFeedCard = ({ item, index, imageUrl }: { item: HighlightItem; index: number; imageUrl?: string }) => {
  const config = platformConfig[item.platform];
  
  return (
    <article 
      className="glass-card overflow-hidden group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="p-3 md:p-4 flex items-center gap-2 md:gap-3 border-b border-border/50">
        <img 
          src={cassandreBeaugrandImg} 
          alt="Cassandre Beaugrand" 
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-primary/20" 
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <span className="font-semibold text-sm md:text-base text-foreground truncate">Cassandre Beaugrand</span>
            <Badge variant="secondary" className="text-[10px] md:text-xs bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300">
              {config.label}
            </Badge>
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground">{item.displayDate}</span>
        </div>
      </div>
      
      {/* Instagram image area - using CMS image or placeholder */}
      <div className="relative aspect-square overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
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
          <span className="font-semibold text-foreground">cassandrebeaugrand</span>{' '}
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
const ArticleFeedCard = ({ item, index, imageUrl }: { item: HighlightItem; index: number; imageUrl?: string }) => {
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
            <span className="text-[10px] md:text-xs text-muted-foreground">Sports News • {item.displayDate}</span>
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
            {imageUrl ? (
              <img 
                src={imageUrl} 
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
            Follow Cassandre on Instagram
          </h4>
          <p className="text-sm text-muted-foreground">
            @cassandrebeaugrand
          </p>
        </div>
      </div>
      <a href="https://www.instagram.com/cassandrebeaugrand/" target="_blank" rel="noopener noreferrer">
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

export const CassandreHighlights = () => {
  const [cmsImages, setCmsImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchCmsImages = async () => {
      const { data, error } = await supabase
        .from('athlete_content')
        .select('image_url')
        .eq('athlete_id', 'cassandre-beaugrand')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setCmsImages(data.map(item => item.image_url));
      }
    };

    fetchCmsImages();
  }, []);

  const getImageForItem = (item: HighlightItem): string | undefined => {
    if (item.cmsImageIndex !== undefined && cmsImages[item.cmsImageIndex]) {
      return cmsImages[item.cmsImageIndex];
    }
    return undefined;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {highlightsData.map((item, index) => (
        <div key={item.id}>
          {item.type === "social" ? (
            <SocialFeedCard item={item} index={index} imageUrl={getImageForItem(item)} />
          ) : (
            <ArticleFeedCard item={item} index={index} imageUrl={getImageForItem(item)} />
          )}
        </div>
      ))}
      <FollowCard />
    </div>
  );
};
