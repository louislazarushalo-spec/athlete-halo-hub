import { Link } from "react-router-dom";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { Dumbbell, Heart, Package } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Hardcoded followed athletes
const followedAthleteIds = ["arthur-cazaux", "tommy-fleetwood", "elisa-balsamo"];

const updateColors = {
  training: "ring-emerald-500",
  life: "ring-pink-500",
  gear: "ring-blue-500",
};

const updateIcons = {
  training: Dumbbell,
  life: Heart,
  gear: Package,
};

export const LiveUpdatesSection = () => {
  const { athletes } = useAthleteProfiles();
  const activeAthletes = athletes
    .filter(a => followedAthleteIds.includes(a.id))
    .map((athlete, index) => ({
      ...athlete,
      recentUpdate: index % 3 === 0 ? "training" : index % 3 === 1 ? "life" : "gear",
      updatedAgo: `${Math.floor(Math.random() * 12) + 1}h ago`,
    }));
  if (activeAthletes.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className="font-display text-xl font-semibold mb-1">Live updates</h2>
        <p className="text-sm text-muted-foreground">Who just posted, trained, or dropped new gear.</p>
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {activeAthletes.map((athlete) => {
            const UpdateIcon = updateIcons[athlete.recentUpdate as keyof typeof updateIcons];
            const ringColor = updateColors[athlete.recentUpdate as keyof typeof updateColors];
            return (
              <Link
                key={athlete.id}
                to={`/athlete/${athlete.id}`}
                className="group shrink-0"
              >
                <div className="flex flex-col items-center gap-1.5 p-2">
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full p-0.5 ring-2 ${ringColor}`}>
                      <img
                        src={athlete.avatar}
                        alt={athlete.name}
                        className="w-full h-full rounded-full object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-card border-2 border-background flex items-center justify-center">
                      <UpdateIcon className="h-2.5 w-2.5 text-muted-foreground" />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground max-w-[64px] truncate">
                    {athlete.name.split(" ")[0]}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
