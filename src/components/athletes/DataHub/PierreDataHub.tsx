import { Trophy, TrendingUp, Target, Award, Flag, Timer, Gauge, Zap, History } from "lucide-react";
import { StatCard } from "./StatCard";
import { PierreSeasonChart } from "./PierreSeasonChart";
import { PierreQualifyingChart } from "./PierreQualifyingChart";
import { PierreRacePerformanceGauge } from "./PierreRacePerformanceGauge";
import { PierreUpcomingRaceBlock } from "./PierreUpcomingRaceBlock";
import { PierreHistoricalChart } from "./PierreHistoricalChart";

// Placeholder data - easily replaceable with API/CMS data
const globalStats = {
  championshipPosition: 8,
  bestFinish: 1,
  careerPoints: 394,
  seasonPoints: 62,
  careerPodiums: 4,
  careerWins: 1,
  racesStarted: 147,
  fastestLaps: 3,
};

export const PierreDataHub = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Data Hub</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          In-depth F1 performance analytics and race insights
        </p>
      </div>
      
      {/* Global Stats Overview */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Career Overview
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            label="Championship"
            value={`P${globalStats.championshipPosition}`}
            sublabel="2025 Standing"
            icon={Trophy}
            trend="up"
            index={0}
          />
          <StatCard
            label="Season Points"
            value={globalStats.seasonPoints}
            sublabel="2025"
            icon={Target}
            index={1}
          />
          <StatCard
            label="Career Podiums"
            value={globalStats.careerPodiums}
            sublabel={`${globalStats.careerWins} win`}
            icon={Award}
            index={2}
          />
          <StatCard
            label="Fastest Laps"
            value={globalStats.fastestLaps}
            sublabel="Career"
            icon={Timer}
            index={3}
          />
        </div>
      </div>
      
      {/* Historical Performance Trends */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
          <History className="h-4 w-4" />
          Historical Performance
        </h4>
        <PierreHistoricalChart />
      </div>
      
      {/* Performance Charts */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          2025 Season Analytics
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <PierreSeasonChart />
          <div className="space-y-4 sm:space-y-6">
            <PierreQualifyingChart />
            <PierreRacePerformanceGauge />
          </div>
        </div>
      </div>
      
      {/* Upcoming Race Analysis */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Race Preview
        </h4>
        <PierreUpcomingRaceBlock />
      </div>
    </div>
  );
};
