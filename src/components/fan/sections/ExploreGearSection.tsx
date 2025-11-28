import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const gearCategories = [
  {
    id: "football-shoes",
    title: "Football Shoes",
    description: "Boots used by world-class footballers.",
    cta: "Explore Football Shoes",
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600&h=400&fit=crop",
  },
  {
    id: "tennis-racquets",
    title: "Tennis Racquets",
    description: "Racquets built for power and precision.",
    cta: "Explore Tennis Racquets",
    image: "https://images.unsplash.com/photo-1617083934555-ac7d4e4c0a8f?w=600&h=400&fit=crop",
  },
  {
    id: "bikes-cycling",
    title: "Bikes & Cycling Gear",
    description: "Performance gear for endurance athletes.",
    cta: "Explore Bikes & Cycling Gear",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=400&fit=crop",
  },
  {
    id: "rugby-helmets",
    title: "Rugby Helmets",
    description: "Protection trusted by top players.",
    cta: "Explore Rugby Helmets",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop",
  },
];

export const ExploreGearSection = () => {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Explore Gear</h2>
        <p className="text-muted-foreground">Discover the equipment elite athletes trust — from the pitch to the pool.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {gearCategories.map((category) => (
          <Link
            key={category.id}
            to={`/gear/${category.id}`}
            className="group block"
          >
            <article className="glass-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-glow-gold">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-semibold mb-1">{category.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  {category.cta}
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};
