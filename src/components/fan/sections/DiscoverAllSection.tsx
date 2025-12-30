import { Link } from "react-router-dom";
import { athletes } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const DiscoverAllSection = () => {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Discover every Halo</h2>
        <p className="text-muted-foreground">Explore all athletes on the platform.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {athletes.map((athlete) => (
          <Link
            key={athlete.id}
            to={`/athlete/${athlete.id}`}
            className="group block"
          >
            <article className="glass-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-glow-gold">
              <div className="relative h-32 overflow-hidden">
                <img
                  src={athlete.avatar}
                  alt={athlete.name}
                  loading="lazy"
                  className="w-full h-full object-contain bg-muted/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                  {athlete.sport}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-display text-sm font-semibold group-hover:text-primary transition-colors truncate">
                  {athlete.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2 group-hover:gap-1.5 transition-all">
                  View Halo
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};
