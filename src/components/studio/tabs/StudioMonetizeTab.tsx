import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { StudioMonetizationConfig } from "@/hooks/useStudioAthlete";

const MONETIZE_CARDS = [
  { type: "membership", title: "Membership", subtitle: "Create tiered access for your most dedicated fans.", cta: "Set up membership" },
  { type: "drops", title: "Drops", subtitle: "Attach purchasable items to any content — kit-room style.", cta: "Create a drop" },
  { type: "tips", title: "Tips", subtitle: "Let fans show appreciation with direct tips.", cta: "Enable tips" },
  { type: "shoutouts", title: "Shoutouts", subtitle: "Offer personalized video messages to fans.", cta: "Set up shoutouts" },
  { type: "paid_live", title: "Paid live", subtitle: "Host exclusive paid live sessions with your community.", cta: "Set up paid live" },
];

interface StudioMonetizeTabProps {
  monetization: StudioMonetizationConfig[];
  onSaveMonetization: (data: { type: string; config: Record<string, any> }) => Promise<any>;
}

export const StudioMonetizeTab = ({ monetization, onSaveMonetization }: StudioMonetizeTabProps) => {
  const [editType, setEditType] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [saving, setSaving] = useState(false);

  const getExisting = (type: string) => monetization.find((m) => m.type === type);

  const openSetup = (type: string) => {
    const existing = getExisting(type);
    setEditType(type);
    setFormName((existing?.config as any)?.name || "");
    setFormDesc((existing?.config as any)?.description || "");
    setFormPrice((existing?.config as any)?.price || "");
  };

  const handleSave = async () => {
    if (!editType) return;
    setSaving(true);
    await onSaveMonetization({
      type: editType,
      config: { name: formName, description: formDesc, price: formPrice },
    });
    setSaving(false);
    setEditType(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Monetize</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MONETIZE_CARDS.map((card) => {
          const existing = getExisting(card.type);
          return (
            <StudioCard
              key={card.type}
              title={card.title}
              subtitle={card.subtitle}
              ctaLabel={existing ? "Edit" : card.cta}
              onCtaClick={() => openSetup(card.type)}
            >
              {existing && (
                <Badge variant="secondary" className="text-[10px] capitalize">{existing.status}</Badge>
              )}
            </StudioCard>
          );
        })}
      </div>

      <Dialog open={!!editType} onOpenChange={(v) => !v && setEditType(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="capitalize">Set up {editType?.replace("_", " ")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Name / tier" />
            <Textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Description" className="min-h-[60px]" />
            <Input value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="Price (€)" type="number" />
            <p className="text-xs text-muted-foreground">Payment processing is not enabled yet. This saves as a draft.</p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" className="h-9" onClick={() => setEditType(null)}>Cancel</Button>
              <Button size="sm" className="h-9" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save draft"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
