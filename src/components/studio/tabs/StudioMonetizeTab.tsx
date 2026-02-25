import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { PublishStepper } from "../publish/PublishStepper";
import type { StudioMonetizationConfig } from "@/hooks/useStudioAthlete";

const MONETIZE_CARDS = [
  { type: "membership", title: "Membership", subtitle: "Create tiered access for your most dedicated fans.", cta: "Set up membership" },
  { type: "drops", title: "Drops", subtitle: "Attach purchasable items to any content — kit-room style.", cta: "Create a drop" },
  { type: "tips", title: "Tips", subtitle: "Let fans show appreciation with direct tips.", cta: "Enable tips" },
  { type: "shoutouts", title: "Shoutouts", subtitle: "Offer personalized video messages to fans.", cta: "Set up shoutouts" },
  { type: "paid_live", title: "Paid live", subtitle: "Host exclusive paid live sessions with your community.", cta: "Set up paid live" },
];

const SETUP_STEPS = ["Type", "Build", "Preview", "Post"];

const monetizeCardStyle = {
  background: "linear-gradient(155deg, hsl(220 30% 14%) 0%, hsl(220 40% 9%) 100%)",
  border: "1.5px solid hsl(220 60% 40% / 0.45)",
  boxShadow:
    "0 0 0 0.5px hsl(220 60% 50% / 0.15), " +
    "inset 0 1px 0 0 hsl(220 60% 60% / 0.1), " +
    "0 0 20px -2px hsl(220 80% 55% / 0.25), " +
    "0 6px 24px -6px hsl(0 0% 0% / 0.5)",
};

interface StudioMonetizeTabProps {
  monetization: StudioMonetizationConfig[];
  onSaveMonetization: (data: { type: string; config: Record<string, any> }) => Promise<any>;
}

export const StudioMonetizeTab = ({ monetization, onSaveMonetization }: StudioMonetizeTabProps) => {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [step, setStep] = useState(1); // start at Build (skip Type since card selection = Type)
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [saving, setSaving] = useState(false);

  const getExisting = (type: string) => monetization.find((m) => m.type === type);

  const openFlow = (type: string) => {
    const existing = getExisting(type);
    setActiveType(type);
    setStep(1); // skip Type, land on Build
    setFormName((existing?.config as any)?.name || "");
    setFormDesc((existing?.config as any)?.description || "");
    setFormPrice((existing?.config as any)?.price || "");
  };

  const resetFlow = () => {
    setActiveType(null);
    setStep(1);
    setFormName("");
    setFormDesc("");
    setFormPrice("");
  };

  const hasDraft = formName.length > 0 || formDesc.length > 0 || formPrice.length > 0;

  const handleActivate = async () => {
    if (!activeType) return;
    setSaving(true);
    await onSaveMonetization({
      type: activeType,
      config: { name: formName, description: formDesc, price: formPrice },
    });
    setSaving(false);
    setStep(3);
  };

  const activeLabel = activeType ? MONETIZE_CARDS.find((c) => c.type === activeType)?.title || activeType : "";

  // ─── Setup flow (stepper-based) ───
  if (activeType) {
    return (
      <div className="space-y-3">
        <PublishStepper steps={SETUP_STEPS} currentStep={step} onBack={resetFlow} confirmLeave={hasDraft} />

        {/* Step 1 — Build */}
        {step === 1 && (
          <div className="rounded-xl border border-border/60 bg-card p-3.5 md:p-6">
            <div className="mb-1">
              <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-tight">
                Set up {activeLabel}
              </h3>
              <p className="text-[12px] md:text-sm text-muted-foreground mt-0.5 leading-snug">
                Configure the basics. You can refine later.
              </p>
            </div>
            <div className="space-y-3 mt-4">
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Name / tier"
                className="h-11 text-sm"
              />
              <Textarea
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="Description for fans"
                className="min-h-[100px] text-sm"
              />
              <Input
                value={formPrice}
                onChange={(e) => setFormPrice(e.target.value)}
                placeholder="Price (€)"
                type="number"
                className="h-11 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={resetFlow}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="h-11 text-sm"
                onClick={() => setStep(2)}
                disabled={!formName.trim()}
              >
                Preview
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 — Preview */}
        {step === 2 && (
          <div className="rounded-xl border border-border/60 bg-card p-3.5 md:p-6">
            <div className="mb-1">
              <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-tight">
                Preview
              </h3>
              <p className="text-[12px] md:text-sm text-muted-foreground mt-0.5 leading-snug">
                This is how fans will see it.
              </p>
            </div>
            <div className="rounded-lg border border-border/50 p-4 bg-muted/20 mt-4">
              <Badge variant="secondary" className="text-[10px] mb-2 capitalize">
                {activeType?.replace("_", " ")}
              </Badge>
              <h4 className="font-semibold text-sm mb-1">{formName || "Untitled"}</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {formDesc || "No description."}
              </p>
              {formPrice && (
                <p className="text-sm font-semibold mt-2">€{formPrice}</p>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Payment processing is not enabled yet. This saves as a draft.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={() => setStep(1)}>
                Edit
              </Button>
              <Button size="sm" className="h-11 text-sm" onClick={handleActivate} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Activate"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 — Done */}
        {step === 3 && (
          <div className="rounded-xl border border-border/60 bg-card p-3.5 md:p-6">
            <div className="text-center py-6">
              <span className="text-4xl mb-3 block">🎉</span>
              <h3 className="text-[15px] font-semibold mb-1">{activeLabel} activated</h3>
              <p className="text-sm text-muted-foreground mb-4">Saved as draft. You can edit anytime.</p>
              <Button size="sm" className="h-11 text-sm" onClick={resetFlow}>
                Back to Monetize
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── Landing ───
  return (
    <div className="space-y-4">
      <h2 className="text-lg md:text-xl font-semibold text-foreground">
        Set up ways for fans to support you.
      </h2>

      <div className="space-y-3">
        {MONETIZE_CARDS.map((card) => {
          const existing = getExisting(card.type);
          return (
            <button
              key={card.type}
              onClick={() => openFlow(card.type)}
              className="w-full text-left rounded-2xl p-4 md:p-5 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              style={monetizeCardStyle}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] md:text-base font-semibold text-foreground leading-tight line-clamp-1">
                      {card.title}
                    </h3>
                    {existing && (
                      <Badge variant="secondary" className="text-[10px] capitalize shrink-0">
                        {existing.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                    {card.subtitle}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0 h-9 text-[13px] md:text-sm pointer-events-none"
                  tabIndex={-1}
                >
                  {existing ? "Edit" : card.cta}
                </Button>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
