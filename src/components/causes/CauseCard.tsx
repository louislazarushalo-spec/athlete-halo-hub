import { Cause } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface CauseCardProps {
  cause: Cause;
  athleteId: string;
  athleteName: string;
}

export const CauseCard = ({ cause, athleteId, athleteName }: CauseCardProps) => {
  const progressPercent = (cause.raised / cause.target) * 100;

  return (
    <article className="glass-card overflow-hidden">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={cause.image}
          alt={cause.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs text-primary font-medium mb-1 block">
          {athleteName}'s Cause
        </span>
        <h3 className="font-display text-lg font-semibold mb-2">
          {cause.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {cause.story}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Raised</span>
            <span className="font-medium">
              {cause.currency}{cause.raised.toLocaleString()} / {cause.currency}{cause.target.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <Link to={`/athlete/${athleteId}/cause`}>
          <Button variant="gold" className="w-full">
            <Heart className="h-4 w-4" />
            Support this Cause
          </Button>
        </Link>
      </div>
    </article>
  );
};
