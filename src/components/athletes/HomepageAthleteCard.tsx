import { Link } from "react-router-dom";
import { Athlete } from "@/data/athletes";
import { Lock, Unlock, Crown } from "lucide-react";

interface HomepageAthleteCardProps {
  athlete: Athlete;
  index?: number;
}

export const HomepageAthleteCard = ({ athlete, index = 0 }: HomepageAthleteCardProps) => {
  // Check if athlete is a custom/premium athlete
  const isCustomAthlete = athlete.id === "arthur-cazaux" || athlete.id === "matthieu-jalibert" || athlete.id === "cassandre-beaugrand";

  return (
    <Link 
      to={`/athlete/${athlete.id}`}
      className={`group block animate-fade-up opacity-0 stagger-${(index % 5) + 1}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <article className="glass-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-glow-soft hover:scale-[1.02] active:scale-[0.98]">
        {/* Large Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={athlete.avatar}
            alt={athlete.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          
          {/* Premium badge for custom athletes */}
          {isCustomAthlete && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-primary via-primary to-blue-400 backdrop-blur-sm rounded-full shadow-glow-blue animate-glow-pulse">
              <Crown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary-foreground" />
              <span className="text-[10px] sm:text-xs font-semibold text-primary-foreground">Premium</span>
            </div>
          )}
          
          {/* Content overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5 sm:mb-1">
              {athlete.name}
            </h3>
            <span className="text-muted-foreground text-xs sm:text-sm font-medium block mb-2 sm:mb-3">
              {athlete.sport}
            </span>

            {/* Access level indicators */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {/* Free sections */}
              <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-background/60 backdrop-blur-sm border border-border/30 rounded text-[9px] sm:text-[10px] text-foreground/70">
                <Unlock className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                Free
              </span>
              
              {/* Premium indicator - styled like Arthur's premium button */}
              <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-primary/30 via-primary/30 to-blue-400/30 backdrop-blur-sm border border-primary/50 rounded text-[9px] sm:text-[10px] text-primary font-medium shadow-[0_0_12px_hsl(217_91%_60%/0.4)] animate-glow-pulse">
                <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary animate-lock-glow" />
                {isCustomAthlete ? "4 Premium" : "1 Premium"}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
