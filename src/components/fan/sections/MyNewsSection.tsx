import { Link } from "react-router-dom";
import { athletes } from "@/data/athletes";
import { Dumbbell, Heart, Package, HandHeart } from "lucide-react";

// Hardcoded followed athletes for demo
const followedAthleteIds = ["arthur-cazaux", "tommy-fleetwood", "elisa-balsamo"];

// Generate blended feed from followed athletes
const generateBlendedFeed = () => {
  const followedAthletes = athletes.filter(a => followedAthleteIds.includes(a.id));
  const feedItems: Array<{
    id: string;
    type: "life" | "training" | "gear" | "cause";
    title: string;
    description: string;
    image: string;
    athlete: typeof athletes[0];
    date: Date;
  }> = [];

  followedAthletes.forEach(athlete => {
    // Add life posts
    athlete.life?.forEach((post, i) => {
      feedItems.push({
        id: `${athlete.id}-life-${i}`,
        type: "life",
        title: post.title,
        description: post.description,
        image: post.image,
        athlete,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      });
    });

    // Add training posts
    athlete.training?.forEach((post, i) => {
      feedItems.push({
        id: `${athlete.id}-training-${i}`,
        type: "training",
        title: post.title,
        description: post.description,
        image: post.image,
        athlete,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      });
    });

    // Add gear posts
    athlete.gear?.forEach((post, i) => {
      feedItems.push({
        id: `${athlete.id}-gear-${i}`,
        type: "gear",
        title: post.title,
        description: post.description,
        image: post.image,
        athlete,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      });
    });

    // Add cause
    if (athlete.cause) {
      feedItems.push({
        id: `${athlete.id}-cause`,
        type: "cause",
        title: athlete.cause.title,
        description: athlete.cause.story,
        image: athlete.cause.image,
        athlete,
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      });
    }
  });

  // Sort by date (most recent first)
  return feedItems.sort((a, b) => b.date.getTime() - a.date.getTime());
};

const typeIcons = {
  life: Heart,
  training: Dumbbell,
  gear: Package,
  cause: HandHeart,
};

const typeLabels = {
  life: "Life",
  training: "Training",
  gear: "Gear",
  cause: "Cause",
};

export const MyNewsSection = () => {
  const feedItems = generateBlendedFeed();

  if (feedItems.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">My News</h2>
        <p className="text-muted-foreground">Latest updates from your athletes.</p>
      </div>
      <div className="space-y-4">
        {feedItems.map((item) => {
          const Icon = typeIcons[item.type];
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
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
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
                      <span className="inline-flex items-center gap-1 text-xs text-primary">
                        <Icon className="h-3 w-3" />
                        {typeLabels[item.type]}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {item.description}
                    </p>
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
