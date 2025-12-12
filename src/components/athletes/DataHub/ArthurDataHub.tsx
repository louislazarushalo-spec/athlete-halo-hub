import { Trophy, TrendingUp, Target, Award, Calendar } from "lucide-react";
import { StatCard } from "./StatCard";
import { FormMomentumChart } from "./FormMomentumChart";
import { RallyDominanceChart } from "./RallyDominanceChart";
import { PressureGauge } from "./PressureGauge";
import { UpcomingMatchBlock } from "./UpcomingMatchBlock";

// Placeholder data - easily replaceable with API/CMS data
const globalStats = {
  atpRanking: 68,
  bestRanking: 52,
  careerWins: 47,
  careerLosses: 38,
  seasonWins: 18,
  seasonLosses: 12,
  careerTitles: 0,
};

export const ArthurDataHub = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Data Hub</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          In-depth performance analytics and match insights
        </p>
      </div>
      
      {/* Global Stats Overview */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Global Overview
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <StatCard
            label="ATP Ranking"
            value={`#${globalStats.atpRanking}`}
            icon={TrendingUp}
            trend="up"
            index={0}
          />
          <StatCard
            label="Best Ranking"
            value={`#${globalStats.bestRanking}`}
            sublabel="Career high"
            icon={Award}
            index={1}
          />
          <StatCard
            label="Career W/L"
            value={`${globalStats.careerWins}-${globalStats.careerLosses}`}
            sublabel={`${((globalStats.careerWins / (globalStats.careerWins + globalStats.careerLosses)) * 100).toFixed(0)}% win rate`}
            icon={Target}
            index={2}
          />
          <StatCard
            label="Season W/L"
            value={`${globalStats.seasonWins}-${globalStats.seasonLosses}`}
            sublabel="2024 record"
            icon={Calendar}
            index={3}
          />
          <StatCard
            label="Career Titles"
            value={globalStats.careerTitles}
            sublabel="ATP Tour"
            icon={Trophy}
            index={4}
          />
        </div>
      </div>
      
      {/* Performance Charts */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Performance Analytics
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <FormMomentumChart />
          <div className="space-y-4 sm:space-y-6">
            <RallyDominanceChart />
            <PressureGauge />
          </div>
        </div>
      </div>
      
      {/* Upcoming Match Analysis */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Match Preview
        </h4>
        <UpcomingMatchBlock />
      </div>
    </div>
  );
};
