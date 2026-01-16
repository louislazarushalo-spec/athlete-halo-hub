import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Historical world ranking progression
const historicalData = [
  { year: "2017", ranking: 32, earnings: 3.2 },
  { year: "2018", ranking: 12, earnings: 5.8 },
  { year: "2019", ranking: 16, earnings: 4.9 },
  { year: "2020", ranking: 18, earnings: 3.1 },
  { year: "2021", ranking: 25, earnings: 4.2 },
  { year: "2022", ranking: 21, earnings: 5.1 },
  { year: "2023", ranking: 19, earnings: 6.2 },
  { year: "2024", ranking: 17, earnings: 7.1 },
  { year: "2025", ranking: 22, earnings: 3.8 },
];

export const TommyHistoricalChart = () => {
  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h5 className="font-semibold text-foreground">World Ranking Progression</h5>
          <p className="text-xs text-muted-foreground">OWGR ranking over time</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-primary rounded" />
            <span className="text-muted-foreground">World Ranking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-green-500 rounded" />
            <span className="text-muted-foreground">Earnings ($M)</span>
          </div>
        </div>
      </div>
      
      <div className="h-48 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historicalData}>
            <defs>
              <linearGradient id="rankingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="ranking"
              reversed
              domain={[1, 40]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              width={30}
              tickFormatter={(value) => `#${value}`}
            />
            <YAxis 
              yAxisId="earnings"
              orientation="right"
              domain={[0, 10]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              width={35}
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'ranking') return [`#${value}`, 'World Ranking'];
                return [`$${value}M`, 'Earnings'];
              }}
            />
            <Area
              yAxisId="ranking"
              type="monotone"
              dataKey="ranking"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#rankingGradient)"
            />
            <Line
              yAxisId="earnings"
              type="monotone"
              dataKey="earnings"
              stroke="hsl(142, 76%, 36%)"
              strokeWidth={2}
              dot={{ r: 3, fill: 'hsl(142, 76%, 36%)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
