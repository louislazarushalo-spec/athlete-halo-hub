import { ExternalLink, Instagram, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HighlightItem {
  type: "instagram" | "article";
  date: string;
  displayDate: string;
  publisher: string;
  title: string;
  summary?: string;
  url: string;
}

const highlightsData: HighlightItem[] = [
  {
    type: "article",
    date: "2025-12-18",
    displayDate: "Dec 18, 2025",
    publisher: "World Triathlon",
    title: "World Triathlon Championship Series — The 2025 Rewind!",
    summary: "Official WTCS season recap with key moments and context from the women's series.",
    url: "https://triathlon.org/news/world-triathlon-championship-series-2025-rewind"
  },
  {
    type: "instagram",
    date: "2025-12-14",
    displayDate: "Dec 14, 2025",
    publisher: "Instagram",
    title: "Training / season update (post)",
    url: "https://www.instagram.com/p/DNGFkkTsY87/?hl=en"
  },
  {
    type: "instagram",
    date: "2025-12-01",
    displayDate: "Dec 2025",
    publisher: "Instagram",
    title: "2025: A Year of Change (post)",
    url: "https://www.instagram.com/p/DEZlED0s-dc/"
  },
  {
    type: "article",
    date: "2025-11-04",
    displayDate: "Nov 4, 2025",
    publisher: "World Triathlon",
    title: "The top stats of the female stars of the 2025 WTCS",
    summary: "Stat-led breakdown of the top women in WTCS 2025, including Beaugrand's season profile.",
    url: "https://triathlon.org/news/the-top-stats-of-the-female-stars-of-the-2025-wtcs"
  },
  {
    type: "instagram",
    date: "2025-10-24",
    displayDate: "Oct 24, 2025",
    publisher: "Instagram",
    title: "Post / photo update (Oct 24)",
    url: "https://www.instagram.com/p/DQOLJarEs17/?hl=en"
  },
  {
    type: "instagram",
    date: "2025-10-23",
    displayDate: "Oct 23, 2025",
    publisher: "Instagram",
    title: "Something new x Specialized (reel)",
    url: "https://www.instagram.com/cassandrebeaugrand/reel/DQJNlw4DOPV/?hl=mr"
  },
  {
    type: "article",
    date: "2025-10-22",
    displayDate: "Oct 22, 2025",
    publisher: "TRI247",
    title: "Olympic champ Beaugrand on Wollongong DNF and vulnerability",
    summary: "Reaction piece after the WTCS Grand Final and her reflections on performance and recovery.",
    url: "https://www.tri247.com/triathlon-news/elite/wtcs-wollongong-2025-cassandre-beaugrand-reaction"
  },
  {
    type: "instagram",
    date: "2025-10-20",
    displayDate: "Oct 20, 2025",
    publisher: "Instagram",
    title: "Post after WTCS Grand Final (reflection)",
    url: "https://www.instagram.com/p/DQCuzKXEqNK/?hl=en"
  },
  {
    type: "article",
    date: "2025-10-19",
    displayDate: "Oct 19, 2025",
    publisher: "Eurosport",
    title: "Beaugrand abandons WTCS Grand Final and loses her crown",
    summary: "Race recap coverage and context from the WTCS Grand Final outcome.",
    url: "https://www.eurosport.fr/triathlon/wollongong-t100/2025/dechirant-cassandre-beaugrand-abandonne-lultime-etape-et-sa-couronne-leonie-periault-2e-mondiale_sto23232502/story.shtml"
  },
  {
    type: "article",
    date: "2025-10-15",
    displayDate: "Oct 15, 2025",
    publisher: "World Triathlon",
    title: "Beaugrand and Potter set for another epic title tussle in The 'Gong",
    summary: "Official preview and season narrative heading into the WTCS Grand Final.",
    url: "https://triathlon.org/news/cassandre-beaugrand-and-beth-potter-set-for-another-epic-title-tussle-in-the-gong"
  }
];

const HighlightCard = ({ item, index }: { item: HighlightItem; index: number }) => {
  const isInstagram = item.type === "instagram";
  
  return (
    <article 
      className="glass-card overflow-hidden group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">{item.displayDate}</span>
          <Badge 
            variant="outline" 
            className={`text-[10px] font-medium ${
              isInstagram 
                ? "border-pink-500/50 text-pink-600 dark:text-pink-400 bg-pink-500/10" 
                : "border-blue-500/50 text-blue-600 dark:text-blue-400 bg-blue-500/10"
            }`}
          >
            {isInstagram ? (
              <Instagram className="h-3 w-3 mr-1" />
            ) : (
              <FileText className="h-3 w-3 mr-1" />
            )}
            {isInstagram ? "Instagram" : "Article"}
          </Badge>
          {!isInstagram && (
            <span className="text-xs text-muted-foreground">• {item.publisher}</span>
          )}
        </div>
        
        <h4 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
          {item.title}
        </h4>
        
        {item.summary && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {item.summary}
          </p>
        )}
        
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <Button 
            variant="outline" 
            size="sm" 
            className={`text-xs sm:text-sm h-8 sm:h-9 ${
              isInstagram 
                ? "hover:border-pink-500/50 hover:text-pink-600" 
                : "hover:border-blue-500/50 hover:text-blue-600"
            }`}
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            {isInstagram ? "View on Instagram" : "Read article"}
          </Button>
        </a>
      </div>
    </article>
  );
};

const FollowCard = () => (
  <article className="glass-card overflow-hidden group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in bg-gradient-to-br from-pink-500/5 to-purple-500/5">
    <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0">
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
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 h-9"
        >
          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
          Open profile
        </Button>
      </a>
    </div>
  </article>
);

export const CassandreHighlights = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {highlightsData.map((item, index) => (
        <HighlightCard key={`${item.type}-${item.date}-${index}`} item={item} index={index} />
      ))}
      <FollowCard />
    </div>
  );
};
