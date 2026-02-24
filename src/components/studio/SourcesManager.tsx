import { useState } from "react";
import { StudioCard } from "./StudioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { AthleteSource } from "@/hooks/useStudioSources";

const SOCIAL_PLATFORMS = [
  { id: "instagram", label: "Instagram", color: "bg-pink-500/10 text-pink-400" },
  { id: "tiktok", label: "TikTok", color: "bg-cyan-500/10 text-cyan-400" },
  { id: "youtube", label: "YouTube", color: "bg-red-500/10 text-red-400" },
  { id: "x", label: "X", color: "bg-foreground/10 text-foreground" },
  { id: "facebook", label: "Facebook", color: "bg-blue-500/10 text-blue-400" },
  { id: "snapchat", label: "Snapchat", color: "bg-yellow-500/10 text-yellow-400" },
];

const OWNED_TYPES = [
  { id: "federation_national", label: "National federation" },
  { id: "federation_international", label: "International federation" },
  { id: "league", label: "League" },
  { id: "club", label: "Club" },
  { id: "official_site", label: "Official website" },
];

const EARNED_TYPES = [
  { id: "sports_media", label: "Sports media" },
  { id: "specialist_media", label: "Specialist media" },
  { id: "fan_blog", label: "Fan blog" },
];

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  connected: { label: "Connected", className: "bg-green-500/10 text-green-400" },
  disconnected: { label: "Disconnected", className: "bg-muted text-muted-foreground" },
  error: { label: "Error", className: "bg-destructive/10 text-destructive" },
};

interface SourcesManagerProps {
  sources: AthleteSource[];
  onAddSource: (s: { category: "social" | "owned" | "earned"; subtype: string; url?: string; handle?: string }) => Promise<any>;
  onUpdateSource: (id: string, updates: { url?: string; handle?: string; status?: string }) => Promise<void>;
  onRemoveSource: (id: string) => Promise<void>;
  onSync: () => Promise<void>;
  syncing: boolean;
  loading: boolean;
}

export const SourcesManager = ({
  sources,
  onAddSource,
  onUpdateSource,
  onRemoveSource,
  onSync,
  syncing,
  loading,
}: SourcesManagerProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [addDialog, setAddDialog] = useState<{ category: "social" | "owned" | "earned" } | null>(null);
  const [addSubtype, setAddSubtype] = useState("");
  const [addUrl, setAddUrl] = useState("");
  const [addHandle, setAddHandle] = useState("");
  const [adding, setAdding] = useState(false);

  const socialSources = sources.filter((s) => s.category === "social");
  const ownedSources = sources.filter((s) => s.category === "owned");
  const earnedSources = sources.filter((s) => s.category === "earned");

  const connectedCount = (list: AthleteSource[]) => list.filter((s) => s.status === "connected").length;

  const handleAdd = async () => {
    if (!addDialog || !addSubtype) return;
    setAdding(true);
    await onAddSource({
      category: addDialog.category,
      subtype: addSubtype,
      url: addUrl || undefined,
      handle: addHandle || undefined,
    });
    setAdding(false);
    setAddDialog(null);
    setAddSubtype("");
    setAddUrl("");
    setAddHandle("");
  };

  const subtypeOptions = addDialog?.category === "social" ? SOCIAL_PLATFORMS : addDialog?.category === "owned" ? OWNED_TYPES : EARNED_TYPES;

  const renderSourceRow = (category: "social" | "owned" | "earned", label: string, list: AthleteSource[]) => (
    <div className="rounded-lg border border-border/50 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="min-w-0 flex-1">
          <span className="text-sm font-medium">{label}</span>
          <p className="text-xs text-muted-foreground">
            {connectedCount(list)}/{list.length} connected
            {list.some((s) => s.last_synced_at) && ` · Last sync ${new Date(list.find((s) => s.last_synced_at)!.last_synced_at!).toLocaleDateString()}`}
          </p>
        </div>
        <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setExpanded(expanded === category ? null : category)}>
          {expanded === category ? "Minimize" : "Manage"}
        </Button>
      </div>

      {category === "social" && expanded !== category && (
        <div className="flex flex-wrap gap-1.5">
          {SOCIAL_PLATFORMS.map((p) => {
            const src = list.find((s) => s.subtype === p.id);
            return (
              <Badge key={p.id} variant="secondary" className={cn("text-xs font-normal", src?.status === "connected" ? p.color : "bg-muted/50 text-muted-foreground/50")}>
                {p.label}
              </Badge>
            );
          })}
        </div>
      )}

      {expanded === category && (
        <div className="mt-3 space-y-2">
          {list.length === 0 && (
            <p className="text-xs text-muted-foreground py-2">No sources added yet.</p>
          )}
          {list.map((src) => {
            const statusInfo = STATUS_BADGE[src.status] || STATUS_BADGE.disconnected;
            return (
              <div key={src.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium capitalize">{src.subtype.replace(/_/g, " ")}</p>
                  <p className="text-xs text-muted-foreground truncate">{src.handle || src.url || "No URL"}</p>
                </div>
                <Badge variant="secondary" className={cn("text-[10px] shrink-0", statusInfo.className)}>
                  {statusInfo.label}
                </Badge>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => onRemoveSource(src.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </div>
            );
          })}
          <Button variant="outline" size="sm" className="h-8 text-xs w-full" onClick={() => setAddDialog({ category })}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add source
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <StudioCard
        title="Sources"
        subtitle="Connect channels so Halo can track content and learn what performs best."
        ctaLabel={syncing ? "Syncing..." : "Sync now"}
        onCtaClick={onSync}
      >
        {loading ? (
          <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="space-y-3">
            {renderSourceRow("social", "Social media", socialSources)}
            {renderSourceRow("owned", "Owned channels", ownedSources)}
            {renderSourceRow("earned", "Earned channels", earnedSources)}
          </div>
        )}
      </StudioCard>

      {/* Add source dialog */}
      <Dialog open={!!addDialog} onOpenChange={(o) => !o && setAddDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add {addDialog?.category} source</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Type</label>
              <Select value={addSubtype} onValueChange={setAddSubtype}>
                <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
                <SelectContent>
                  {subtypeOptions?.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {addDialog?.category === "social" ? (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Handle or profile URL</label>
                <Input value={addHandle} onChange={(e) => setAddHandle(e.target.value)} placeholder="@username or https://..." />
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium mb-1.5 block">URL</label>
                <Input value={addUrl} onChange={(e) => setAddUrl(e.target.value)} placeholder="https://..." />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAddDialog(null)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!addSubtype || adding}>
              {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add source"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
