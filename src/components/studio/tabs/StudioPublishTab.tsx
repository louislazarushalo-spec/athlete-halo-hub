import { useState } from "react";
import { PublishLanding } from "../publish/PublishLanding";
import { AIFlow } from "../publish/AIFlow";
import { ManualFlow } from "../publish/ManualFlow";
import type { AssetItem, StudioEngagement } from "@/hooks/useStudioAthlete";

type Flow = null | "ai" | "manual";

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
  const [flow, setFlow] = useState<Flow>(() => draft ? "manual" : null);

  const resetFlow = () => setFlow(null);

  if (flow === "ai") {
    return <AIFlow onBack={resetFlow} onCreatePost={onCreatePost} assets={assets} />;
  }

  if (flow === "manual") {
    return (
      <ManualFlow
        onBack={resetFlow}
        onCreatePost={onCreatePost}
        onCreateEngagement={onCreateEngagement}
        assets={assets}
        onUploadAsset={onUploadAsset}
        draft={draft}
      />
    );
  }

  return <PublishLanding onSelectAI={() => setFlow("ai")} onSelectManual={() => setFlow("manual")} />;
};
