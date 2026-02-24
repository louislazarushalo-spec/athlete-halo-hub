import { useState } from "react";
import { StudioCard } from "./StudioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, ArrowLeft, ExternalLink, ThumbsUp, ThumbsDown, Plus, Trash2, Search, Sparkles, Settings2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { useMediaRadar, MediaMention } from "@/hooks/useMediaRadar";

interface MediaRadarPageProps {
  mediaRadar: ReturnType<typeof useMediaRadar>;
  athleteName: string;
  athleteSport?: string;
  athleteClub?: string;
  onBack: () => void;
}

type DateFilter = "7d" | "30d" | "all";
type RelevanceFilter = "all" | "relevant" | "irrelevant" | "uncertain" | "unknown";
type ViewMode = "setup" | "dashboard" | "queries" | "advanced";

export const MediaRadarPage = ({ mediaRadar, athleteName, athleteSport, athleteClub, onBack }: MediaRadarPageProps) => {
  const [dateFilter, setDateFilter] = useState<DateFilter>("30d");
  const [relevanceFilter, setRelevanceFilter] = useState<RelevanceFilter>("all");
  const [publisherFilter, setPublisherFilter] = useState("");
  const [newQuery, setNewQuery] = useState("");

  // Advanced settings
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(`media_radar_api_key_${mediaRadar.config?.athlete_id || ""}`) || "");
  const [cxId, setCxId] = useState(() => localStorage.getItem(`media_radar_cx_id_${mediaRadar.config?.athlete_id || ""}`) || "");
  const [language, setLanguage] = useState("all");

  const hasKeys = !!(apiKey || localStorage.getItem(`media_radar_api_key_${mediaRadar.config?.athlete_id || ""}`));

  // View mode
  const initialView: ViewMode = mediaRadar.config && mediaRadar.mentions.length > 0 ? "dashboard" : "setup";
  const [view, setView] = useState<ViewMode>(initialView);

  // AI Setup screen
  if (view === "setup") {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>

        <StudioCard title="Media Radar — AI Setup" subtitle="Let AI find and analyze your press coverage automatically.">
          <div className="space-y-5">
            {/* Pre-filled athlete info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Athlete</label>
                <div className="h-10 flex items-center px-3 rounded-md bg-muted/40 text-sm">{athleteName || "—"}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Sport</label>
                <div className="h-10 flex items-center px-3 rounded-md bg-muted/40 text-sm">{athleteSport || "—"}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Team / Club</label>
                <div className="h-10 flex items-center px-3 rounded-md bg-muted/40 text-sm">{athleteClub || "—"}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-10 w-full rounded-md bg-muted/40 px-3 text-sm border-0 focus:ring-2 focus:ring-ring">
                  <option value="all">All</option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>

            {/* API key check */}
            {!hasKeys && (
              <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-destructive">Search API key required</p>
                  <p className="text-xs text-muted-foreground mt-0.5">You need a Google CSE API key to scan. Add it in Advanced settings below.</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">AI will generate optimized search queries, run the scan, auto-classify results as relevant/uncertain/irrelevant, and extract key narratives from your coverage.</p>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => setView("advanced")}>
                <Settings2 className="h-3.5 w-3.5 mr-1" /> Advanced settings
              </Button>
              <Button
                onClick={() => {
                  mediaRadar.runAiScan(athleteName, athleteSport, athleteClub, language, apiKey, cxId);
                  if (hasKeys) setView("dashboard");
                }}
                disabled={mediaRadar.scanning || !hasKeys}
              >
                {mediaRadar.scanning ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Running AI scan...</>
                ) : (
                  <><Sparkles className="h-4 w-4 mr-2" /> Start AI scan</>
                )}
              </Button>
            </div>
          </div>
        </StudioCard>
      </div>
    );
  }

  // Advanced settings
  if (view === "advanced") {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => setView(mediaRadar.config ? "dashboard" : "setup")}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <StudioCard title="Advanced settings" subtitle="Configure your search API provider.">
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
              <Button
                size="sm"
                onClick={() => {
                  if (apiKey) localStorage.setItem(`media_radar_api_key_${mediaRadar.config?.athlete_id || ""}`, apiKey);
                  if (cxId) localStorage.setItem(`media_radar_cx_id_${mediaRadar.config?.athlete_id || ""}`, cxId);
                  setView(mediaRadar.config ? "dashboard" : "setup");
                }}
              >
                Save
              </Button>
            </div>
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
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setView("advanced")}>
            <Settings2 className="h-3.5 w-3.5 mr-1" /> Settings
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={() => setView("queries")}>Manage queries</Button>
          <Button size="sm" className="h-8" onClick={() => mediaRadar.runAiScan(athleteName, athleteSport, athleteClub, language)} disabled={mediaRadar.scanning}>
            {mediaRadar.scanning ? <><Loader2 className="h-4 w-4 animate-spin mr-1" /> Scanning...</> : <><Sparkles className="h-4 w-4 mr-1" /> Run AI scan</>}
          </Button>
        </div>
      </div>

      <h1 className="text-xl font-semibold">Media Radar</h1>

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
        {(["all", "relevant", "uncertain", "irrelevant"] as RelevanceFilter[]).map((f) => (
          <Button key={f} variant={relevanceFilter === f ? "default" : "outline"} size="sm" className="h-7 text-xs capitalize" onClick={() => setRelevanceFilter(f)}>
            {f === "all" ? "All" : f === "relevant" ? "About me" : f === "uncertain" ? "Uncertain" : "Not about me"}
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
            {mediaRadar.mentions.length === 0 ? "No coverage yet. Run an AI scan to find mentions." : "No mentions match your filters."}
          </p>
          {mediaRadar.mentions.length === 0 && (
            <Button size="sm" className="mt-3" onClick={() => setView("setup")} disabled={mediaRadar.scanning}>
              <Sparkles className="h-4 w-4 mr-1" /> Start AI scan
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
