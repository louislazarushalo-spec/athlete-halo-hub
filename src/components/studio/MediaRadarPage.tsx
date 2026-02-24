import { useState } from "react";
import { StudioCard } from "./StudioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, ArrowLeft, ExternalLink, ThumbsUp, ThumbsDown, Plus, Trash2, Search } from "lucide-react";
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

export const MediaRadarPage = ({ mediaRadar, athleteName, athleteSport, onBack }: MediaRadarPageProps) => {
  const [dateFilter, setDateFilter] = useState<DateFilter>("30d");
  const [relevanceFilter, setRelevanceFilter] = useState<RelevanceFilter>("all");
  const [publisherFilter, setPublisherFilter] = useState<string>("");
  const [showSetup, setShowSetup] = useState(!mediaRadar.config);
  const [showQueries, setShowQueries] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [cxId, setCxId] = useState("");
  const [newQuery, setNewQuery] = useState("");
  const [setupLoading, setSetupLoading] = useState(false);

  const handleSetup = async () => {
    if (!apiKey || !cxId) return;
    setSetupLoading(true);
    await mediaRadar.setupConfig(apiKey, cxId, athleteName, athleteSport);
    setSetupLoading(false);
    setShowSetup(false);
  };

  const handleTestConnection = async () => {
    if (!apiKey || !cxId) return;
    try {
      const params = new URLSearchParams({ key: apiKey, cx: cxId, q: athleteName, num: "1" });
      const res = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
      if (res.ok) {
        alert("Connection successful!");
      } else {
        const data = await res.json();
        alert(`Error: ${data.error?.message || res.statusText}`);
      }
    } catch (err: any) {
      alert(`Connection failed: ${err.message}`);
    }
  };

  // Filter mentions
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

  // Setup state
  if (showSetup && !mediaRadar.config) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
        <StudioCard title="Set up Media Radar" subtitle="Connect Google Custom Search to track press coverage.">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Google CSE API Key</label>
              <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="AIza..." type="password" />
              <p className="text-xs text-muted-foreground mt-1">Get one at <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></p>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Custom Search Engine ID (CX)</label>
              <Input value={cxId} onChange={(e) => setCxId(e.target.value)} placeholder="abc123..." />
              <p className="text-xs text-muted-foreground mt-1">Create one at <a href="https://programmablesearchengine.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Programmable Search Engine</a></p>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={handleTestConnection} disabled={!apiKey || !cxId}>Test connection</Button>
              <Button size="sm" onClick={handleSetup} disabled={!apiKey || !cxId || setupLoading}>
                {setupLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save & create queries"}
              </Button>
            </div>
          </div>
        </StudioCard>
      </div>
    );
  }

  // Query manager
  if (showQueries) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => setShowQueries(false)}><ArrowLeft className="h-4 w-4 mr-1" /> Back to Radar</Button>
        <StudioCard title="Manage queries" subtitle="Search queries used to find mentions.">
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowQueries(true)}>Manage queries</Button>
          <Button size="sm" onClick={mediaRadar.runScan} disabled={mediaRadar.scanning}>
            {mediaRadar.scanning ? <><Loader2 className="h-4 w-4 animate-spin mr-1" /> Scanning...</> : "Run scan now"}
          </Button>
        </div>
      </div>

      <h1 className="text-xl font-semibold">Media Radar</h1>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg bg-muted/40 p-3 text-center">
          <p className="text-2xl font-semibold">{mediaRadar.mentions30d.length}</p>
          <p className="text-xs text-muted-foreground">Mentions (30d)</p>
        </div>
        <div className="rounded-lg bg-muted/40 p-3 text-center">
          <p className="text-2xl font-semibold">{mediaRadar.topPublishers.length}</p>
          <p className="text-xs text-muted-foreground">Publishers</p>
        </div>
        <div className="rounded-lg bg-muted/40 p-3 text-center col-span-2">
          <div className="flex flex-wrap gap-1 justify-center">
            {mediaRadar.topPublishers.slice(0, 3).map(([name, count]) => (
              <Badge key={name} variant="secondary" className="text-[10px]">{name} ({count})</Badge>
            ))}
            {mediaRadar.topPublishers.length === 0 && <span className="text-sm text-muted-foreground">No publishers yet</span>}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Top publishers</p>
        </div>
      </div>

      {/* Narratives */}
      {mediaRadar.latestNarratives.length > 0 && (
        <StudioCard title="Key narratives" subtitle="Themes from your latest scan.">
          <ul className="space-y-1">
            {mediaRadar.latestNarratives.map((n, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span> {n}
              </li>
            ))}
          </ul>
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
        {(["all", "relevant", "irrelevant", "unknown"] as RelevanceFilter[]).map((f) => (
          <Button key={f} variant={relevanceFilter === f ? "default" : "outline"} size="sm" className="h-7 text-xs capitalize" onClick={() => setRelevanceFilter(f)}>
            {f === "all" ? "All" : f === "relevant" ? "About me" : f === "irrelevant" ? "Not about me" : "Unknown"}
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
            {mediaRadar.mentions.length === 0 ? "No coverage yet. Run a scan to find mentions." : "No mentions match your filters."}
          </p>
          {mediaRadar.mentions.length === 0 && (
            <Button size="sm" className="mt-3" onClick={mediaRadar.runScan} disabled={mediaRadar.scanning}>Run scan</Button>
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
    </div>
  );
};

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
          <Badge
            variant={mention.relevance_status === "relevant" ? "default" : mention.relevance_status === "irrelevant" ? "destructive" : "secondary"}
            className="text-[9px] ml-auto"
          >
            {mention.relevance_status === "relevant" ? "About me" : mention.relevance_status === "irrelevant" ? "Not about me" : "Unknown"}
          </Badge>
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
