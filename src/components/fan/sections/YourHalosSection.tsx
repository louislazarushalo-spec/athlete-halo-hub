import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { AthleteCard } from "@/components/athletes/AthleteCard";

// Hardcoded followed athletes for demo
const followedAthleteIds = ["arthur-cazaux", "tommy-fleetwood", "cassandre-beaugrand"];

export const YourHalosSection = () => {
  const { athletes } = useAthleteProfiles();
  const followedAthletes = athletes.filter(a => followedAthleteIds.includes(a.id));

  if (followedAthletes.length === 0) return null;

  return (
    <section className="mb-8 md:mb-12">
      <div className="mb-4 md:mb-6">
        <h2 className="font-display text-xl md:text-2xl font-semibold mb-1">Your Halos</h2>
        <p className="text-sm md:text-base text-muted-foreground">Fresh updates from the athletes you follow.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {followedAthletes.map((athlete, index) => (
          <AthleteCard key={athlete.id} athlete={athlete} index={index} hideAccessIndicators />
        ))}
      </div>
    </section>
  );
};
