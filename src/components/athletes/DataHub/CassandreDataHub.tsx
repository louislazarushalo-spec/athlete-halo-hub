import { Trophy, TrendingUp, Target, Award, Timer, Percent } from "lucide-react";
import { StatCard } from "./StatCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import huaweiLogo from "@/assets/sponsor-huawei.png";

// Enhanced KPI data with sublabels and trend percentages
const globalStats = {
  worldRanking: { value: 4, sublabel: "Season to date", trend: "up" as const, trendValue: "+2" },
  wtcsRanking: { value: 7, sublabel: "2024 Series", trend: "down" as const, trendValue: "-1" },
  bestWtcsFinish: { value: "1st", sublabel: "Career high", trend: "neutral" as const, trendValue: "" },
  bestOlympicTime: { value: "1:52:30", sublabel: "Olympic distance", trend: "up" as const, trendValue: "-0:45" },
  fastest10k: { value: "33:10", sublabel: "/10km off the bike", trend: "up" as const, trendValue: "-0:12" },
  podiumRate: { value: "58%", sublabel: "Last 12 races", trend: "up" as const, trendValue: "+8%" },
};

// Chart 1: Last 10 races finish trend
const finishTrendData = [
  { race: "Race 1", position: 5 },
  { race: "Race 2", position: 3 },
  { race: "Race 3", position: 2 },
  { race: "Race 4", position: 4 },
  { race: "Race 5", position: 1 },
  { race: "Race 6", position: 2 },
  { race: "Race 7", position: 3 },
  { race: "Race 8", position: 1 },
  { race: "Race 9", position: 2 },
  { race: "Race 10", position: 1 },
];

// Chart 2: Discipline split
const disciplineSplitData = [
  { name: "Swim", value: 18, color: "hsl(200, 70%, 50%)" },
  { name: "T1", value: 2, color: "hsl(45, 70%, 50%)" },
  { name: "Bike", value: 52, color: "hsl(142, 70%, 45%)" },
  { name: "T2", value: 1, color: "hsl(45, 70%, 50%)" },
  { name: "Run", value: 27, color: "hsl(0, 70%, 50%)" },
];

// Chart 3: Heart rate over session (60 min)
const heartRateData = Array.from({ length: 60 }, (_, i) => {
  let bpm;
  if (i < 10) bpm = 85 + Math.random() * 15 + i * 3; // Warm-up
  else if (i < 20) bpm = 155 + Math.random() * 15; // High intensity
  else if (i < 25) bpm = 130 + Math.random() * 10; // Recovery
  else if (i < 40) bpm = 165 + Math.random() * 12; // Intervals
  else if (i < 50) bpm = 145 + Math.random() * 10; // Steady
  else bpm = 120 - (i - 50) * 3 + Math.random() * 8; // Cool-down
  return { minute: i + 1, bpm: Math.round(bpm) };
});

// Recent form table data
const recentFormData = [
  { event: "WTCS Hamburg", date: "Jul 14, 2024", finish: "1st", tag: "Strong run" },
  { event: "Paris Olympics", date: "Jul 31, 2024", finish: "Gold", tag: "Season peak" },
  { event: "WTCS Cagliari", date: "May 25, 2024", finish: "3rd", tag: "Solid bike" },
  { event: "WTCS Yokohama", date: "May 11, 2024", finish: "2nd", tag: "Fast swim" },
  { event: "WTCS Abu Dhabi", date: "Mar 8, 2024", finish: "4th", tag: "Building form" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { race?: string; minute?: number } }>;
}

const FinishTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{payload[0].payload.race}</p>
        <p className="text-sm font-semibold text-foreground">Position: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const HeartRateTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
        <p className="text-xs text-muted-foreground">Min {payload[0].payload.minute}</p>
        <p className="text-sm font-semibold text-foreground">{payload[0].value} bpm</p>
      </div>
    );
  }
  return null;
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
      
      {/* Enhanced Global Stats Overview with Trends */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Global Overview
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="glass-card p-4 sm:p-5 border border-border/30 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">World Rank</span>
              <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">#{globalStats.worldRanking.value}</span>
              <span className="text-xs font-medium text-green-500">↑ {globalStats.worldRanking.trendValue}</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">{globalStats.worldRanking.sublabel}</span>
          </div>
          
          <div className="glass-card p-4 sm:p-5 border border-border/30 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">WTCS Rank</span>
              <Award className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">#{globalStats.wtcsRanking.value}</span>
              <span className="text-xs font-medium text-red-500">↓ {globalStats.wtcsRanking.trendValue}</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">{globalStats.wtcsRanking.sublabel}</span>
          </div>
          
          <div className="glass-card p-4 sm:p-5 border border-border/30 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">Best WTCS</span>
              <Trophy className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">{globalStats.bestWtcsFinish.value}</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">{globalStats.bestWtcsFinish.sublabel}</span>
          </div>
          
          <div className="glass-card p-4 sm:p-5 border border-border/30 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">Best Time</span>
              <Timer className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">{globalStats.bestOlympicTime.value}</span>
              <span className="text-xs font-medium text-green-500">↑ {globalStats.bestOlympicTime.trendValue}</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">{globalStats.bestOlympicTime.sublabel}</span>
          </div>
          
          <div className="glass-card p-4 sm:p-5 border border-border/30 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">10K Run</span>
              <Target className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">{globalStats.fastest10k.value}</span>
              <span className="text-xs font-medium text-green-500">↑ {globalStats.fastest10k.trendValue}</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">{globalStats.fastest10k.sublabel}</span>
          </div>
          
          <div className="glass-card p-4 sm:p-5 border border-border/30 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">Podium Rate</span>
              <Percent className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">{globalStats.podiumRate.value}</span>
              <span className="text-xs font-medium text-green-500">↑ {globalStats.podiumRate.trendValue}</span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">{globalStats.podiumRate.sublabel}</span>
          </div>
        </div>
      </div>
      
      {/* Charts Area */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Performance Analytics
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Chart 1: Finish Trend */}
          <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="mb-4">
              <h5 className="text-base sm:text-lg font-bold text-foreground mb-1">Last 10 races — finish trend</h5>
              <p className="text-xs text-muted-foreground">Position (lower is better)</p>
            </div>
            <div className="h-[180px] sm:h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={finishTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                  <XAxis 
                    dataKey="race" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 10 }}
                    interval={1}
                    tickFormatter={(value) => value.replace("Race ", "")}
                  />
                  <YAxis 
                    reversed
                    domain={[1, 6]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 11 }}
                  />
                  <Tooltip content={<FinishTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="position" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Chart 2: Discipline Split */}
          <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="mb-4">
              <h5 className="text-base sm:text-lg font-bold text-foreground mb-1">Discipline split (avg)</h5>
              <p className="text-xs text-muted-foreground">Percentage of total race time</p>
            </div>
            <div className="h-[180px] sm:h-[200px] w-full flex flex-col justify-center">
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={[{ name: "split", ...Object.fromEntries(disciplineSplitData.map(d => [d.name, d.value])) }]} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" hide />
                  {disciplineSplitData.map((discipline) => (
                    <Bar 
                      key={discipline.name}
                      dataKey={discipline.name} 
                      stackId="split"
                      fill={discipline.color}
                      radius={discipline.name === "Swim" ? [4, 0, 0, 4] : discipline.name === "Run" ? [0, 4, 4, 0] : 0}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {disciplineSplitData.map((discipline) => (
                  <div key={discipline.name} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: discipline.color }} />
                    <span className="text-xs text-muted-foreground">{discipline.name} {discipline.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Chart 3: Heart Rate with Sponsor */}
          <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="mb-4 flex items-start justify-between gap-2">
              <div>
                <h5 className="text-base sm:text-lg font-bold text-foreground mb-1">Heart Rate (session)</h5>
                <p className="text-xs text-muted-foreground">BPM over 60 minutes</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] text-muted-foreground/70">Sponsored by</span>
                <img src={huaweiLogo} alt="Huawei" className="h-4 w-auto opacity-70" />
              </div>
            </div>
            <div className="flex gap-3 mb-3">
              <div className="bg-muted/30 px-2 py-1 rounded text-xs">
                <span className="text-muted-foreground">Avg HR: </span>
                <span className="font-semibold text-foreground">158 bpm</span>
              </div>
              <div className="bg-muted/30 px-2 py-1 rounded text-xs">
                <span className="text-muted-foreground">Max HR: </span>
                <span className="font-semibold text-foreground">176 bpm</span>
              </div>
            </div>
            <div className="h-[130px] sm:h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={heartRateData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="hrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 70%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(0, 70%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" />
                  <XAxis 
                    dataKey="minute" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 10 }}
                    tickFormatter={(value) => `${value}m`}
                    interval={14}
                  />
                  <YAxis 
                    domain={[60, 180]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 11 }}
                  />
                  <Tooltip content={<HeartRateTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="bpm" 
                    stroke="hsl(0, 70%, 50%)" 
                    strokeWidth={1.5}
                    fill="url(#hrGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Form Table */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">
          Recent Form
        </h4>
        <div className="glass-card border border-border/30 overflow-hidden animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground">Event</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Date</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Finish</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFormData.map((race, index) => (
                <TableRow key={index} className="border-border/20 hover:bg-muted/20">
                  <TableCell className="font-medium text-sm text-foreground">{race.event}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{race.date}</TableCell>
                  <TableCell>
                    <span className={`text-sm font-semibold ${
                      race.finish === "1st" || race.finish === "Gold" ? "text-yellow-500" :
                      race.finish === "2nd" ? "text-gray-400" :
                      race.finish === "3rd" ? "text-amber-600" :
                      "text-foreground"
                    }`}>
                      {race.finish}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-xs bg-muted/40 text-muted-foreground px-2 py-0.5 rounded">
                      {race.tag}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Footnote */}
      <div className="text-center pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground/70 italic">
          Demo metrics — will be replaced with official race data.
        </p>
      </div>
    </div>
  );
};
