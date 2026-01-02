import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface QualifyingData {
  session: string;
  rate: number;
}

const mockData: QualifyingData[] = [
  { session: "Q1", rate: 100 },
  { session: "Q2", rate: 90 },
  { session: "Q3", rate: 70 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: QualifyingData;
    value: number;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-1">{data.session} Progression</p>
        <p className="text-xs text-primary">{data.rate}% of races</p>
      </div>
    );
  }
  return null;
};

export const PierreQualifyingChart = () => {
  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">Qualifying Performance</h4>
        <p className="text-xs sm:text-sm text-muted-foreground">Session progression rate (2025)</p>
      </div>
      
      <div className="h-[120px] sm:h-[140px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={mockData} 
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 18%)" vertical={false} />
            <XAxis 
              dataKey="session"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 11 }}
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(0, 0%, 15%)" }} />
            <Bar 
              dataKey="rate" 
              radius={[4, 4, 0, 0]}
              fill="hsl(0, 84%, 60%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-3 border-t border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          <span className="text-primary font-medium">Strong qualifier</span> — 70% Q3 appearances this season
        </p>
      </div>
    </div>
  );
};
