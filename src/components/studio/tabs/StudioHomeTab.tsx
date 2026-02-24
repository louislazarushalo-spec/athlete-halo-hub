import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { ContentLibraryModal } from "../ContentLibraryModal";
import { SourcesManager } from "../SourcesManager";
import { WeeklyPackSection } from "../WeeklyPackSection";
import { cn } from "@/lib/utils";
import type { StudioAthleteProfile, AssetItem } from "@/hooks/useStudioAthlete";
import type { useStudioSources } from "@/hooks/useStudioSources";
import type { useStudioBrandStrategy } from "@/hooks/useStudioBrandStrategy";

interface StudioHomeTabProps {
  onNavigate: (tab: string) => void;
  profile: StudioAthleteProfile | null;
  loading: boolean;
  assets: AssetItem[];
  onUpdateBio: (bio: string) => Promise<void>;
  onUpdateAvatar: (url: string) => Promise<void>;
  onUpdateBanner: (url: string) => Promise<void>;
  onUploadAsset: (file: File) => Promise<string | null>;
  postCount: number;
  engagementCount: number;
  sources: ReturnType<typeof useStudioSources>;
  brandStrategy: ReturnType<typeof useStudioBrandStrategy>;
  onNavigatePublish: (draft?: { title: string; body: string; type: string }) => void;
}

export const StudioHomeTab = ({
  onNavigate,
  profile,
  loading,
  assets,
  onUpdateBio,
  onUpdateAvatar,
  onUpdateBanner,
  onUploadAsset,
  postCount,
  engagementCount,
  sources,
  brandStrategy,
  onNavigatePublish,
}: StudioHomeTabProps) => {
  const [bioEditing, setBioEditing] = useState(false);
  const [bioTemp, setBioTemp] = useState("");
  const [bioSaving, setBioSaving] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryTarget, setLibraryTarget] = useState<"avatar" | "banner" | "general">("general");

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const handleBioSave = async () => {
    setBioSaving(true);
    await onUpdateBio(bioTemp);
    setBioSaving(false);
    setBioEditing(false);
  };

  const handleLibrarySelect = async (asset: AssetItem) => {
    if (libraryTarget === "avatar") {
      await onUpdateAvatar(asset.url);
    } else if (libraryTarget === "banner") {
      await onUpdateBanner(asset.url);
    }
    setLibraryOpen(false);
  };

  const openLibraryFor = (target: "avatar" | "banner" | "general") => {
    setLibraryTarget(target);
    setLibraryOpen(true);
  };

  const strategyStatus = brandStrategy.strategyPack?.pack_json
    ? "ready"
    : brandStrategy.brandProfile?.answers_json && Object.keys(brandStrategy.brandProfile.answers_json).length > 0
    ? "in_progress"
    : "not_started";

  return (
    <div className="space-y-4">
      {/* Profile card */}
      <StudioCard title="Profile">
        <div className="relative rounded-lg overflow-hidden bg-muted h-32 md:h-40 mb-12">
          {profile.banner_url && (
            <img src={profile.banner_url} alt="Banner" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
            <div className="flex items-end gap-3">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted-foreground/20 border-4 border-background overflow-hidden">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt={profile.display_name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                )}
              </div>
              <div className="pb-1">
                <h2 className="font-semibold text-foreground text-lg">{profile.display_name}</h2>
                <p className="text-xs text-muted-foreground">{profile.sport}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" size="sm" className="h-9" onClick={() => openLibraryFor("banner")}>Update banner</Button>
          <Button variant="outline" size="sm" className="h-9" onClick={() => openLibraryFor("avatar")}>Update avatar</Button>
        </div>
      </StudioCard>

      {/* Bio card */}
      <StudioCard
        title="Bio"
        subtitle="Your public bio visible to fans."
        ctaLabel={bioEditing ? undefined : "Modify"}
        onCtaClick={() => { setBioEditing(true); setBioTemp(profile.bio || ""); }}
      >
        {bioEditing ? (
          <div className="space-y-3">
            <Textarea value={bioTemp} onChange={(e) => setBioTemp(e.target.value)} className="min-h-[80px] resize-none" maxLength={300} />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" className="h-9" onClick={() => setBioEditing(false)}>Cancel</Button>
              <Button size="sm" className="h-9" onClick={handleBioSave} disabled={bioSaving}>
                {bioSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{profile.bio || "No bio yet. Click Modify to add one."}</p>
        )}
      </StudioCard>

      {/* Content Library card */}
      <StudioCard
        title="Content Library"
        subtitle={`${assets.length} assets available.`}
        ctaLabel="Open library"
        onCtaClick={() => openLibraryFor("general")}
      />

      {/* Sources card */}
      <SourcesManager
        sources={sources.sources}
        onAddSource={sources.addSource}
        onUpdateSource={sources.updateSource}
        onRemoveSource={sources.removeSource}
        onSync={sources.syncSources}
        syncing={sources.syncing}
        loading={sources.loading}
      />

      {/* Brand & Strategy card */}
      <StudioCard
        title="Brand & Strategy"
        subtitle={
          strategyStatus === "ready"
            ? "Your strategy pack is ready."
            : strategyStatus === "in_progress"
            ? "Brand profile started — continue to generate strategy."
            : "Run a brand audit and generate your positioning strategy."
        }
        ctaLabel={strategyStatus === "ready" ? "View strategy" : strategyStatus === "in_progress" ? "Continue" : "Start audit"}
        onCtaClick={() => onNavigate("strategy")}
      />

      {/* Weekly pack */}
      <WeeklyPackSection
        weeklyPacks={brandStrategy.weeklyPacks}
        strategyPack={brandStrategy.strategyPack}
        generating={brandStrategy.generating}
        onGenerate={brandStrategy.generateWeeklyPack}
        onNavigatePublish={onNavigatePublish}
      />

      {/* Growth snapshot */}
      <StudioCard title="Growth snapshot (7D)" subtitle="Your key metrics at a glance.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Posts", value: String(postCount) },
            { label: "Assets", value: String(assets.length) },
            { label: "Engagements", value: String(engagementCount) },
            { label: "Sources", value: String(sources.sources.filter(s => s.status === "connected").length) },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-lg bg-muted/40 p-3 text-center">
              <p className="text-lg font-semibold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </div>
          ))}
        </div>
      </StudioCard>

      {/* Content Library Modal */}
      <ContentLibraryModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        assets={assets}
        onSelect={handleLibrarySelect}
        onUpload={onUploadAsset}
      />
    </div>
  );
};
