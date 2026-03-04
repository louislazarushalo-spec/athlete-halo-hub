import { Link } from "react-router-dom";
import { Athlete } from "@/data/athletes";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface HomepageAthleteCardProps {
  athlete: Athlete;
  index?: number;
  hideAccessLabels?: boolean;
}

export const HomepageAthleteCard = ({ athlete, index = 0, hideAccessLabels = false }: HomepageAthleteCardProps) => {
  const { resolve } = useAthleteProfiles();
  const resolved = resolve(athlete.id, athlete.avatar, athlete.banner, athlete.bio);

  return (
    <Link
      to={`/athlete/${athlete.id}`}
      className={`group block animate-fade-up opacity-0 stagger-${(index % 5) + 1}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="relative rounded-xl overflow-hidden bg-card border border-border/30 transition-all duration-300 hover:border-primary/30 hover:shadow-glow-soft active:scale-[0.98]">
        <AspectRatio ratio={4 / 5}>
          <img
            src={resolved.avatar}
            alt={athlete.name}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Name + sport */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <h3 className="font-display text-sm sm:text-base font-semibold text-white truncate leading-tight group-hover:text-primary transition-colors">
              {athlete.name}
            </h3>
            <span className="text-[11px] sm:text-xs text-white/50 leading-tight">
              {athlete.sport}
            </span>
          </div>
        </AspectRatio>
      </div>
    </Link>
  );
};
