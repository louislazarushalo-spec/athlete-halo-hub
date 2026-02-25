import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { PublishStepper } from "./PublishStepper";
import { ContentLibraryModal } from "../ContentLibraryModal";
import type { AssetItem } from "@/hooks/useStudioAthlete";

const MANUAL_STEPS = ["Choose type", "Compose", "Preview", "Publish"];

type ContentCategory = "post" | "program" | "engagement";

const POST_FORMATS = [
  { id: "photo", label: "Photo" },
  { id: "video", label: "Video" },
  { id: "text", label: "Text" },
  { id: "audio", label: "Audio" },
];

const POST_IDEAS = [
  "Behind the scenes at training",
  "Pre-game routine",
  "Travel day vibes",
  "Recovery session",
  "Q&A with fans",
  "Gear check",
  "Match day recap",
  "Fan shout-out",
  "Motivation Monday",
  "Nutrition tip",
  "Throwback moment",
  "Team bonding",
  "Off-season update",
  "Challenge accepted",
  "Live voice note",
];

const PROGRAM_CATEGORIES = [
  { id: "fitness", label: "Fitness", desc: "Strength, cardio, flexibility" },
  { id: "skills", label: "Skills", desc: "Sport-specific drills" },
  { id: "nutrition", label: "Nutrition", desc: "Meal plans & tips" },
  { id: "mental", label: "Mental", desc: "Mindset & recovery" },
];

const ENGAGEMENT_TYPES = [
  { id: "prize_draw", label: "Prize draw" },
  { id: "live_discussion", label: "Live discussion" },
  { id: "poll", label: "Poll" },
  { id: "predictor", label: "Predictor" },
  { id: "qna", label: "Q&A" },
  { id: "fan_spotlight", label: "Fan spotlight" },
  { id: "community_challenge", label: "Community challenge" },
];

interface ManualFlowProps {
  onBack: () => void;
  onCreatePost: (data: { title: string; body: string; type: string; media: string[]; publish?: boolean }) => Promise<any>;
  onCreateEngagement: (data: { type: string; title: string; description: string; payload?: Record<string, any> }) => Promise<any>;
  assets: AssetItem[];
  onUploadAsset: (file: File) => Promise<string | null>;
  draft?: { title: string; body: string; type: string };
}

export const ManualFlow = ({ onBack, onCreatePost, onCreateEngagement, assets, onUploadAsset, draft }: ManualFlowProps) => {
  const [step, setStep] = useState(draft ? 1 : 0);
  const [category, setCategory] = useState<ContentCategory | null>(draft ? "post" : null);
  const [subType, setSubType] = useState<string>(draft?.type || "photo");

  const [title, setTitle] = useState(draft?.title || "");
  const [body, setBody] = useState(draft?.body || "");
  const [media, setMedia] = useState<string[]>([]);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const hasDraft = title.length > 0 || body.length > 0;

  const handleSelectSubType = (type: string) => {
    setSubType(type);
    setStep(1);
  };

  const handleIdeaTap = (idea: string) => {
    setTitle(idea);
    setSubType("text");
    setStep(1);
  };

  const handlePublish = async () => {
    setPublishing(true);
    if (category === "engagement") {
      const result = await onCreateEngagement({
        type: subType,
        title: title || "Untitled engagement",
        description: body,
      });
      setPublishing(false);
      if (result) setStep(3);
    } else {
      const result = await onCreatePost({
        title: title || "Untitled post",
        body,
        type: category === "program" ? `program-${subType}` : subType,
        media,
        publish: true,
      });
      setPublishing(false);
      if (result) setStep(3);
    }
  };

  const handleMediaSelect = (asset: AssetItem) => {
    setMedia((prev) => [...prev, asset.url]);
    setLibraryOpen(false);
  };

  return (
    <div className="space-y-3">
      <PublishStepper steps={MANUAL_STEPS} currentStep={step} onBack={onBack} confirmLeave={hasDraft} />

      {/* Step 0 — Choose type */}
      {step === 0 && !category && (
        <div className="space-y-3">
          <button
            onClick={() => setCategory("post")}
            className="w-full text-left rounded-xl border border-border/60 bg-card p-4 hover:border-primary/40 transition-colors min-h-[56px]"
          >
            <p className="text-[15px] font-semibold mb-0.5">Post</p>
            <p className="text-xs text-muted-foreground">Photo, Video, Text, or Audio</p>
          </button>
          <button
            onClick={() => setCategory("program")}
            className="w-full text-left rounded-xl border border-border/60 bg-card p-4 hover:border-primary/40 transition-colors min-h-[56px]"
          >
            <p className="text-[15px] font-semibold mb-0.5">Program</p>
            <p className="text-xs text-muted-foreground">Fitness, Skills, Nutrition, or Mental</p>
          </button>
          <button
            onClick={() => setCategory("engagement")}
            className="w-full text-left rounded-xl border border-border/60 bg-card p-4 hover:border-primary/40 transition-colors min-h-[56px]"
          >
            <p className="text-[15px] font-semibold mb-0.5">Engagement</p>
            <p className="text-xs text-muted-foreground">Prize draw, Poll, Q&A, Live discussion & more</p>
          </button>
        </div>
      )}

      {step === 0 && category === "post" && (
        <StudioCard title="What kind of post?" subtitle="Pick a format or tap an idea to get started.">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {POST_FORMATS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleSelectSubType(f.id)}
                  className="px-4 py-2.5 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-colors text-sm font-medium min-h-[44px]"
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium">Suggested ideas</p>
              <div className="flex flex-wrap gap-1.5">
                {POST_IDEAS.map((idea) => (
                  <button
                    key={idea}
                    onClick={() => handleIdeaTap(idea)}
                    className="px-3 py-1.5 rounded-full border border-border/30 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors min-h-[32px]"
                  >
                    {idea}
                  </button>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={() => setCategory(null)}>
              ← Back to types
            </Button>
          </div>
        </StudioCard>
      )}

      {step === 0 && category === "program" && (
        <StudioCard title="Program category" subtitle="What type of program are you creating?">
          <div className="space-y-2">
            {PROGRAM_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectSubType(c.id)}
                className="w-full text-left p-3 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-colors min-h-[48px]"
              >
                <p className="text-sm font-medium">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="h-11 text-sm mt-3" onClick={() => setCategory(null)}>
            ← Back to types
          </Button>
        </StudioCard>
      )}

      {step === 0 && category === "engagement" && (
        <StudioCard title="Engagement type" subtitle="Choose the engagement format.">
          <div className="space-y-2">
            {ENGAGEMENT_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectSubType(t.id)}
                className="w-full text-left p-3 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-colors min-h-[44px]"
              >
                <p className="text-sm font-medium">{t.label}</p>
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="h-11 text-sm mt-3" onClick={() => setCategory(null)}>
            ← Back to types
          </Button>
        </StudioCard>
      )}

      {/* Step 1 — Compose */}
      {step === 1 && (
        <StudioCard
          title={category === "engagement" ? `Create ${subType.replace("_", " ")}` : "Compose"}
          subtitle={category === "program" ? `Program: ${subType}` : undefined}
        >
          <div className="space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={category === "engagement" ? "Engagement title" : "Title (optional)"}
              className="h-11 text-sm"
            />
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={category === "engagement" ? "Description, rules, or details..." : "Write your post..."}
              className="min-h-[120px] text-sm"
            />
            {category !== "engagement" && (
              <>
                {media.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {media.map((url, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-border">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setMedia((prev) => prev.filter((_, j) => j !== i))}
                          className="absolute top-0.5 right-0.5 w-5 h-5 bg-background/80 rounded-full text-xs flex items-center justify-center"
                        >×</button>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setLibraryOpen(true)}
                  className="w-full p-3 rounded-lg bg-muted/30 border border-dashed border-border text-center text-sm text-muted-foreground hover:bg-muted/50 transition-colors min-h-[48px]"
                >
                  + Add media from Content Library
                </button>
              </>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={() => setStep(0)}>Back</Button>
            <Button
              size="sm"
              className="h-11 text-sm"
              onClick={() => setStep(2)}
              disabled={category === "engagement" ? !title.trim() : !body.trim() && !title.trim()}
            >
              Preview
            </Button>
          </div>
        </StudioCard>
      )}

      {/* Step 2 — Preview */}
      {step === 2 && (
        <StudioCard title="Preview" subtitle="This is how fans will see it.">
          <div className="rounded-lg border border-border/50 p-4 bg-muted/20">
            <Badge variant="secondary" className="text-[10px] mb-2 capitalize">{subType.replace("_", " ")}</Badge>
            <h4 className="font-semibold text-sm mb-1">{title || "Untitled"}</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{body || "No content."}</p>
            {media.length > 0 && (
              <div className="flex gap-2 mt-3">
                {media.map((url, i) => (
                  <img key={i} src={url} alt="" className="w-20 h-20 rounded-lg object-cover" />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={() => setStep(1)}>Edit</Button>
            <Button size="sm" className="h-11 text-sm" onClick={handlePublish} disabled={publishing}>
              {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish now"}
            </Button>
          </div>
        </StudioCard>
      )}

      {/* Step 3 — Published */}
      {step === 3 && (
        <StudioCard title="Published" subtitle="Your content is now live on the fan feed.">
          <div className="text-center py-6">
            <span className="text-4xl mb-3 block">🎉</span>
            <p className="text-sm text-muted-foreground mb-4">Fans can see it now.</p>
            <Button size="sm" className="h-11 text-sm" onClick={onBack}>Create another</Button>
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
