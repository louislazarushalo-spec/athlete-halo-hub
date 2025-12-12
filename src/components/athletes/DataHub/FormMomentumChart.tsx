import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { useState } from "react";

interface MatchData {
  match: number;
  opponent: string;
  score: string;
  surface: string;
  rating: number;
  isWin: boolean;
}

const mockData: MatchData[] = [
  { match: 1, opponent: "T. Paul", score: "6-4, 7-5", surface: "Hard", rating: 78, isWin: true },
  { match: 2, opponent: "A. Rublev", score: "3-6, 4-6", surface: "Hard", rating: 52, isWin: false },
  { match: 3, opponent: "B. Coric", score: "7-6, 6-3", surface: "Hard", rating: 81, isWin: true },
  { match: 4, opponent: "J. Sinner", score: "4-6, 2-6", surface: "Clay", rating: 45, isWin: false },
  { match: 5, opponent: "C. Alcaraz", score: "6-7, 3-6", surface: "Clay", rating: 58, isWin: false },
  { match: 6, opponent: "F. Cerundolo", score: "6-2, 6-4", surface: "Clay", rating: 85, isWin: true },
  { match: 7, opponent: "A. Fils", score: "7-5, 6-4", surface: "Grass", rating: 79, isWin: true },
  { match: 8, opponent: "C. Moutet", score: "6-3, 7-6", surface: "Grass", rating: 82, isWin: true },
  { match: 9, opponent: "U. Humbert", score: "4-6, 6-3, 7-6", surface: "Hard", rating: 88, isWin: true },
  { match: 10, opponent: "A. de Minaur", score: "6-4, 3-6, 6-7", surface: "Hard", rating: 71, isWin: false },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: MatchData;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-1">vs {data.opponent}</p>
        <div className="space-y-1 text-xs">
          <p className="text-muted-foreground">
            <span className={data.isWin ? "text-green-500" : "text-red-500"}>
              {data.isWin ? "W" : "L"}
            </span>
            {" "}{data.score}
          </p>
          <p className="text-muted-foreground">{data.surface}</p>
          <p className="text-primary font-medium">Rating: {data.rating}/100</p>
        </div>
      </div>
    );
  }
  return null;
};

export const FormMomentumChart = () => {
  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">Form Momentum</h4>
        <p className="text-xs sm:text-sm text-muted-foreground">Last 10 matches performance rating</p>
      </div>
      
      <div className="h-[200px] sm:h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="formGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" vertical={false} />
            <XAxis 
              dataKey="match" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 11 }}
              tickFormatter={(value) => `M${value}`}
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 11 }}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={70} stroke="hsl(0, 0%, 30%)" strokeDasharray="5 5" />
            <Area
              type="monotone"
              dataKey="rating"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fill="url(#formGradient)"
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle
                    key={payload.match}
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={payload.isWin ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)"}
                    stroke="hsl(0, 0%, 8%)"
                    strokeWidth={2}
                    className="cursor-pointer"
                  />
                );
              }}
              activeDot={{
                r: 7,
                stroke: "hsl(217, 91%, 60%)",
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
          <span className="text-xs text-muted-foreground">Win</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-xs text-muted-foreground">Loss</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-[2px] border-t-2 border-dashed border-muted-foreground/50" />
          <span className="text-xs text-muted-foreground">Target (70)</span>
        </div>
      </div>
    </div>
  );
};
