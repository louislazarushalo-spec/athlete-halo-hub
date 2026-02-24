import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { StudioPost, StudioEngagement } from "@/hooks/useStudioAthlete";

const TIME_RANGES = ["7D", "30D", "90D", "All"];

interface StudioAnalyticsTabProps {
  posts: StudioPost[];
  engagements: StudioEngagement[];
  followerCount?: number;
}

export const StudioAnalyticsTab = ({ posts, engagements, followerCount }: StudioAnalyticsTabProps) => {
  const [range, setRange] = useState("7D");

  const publishedPosts = posts.filter((p) => p.status === "published");

  return (
    <div className="space-y-4">
      {/* Macro KPIs */}
      <StudioCard title="Macro KPIs" subtitle="Your key metrics at a glance.">
        <div className="flex items-center gap-2 mb-3">
          {TIME_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                range === r ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >{r}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Views", value: "—" },
            { label: "Opt-ins", value: String(followerCount ?? "—") },
            { label: "Engagement", value: String(engagements.filter(e => e.status === "active").length) },
            { label: "Purchases", value: "—" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-lg bg-muted/30 p-3 text-center">
              <p className="text-lg font-semibold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </div>
          ))}
        </div>
      </StudioCard>

      {/* Audience */}
      <StudioCard title="Audience" subtitle="Demographics and retention overview.">
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
            <p className="text-xs text-muted-foreground mb-2">New vs Returning</p>
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
      <StudioCard title="Content performance" subtitle="Your top posts by publish date.">
        {publishedPosts.length > 0 ? (
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border/40">
                  <th className="text-left py-2 px-1 font-medium">Post</th>
                  <th className="text-right py-2 px-1 font-medium">Type</th>
                  <th className="text-right py-2 px-1 font-medium hidden sm:table-cell">Published</th>
                </tr>
              </thead>
              <tbody>
                {publishedPosts.slice(0, 10).map((post) => (
                  <tr key={post.id} className="border-b border-border/20">
                    <td className="py-2 px-1 max-w-[200px] truncate">{post.title}</td>
                    <td className="py-2 px-1 text-right text-muted-foreground capitalize">{post.type}</td>
                    <td className="py-2 px-1 text-right text-muted-foreground hidden sm:table-cell">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No published posts yet.</p>
        )}
      </StudioCard>
    </div>
  );
};
