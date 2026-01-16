import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

// Strokes Gained categories
const strokesGainedData = [
  { category: "Off the Tee", value: 0.42, abbr: "OTT" },
  { category: "Approach", value: 0.85, abbr: "APP" },
  { category: "Around Green", value: 0.18, abbr: "ARG" },
  { category: "Putting", value: -0.12, abbr: "PUT" },
  { category: "Total", value: 1.33, abbr: "TOT" },
];

export const TommyStrokesGainedChart = () => {
  return (
    <div className="glass-card p-4 sm:p-5 border border-border/30">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h5 className="font-semibold text-foreground text-sm">Strokes Gained</h5>
          <p className="text-xs text-muted-foreground">2025 Season Average</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-green-500">+1.33</span>
          <p className="text-xs text-muted-foreground">Total SG</p>
        </div>
      </div>
      
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={strokesGainedData} layout="vertical">
            <XAxis 
              type="number"
              domain={[-0.5, 1.5]}
              tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              type="category"
              dataKey="abbr" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              width={35}
            />
            <ReferenceLine x={0} stroke="hsl(var(--border))" strokeDasharray="3 3" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '11px',
              }}
              formatter={(value: number) => [value.toFixed(2), 'Strokes Gained']}
              labelFormatter={(label) => {
                const item = strokesGainedData.find(d => d.abbr === label);
                return item?.category || label;
              }}
            />
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]}
            >
              {strokesGainedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.value >= 0 ? 'hsl(142, 76%, 36%)' : 'hsl(var(--destructive))'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
