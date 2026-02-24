import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { ContentLibraryModal } from "../ContentLibraryModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { AssetItem, StudioEngagement } from "@/hooks/useStudioAthlete";

type Journey = null | "auto" | "create" | "engage";
type Step = number;

const POST_TEMPLATES = [
  { id: "bts", label: "BTS post", desc: "Training / Travel / Recovery / Routine" },
  { id: "access", label: "Direct access", desc: "Q&A / Live / Voice note" },
  { id: "participate", label: "Weekly prompt", desc: "Vote / Ask / Try" },
  { id: "program", label: "Program update", desc: "Training program news" },
  { id: "recap", label: "Result / announcement recap", desc: "Result / Announcement" },
  { id: "spotlight", label: "Fan spotlight", desc: "Highlight a fan moment" },
  { id: "challenge", label: "Community challenge", desc: "Launch a challenge for fans" },
];

const ENGAGE_TEMPLATES = [
  { type: "poll", label: "Poll", desc: "Ask fans a quick question with multiple choices." },
  { type: "predictor", label: "Predictor", desc: "Let fans predict match scores or outcomes." },
  { type: "qna", label: "Q&A", desc: "Open a question round and answer fan questions." },
  { type: "live_discussion", label: "Live discussion", desc: "Fan-to-fan thread during a match." },
];

const AUTO_STEPS = ["Sources", "Draft", "Preview", "Publish"];
const CREATE_STEPS = ["Template", "Create", "Preview", "Publish"];

interface StudioPublishTabProps {
  onCreatePost: (data: { title: string; body: string; type: string; media: string[]; publish?: boolean }) => Promise<any>;
  assets: AssetItem[];
  onUploadAsset: (file: File) => Promise<string | null>;
  draft?: { title: string; body: string; type: string };
  engagements: StudioEngagement[];
  onCreateEngagement: (data: { type: string; title: string; description: string; payload?: Record<string, any> }) => Promise<any>;
  posts?: Array<{ id: string; type: string; title: string; body: string; media: string[]; status: string; published_at: string | null; created_at: string }>;
}

export const StudioPublishTab = ({ onCreatePost, assets, onUploadAsset, draft, engagements, onCreateEngagement, posts = [] }: StudioPublishTabProps) => {
  const [journey, setJourney] = useState<Journey>(() => draft ? "create" : null);
  const [template, setTemplate] = useState<string | null>(() => draft?.type || null);
  const [step, setStep] = useState<Step>(() => draft ? 1 : 0);
  const [title, setTitle] = useState(() => draft?.title || "");
  const [body, setBody] = useState(() => draft?.body || "");
  const [media, setMedia] = useState<string[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);

  // Engage dialog state
  const [engageType, setEngageType] = useState<string | null>(null);
  const [engageTitle, setEngageTitle] = useState("");
  const [engageDesc, setEngageDesc] = useState("");
  const [engageSaving, setEngageSaving] = useState(false);

  const steps = journey === "auto" ? AUTO_STEPS : CREATE_STEPS;
  const activeEngagements = engagements.filter((e) => e.status === "active");
  const publishedPosts = posts.filter((p) => p.status === "published");
  const draftPosts = posts.filter((p) => p.status === "draft");
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

  const handleEngageCreate = async () => {
    if (!engageType || !engageTitle.trim()) return;
    setEngageSaving(true);
    await onCreateEngagement({ type: engageType, title: engageTitle, description: engageDesc });
    setEngageSaving(false);
    setEngageType(null);
    setEngageTitle("");
    setEngageDesc("");
  };

  // Landing: choose a flow
  if (!journey) {
    return (
      <div className="space-y-4">
        <StudioCard title="Choose a flow" subtitle="Pick how you want to create content.">
          <div className="space-y-3">
            {/* Auto-post hero */}
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

            {/* Create a post templates */}
            <div>
              <p className="text-sm font-semibold mb-2">Create a post — choose a template</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {POST_TEMPLATES.map((t) => (
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

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-xs text-muted-foreground">or engage</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            {/* Engage templates */}
            <div>
              <p className="text-sm font-semibold mb-2">Launch an engagement</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ENGAGE_TEMPLATES.map((t) => (
                  <button
                    key={t.type}
                    onClick={() => { setEngageType(t.type); setEngageTitle(""); setEngageDesc(""); }}
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

        {/* Active engagements */}
        {activeEngagements.length > 0 && (
          <StudioCard title="Active engagements" subtitle="Currently running engagement features.">
            <div className="space-y-2">
              {activeEngagements.slice(0, 5).map((m) => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
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

        {/* My Posts list */}
        {(publishedPosts.length > 0 || draftPosts.length > 0) && (
          <StudioCard title="My posts" subtitle={`${publishedPosts.length} published, ${draftPosts.length} drafts`}>
            <div className="space-y-2">
              {[...publishedPosts, ...draftPosts].slice(0, 10).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="min-w-0 flex-1 mr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 capitalize">{p.type.replace("_", " ")}</Badge>
                      <span className="text-sm font-medium truncate">{p.title || "Untitled"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {p.published_at ? `Published ${new Date(p.published_at).toLocaleDateString()}` : `Draft — ${new Date(p.created_at).toLocaleDateString()}`}
                    </p>
                  </div>
                  <Badge variant={p.status === "published" ? "default" : "outline"} className="text-[10px] shrink-0 capitalize">{p.status}</Badge>
                </div>
              ))}
            </div>
          </StudioCard>
        )}

        {/* Engage creation dialog */}
        <Dialog open={!!engageType} onOpenChange={(v) => !v && setEngageType(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="capitalize">Create {engageType?.replace("_", " ")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <Input value={engageTitle} onChange={(e) => setEngageTitle(e.target.value)} placeholder="Title" />
              <Textarea value={engageDesc} onChange={(e) => setEngageDesc(e.target.value)} placeholder="Description (optional)" className="min-h-[80px]" />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" className="h-9" onClick={() => setEngageType(null)}>Cancel</Button>
                <Button size="sm" className="h-9" onClick={handleEngageCreate} disabled={engageSaving || !engageTitle.trim()}>
                  {engageSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Active journey
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

      {journey === "auto" && step === 0 && (
        <StudioCard title="Auto-post preview" subtitle="This feature is coming soon. You can still create posts manually.">
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-3">AI-powered post generation from your media coverage will be available soon.</p>
            <Button variant="outline" size="sm" className="h-9" onClick={resetAll}>Create manually instead</Button>
          </div>
        </StudioCard>
      )}

      {journey === "create" && step === 1 && (
        <StudioCard title="Create post" subtitle={`Template: ${POST_TEMPLATES.find(t => t.id === template)?.label || ""}`}>
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
