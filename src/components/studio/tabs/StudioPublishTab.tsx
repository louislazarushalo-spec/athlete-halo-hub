import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { ContentLibraryModal } from "../ContentLibraryModal";
import { cn } from "@/lib/utils";
import type { AssetItem } from "@/hooks/useStudioAthlete";

type Journey = null | "auto" | "create";
type Step = number;

const TEMPLATES = [
  { id: "bts", label: "BTS post", desc: "Training / Travel / Recovery / Routine" },
  { id: "access", label: "Direct access", desc: "Q&A / Live / Voice note" },
  { id: "participate", label: "Weekly prompt", desc: "Vote / Ask / Try" },
  { id: "program", label: "Program update", desc: "Training program news" },
  { id: "recap", label: "Result / announcement recap", desc: "Result / Announcement" },
  { id: "spotlight", label: "Fan spotlight", desc: "Highlight a fan moment" },
  { id: "challenge", label: "Community challenge", desc: "Launch a challenge for fans" },
];

const AUTO_STEPS = ["Sources", "Draft", "Preview", "Publish"];
const CREATE_STEPS = ["Template", "Create", "Preview", "Publish"];

interface StudioPublishTabProps {
  onCreatePost: (data: { title: string; body: string; type: string; media: string[]; publish?: boolean }) => Promise<any>;
  assets: AssetItem[];
  onUploadAsset: (file: File) => Promise<string | null>;
  draft?: { title: string; body: string; type: string };
}

export const StudioPublishTab = ({ onCreatePost, assets, onUploadAsset, draft }: StudioPublishTabProps) => {
  const [journey, setJourney] = useState<Journey>(() => draft ? "create" : null);
  const [template, setTemplate] = useState<string | null>(() => draft?.type || null);
  const [step, setStep] = useState<Step>(() => draft ? 1 : 0);
  const [title, setTitle] = useState(() => draft?.title || "");
  const [body, setBody] = useState(() => draft?.body || "");
  const [media, setMedia] = useState<string[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);

  const steps = journey === "auto" ? AUTO_STEPS : CREATE_STEPS;

  const resetAll = () => {
    setJourney(null);
    setTemplate(null);
    setStep(0);
    setTitle("");
    setBody("");
    setMedia([]);
  };

  const handlePublish = async () => {
    setPublishing(true);
    const result = await onCreatePost({
      title: title || "Untitled post",
      body,
      type: template || "bts",
      media,
      publish: true,
    });
    setPublishing(false);
    if (result) setStep(3);
  };

  const handleMediaSelect = (asset: AssetItem) => {
    setMedia((prev) => [...prev, asset.url]);
    setLibraryOpen(false);
  };

  if (!journey) {
    return (
      <div className="space-y-4">
        {/* Choose a flow */}
        <StudioCard title="Choose a flow" subtitle="Pick how you want to create content.">
          <div className="space-y-3">
            <button
              onClick={() => { setJourney("auto"); setStep(0); }}
              className="w-full text-left rounded-lg border border-primary/30 bg-primary/5 p-4 hover:border-primary/50 transition-colors"
            >
              <p className="text-sm font-semibold mb-0.5">Auto-post (AI)</p>
              <p className="text-xs text-muted-foreground">
                Generate a post from articles, interviews, highlights and coverage about you.
              </p>
              <Badge variant="secondary" className="mt-2 text-[10px]">Coming soon — preview only</Badge>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Create a post — choose a template</p>
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
        </StudioCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stepper */}
      <div className="sticky top-14 md:top-14 z-40 bg-background/90 backdrop-blur-sm py-2 -mx-4 px-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="h-8" onClick={resetAll}>← Back</Button>
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  i === step ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )}>{s}</span>
                {i < steps.length - 1 && <span className="text-muted-foreground/40">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-post: Sources step */}
      {journey === "auto" && step === 0 && (
        <StudioCard title="Auto-post preview" subtitle="This feature is coming soon. You can still create posts manually.">
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-3">AI-powered post generation from your media coverage will be available soon.</p>
            <Button variant="outline" size="sm" className="h-9" onClick={resetAll}>Create manually instead</Button>
          </div>
        </StudioCard>
      )}

      {/* Create own: Create step */}
      {journey === "create" && step === 1 && (
        <StudioCard title="Create post" subtitle={`Template: ${TEMPLATES.find(t => t.id === template)?.label || ""}`}>
          <div className="space-y-3">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your post..." className="min-h-[120px]" />
            
            {media.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {media.map((url, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-border">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setMedia((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute top-0.5 right-0.5 w-4 h-4 bg-background/80 rounded-full text-xs flex items-center justify-center"
                    >×</button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setLibraryOpen(true)}
              className="w-full p-3 rounded-lg bg-muted/30 border border-dashed border-border text-center text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              + Add media from Content Library
            </button>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-9" onClick={resetAll}>Back</Button>
            <Button size="sm" className="h-9" onClick={() => setStep(2)} disabled={!title.trim()}>Preview</Button>
          </div>
        </StudioCard>
      )}

      {/* Preview step */}
      {step === 2 && (
        <StudioCard title="Preview" subtitle="This is how fans will see your post.">
          <div className="rounded-lg border border-border/50 p-4 bg-muted/20">
            <Badge variant="secondary" className="text-[10px] mb-2">{template || "bts"}</Badge>
            <h4 className="font-semibold text-sm mb-1">{title || "Untitled post"}</h4>
            <p className="text-sm text-muted-foreground">{body || "No content yet."}</p>
            {media.length > 0 && (
              <div className="flex gap-2 mt-3">
                {media.map((url, i) => (
                  <img key={i} src={url} alt="" className="w-20 h-20 rounded-lg object-cover" />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-9" onClick={() => setStep(1)}>Edit</Button>
            <Button size="sm" className="h-9" onClick={handlePublish} disabled={publishing}>
              {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish"}
            </Button>
          </div>
        </StudioCard>
      )}

      {/* Published step */}
      {step === 3 && (
        <StudioCard title="Published" subtitle="Your post is now live on the fan feed.">
          <div className="text-center py-6">
            <span className="text-4xl mb-3 block">🎉</span>
            <p className="text-sm text-muted-foreground mb-4">Your post has been published and is visible to fans.</p>
            <Button size="sm" className="h-9" onClick={resetAll}>Create another</Button>
          </div>
        </StudioCard>
      )}

      <ContentLibraryModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        assets={assets}
        onSelect={handleMediaSelect}
        onUpload={onUploadAsset}
      />
    </div>
  );
};
