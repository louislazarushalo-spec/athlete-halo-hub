import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface RallyData {
  category: string;
  shortLabel: string;
  won: number;
  lost: number;
}

const mockData: RallyData[] = [
  { category: "Short (1-4 shots)", shortLabel: "1-4", won: 58, lost: 42 },
  { category: "Medium (5-8 shots)", shortLabel: "5-8", won: 52, lost: 48 },
  { category: "Long (9+ shots)", shortLabel: "9+", won: 61, lost: 39 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: RallyData;
    value: number;
    name: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-2">{data.category}</p>
        <div className="space-y-1 text-xs">
          <p className="text-green-500">Won: {data.won}%</p>
          <p className="text-red-400">Lost: {data.lost}%</p>
        </div>
      </div>
    );
  }
  return null;
};

export const RallyDominanceChart = () => {
  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">Rally Dominance</h4>
        <p className="text-xs sm:text-sm text-muted-foreground">Win rate by rally length</p>
      </div>
      
      <div className="h-[180px] sm:h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={mockData} 
            layout="vertical" 
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" horizontal={false} />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              type="category" 
              dataKey="shortLabel"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 11 }}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(0, 0%, 15%)" }} />
            <Bar 
              dataKey="won" 
              stackId="rally"
              radius={[0, 0, 0, 0]}
              fill="hsl(142, 76%, 36%)"
            />
            <Bar 
              dataKey="lost" 
              stackId="rally"
              radius={[0, 4, 4, 0]}
              fill="hsl(0, 60%, 40%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 pt-3 border-t border-border/30">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-green-600" />
          <span className="text-xs text-muted-foreground">Won</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-red-700" />
          <span className="text-xs text-muted-foreground">Lost</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          <span className="text-primary font-medium">Strong in extended rallies</span> — 61% win rate on 9+ shot points
        </p>
      </div>
    </div>
  );
};
