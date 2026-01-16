import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// 2025 season tournament finishes
const seasonData = [
  { tournament: "Sony Open", finish: 15, made: true },
  { tournament: "Farmers", finish: 8, made: true },
  { tournament: "Phoenix Open", finish: 22, made: true },
  { tournament: "Genesis", finish: 3, made: true },
  { tournament: "Arnold Palmer", finish: 12, made: true },
  { tournament: "Players", finish: 5, made: true },
  { tournament: "Masters", finish: 18, made: true },
  { tournament: "PGA Champ", finish: 7, made: true },
];

const getFinishColor = (finish: number) => {
  if (finish === 1) return "hsl(var(--primary))";
  if (finish <= 3) return "hsl(142, 76%, 36%)"; // Green for podium
  if (finish <= 10) return "hsl(217, 91%, 60%)"; // Blue for top 10
  if (finish <= 25) return "hsl(var(--muted-foreground))";
  return "hsl(var(--destructive))";
};

export const TommySeasonChart = () => {
  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="font-semibold text-foreground">2025 Tournament Finishes</h5>
          <p className="text-xs text-muted-foreground">Position by tournament</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Top 3</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">Top 10</span>
          </div>
        </div>
      </div>
      
      <div className="h-48 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={seasonData} layout="horizontal">
            <XAxis 
              dataKey="tournament" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis 
              reversed
              domain={[1, 30]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              width={25}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`T${value}`, 'Finish']}
              labelFormatter={(label) => label}
            />
            <Bar 
              dataKey="finish" 
              radius={[4, 4, 0, 0]}
            >
              {seasonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getFinishColor(entry.finish)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
