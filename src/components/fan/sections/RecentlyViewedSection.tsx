import { Link } from "react-router-dom";
import { athletes } from "@/data/athletes";
import { ChevronRight } from "lucide-react";

// Simulated recently viewed athletes
const recentlyViewedAthletes = athletes.slice(0, 3);

export const RecentlyViewedSection = () => {
  if (recentlyViewedAthletes.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="font-display text-xl font-semibold mb-4">Recently viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {recentlyViewedAthletes.map((athlete) => (
          <Link
            key={athlete.id}
            to={`/athlete/${athlete.id}`}
            className="flex items-center gap-3 px-4 py-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors shrink-0 group"
          >
            <img
              src={athlete.avatar}
              alt={athlete.name}
              loading="lazy"
              className="w-12 h-12 rounded-full object-contain bg-muted/20"
            />
            <div>
              <p className="font-medium group-hover:text-primary transition-colors">{athlete.name}</p>
              <p className="text-sm text-muted-foreground">{athlete.sport}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
          </Link>
        ))}
      </div>
    </section>
  );
};
