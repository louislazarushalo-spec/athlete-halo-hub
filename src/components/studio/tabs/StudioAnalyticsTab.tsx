import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIME_RANGES = ["7D", "30D", "90D", "All"];

const TOP_POSTS = [
  { title: "Training highlights — Week 12", impressions: "8.2K", engagement: "24%", optins: 142, purchases: 18 },
  { title: "Pre-match voice note", impressions: "6.1K", engagement: "31%", optins: 98, purchases: 5 },
  { title: "Fan vote: Best celebration", impressions: "5.8K", engagement: "42%", optins: 210, purchases: 0 },
  { title: "Match recap vs Spain", impressions: "4.3K", engagement: "18%", optins: 67, purchases: 12 },
  { title: "Recovery routine BTS", impressions: "3.9K", engagement: "22%", optins: 54, purchases: 8 },
];

export const StudioAnalyticsTab = () => {
  const [range, setRange] = useState("7D");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Analytics</h2>
        <div className="flex items-center bg-muted/50 rounded-lg p-0.5 gap-0.5">
          {TIME_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                range === r ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Macro KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Opt-ins", value: "1,842", change: "+12%" },
          { label: "Views", value: "45.2K", change: "+8%" },
          { label: "Engagement", value: "24%", change: "+3%" },
          { label: "Purchases", value: "€4,180", change: "+15%" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-border/60 bg-card p-4 text-center">
            <p className="text-xl font-bold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
            <p className="text-xs text-emerald-500 dark:text-emerald-400 mt-1">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Audience */}
      <StudioCard title="Audience" subtitle="Who's following and engaging with you.">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Demographics</p>
            <div className="space-y-1.5">
              {[
                { label: "18–24", pct: 35 },
                { label: "25–34", pct: 40 },
                { label: "35–44", pct: 15 },
                { label: "45+", pct: 10 },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <span className="text-xs w-10 text-muted-foreground">{d.label}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/60 rounded-full" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Retention</p>
            <div className="space-y-2">
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-lg font-semibold">68%</p>
                <p className="text-xs text-muted-foreground">Returning</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-lg font-semibold">32%</p>
                <p className="text-xs text-muted-foreground">New</p>
              </div>
            </div>
          </div>
        </div>
      </StudioCard>

      {/* Content performance */}
      <StudioCard title="Content performance" subtitle="Your top posts by engagement.">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border/40">
                <th className="text-left py-2 px-1 font-medium">Post</th>
                <th className="text-right py-2 px-1 font-medium">Views</th>
                <th className="text-right py-2 px-1 font-medium">Eng.</th>
                <th className="text-right py-2 px-1 font-medium hidden sm:table-cell">Opt-ins</th>
                <th className="text-right py-2 px-1 font-medium hidden sm:table-cell">Sales</th>
              </tr>
            </thead>
            <tbody>
              {TOP_POSTS.map((post, i) => (
                <tr key={i} className="border-b border-border/20">
                  <td className="py-2 px-1 max-w-[180px] truncate">{post.title}</td>
                  <td className="py-2 px-1 text-right text-muted-foreground">{post.impressions}</td>
                  <td className="py-2 px-1 text-right text-muted-foreground">{post.engagement}</td>
                  <td className="py-2 px-1 text-right text-muted-foreground hidden sm:table-cell">{post.optins}</td>
                  <td className="py-2 px-1 text-right text-muted-foreground hidden sm:table-cell">{post.purchases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StudioCard>
    </div>
  );
};
