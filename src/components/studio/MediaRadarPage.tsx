import { useState } from "react";
import { StudioCard } from "./StudioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, ArrowLeft, ExternalLink, ThumbsUp, ThumbsDown, Plus, Trash2, Search, Sparkles, AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { useMediaRadar, MediaMention } from "@/hooks/useMediaRadar";

interface MediaRadarPageProps {
  mediaRadar: ReturnType<typeof useMediaRadar>;
  athleteName: string;
  athleteSport?: string;
  onBack: () => void;
}

type DateFilter = "7d" | "30d" | "all";
type RelevanceFilter = "all" | "relevant" | "irrelevant" | "unknown";
type ViewMode = "dashboard" | "queries";

export const MediaRadarPage = ({ mediaRadar, athleteName, athleteSport, onBack }: MediaRadarPageProps) => {
  const [dateFilter, setDateFilter] = useState<DateFilter>("30d");
  const [relevanceFilter, setRelevanceFilter] = useState<RelevanceFilter>("all");
  const [publisherFilter, setPublisherFilter] = useState("");
  const [newQuery, setNewQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [view, setView] = useState<ViewMode>("dashboard");

  // Service unavailable state
  if (mediaRadar.serviceAvailable === false) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
        <StudioCard title="Media Radar" subtitle="Latest web coverage about you.">
          <div className="flex flex-col items-center gap-3 py-8">
            <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">Media Radar is temporarily unavailable.</p>
            <Button variant="outline" size="sm" onClick={() => mediaRadar.runScan(athleteName, athleteSport, undefined, language)}>
              <RefreshCw className="h-4 w-4 mr-1" /> Retry
            </Button>
          </div>
        </StudioCard>
      </div>
    );
  }

  // Query manager
  if (view === "queries") {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => setView("dashboard")}><ArrowLeft className="h-4 w-4 mr-1" /> Back to Radar</Button>
        <StudioCard title="Manage queries" subtitle="AI-generated and custom search queries.">
          <div className="space-y-2">
            {mediaRadar.queries.map((q) => (
              <div key={q.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <Switch checked={q.is_enabled} onCheckedChange={(v) => mediaRadar.toggleQuery(q.id, v)} />
                <span className="text-sm flex-1">{q.query_text}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => mediaRadar.removeQuery(q.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <Input value={newQuery} onChange={(e) => setNewQuery(e.target.value)} placeholder="Add query..." className="h-9" onKeyDown={(e) => { if (e.key === "Enter" && newQuery.trim()) { mediaRadar.addQuery(newQuery.trim()); setNewQuery(""); } }} />
              <Button size="sm" className="h-9" onClick={() => { if (newQuery.trim()) { mediaRadar.addQuery(newQuery.trim()); setNewQuery(""); } }}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </StudioCard>
      </div>
    );
  }

  // Dashboard
  const filteredMentions = mediaRadar.mentions.filter((m) => {
    if (dateFilter !== "all") {
      const days = dateFilter === "7d" ? 7 : 30;
      const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      if (new Date(m.created_at) < cutoff) return false;
    }
    if (relevanceFilter !== "all" && m.relevance_status !== relevanceFilter) return false;
    if (publisherFilter && !m.publisher?.toLowerCase().includes(publisherFilter.toLowerCase())) return false;
    return true;
  });

  const newThisWeek = mediaRadar.mentions7d.filter((m) => m.relevance_status !== "irrelevant");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
        <div className="flex gap-2 items-center">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-8 rounded-md bg-muted/40 px-2 text-xs border-0 focus:ring-2 focus:ring-ring">
            <option value="all">All languages</option>
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
          <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setView("queries")}>Manage queries</Button>
          <Button size="sm" className="h-8" onClick={() => mediaRadar.runScan(athleteName, athleteSport, undefined, language)} disabled={mediaRadar.scanning}>
            {mediaRadar.scanning ? <><Loader2 className="h-4 w-4 animate-spin mr-1" /> Scanning...</> : <><Sparkles className="h-4 w-4 mr-1" /> Run scan now</>}
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold">Media Radar</h1>
        <p className="text-sm text-muted-foreground">Latest web coverage about you.</p>
      </div>

      {/* Digest */}
      {mediaRadar.lastDigest && (
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-xs font-medium text-primary mb-1">Weekly digest</p>
          <p className="text-sm text-muted-foreground">{mediaRadar.lastDigest}</p>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-muted/40 p-3 text-center">
          <p className="text-2xl font-semibold">{mediaRadar.mentions7d.length}</p>
          <p className="text-xs text-muted-foreground">Mentions (7d)</p>
        </div>
        <div className="rounded-lg bg-muted/40 p-3 text-center">
          <p className="text-2xl font-semibold">{mediaRadar.mentions30d.length}</p>
          <p className="text-xs text-muted-foreground">Mentions (30d)</p>
        </div>
        <div className="rounded-lg bg-muted/40 p-3 text-center">
          <div className="flex flex-wrap gap-1 justify-center">
            {mediaRadar.topPublishers.slice(0, 3).map(([name, count]) => (
              <Badge key={name} variant="secondary" className="text-[10px]">{name} ({count})</Badge>
            ))}
            {mediaRadar.topPublishers.length === 0 && <span className="text-sm text-muted-foreground">—</span>}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Top publishers</p>
        </div>
      </div>

      {/* Narratives with evidence */}
      {mediaRadar.narrativesWithEvidence.length > 0 && (
        <StudioCard title="Key narratives" subtitle="AI-identified themes from your press coverage.">
          <div className="space-y-3">
            {mediaRadar.narrativesWithEvidence.map((n, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20">
                <p className="text-sm font-medium flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span> {n.theme}
                </p>
                {n.evidence.length > 0 && (
                  <div className="mt-2 space-y-1 pl-4">
                    {n.evidence.map((e) => (
                      <a key={e.id} href={e.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 truncate">
                        <ExternalLink className="h-3 w-3 shrink-0" />
                        <span className="truncate">{e.title}</span>
                        <span className="text-muted-foreground/60 shrink-0">— {e.publisher}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </StudioCard>
      )}

      {/* New this week */}
      {newThisWeek.length > 0 && (
        <StudioCard title="New this week" subtitle={`${newThisWeek.length} new mentions`}>
          <div className="space-y-1.5">
            {newThisWeek.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/20">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.publisher}</p>
                </div>
                <RelevanceBadge status={m.relevance_status} />
                <a href={m.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><ExternalLink className="h-3.5 w-3.5" /></Button>
                </a>
              </div>
            ))}
          </div>
        </StudioCard>
      )}

      {/* Review uncertain queue */}
      {mediaRadar.uncertainMentions.length > 0 && (
        <StudioCard title="Review uncertain" subtitle={`${mediaRadar.uncertainMentions.length} mentions need your review`}>
          <div className="space-y-1.5">
            {mediaRadar.uncertainMentions.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-center gap-2 p-2 rounded-lg bg-accent/10 border border-accent/20">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.publisher} {m.snippet && `— ${m.snippet.slice(0, 60)}...`}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => mediaRadar.updateRelevance(m.id, "relevant")}>
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => mediaRadar.updateRelevance(m.id, "irrelevant")}>
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </StudioCard>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        {(["7d", "30d", "all"] as DateFilter[]).map((f) => (
          <Button key={f} variant={dateFilter === f ? "default" : "outline"} size="sm" className="h-7 text-xs" onClick={() => setDateFilter(f)}>
            {f === "all" ? "All" : f}
          </Button>
        ))}
        <span className="text-muted-foreground text-xs">|</span>
        {(["all", "relevant", "irrelevant"] as RelevanceFilter[]).map((f) => (
          <Button key={f} variant={relevanceFilter === f ? "default" : "outline"} size="sm" className="h-7 text-xs capitalize" onClick={() => setRelevanceFilter(f)}>
            {f === "all" ? "All" : f === "relevant" ? "About me" : "Not about me"}
          </Button>
        ))}
        <div className="relative ml-auto">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input value={publisherFilter} onChange={(e) => setPublisherFilter(e.target.value)} placeholder="Filter publisher..." className="h-7 text-xs pl-7 w-36" />
        </div>
      </div>

      {/* Mentions list */}
      {filteredMentions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground text-sm">
            {mediaRadar.mentions.length === 0 ? "No coverage yet. Click \"Run scan now\" to find mentions." : "No mentions match your filters."}
          </p>
          {mediaRadar.mentions.length === 0 && (
            <Button size="sm" className="mt-3" onClick={() => mediaRadar.runScan(athleteName, athleteSport, undefined, language)} disabled={mediaRadar.scanning}>
              <Sparkles className="h-4 w-4 mr-1" /> Run scan now
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredMentions.map((m) => (
            <MentionRow key={m.id} mention={m} onRelevance={mediaRadar.updateRelevance} />
          ))}
        </div>
      )}

      {/* Last scan info */}
      {mediaRadar.latestScan && (
        <p className="text-xs text-muted-foreground text-center">
          Last scan: {new Date(mediaRadar.latestScan.started_at).toLocaleString()} — {mediaRadar.latestScan.status}
          {mediaRadar.latestScan.error_message && <span className="text-destructive"> ({mediaRadar.latestScan.error_message})</span>}
        </p>
      )}

      {/* Error with retry */}
      {mediaRadar.latestScan?.status === "error" && (
        <div className="text-center">
          <Button variant="outline" size="sm" onClick={() => mediaRadar.runScan(athleteName, athleteSport, undefined, language)} disabled={mediaRadar.scanning}>
            <RefreshCw className="h-4 w-4 mr-1" /> Retry scan
          </Button>
        </div>
      )}
    </div>
  );
};

function RelevanceBadge({ status }: { status: string }) {
  return (
    <Badge
      variant={status === "relevant" ? "default" : status === "irrelevant" ? "destructive" : "secondary"}
      className="text-[9px] shrink-0"
    >
      {status === "relevant" ? "About me" : status === "irrelevant" ? "Not about me" : status === "uncertain" ? "Uncertain" : "Unknown"}
    </Badge>
  );
}

function MentionRow({ mention, onRelevance }: { mention: MediaMention; onRelevance: (id: string, s: "relevant" | "irrelevant") => void }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-background/60 border border-border/30">
      {mention.image_url && (
        <img src={mention.image_url} alt="" className="w-16 h-12 object-cover rounded shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium line-clamp-1">{mention.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground">{mention.publisher}</span>
          {mention.published_at && <span className="text-xs text-muted-foreground">· {new Date(mention.published_at).toLocaleDateString()}</span>}
          <RelevanceBadge status={mention.relevance_status} />
        </div>
        {mention.snippet && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{mention.snippet}</p>}
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <a href={mention.url} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" className="h-7 w-7"><ExternalLink className="h-3.5 w-3.5" /></Button>
        </a>
        <Button variant="ghost" size="icon" className={cn("h-7 w-7", mention.relevance_status === "relevant" && "text-primary")} onClick={() => onRelevance(mention.id, "relevant")}>
          <ThumbsUp className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className={cn("h-7 w-7", mention.relevance_status === "irrelevant" && "text-destructive")} onClick={() => onRelevance(mention.id, "irrelevant")}>
          <ThumbsDown className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
