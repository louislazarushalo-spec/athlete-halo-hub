import { Link } from "react-router-dom";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { Play, ChevronRight } from "lucide-react";

// Hardcoded followed athletes for demo
const followedAthleteIds = ["arthur-cazaux", "tommy-fleetwood", "elisa-balsamo"];

export const TrainLikeThemSection = () => {
  const { athletes } = useAthleteProfiles();
  // Get trainings from followed athletes
  const trainings = followedAthleteIds.map(athleteId => {
    const athlete = athletes.find(a => a.id === athleteId);
    if (!athlete || !athlete.training.length) return null;
    const training = athlete.training[0];
    return { athlete, training };
  }).filter(Boolean).slice(0, 4);

  if (trainings.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Train like them</h2>
        <p className="text-muted-foreground">Real drills and routines from your athletes.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {trainings.map((item) => {
          if (!item) return null;
          const { athlete, training } = item;
          return (
            <Link
              key={training.id}
              to={`/athlete/${athlete.id}?tab=training`}
              className="group block"
            >
              <article className="glass-card overflow-hidden transition-all duration-300 hover:border-primary/30">
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={training.image}
                    alt={training.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={athlete.avatar}
                      alt={athlete.name}
                      className="w-6 h-6 rounded-full object-cover object-top"
                    />
                    <span className="text-xs text-muted-foreground">{athlete.name}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-3">{training.title}</h3>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    View Training
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
