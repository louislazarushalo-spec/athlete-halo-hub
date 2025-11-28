import { Link } from "react-router-dom";
import { Athlete } from "@/data/athletes";
import { Button } from "@/components/ui/button";

interface AthleteCardProps {
  athlete: Athlete;
  index?: number;
}

export const AthleteCard = ({ athlete, index = 0 }: AthleteCardProps) => {
  return (
    <Link 
      to={`/athlete/${athlete.id}`}
      className={`group block animate-fade-up opacity-0 stagger-${(index % 5) + 1}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <article className="glass-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-glow-gold hover:scale-[1.02]">
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
          <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
            {athlete.name}
          </h3>
        </div>
      </article>
    </Link>
  );
};
