import { Link } from "react-router-dom";
import { athletes } from "@/data/athletes";
import { AthleteCard } from "@/components/athletes/AthleteCard";

// Recommended athletes based on follows
const recommendedAthletes = athletes.slice(0, 4);

export const ForYouSection = () => {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">For you</h2>
        <p className="text-muted-foreground">Recommended Halos based on your follows and activity.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recommendedAthletes.map((athlete, index) => (
          <AthleteCard key={athlete.id} athlete={athlete} index={index} />
        ))}
      </div>
    </section>
  );
};
