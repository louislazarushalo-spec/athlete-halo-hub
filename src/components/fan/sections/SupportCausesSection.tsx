import { Link } from "react-router-dom";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight } from "lucide-react";

const featuredCauses = [
  { athleteId: "antoine-dupont", title: "Rugby for All" },
  { athleteId: "paul-pogba", title: "Support Kids in Guinea" },
  { athleteId: "iga-swiatek", title: "Mental Health for Young Athletes" },
  { athleteId: "leon-marchand", title: "Protect Our Water Ecosystems" },
];

export const SupportCausesSection = () => {
  const { athletes } = useAthleteProfiles();
  const causes = featuredCauses.map((fc) => {
    const athlete = athletes.find((a) => a.id === fc.athleteId);
    return { athlete, cause: athlete?.cause, customTitle: fc.title };
  }).filter((item) => item.athlete && item.cause);

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Support their causes</h2>
        <p className="text-muted-foreground">Make an impact where it matters most to them.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {causes.map(({ athlete, cause, customTitle }) => {
          const progress = Math.round((cause!.raised / cause!.target) * 100);
          return (
            <Link
              key={cause!.id}
              to={`/athlete/${athlete!.id}/cause`}
              className="group block"
            >
              <article className="glass-card overflow-hidden transition-all duration-300 hover:border-primary/30">
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={cause!.image}
                    alt={customTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
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
                  <h3 className="font-medium text-sm mb-2">{customTitle}</h3>
                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {cause!.currency}{cause!.raised.toLocaleString()} raised
                      </span>
                      <span className="text-xs text-primary font-medium">{progress}%</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Support this Cause
                    <Heart className="h-4 w-4" />
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
