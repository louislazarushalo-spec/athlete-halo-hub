import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap, AlertTriangle } from "lucide-react";

interface MatchupMetric {
  label: string;
  arthur: number;
  opponent: number;
  unit?: string;
}

const matchupMetrics: MatchupMetric[] = [
  { label: "Rally Dominance", arthur: 54, opponent: 61 },
  { label: "Pressure Index", arthur: 62, opponent: 71 },
  { label: "Avg Rally Length", arthur: 4.8, opponent: 4.2 },
];

const dangerZones = [
  "Second serve under pressure",
  "Backhand-to-backhand exchanges",
  "Tie-break situations"
];

const watchFor = [
  "Arthur's improved net game has been crucial in recent wins",
  "Hurkacz's serve will be difficult to break — focus on return games",
  "Extended rallies favor Arthur if he can neutralize Hurkacz's power"
];

export const UpcomingMatchBlock = () => {
  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.6s" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <Badge variant="outline" className="text-xs mb-2 border-primary/30 text-primary">
            Next Match
          </Badge>
          <h4 className="text-lg sm:text-xl font-bold text-foreground">
            vs Hubert Hurkacz
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            ATP Cincinnati • Round of 32 • Hard Court
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇵🇱</span>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">Hurkacz</p>
            <p className="text-xs text-muted-foreground">ATP #7</p>
          </div>
        </div>
      </div>
      
      {/* Head to Head */}
      <div className="bg-muted/30 rounded-lg p-3 sm:p-4 mb-4">
        <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Head-to-Head
        </h5>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-bold text-foreground">0</span>
            <p className="text-xs text-muted-foreground">Cazaux</p>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: "100%" }} />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-1">2 meetings</p>
          </div>
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-bold text-primary">2</span>
            <p className="text-xs text-muted-foreground">Hurkacz</p>
          </div>
        </div>
      </div>
      
      {/* Win Probability */}
      <div className="mb-4">
        <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Win Probability
        </h5>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground font-medium">Cazaux 36%</span>
              <span className="text-muted-foreground">Hurkacz 64%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-1000" 
                style={{ width: "36%" }} 
              />
              <div 
                className="h-full bg-gradient-to-r from-muted-foreground/50 to-muted-foreground/30 transition-all duration-1000" 
                style={{ width: "64%" }} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Matchup Metrics */}
      <div className="mb-4">
        <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          Key Metrics Comparison
        </h5>
        <div className="space-y-2">
          {matchupMetrics.map((metric) => (
            <div key={metric.label} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-28 sm:w-32 shrink-0">{metric.label}</span>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs font-medium text-foreground w-8 text-right">{metric.arthur}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${(metric.arthur / (metric.arthur + metric.opponent)) * 100}%` }}
                  />
                  <div 
                    className="h-full bg-muted-foreground/50"
                    style={{ width: `${(metric.opponent / (metric.arthur + metric.opponent)) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">{metric.opponent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Danger Zones */}
      <div className="mb-4 bg-red-500/5 border border-red-500/20 rounded-lg p-3">
        <h5 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          Danger Zones
        </h5>
        <ul className="space-y-1">
          {dangerZones.map((zone, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-red-500/70 mt-0.5">•</span>
              {zone}
            </li>
          ))}
        </ul>
      </div>
      
      {/* What to Watch For */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <h5 className="text-sm font-semibold text-foreground mb-2">What to Watch For</h5>
        <ul className="space-y-2">
          {watchFor.map((insight, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-0.5">→</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
