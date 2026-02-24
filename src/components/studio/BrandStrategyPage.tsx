import { useState } from "react";
import { StudioCard } from "./StudioCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronRight, Check } from "lucide-react";
import type { BrandProfile, StrategyPack } from "@/hooks/useStudioBrandStrategy";
import type { ContentItem } from "@/hooks/useStudioSources";
import { cn } from "@/lib/utils";

const BRAND_QUESTIONS = [
  { key: "positioning", label: "How would you describe your positioning as an athlete?", placeholder: "e.g. The fearless underdog who plays with joy..." },
  { key: "values", label: "What are your 3 core values?", placeholder: "e.g. Authenticity, hard work, family..." },
  { key: "audience", label: "Who is your ideal fan/audience?", placeholder: "e.g. Young athletes aged 16-28 who love the sport..." },
  { key: "voice", label: "How would you describe your voice on social media?", placeholder: "e.g. Casual, positive, a bit funny, never too serious..." },
  { key: "boundaries", label: "What topics are off-limits?", placeholder: "e.g. Politics, private relationships, contract details..." },
  { key: "goals", label: "What's your #1 goal for your personal brand this year?", placeholder: "e.g. Build a global fanbase, attract new sponsors..." },
  { key: "sponsors", label: "Which sponsors do you want to highlight?", placeholder: "e.g. Nike, TAG Heuer, Red Bull..." },
  { key: "inspiration", label: "Which athletes' brands do you admire?", placeholder: "e.g. Cristiano Ronaldo, Serena Williams..." },
];

interface BrandStrategyPageProps {
  brandProfile: BrandProfile | null;
  strategyPack: StrategyPack | null;
  contentItems: ContentItem[];
  sourcesCount: number;
  onSaveBrandProfile: (answers: Record<string, any>) => Promise<void>;
  onGenerateStrategy: (contentItems: ContentItem[], brandAnswers: Record<string, any>) => Promise<void>;
  onSyncSources: () => Promise<void>;
  generating: boolean;
  syncing: boolean;
  onNavigatePublish: (draft?: { title: string; body: string; type: string }) => void;
}

export const BrandStrategyPage = ({
  brandProfile,
  strategyPack,
  contentItems,
  sourcesCount,
  onSaveBrandProfile,
  onGenerateStrategy,
  onSyncSources,
  generating,
  syncing,
  onNavigatePublish,
}: BrandStrategyPageProps) => {
  const [step, setStep] = useState(() => {
    if (strategyPack?.pack_json?.positioning_statement) return 3;
    if (brandProfile?.answers_json && Object.keys(brandProfile.answers_json).length > 0) return 2;
    return 0;
  });
  const [answers, setAnswers] = useState<Record<string, string>>(
    () => (brandProfile?.answers_json as Record<string, string>) || {}
  );
  const [saving, setSaving] = useState(false);

  const steps = ["Collect", "Audit", "Define", "Strategy pack"];

  const handleSaveAnswers = async () => {
    setSaving(true);
    await onSaveBrandProfile(answers);
    setSaving(false);
    setStep(2);
  };

  const handleGenerate = async () => {
    await onGenerateStrategy(contentItems, answers);
    setStep(3);
  };

  const pack = strategyPack?.pack_json as any;

  return (
    <div className="space-y-4">
      {/* Stepper */}
      <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={cn(
              "flex-1 text-center py-2 px-2 rounded-md text-xs font-medium transition-all",
              step === i ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="hidden sm:inline">{i + 1}. </span>{s}
          </button>
        ))}
      </div>

      {/* Step 0: Collect */}
      {step === 0 && (
        <StudioCard title="Collect content" subtitle="Ensure your sources are connected so we can analyze your content.">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium">{sourcesCount} sources connected</p>
                <p className="text-xs text-muted-foreground">{contentItems.length} content items tracked</p>
              </div>
              <Button variant="outline" size="sm" className="h-9" onClick={onSyncSources} disabled={syncing}>
                {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sync now"}
              </Button>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                {contentItems.length === 0 ? "Continue with limited data" : "Continue"}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </StudioCard>
      )}

      {/* Step 1: Audit */}
      {step === 1 && (
        <StudioCard title="Audit" subtitle="Review what performs and how you're perceived.">
          <div className="space-y-3">
            {contentItems.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No content items yet. Connect sources first.</p>
            ) : (
              <div>
                <h4 className="text-sm font-medium mb-2">Top content ({contentItems.length} items)</h4>
                <div className="space-y-1.5">
                  {contentItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{item.title || "Untitled"}</p>
                        <p className="text-xs text-muted-foreground">{item.type} · {item.published_at ? new Date(item.published_at).toLocaleDateString() : "No date"}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px] capitalize shrink-0">{item.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => setStep(0)}>Back</Button>
              <Button variant="outline" size="sm" onClick={() => setStep(2)}>
                Continue <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </StudioCard>
      )}

      {/* Step 2: Define */}
      {step === 2 && (
        <StudioCard title="Define your brand" subtitle="Answer these questions to shape your strategy.">
          <div className="space-y-4">
            {BRAND_QUESTIONS.map((q) => (
              <div key={q.key}>
                <label className="text-sm font-medium mb-1.5 block">{q.label}</label>
                <Textarea
                  value={answers[q.key] || ""}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [q.key]: e.target.value }))}
                  placeholder={q.placeholder}
                  className="min-h-[60px] resize-none"
                />
              </div>
            ))}
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Back</Button>
              <Button size="sm" onClick={handleSaveAnswers} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save & generate strategy"}
              </Button>
            </div>
          </div>
        </StudioCard>
      )}

      {/* Step 3: Strategy Pack */}
      {step === 3 && (
        <>
          {!pack?.positioning_statement ? (
            <StudioCard title="Strategy pack" subtitle="Generate your brand strategy based on your content and profile.">
              <div className="text-center py-6">
                <Button onClick={handleGenerate} disabled={generating}>
                  {generating ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...</> : "Generate strategy pack"}
                </Button>
              </div>
            </StudioCard>
          ) : (
            <div className="space-y-4">
              <StudioCard title="Positioning" subtitle={pack.positioning_statement} />

              {pack.pillars?.length > 0 && (
                <StudioCard title="Brand pillars">
                  <div className="space-y-2">
                    {pack.pillars.map((p: any, i: number) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/30">
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                        {p.examples?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {p.examples.map((ex: string, j: number) => (
                              <Badge key={j} variant="secondary" className="text-[10px] font-normal">{ex}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </StudioCard>
              )}

              {pack.voice_guide && (
                <StudioCard title="Voice guide" subtitle={pack.voice_guide.tone}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-xs font-medium text-primary mb-1.5">Do</p>
                      {pack.voice_guide.do?.map((d: string, i: number) => (
                        <p key={i} className="text-xs text-muted-foreground flex items-start gap-1"><Check className="h-3 w-3 text-primary mt-0.5 shrink-0" />{d}</p>
                      ))}
                    </div>
                    <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                      <p className="text-xs font-medium text-destructive mb-1.5">Don't</p>
                      {pack.voice_guide.dont?.map((d: string, i: number) => (
                        <p key={i} className="text-xs text-muted-foreground">× {d}</p>
                      ))}
                    </div>
                  </div>
                </StudioCard>
              )}

              {pack.signature_series?.length > 0 && (
                <StudioCard title="Signature series">
                  <div className="space-y-2">
                    {pack.signature_series.map((s: any, i: number) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{s.name}</p>
                          <Badge variant="secondary" className="text-[10px]">{s.frequency}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </StudioCard>
              )}

              {pack.audit_summary && (
                <StudioCard title="Audit summary">
                  <div className="space-y-3">
                    {pack.audit_summary.patterns_that_work?.length > 0 && (
                      <div>
                        <p className="text-xs font-medium mb-1">Patterns that work</p>
                        <div className="flex flex-wrap gap-1.5">
                          {pack.audit_summary.patterns_that_work.map((p: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs font-normal">{p}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {pack.audit_summary.perception_summary && (
                      <div>
                        <p className="text-xs font-medium mb-1">Perception</p>
                        <p className="text-xs text-muted-foreground">{pack.audit_summary.perception_summary}</p>
                      </div>
                    )}
                    {pack.audit_summary.opportunities?.length > 0 && (
                      <div>
                        <p className="text-xs font-medium mb-1">Opportunities</p>
                        {pack.audit_summary.opportunities.map((o: string, i: number) => (
                          <p key={i} className="text-xs text-muted-foreground">• {o}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </StudioCard>
              )}

              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setStep(2)}>Edit brand definition</Button>
                <Button size="sm" onClick={handleGenerate} disabled={generating}>
                  {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Regenerate"}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
