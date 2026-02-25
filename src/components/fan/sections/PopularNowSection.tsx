import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Hardcoded followed athletes to exclude
const followedAthleteIds = ["arthur-cazaux", "tommy-fleetwood", "elisa-balsamo"];

export const PopularNowSection = () => {
  const { athletes } = useAthleteProfiles();
  // Randomly select athletes excluding followed ones
  const randomAthletes = useMemo(() => {
    const available = athletes.filter(a => !followedAthleteIds.includes(a.id));
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  }, []);

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Popular now</h2>
        <p className="text-muted-foreground">What fans across Halo are exploring today.</p>
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-5 pb-4">
          {randomAthletes.map((athlete) => (
            <Link
              key={athlete.id}
              to={`/athlete/${athlete.id}`}
              className="group shrink-0 w-72"
            >
              <article className="glass-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-glow-gold hover:scale-[1.02]">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={athlete.avatar}
                    alt={athlete.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                    {athlete.sport}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors">
                    {athlete.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {athlete.tagline}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
