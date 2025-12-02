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

export const MyNewsSection = () => {
  const followedAthletes = athletes.filter(a => followedAthleteIds.includes(a.id));
  
  // Aggregate all mediaFeed items from followed athletes
  const allNews = followedAthletes.flatMap(athlete => 
    (athlete.mediaFeed || []).map(item => ({
      ...item,
      athlete,
    }))
  );

  // Sort by timestamp (most recent first)
  const sortedNews = allNews.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (sortedNews.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">My News</h2>
        <p className="text-muted-foreground">Latest updates from your athletes.</p>
      </div>
      <div className="space-y-4">
        {sortedNews.map((item) => {
          const config = platformConfig[item.platform] || platformConfig.instagram;
          const Icon = config.icon;
          
          return (
            <Link
              key={item.id}
              to={`/athlete/${item.athlete.id}`}
              className="group block"
            >
              <article className="glass-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-glow-soft">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title || item.content}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-foreground border-b-[6px] border-b-transparent ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={item.athlete.avatar}
                        alt={item.athlete.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-muted-foreground">{item.athlete.name}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className={`inline-flex items-center gap-1 text-xs ${config.color}`}>
                        <Icon className="h-3 w-3" />
                        {config.label}
                      </span>
                    </div>
                    {item.title && (
                      <h3 className="font-semibold text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    )}
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {item.content}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                      {item.stats?.likes && <span>{item.stats.likes.toLocaleString()} likes</span>}
                      {item.stats?.views && <span>{item.stats.views.toLocaleString()} views</span>}
                      {item.stats?.readTime && <span>{item.stats.readTime} read</span>}
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
