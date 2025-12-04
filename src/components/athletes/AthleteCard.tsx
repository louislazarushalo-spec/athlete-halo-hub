import { Link } from "react-router-dom";
import { Athlete } from "@/data/athletes";
import { Lock, Unlock } from "lucide-react";

interface AthleteCardProps {
  athlete: Athlete;
  index?: number;
  hideAccessIndicators?: boolean;
}

export const AthleteCard = ({ athlete, index = 0, hideAccessIndicators = false }: AthleteCardProps) => {
  // Check if athlete is a custom/premium athlete
  const isCustomAthlete = athlete.id === "arthur-cazaux" || athlete.id === "matthieu-jalibert";

  return (
    <Link 
      to={`/athlete/${athlete.id}`}
      className={`group block animate-fade-up opacity-0 stagger-${(index % 5) + 1}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <article className="glass-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-glow-soft hover:scale-[1.02]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={athlete.avatar}
            alt={athlete.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Sport badge */}
          <span className="absolute top-3 right-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
            {athlete.sport}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors mb-3">
            {athlete.name}
          </h3>

          {/* Access level indicators */}
          {!hideAccessIndicators && (
            <div className="flex flex-wrap gap-1.5">
              {/* Free sections */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted/50 border border-border/50 rounded text-[10px] text-muted-foreground">
                <Unlock className="h-2.5 w-2.5" />
                Inside My World
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted/50 border border-border/50 rounded text-[10px] text-muted-foreground">
                <Unlock className="h-2.5 w-2.5" />
                My Kit Room
              </span>
              
              {/* Premium sections */}
              {isCustomAthlete && (
                <>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 border border-primary/30 rounded text-[10px] text-primary font-medium">
                    <Lock className="h-2.5 w-2.5" />
                    Performance Lab
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 border border-primary/30 rounded text-[10px] text-primary font-medium">
                    <Lock className="h-2.5 w-2.5" />
                    Exclusive Zone
                  </span>
                </>
              )}
              {!isCustomAthlete && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 border border-primary/30 rounded text-[10px] text-primary font-medium">
                  <Lock className="h-2.5 w-2.5" />
                  Training
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};
