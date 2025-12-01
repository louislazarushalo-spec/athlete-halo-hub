import { athletes } from "@/data/athletes";
import { AthleteCard } from "@/components/athletes/AthleteCard";

interface FilteredAthletesSectionProps {
  sport: string;
}

export const FilteredAthletesSection = ({ sport }: FilteredAthletesSectionProps) => {
  const filteredAthletes = athletes
    .filter((athlete) => athlete.sport.toLowerCase() === sport.toLowerCase())
    .sort(() => Math.random() - 0.5);

  if (filteredAthletes.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold mb-6">{sport} Athletes</h2>
        <p className="text-muted-foreground">No athletes found for this sport.</p>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-display font-bold mb-6">{sport} Athletes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAthletes.map((athlete, index) => (
          <AthleteCard key={athlete.id} athlete={athlete} index={index} />
        ))}
      </div>
    </section>
  );
};
