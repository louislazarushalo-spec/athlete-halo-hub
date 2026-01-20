import { TrendingUp, TrendingDown, Minus, Trophy, Target, Percent, Award } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from "recharts";

// Global Statistics - Golf specific
const globalStats = {
  worldRanking: { value: "15", trend: "up", label: "World Ranking" },
  seasonWins: { value: "2", trend: "up", label: "2025 Wins" },
  top10Rate: { value: "42%", trend: "up", label: "Top 10 Rate" },
  scoringAvg: { value: "69.8", trend: "down", label: "Scoring Avg" },
};

// Finish trend data - Last 10 tournaments (lower is better in golf)
const finishTrendData = [
  { event: "1", finish: 12, name: "The Sentry" },
  { event: "2", finish: 5, name: "Sony Open" },
  { event: "3", finish: 28, name: "Farmers Insurance" },
  { event: "4", finish: 3, name: "AT&T Pebble Beach" },
  { event: "5", finish: 8, name: "Genesis Invitational" },
  { event: "6", finish: 1, name: "Arnold Palmer Inv." },
  { event: "7", finish: 15, name: "THE PLAYERS" },
  { event: "8", finish: 6, name: "Valspar Championship" },
  { event: "9", finish: 2, name: "Masters" },
  { event: "10", finish: 10, name: "RBC Heritage" },
];

// Strokes Gained Split - Key golf performance categories
const strokesGainedData = [
  { category: "Off the Tee", value: 0.45, fill: "hsl(var(--primary))" },
  { category: "Approach", value: 0.82, fill: "hsl(142, 76%, 36%)" },
  { category: "Around Green", value: 0.28, fill: "hsl(45, 93%, 47%)" },
  { category: "Putting", value: 0.35, fill: "hsl(200, 80%, 50%)" },
];

// Round performance data - 18-hole cumulative score
const roundPerformanceData = [
  { hole: 1, score: 0, cumulative: 0 },
  { hole: 2, score: -1, cumulative: -1 },
  { hole: 3, score: 0, cumulative: -1 },
  { hole: 4, score: 1, cumulative: 0 },
  { hole: 5, score: -1, cumulative: -1 },
  { hole: 6, score: -1, cumulative: -2 },
  { hole: 7, score: 0, cumulative: -2 },
  { hole: 8, score: -1, cumulative: -3 },
  { hole: 9, score: 0, cumulative: -3 },
  { hole: 10, score: -1, cumulative: -4 },
  { hole: 11, score: 0, cumulative: -4 },
  { hole: 12, score: 1, cumulative: -3 },
  { hole: 13, score: -1, cumulative: -4 },
  { hole: 14, score: -1, cumulative: -5 },
  { hole: 15, score: 0, cumulative: -5 },
  { hole: 16, score: -1, cumulative: -6 },
  { hole: 17, score: 0, cumulative: -6 },
  { hole: 18, score: -1, cumulative: -7 },
];

// Recent tournament results
const recentFormData = [
  { event: "RBC Heritage", date: "Apr 2025", finish: "T10", score: "-12", earnings: "$520,000" },
  { event: "Masters", date: "Apr 2025", finish: "2nd", score: "-15", earnings: "$2,160,000" },
  { event: "Valspar Championship", date: "Mar 2025", finish: "T6", score: "-11", earnings: "$380,000" },
  { event: "THE PLAYERS", date: "Mar 2025", finish: "T15", score: "-8", earnings: "$290,000" },
  { event: "Arnold Palmer Inv.", date: "Mar 2025", finish: "1st", score: "-18", earnings: "$3,600,000" },
];

// Custom Tooltip components
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload?: { name?: string } }>;
  label?: string;
}

const FinishTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{data.payload?.name}</p>
        <p className="text-xs text-muted-foreground">
          Finish: <span className="text-primary font-semibold">{data.value}{getOrdinalSuffix(data.value)}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ScoreTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const cumulative = payload[0].value;
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">Hole {label}</p>
        <p className="text-xs text-muted-foreground">
          Score: <span className="text-primary font-semibold">{cumulative > 0 ? `+${cumulative}` : cumulative}</span>
        </p>
      </div>
    );
  }
  return null;
};

const getOrdinalSuffix = (n: number): string => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="h-3 w-3 text-green-500" />;
  if (trend === "down") return <TrendingDown className="h-3 w-3 text-green-500" />;
  return <Minus className="h-3 w-3 text-muted-foreground" />;
};

export const TommyDataHub = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Performance Data Hub</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Tommy Fleetwood's 2025 PGA Tour performance analytics
        </p>
      </div>

      {/* Global Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {Object.entries(globalStats).map(([key, stat]) => (
          <div 
            key={key}
            className="glass-card p-4 md:p-5 text-center space-y-1"
          >
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
              <TrendIcon trend={stat.trend} />
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Performance Analytics Section */}
      <div className="space-y-4">
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Performance Analytics</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Finish Trend Chart */}
          <div className="glass-card p-4 md:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-foreground text-sm md:text-base">Finish Trend (Last 10)</h4>
            </div>
            <div className="h-48 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={finishTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="event" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    reversed
                    domain={[1, 30]}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <Tooltip content={<FinishTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="finish" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground text-center">
              Lower position = better finish
            </p>
          </div>

          {/* Strokes Gained Split */}
          <div className="glass-card p-4 md:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-foreground text-sm md:text-base">Strokes Gained Split</h4>
            </div>
            <div className="h-48 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={strokesGainedData} 
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} horizontal={false} />
                  <XAxis 
                    type="number"
                    domain={[0, 1]}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    type="category"
                    dataKey="category"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`+${value.toFixed(2)}`, 'Strokes Gained']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {strokesGainedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground text-center">
              Total SG: +1.90 (Tour Avg: 0.00)
            </p>
          </div>

          {/* Round Performance Chart */}
          <div className="glass-card p-4 md:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <h4 className="font-medium text-foreground text-sm md:text-base">Sample Round</h4>
              </div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/TaylorMade_Golf_Logo.svg/512px-TaylorMade_Golf_Logo.svg.png" 
                alt="TaylorMade" 
                className="h-4 md:h-5 opacity-60"
              />
            </div>
            <div className="h-48 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roundPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="hole" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    domain={[-8, 2]}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    tickFormatter={(value) => value > 0 ? `+${value}` : value}
                  />
                  <Tooltip content={<ScoreTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="cumulative" 
                    stroke="hsl(142, 76%, 36%)" 
                    strokeWidth={2}
                    fill="url(#scoreGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground text-center">
              Final Round: 65 (-7) | Arnold Palmer Invitational
            </p>
          </div>
        </div>
      </div>

      {/* Recent Form Table */}
      <div className="glass-card p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Percent className="h-4 w-4 text-primary" />
          <h4 className="font-medium text-foreground text-sm md:text-base">Recent Tournament Form</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 px-2 md:px-3 text-muted-foreground font-medium text-xs md:text-sm">Event</th>
                <th className="text-center py-2 px-2 md:px-3 text-muted-foreground font-medium text-xs md:text-sm">Date</th>
                <th className="text-center py-2 px-2 md:px-3 text-muted-foreground font-medium text-xs md:text-sm">Finish</th>
                <th className="text-center py-2 px-2 md:px-3 text-muted-foreground font-medium text-xs md:text-sm">Score</th>
                <th className="text-right py-2 px-2 md:px-3 text-muted-foreground font-medium text-xs md:text-sm">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {recentFormData.map((result, index) => (
                <tr key={index} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-2.5 px-2 md:px-3 text-foreground font-medium text-xs md:text-sm">{result.event}</td>
                  <td className="py-2.5 px-2 md:px-3 text-center text-muted-foreground text-xs md:text-sm">{result.date}</td>
                  <td className="py-2.5 px-2 md:px-3 text-center">
                    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium ${
                      result.finish === "1st" ? "bg-yellow-500/20 text-yellow-400" :
                      result.finish === "2nd" ? "bg-gray-400/20 text-gray-300" :
                      result.finish.includes("T") && parseInt(result.finish.slice(1)) <= 10 ? "bg-green-500/20 text-green-400" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {result.finish}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 md:px-3 text-center text-primary font-medium text-xs md:text-sm">{result.score}</td>
                  <td className="py-2.5 px-2 md:px-3 text-right text-foreground text-xs md:text-sm">{result.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] md:text-xs text-muted-foreground text-center italic">
        * Demo data for visualization purposes. Actual stats via PGA Tour integration.
      </p>
    </div>
  );
};
