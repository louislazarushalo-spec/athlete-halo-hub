import { Link, useNavigate } from "react-router-dom";
import { useFollowedAthletes } from "@/hooks/useFollowedAthletes";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const YourHalosSection = () => {
  const { athletes } = useAthleteProfiles();
  const { followedIds, loading } = useFollowedAthletes();
  const navigate = useNavigate();

  const followedAthletes = athletes.filter((a) => followedIds.includes(a.id));

  if (loading) return null;

  if (followedAthletes.length === 0) {
    return (
      <section className="mb-6">
        <h2 className="font-display text-lg font-semibold mb-3">Your Halos</h2>
        <div className="rounded-2xl border border-border/40 bg-card p-6 text-center">
          <Compass className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground mb-3">Follow athletes to see them here.</p>
          <Button size="sm" variant="outline" onClick={() => navigate("/athletes")}>
            Explore athletes
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="font-display text-lg font-semibold mb-3">Your Halos</h2>
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-1">
          {followedAthletes.map((athlete) => (
            <Link
              key={athlete.id}
              to={`/athlete/${athlete.id}`}
              className="flex flex-col items-center gap-1 shrink-0 w-16"
            >
              <img
                src={athlete.avatar}
                alt={athlete.name}
                className="w-14 h-14 rounded-full object-cover object-top ring-2 ring-primary/30"
              />
              <span className="text-[10px] text-muted-foreground truncate w-full text-center leading-tight">
                {athlete.name.split(" ")[0]}
              </span>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </section>
  );
};
