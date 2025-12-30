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
  const isCustomAthlete = athlete.id === "arthur-cazaux" || athlete.id === "matthieu-jalibert" || athlete.id === "cassandre-beaugrand";

  return (
    <Link 
      to={`/athlete/${athlete.id}`}
      className={`group block animate-fade-up opacity-0 stagger-${(index % 5) + 1}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <article className="glass-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-glow-soft hover:scale-[1.02] active:scale-[0.98]">
        {/* Image */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <img
            src={athlete.avatar}
            alt={athlete.name}
            loading="lazy"
            className="w-full h-full object-contain bg-muted/20 transition-[filter] duration-500 group-hover:brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Sport badge */}
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/90 text-primary-foreground text-[10px] sm:text-xs font-medium rounded-full">
            {athlete.sport}
          </span>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-5">
          <h3 className="font-display text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors mb-2 sm:mb-3">
            {athlete.name}
          </h3>

          {/* Access level indicators */}
          {!hideAccessIndicators && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {/* Free sections */}
              <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-muted/50 border border-border/50 rounded text-[9px] sm:text-[10px] text-muted-foreground">
                <Unlock className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                <span className="hidden xs:inline">Inside </span>My World
              </span>
              <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-muted/50 border border-border/50 rounded text-[9px] sm:text-[10px] text-muted-foreground">
                <Unlock className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                <span className="hidden xs:inline">My </span>Kit Room
              </span>
              
              {/* Premium sections - styled like Arthur's premium button */}
              {isCustomAthlete && (
                <>
                  <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-primary/20 via-primary/20 to-blue-400/20 border border-primary/40 rounded text-[9px] sm:text-[10px] text-primary font-medium shadow-[0_0_10px_hsl(217_91%_60%/0.3)] animate-glow-pulse">
                    <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary animate-lock-glow" />
                    <span className="hidden xs:inline">Performance </span>Lab
                  </span>
                  <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-primary/20 via-primary/20 to-blue-400/20 border border-primary/40 rounded text-[9px] sm:text-[10px] text-primary font-medium shadow-[0_0_10px_hsl(217_91%_60%/0.3)] animate-glow-pulse">
                    <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary animate-lock-glow" />
                    Exclusive
                  </span>
                </>
              )}
              {!isCustomAthlete && (
                <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-primary/20 via-primary/20 to-blue-400/20 border border-primary/40 rounded text-[9px] sm:text-[10px] text-primary font-medium shadow-[0_0_10px_hsl(217_91%_60%/0.3)] animate-glow-pulse">
                  <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary animate-lock-glow" />
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
