import { Trophy, TrendingUp, Target, Award, Flag, Crosshair, History, MapPin } from "lucide-react";
import { StatCard } from "./StatCard";
import { TommySeasonChart } from "./TommySeasonChart";
import { TommyStrokesGainedChart } from "./TommyStrokesGainedChart";
import { TommyPuttingGauge } from "./TommyPuttingGauge";
import { TommyUpcomingTournamentBlock } from "./TommyUpcomingTournamentBlock";
import { TommyHistoricalChart } from "./TommyHistoricalChart";

// Placeholder data - easily replaceable with API/CMS data
const globalStats = {
  worldRanking: 22,
  owgrPoints: 4.12,
  careerWins: 7,
  pgatourWins: 1,
  euroTourWins: 6,
  top10s: 87,
  cutsMade: 289,
  drivingAccuracy: "62.3%",
};

export const TommyDataHub = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Data Hub</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          In-depth golf performance analytics and tournament insights
        </p>
      </div>
      
      {/* Global Stats Overview */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Career Overview
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            label="World Ranking"
            value={`#${globalStats.worldRanking}`}
            sublabel="OWGR"
            icon={TrendingUp}
            trend="up"
            index={0}
          />
          <StatCard
            label="Career Wins"
            value={globalStats.careerWins}
            sublabel={`${globalStats.euroTourWins} DP World Tour`}
            icon={Trophy}
            index={1}
          />
          <StatCard
            label="Top 10 Finishes"
            value={globalStats.top10s}
            sublabel="Career total"
            icon={Award}
            index={2}
          />
          <StatCard
            label="Driving Accuracy"
            value={globalStats.drivingAccuracy}
            sublabel="Fairways hit"
            icon={Crosshair}
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
        <TommyHistoricalChart />
      </div>
      
      {/* Performance Charts */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          2025 Season Analytics
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <TommySeasonChart />
          <div className="space-y-4 sm:space-y-6">
            <TommyStrokesGainedChart />
            <TommyPuttingGauge />
          </div>
        </div>
      </div>
      
      {/* Upcoming Tournament Analysis */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Tournament Preview
        </h4>
        <TommyUpcomingTournamentBlock />
      </div>
    </div>
  );
};
