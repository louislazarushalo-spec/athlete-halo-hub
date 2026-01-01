import { Link } from "react-router-dom";
import { athletes } from "@/data/athletes";
import { Instagram, Twitter, Youtube, Newspaper } from "lucide-react";

// Hardcoded followed athletes for demo
const followedAthleteIds = ["arthur-cazaux", "tommy-fleetwood", "elisa-balsamo"];

// Platform icons and labels
const platformConfig = {
  instagram: { icon: Instagram, label: "Instagram", color: "text-pink-500" },
  twitter: { icon: Twitter, label: "X", color: "text-sky-500" },
  youtube: { icon: Youtube, label: "YouTube", color: "text-red-500" },
  lequipe: { icon: Newspaper, label: "L'Équipe", color: "text-blue-500" },
  espn: { icon: Newspaper, label: "ESPN", color: "text-red-600" },
  bbc: { icon: Newspaper, label: "BBC Sport", color: "text-orange-500" },
};

// Helper to format relative time
const formatRelativeTime = (timestamp: string) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const MyNewsSection = () => {
  const followedAthletes = athletes.filter(a => followedAthleteIds.includes(a.id));
  
  // Aggregate all mediaFeed items from followed athletes
  const allNews = followedAthletes.flatMap(athlete => 
    (athlete.mediaFeed || []).map(item => ({
      ...item,
      athlete,
    }))
  );

  // Shuffle array to randomize, then sort by date (recent first)
  const shuffled = [...allNews].sort(() => Math.random() - 0.5);
  const sortedNews = shuffled.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (sortedNews.length === 0) return null;

  return (
    <section className="mb-8 md:mb-12">
      <div className="mb-4 md:mb-6">
        <h2 className="font-display text-xl md:text-2xl font-semibold mb-1">My News</h2>
        <p className="text-sm md:text-base text-muted-foreground">Latest updates from your athletes.</p>
      </div>
      <div className="space-y-3 md:space-y-4">
        {sortedNews.map((item) => {
          const config = platformConfig[item.platform] || platformConfig.instagram;
          const Icon = config.icon;
          
          return (
            <Link
              key={item.id}
              to={`/athlete/${item.athlete.id}`}
              className="group block"
            >
              <article className="glass-card p-3 md:p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-glow-soft">
                <div className="flex gap-3 md:gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-16 md:w-32 md:h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title || item.content}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[5px] md:border-t-[6px] border-t-transparent border-l-[8px] md:border-l-[10px] border-l-foreground border-b-[5px] md:border-b-[6px] border-b-transparent ml-0.5 md:ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2 flex-wrap">
                      <img
                        src={item.athlete.avatar}
                        alt={item.athlete.name}
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover object-top"
                      />
                      <span className="text-xs md:text-sm text-muted-foreground">{item.athlete.name}</span>
                      <span className="text-muted-foreground hidden sm:inline">•</span>
                      <span className={`hidden sm:inline-flex items-center gap-1 text-xs ${config.color}`}>
                        <Icon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </div>
                    {item.title && (
                      <h3 className="font-semibold text-xs md:text-sm mb-0.5 md:mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    )}
                    <p className="text-muted-foreground text-xs md:text-sm line-clamp-2">
                      {item.content}
                    </p>
                    <div className="flex items-center gap-2 md:gap-3 mt-1.5 md:mt-2 text-[10px] md:text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/70">{formatRelativeTime(item.timestamp)}</span>
                      {item.stats?.likes && <span className="hidden sm:inline">• {item.stats.likes.toLocaleString()} likes</span>}
                      {item.stats?.views && <span className="hidden sm:inline">• {item.stats.views.toLocaleString()} views</span>}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
