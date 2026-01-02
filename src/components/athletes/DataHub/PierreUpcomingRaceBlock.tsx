import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap, AlertTriangle, Timer, Flag } from "lucide-react";

interface TrackMetric {
  label: string;
  pierre: number | string;
  average: number | string;
  unit?: string;
}

const trackMetrics: TrackMetric[] = [
  { label: "Avg Finish", pierre: "P6.2", average: "P8.4" },
  { label: "Best Result", pierre: "P4", average: "P6" },
  { label: "Overtakes/Race", pierre: 4.2, average: 3.1 },
];

const keyFactors = [
  "High downforce setup will suit Alpine's characteristics",
  "Historically strong at street circuits with similar layouts",
  "Strategy will be crucial with high tire degradation expected"
];

const riskFactors = [
  "Limited overtaking opportunities at this circuit",
  "Qualifying position critical for race result",
  "Weather forecast shows potential for changing conditions"
];

export const PierreUpcomingRaceBlock = () => {
  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.6s" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <Badge variant="outline" className="text-xs mb-2 border-red-500/30 text-red-400">
            Next Race
          </Badge>
          <h4 className="text-lg sm:text-xl font-bold text-foreground">
            Australian Grand Prix
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Albert Park Circuit • Melbourne • March 16, 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇦🇺</span>
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">58 Laps</p>
            <p className="text-xs text-muted-foreground">306.124 km</p>
          </div>
        </div>
      </div>
      
      {/* Track Record */}
      <div className="bg-muted/30 rounded-lg p-3 sm:p-4 mb-4">
        <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Flag className="h-4 w-4 text-red-500" />
          Pierre's Track Record
        </h5>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-foreground">5</span>
            <p className="text-xs text-muted-foreground">Races</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-primary">P4</span>
            <p className="text-xs text-muted-foreground">Best Finish</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-foreground">22</span>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
        </div>
      </div>
      
      {/* Predicted Performance */}
      <div className="mb-4">
        <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Expected Performance
        </h5>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground font-medium">Predicted: P7</span>
              <span className="text-muted-foreground">Range: P5-P9</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000" 
                style={{ width: "65%" }} 
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Based on car performance, track characteristics, and historical data
        </p>
      </div>
      
      {/* Key Metrics Comparison */}
      <div className="mb-4">
        <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          Track Performance vs Field Average
        </h5>
        <div className="space-y-2">
          {trackMetrics.map((metric) => (
            <div key={metric.label} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-28 sm:w-32 shrink-0">{metric.label}</span>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs font-medium text-primary w-12 text-right">{metric.pierre}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500"
                    style={{ width: "65%" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-12">{metric.average}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Risk Factors */}
      <div className="mb-4 bg-red-500/5 border border-red-500/20 rounded-lg p-3">
        <h5 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          Key Challenges
        </h5>
        <ul className="space-y-1">
          {riskFactors.map((factor, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-red-500/70 mt-0.5">•</span>
              {factor}
            </li>
          ))}
        </ul>
      </div>
      
      {/* What to Watch For */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <h5 className="text-sm font-semibold text-foreground mb-2">What to Watch For</h5>
        <ul className="space-y-2">
          {keyFactors.map((insight, i) => (
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
