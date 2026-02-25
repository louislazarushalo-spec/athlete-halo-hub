import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { PublishStepper } from "./PublishStepper";
import type { AssetItem } from "@/hooks/useStudioAthlete";

const AI_STEPS = ["Sources", "Draft", "Preview", "Publish"];

interface AIFlowProps {
  onChangeFlow: () => void;
  onCreatePost: (data: { title: string; body: string; type: string; media: string[]; publish?: boolean }) => Promise<any>;
  assets: AssetItem[];
}

export const AIFlow = ({ onChangeFlow, onCreatePost, assets }: AIFlowProps) => {
  const [step, setStep] = useState(0);
  const [sources, setSources] = useState({ webCoverage: true, socialPosts: true, notes: false });
  const [draft, setDraft] = useState({ title: "", body: "" });
  const [publishing, setPublishing] = useState(false);

  const handleGenerateDraft = () => {
    // Simulate AI draft generation
    setDraft({
      title: "Match recap — latest performance",
      body: "Great win today! The preparation paid off and the support from fans was incredible. More to come this season. 💪",
    });
    setStep(1);
  };

  const handlePublish = async () => {
    setPublishing(true);
    const result = await onCreatePost({
      title: draft.title || "Untitled post",
      body: draft.body,
      type: "ai-generated",
      media: [],
      publish: true,
    });
    setPublishing(false);
    if (result) setStep(3);
  };

  return (
    <div className="space-y-3">
      <PublishStepper steps={AI_STEPS} currentStep={step} onChangeFlow={onChangeFlow} />

      {step === 0 && (
        <StudioCard title="Choose your sources" subtitle="Select what the AI should use to generate your post.">
          <div className="space-y-3 mt-1">
            <label className="flex items-center justify-between p-3 rounded-lg border border-border/40 min-h-[48px]">
              <div>
                <p className="text-sm font-medium">Web coverage</p>
                <p className="text-xs text-muted-foreground">Media Radar articles & interviews</p>
              </div>
              <Switch checked={sources.webCoverage} onCheckedChange={(v) => setSources((s) => ({ ...s, webCoverage: v }))} />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg border border-border/40 min-h-[48px]">
              <div>
                <p className="text-sm font-medium">Social posts</p>
                <p className="text-xs text-muted-foreground">Your connected social accounts</p>
              </div>
              <Switch checked={sources.socialPosts} onCheckedChange={(v) => setSources((s) => ({ ...s, socialPosts: v }))} />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg border border-border/40 min-h-[48px]">
              <div>
                <p className="text-sm font-medium">Notes</p>
                <p className="text-xs text-muted-foreground">Add personal notes for context</p>
              </div>
              <Switch checked={sources.notes} onCheckedChange={(v) => setSources((s) => ({ ...s, notes: v }))} />
            </label>
          </div>
          <div className="flex justify-end mt-4">
            <Button size="sm" className="h-11 text-sm" onClick={handleGenerateDraft}>
              Generate draft
            </Button>
          </div>
        </StudioCard>
      )}

      {step === 1 && (
        <StudioCard title="Edit your draft" subtitle="The AI generated this from your sources. Edit freely.">
          <div className="space-y-3">
            <Textarea
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
              placeholder="Post title"
              className="min-h-[44px] text-sm font-medium resize-none"
              rows={1}
            />
            <Textarea
              value={draft.body}
              onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
              placeholder="Post body..."
              className="min-h-[120px] text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={() => setStep(0)}>Back</Button>
            <Button size="sm" className="h-11 text-sm" onClick={() => setStep(2)} disabled={!draft.body.trim()}>Preview</Button>
          </div>
        </StudioCard>
      )}

      {step === 2 && (
        <StudioCard title="Preview" subtitle="This is how fans will see your post.">
          <div className="rounded-lg border border-border/50 p-4 bg-muted/20">
            <Badge variant="secondary" className="text-[10px] mb-2">AI-generated</Badge>
            <h4 className="font-semibold text-sm mb-1">{draft.title || "Untitled post"}</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{draft.body || "No content."}</p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" size="sm" className="h-11 text-sm" onClick={() => setStep(1)}>Edit</Button>
            <Button size="sm" className="h-11 text-sm" onClick={handlePublish} disabled={publishing}>
              {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish now"}
            </Button>
          </div>
        </StudioCard>
      )}

      {step === 3 && (
        <StudioCard title="Published" subtitle="Your post is now live on the fan feed.">
          <div className="text-center py-6">
            <span className="text-4xl mb-3 block">🎉</span>
            <p className="text-sm text-muted-foreground mb-4">Your AI-generated post is live and visible to fans.</p>
            <Button size="sm" className="h-11 text-sm" onClick={onChangeFlow}>Create another</Button>
          </div>
        </StudioCard>
      )}
    </div>
  );
};
