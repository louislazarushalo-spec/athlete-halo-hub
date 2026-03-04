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
      <div className="relative rounded-[18px] overflow-hidden bg-card border border-white/10 shadow-lg shadow-black/30 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_24px_hsl(217,91%,55%,0.15)] active:scale-[0.98]">
        <AspectRatio ratio={3 / 4}>
          <img
            src={resolved.avatar}
            alt={athlete.name}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />

          {/* Name + sport — minimal bottom bar, no full-image overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
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
