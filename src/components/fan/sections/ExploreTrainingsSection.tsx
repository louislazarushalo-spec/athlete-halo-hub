import { Link } from "react-router-dom";
import { athletes } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight } from "lucide-react";

const featuredTrainings = [
  { athleteId: "paul-pogba", title: "Football Shooting Drills" },
  { athleteId: "iga-swiatek", title: "Tennis Warmup Routine" },
  { athleteId: "antoine-dupont", title: "Rugby Speed & Agility" },
  { athleteId: "leon-marchand", title: "Medley Technique Breakdown" },
];

export const ExploreTrainingsSection = () => {
  const trainings = featuredTrainings.map((ft) => {
    const athlete = athletes.find((a) => a.id === ft.athleteId);
    const training = athlete?.training[0];
    return { athlete, training, customTitle: ft.title };
  }).filter((item) => item.athlete && item.training);

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Explore Trainings</h2>
        <p className="text-muted-foreground">Train like the world's best with real drills, warmups, and routines.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {trainings.map(({ athlete, training, customTitle }) => (
          <Link
            key={training!.id}
            to={`/athlete/${athlete!.id}?tab=training`}
            className="group block"
          >
            <article className="glass-card overflow-hidden transition-all duration-300 hover:border-primary/30">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={training!.image}
                  alt={customTitle}
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
                    src={athlete!.avatar}
                    alt={athlete!.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-muted-foreground">{athlete!.name}</span>
                </div>
                <h3 className="font-medium text-sm mb-3">{customTitle}</h3>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  View Training
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
