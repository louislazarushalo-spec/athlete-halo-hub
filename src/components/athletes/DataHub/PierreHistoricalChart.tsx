import { useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Historical F1 career data for Pierre Gasly
const historicalData = [
  { season: "2017", team: "Toro Rosso", position: 0, points: 0, races: 5, podiums: 0, wins: 0, bestFinish: 11 },
  { season: "2018", team: "Toro Rosso", position: 15, points: 29, races: 21, podiums: 0, wins: 0, bestFinish: 4 },
  { season: "2019", team: "RBR/TR", position: 7, points: 95, races: 21, podiums: 1, wins: 0, bestFinish: 2 },
  { season: "2020", team: "AlphaTauri", position: 10, points: 75, races: 17, podiums: 1, wins: 1, bestFinish: 1 },
  { season: "2021", team: "AlphaTauri", position: 9, points: 110, races: 22, podiums: 0, wins: 0, bestFinish: 4 },
  { season: "2022", team: "AlphaTauri", position: 14, points: 23, races: 22, podiums: 0, wins: 0, bestFinish: 5 },
  { season: "2023", team: "Alpine", position: 11, points: 62, races: 22, podiums: 0, wins: 0, bestFinish: 4 },
  { season: "2024", team: "Alpine", position: 13, points: 42, races: 24, podiums: 0, wins: 0, bestFinish: 7 },
  { season: "2025", team: "Alpine", position: 8, points: 62, races: 7, podiums: 0, wins: 0, bestFinish: 5 },
];

const chartConfig = {
  points: {
    label: "Points",
    color: "hsl(var(--primary))",
  },
  position: {
    label: "Championship Position",
    color: "hsl(var(--secondary))",
  },
  podiums: {
    label: "Podiums",
    color: "hsl(45 100% 50%)",
  },
};

export const PierreHistoricalChart = () => {
  const [viewMode, setViewMode] = useState<"points" | "position" | "milestones">("points");

  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.5s" }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-foreground">Career Progression</h4>
          <p className="text-xs text-muted-foreground">Performance trends across F1 seasons (2017-2025)</p>
        </div>
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)}>
          <TabsList className="h-8">
            <TabsTrigger value="points" className="text-xs px-3">Points</TabsTrigger>
            <TabsTrigger value="position" className="text-xs px-3">Position</TabsTrigger>
            <TabsTrigger value="milestones" className="text-xs px-3">Milestones</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        {viewMode === "points" ? (
          <LineChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="season" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              domain={[0, 'dataMax + 20']}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{value} points</span>
                      <span className="text-xs text-muted-foreground">{item.payload.team}</span>
                      <span className="text-xs text-muted-foreground">Best finish: P{item.payload.bestFinish}</span>
                    </div>
                  )}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="points"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "white", strokeWidth: 2 }}
            />
          </LineChart>
        ) : viewMode === "position" ? (
          <LineChart data={historicalData.filter(d => d.position > 0)} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="season" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis 
              reversed
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              domain={[1, 20]}
              tickFormatter={(value) => `P${value}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">P{value} in Championship</span>
                      <span className="text-xs text-muted-foreground">{item.payload.team}</span>
                      <span className="text-xs text-muted-foreground">{item.payload.points} points</span>
                    </div>
                  )}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="position"
              stroke="hsl(var(--secondary))"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "hsl(var(--secondary))", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "hsl(var(--secondary))", stroke: "white", strokeWidth: 2 }}
            />
          </LineChart>
        ) : (
          <BarChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="season" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{item.payload.races} races</span>
                      <span className="text-xs">{item.payload.podiums} podiums, {item.payload.wins} wins</span>
                      <span className="text-xs text-muted-foreground">{item.payload.team}</span>
                    </div>
                  )}
                />
              }
            />
            <Bar
              dataKey="races"
              fill="hsl(var(--muted))"
              radius={[4, 4, 0, 0]}
              name="Races"
            />
            <Bar
              dataKey="podiums"
              fill="hsl(45 100% 50%)"
              radius={[4, 4, 0, 0]}
              name="Podiums"
            />
            <Bar
              dataKey="wins"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              name="Wins"
            />
          </BarChart>
        )}
      </ChartContainer>

      {/* Career highlights legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">2020: Monza Victory</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-xs text-muted-foreground">2019: Brazil P2</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-xs text-muted-foreground">2021: Career-high 110 pts</span>
        </div>
      </div>
    </div>
  );
};
