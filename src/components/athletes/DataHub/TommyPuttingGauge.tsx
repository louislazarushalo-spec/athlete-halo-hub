import { Target } from "lucide-react";

export const TommyPuttingGauge = () => {
  const puttingStats = {
    puttsPerRound: 28.4,
    gir: "68.2%",
    scrambling: "61.5%",
    oneПuttPercent: "38.2%",
  };

  return (
    <div className="glass-card p-4 sm:p-5 border border-border/30">
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-4 w-4 text-primary" />
        <h5 className="font-semibold text-foreground text-sm">Short Game Stats</h5>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 rounded-lg bg-muted/30">
          <p className="text-xl font-bold text-foreground">{puttingStats.puttsPerRound}</p>
          <p className="text-xs text-muted-foreground">Putts/Round</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/30">
          <p className="text-xl font-bold text-green-500">{puttingStats.gir}</p>
          <p className="text-xs text-muted-foreground">GIR %</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/30">
          <p className="text-xl font-bold text-foreground">{puttingStats.scrambling}</p>
          <p className="text-xs text-muted-foreground">Scrambling</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/30">
          <p className="text-xl font-bold text-primary">{puttingStats.oneПuttPercent}</p>
          <p className="text-xs text-muted-foreground">1-Putt %</p>
        </div>
      </div>
    </div>
  );
};
