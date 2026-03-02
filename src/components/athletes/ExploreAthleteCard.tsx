import { Link } from "react-router-dom";
import { Athlete } from "@/data/athletes";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { useFollowedAthleteStatus } from "@/hooks/useFollowedAthletes";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Check } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ExploreAthleteCardProps {
  athlete: Athlete;
  onToggleFollow?: (id: string) => void;
}

export const ExploreAthleteCard = ({ athlete, onToggleFollow }: ExploreAthleteCardProps) => {
  const { resolve } = useAthleteProfiles();
  const resolved = resolve(athlete.id, athlete.avatar, athlete.banner, athlete.bio);
  const { user } = useAuth();
  const { isFollowing } = useFollowedAthleteStatus(athlete.id);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFollow?.(athlete.id);
  };

  return (
    <Link to={`/athlete/${athlete.id}`} className="group block">
      <div className="relative rounded-xl overflow-hidden bg-card border border-border/40">
        <AspectRatio ratio={4 / 5}>
          <img
            src={resolved.avatar}
            alt={athlete.name}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Follow button */}
          {user && onToggleFollow && (
            <button
              onClick={handleFollowClick}
              className={`absolute top-2 right-2 w-8 h-8 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full backdrop-blur-md transition-all ${
                isFollowing
                  ? "bg-primary/90 text-primary-foreground"
                  : "bg-background/50 text-foreground/80 hover:bg-background/70"
              }`}
              aria-label={isFollowing ? "Following" : "Follow"}
            >
              {isFollowing ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </button>
          )}

          {/* Name overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-display text-sm font-semibold text-white truncate leading-tight">
              {athlete.name}
            </h3>
            <span className="text-[11px] text-white/60 leading-tight">
              {athlete.sport}
            </span>
          </div>
        </AspectRatio>
      </div>
    </Link>
  );
};

/* Skeleton for loading state */
export const ExploreAthleteCardSkeleton = () => (
  <div className="rounded-xl overflow-hidden bg-card border border-border/40">
    <AspectRatio ratio={4 / 5}>
      <div className="w-full h-full animate-pulse bg-muted" />
    </AspectRatio>
  </div>
);
