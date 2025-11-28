import { Link } from "react-router-dom";
import { athletes } from "@/data/athletes";
import { Dumbbell, Heart, Package } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Simulated active athletes with recent updates
const activeAthletes = athletes.slice(0, 6).map((athlete, index) => ({
  ...athlete,
  recentUpdate: index % 3 === 0 ? "training" : index % 3 === 1 ? "life" : "gear",
  updatedAgo: `${Math.floor(Math.random() * 12) + 1}h ago`,
}));

const updateIcons = {
  training: Dumbbell,
  life: Heart,
  gear: Package,
};

const updateLabels = {
  training: "New Training",
  life: "Life Update",
  gear: "New Gear",
};

export const ActiveNowSection = () => {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Active now</h2>
        <p className="text-muted-foreground">Halos with new Training, Life, or Gear updates.</p>
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {activeAthletes.map((athlete) => {
            const UpdateIcon = updateIcons[athlete.recentUpdate as keyof typeof updateIcons];
            return (
              <Link
                key={athlete.id}
                to={`/athlete/${athlete.id}`}
                className="group shrink-0"
              >
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="relative">
                    <img
                      src={athlete.avatar}
                      alt={athlete.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/50 group-hover:ring-primary transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <UpdateIcon className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {athlete.name.split(" ")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {updateLabels[athlete.recentUpdate as keyof typeof updateLabels]}
                    </p>
                    <p className="text-xs text-muted-foreground/70">{athlete.updatedAgo}</p>
                  </div>
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
