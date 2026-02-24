import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Journey = null | "auto" | "create";
type Step = number;

const TEMPLATES = [
  { id: "bts", label: "BTS", desc: "Training / Travel / Recovery / Routine" },
  { id: "access", label: "Direct access", desc: "Q&A / Live / Voice note" },
  { id: "participate", label: "Weekly prompt", desc: "Vote / Ask / Try" },
  { id: "program", label: "Program update", desc: "Training program news" },
  { id: "recap", label: "Result recap", desc: "Result / Announcement" },
];

const AUTO_STEPS = ["Sources", "Draft", "Preview", "Publish"];
const CREATE_STEPS = ["Template", "Create", "Preview", "Publish"];

export const StudioPublishTab = () => {
  const [journey, setJourney] = useState<Journey>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const [step, setStep] = useState<Step>(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const steps = journey === "auto" ? AUTO_STEPS : CREATE_STEPS;

  const resetAll = () => {
    setJourney(null);
    setTemplate(null);
    setStep(0);
    setTitle("");
    setBody("");
  };

  if (!journey) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Choose your flow</h2>

        {/* Auto-post hero */}
        <button
          onClick={() => { setJourney("auto"); setStep(0); }}
          className="w-full text-left rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5 p-5 hover:border-primary/60 transition-colors"
        >
          <p className="text-base font-semibold mb-1">✨ Auto-post (AI)</p>
          <p className="text-sm text-muted-foreground">
            Generate a post from highlights, interviews, and articles about you.
          </p>
        </button>

        {/* Create own */}
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <p className="text-base font-semibold mb-3">Create my own post</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setJourney("create"); setTemplate(t.id); setStep(1); setTitle(t.label + " — "); }}
                className="text-left p-3 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" size="sm" className="h-8" onClick={resetAll}>← Back</Button>
        <div className="flex items-center gap-1">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <span className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                i === step ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}>
                {s}
              </span>
              {i < steps.length - 1 && <span className="text-muted-foreground/40">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Auto-post: Sources step */}
      {journey === "auto" && step === 0 && (
        <StudioCard
          title="Select sources"
          subtitle="Choose which channels to scan for content."
        >
          <div className="space-y-2">
            {["Instagram", "YouTube", "Press coverage", "Match highlights"].map((src) => (
              <label key={src} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">{src}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button size="sm" className="h-9" onClick={() => setStep(1)}>Generate draft</Button>
          </div>
        </StudioCard>
      )}

      {/* Auto-post: Draft step */}
      {journey === "auto" && step === 1 && (
        <StudioCard title="AI Draft" subtitle="Review and edit your generated post.">
          <div className="space-y-3">
            <Input
              value={title || "Training highlights — Week 12"}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Textarea
              value={body || "Here's a look at this week's training intensity..."}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border text-center text-sm text-muted-foreground">
              + Add media from Content Library
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-9" onClick={() => setStep(0)}>Back</Button>
            <Button size="sm" className="h-9" onClick={() => setStep(2)}>Preview</Button>
          </div>
        </StudioCard>
      )}

      {/* Create own: Create step */}
      {journey === "create" && step === 1 && (
        <StudioCard title="Create post" subtitle={`Template: ${TEMPLATES.find(t => t.id === template)?.label || ""}`}>
          <div className="space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
            />
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post..."
              className="min-h-[120px]"
            />
            <div className="p-3 rounded-lg bg-muted/30 border border-dashed border-border text-center text-sm text-muted-foreground">
              + Add media from Content Library
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-9" onClick={resetAll}>Back</Button>
            <Button size="sm" className="h-9" onClick={() => setStep(2)}>Preview</Button>
          </div>
        </StudioCard>
      )}

      {/* Preview step (shared) */}
      {step === 2 && (
        <StudioCard title="Preview" subtitle="This is how fans will see your post.">
          <div className="rounded-lg border border-border/50 p-4 bg-muted/20">
            <h4 className="font-semibold text-sm mb-1">{title || "Untitled post"}</h4>
            <p className="text-sm text-muted-foreground">{body || "No content yet."}</p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-9" onClick={() => setStep(1)}>Edit</Button>
            <Button size="sm" className="h-9" onClick={() => setStep(3)}>Publish</Button>
          </div>
        </StudioCard>
      )}

      {/* Publish step */}
      {step === 3 && (
        <StudioCard title="Published" subtitle="Your post is now live on the fan feed.">
          <div className="text-center py-6">
            <span className="text-4xl mb-3 block">🎉</span>
            <p className="text-sm text-muted-foreground mb-4">Your post has been published successfully.</p>
            <Button size="sm" className="h-9" onClick={resetAll}>Create another</Button>
          </div>
        </StudioCard>
      )}
    </div>
  );
};
