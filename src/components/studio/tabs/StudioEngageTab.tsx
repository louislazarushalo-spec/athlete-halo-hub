import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { StudioEngagement } from "@/hooks/useStudioAthlete";

const ENGAGE_CARDS = [
  { type: "poll", title: "Poll", subtitle: "Ask fans a quick question with multiple choices.", cta: "Create poll" },
  { type: "predictor", title: "Predictor", subtitle: "Let fans predict match scores or outcomes.", cta: "Create predictor" },
  { type: "qna", title: "Q&A", subtitle: "Open a question round and answer fan questions.", cta: "Start Q&A" },
  { type: "live_discussion", title: "Live discussion", subtitle: "Fan-to-fan thread during a match — you post before and after.", cta: "Start live discussion" },
  { type: "spotlight", title: "Fan Spotlight", subtitle: "Highlight a fan story, question, or moment.", cta: "Create spotlight" },
  { type: "challenge", title: "Community Challenge", subtitle: "Launch a challenge for fans to participate in.", cta: "Create challenge" },
];

interface StudioEngageTabProps {
  engagements: StudioEngagement[];
  onCreateEngagement: (data: { type: string; title: string; description: string; payload?: Record<string, any> }) => Promise<any>;
}

export const StudioEngageTab = ({ engagements, onCreateEngagement }: StudioEngageTabProps) => {
  const [createType, setCreateType] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [saving, setSaving] = useState(false);

  const activeEngagements = engagements.filter((e) => e.status === "active");

  const handleCreate = async () => {
    if (!createType || !formTitle.trim()) return;
    setSaving(true);
    await onCreateEngagement({ type: createType, title: formTitle, description: formDesc });
    setSaving(false);
    setCreateType(null);
    setFormTitle("");
    setFormDesc("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Engage your fans</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ENGAGE_CARDS.map((card) => (
          <StudioCard
            key={card.type}
            title={card.title}
            subtitle={card.subtitle}
            ctaLabel={card.cta}
            onCtaClick={() => { setCreateType(card.type); setFormTitle(""); setFormDesc(""); }}
          />
        ))}
      </div>

      {/* Active moments */}
      {activeEngagements.length > 0 && (
        <StudioCard title="Active moments" subtitle="Currently running engagement features.">
          <div className="space-y-2">
            {activeEngagements.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="min-w-0 flex-1 mr-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 capitalize">{m.type.replace("_", " ")}</Badge>
                    <span className="text-sm font-medium truncate">{m.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{m.description || "No description"}</p>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">Active</Badge>
              </div>
            ))}
          </div>
        </StudioCard>
      )}

      {/* Create modal */}
      <Dialog open={!!createType} onOpenChange={(v) => !v && setCreateType(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="capitalize">Create {createType?.replace("_", " ")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Title" />
            <Textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Description (optional)" className="min-h-[80px]" />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" className="h-9" onClick={() => setCreateType(null)}>Cancel</Button>
              <Button size="sm" className="h-9" onClick={handleCreate} disabled={saving || !formTitle.trim()}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
