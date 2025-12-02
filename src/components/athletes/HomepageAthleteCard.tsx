import { Link } from "react-router-dom";
import { Athlete } from "@/data/athletes";

interface HomepageAthleteCardProps {
  athlete: Athlete;
  index?: number;
}

export const HomepageAthleteCard = ({ athlete, index = 0 }: HomepageAthleteCardProps) => {
  return (
    <Link 
      to={`/athlete/${athlete.id}`}
      className={`group block animate-fade-up opacity-0 stagger-${(index % 5) + 1}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <article className="glass-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-glow-gold hover:scale-[1.02]">
        {/* Large Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={athlete.avatar}
            alt={athlete.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          
          {/* Content overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-display text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
              {athlete.name}
            </h3>
            <span className="text-muted-foreground text-sm font-medium">
              {athlete.sport}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
