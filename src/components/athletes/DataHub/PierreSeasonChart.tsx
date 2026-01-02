import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface RaceData {
  race: number;
  grandPrix: string;
  qualifying: number;
  finish: number;
  points: number;
  didFinish: boolean;
}

const mockData: RaceData[] = [
  { race: 1, grandPrix: "Bahrain", qualifying: 7, finish: 8, points: 4, didFinish: true },
  { race: 2, grandPrix: "Saudi Arabia", qualifying: 9, finish: 7, points: 6, didFinish: true },
  { race: 3, grandPrix: "Australia", qualifying: 6, finish: 6, points: 8, didFinish: true },
  { race: 4, grandPrix: "Japan", qualifying: 8, finish: 12, points: 0, didFinish: true },
  { race: 5, grandPrix: "China", qualifying: 5, finish: 5, points: 10, didFinish: true },
  { race: 6, grandPrix: "Miami", qualifying: 7, finish: 9, points: 2, didFinish: true },
  { race: 7, grandPrix: "Emilia Romagna", qualifying: 6, finish: 4, points: 12, didFinish: true },
  { race: 8, grandPrix: "Monaco", qualifying: 4, finish: 6, points: 8, didFinish: true },
  { race: 9, grandPrix: "Canada", qualifying: 11, finish: 0, points: 0, didFinish: false },
  { race: 10, grandPrix: "Spain", qualifying: 8, finish: 7, points: 6, didFinish: true },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: RaceData;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-1">{data.grandPrix} GP</p>
        <div className="space-y-1 text-xs">
          <p className="text-muted-foreground">
            Qualifying: <span className="text-primary font-medium">P{data.qualifying}</span>
          </p>
          <p className="text-muted-foreground">
            Finish: <span className={data.didFinish ? (data.finish <= 10 ? "text-green-500" : "text-foreground") : "text-red-500"}>
              {data.didFinish ? `P${data.finish}` : "DNF"}
            </span>
          </p>
          <p className="text-primary font-medium">{data.points} points</p>
        </div>
      </div>
    );
  }
  return null;
};

export const PierreSeasonChart = () => {
  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">Season Performance</h4>
        <p className="text-xs sm:text-sm text-muted-foreground">Race finish positions (2025 season)</p>
      </div>
      
      <div className="h-[200px] sm:h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="pierreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" vertical={false} />
            <XAxis 
              dataKey="race" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 11 }}
              tickFormatter={(value) => `R${value}`}
            />
            <YAxis 
              domain={[1, 20]}
              reversed={true}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 11 }}
              width={35}
              tickFormatter={(value) => `P${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={10} stroke="hsl(0, 0%, 30%)" strokeDasharray="5 5" />
            <Area
              type="monotone"
              dataKey="finish"
              stroke="hsl(0, 84%, 60%)"
              strokeWidth={2}
              fill="url(#pierreGradient)"
              dot={(props) => {
                const { cx, cy, payload } = props;
                if (!payload.didFinish) return null;
                return (
                  <circle
                    key={payload.race}
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={payload.points > 0 ? "hsl(142, 76%, 36%)" : "hsl(0, 0%, 40%)"}
                    stroke="hsl(0, 0%, 8%)"
                    strokeWidth={2}
                    className="cursor-pointer"
                  />
                );
              }}
              activeDot={{
                r: 7,
                stroke: "hsl(0, 84%, 60%)",
                strokeWidth: 2,
                fill: "hsl(0, 0%, 8%)"
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 pt-3 border-t border-border/30">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground">Points</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground" />
          <span className="text-xs text-muted-foreground">No Points</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-[2px] border-t-2 border-dashed border-muted-foreground/50" />
          <span className="text-xs text-muted-foreground">P10 (points threshold)</span>
        </div>
      </div>
    </div>
  );
};
