import { Trophy, TrendingUp, Target, Award, Timer, Percent } from "lucide-react";
import { StatCard } from "./StatCard";

// Placeholder triathlon data - clearly demo values to be replaced with official stats
const globalStats = {
  worldRanking: 4,
  wtcsRanking: 7,
  bestWtcsFinish: "1st",
  bestOlympicTime: "1:52:30",
  fastest10k: "33:10",
  podiumRate: "58%",
};

export const CassandreDataHub = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Data Hub</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          In-depth performance analytics and race insights
        </p>
      </div>
      
      {/* Global Stats Overview */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Global Overview
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <StatCard
            label="World Rank"
            value={`#${globalStats.worldRanking}`}
            icon={TrendingUp}
            trend="up"
            index={0}
          />
          <StatCard
            label="WTCS Rank"
            value={`#${globalStats.wtcsRanking}`}
            sublabel="2024 Series"
            icon={Award}
            index={1}
          />
          <StatCard
            label="Best WTCS Finish"
            value={globalStats.bestWtcsFinish}
            sublabel="Career high"
            icon={Trophy}
            index={2}
          />
          <StatCard
            label="Best Olympic Time"
            value={globalStats.bestOlympicTime}
            sublabel="Olympic distance"
            icon={Timer}
            index={3}
          />
          <StatCard
            label="Fastest 10K"
            value={globalStats.fastest10k}
            sublabel="Off the bike"
            icon={Target}
            index={4}
          />
          <StatCard
            label="Podium Rate"
            value={globalStats.podiumRate}
            sublabel="Last 12 races"
            icon={Percent}
            index={5}
          />
        </div>
      </div>
      
      {/* Data Source Notice */}
      <div className="text-center pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground italic">
          Data shown is demo (to be replaced with official stats).
        </p>
      </div>
    </div>
  );
};
