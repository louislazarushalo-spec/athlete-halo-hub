import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { ContentLibraryModal } from "../ContentLibraryModal";
import { resolveAssetUrl } from "@/lib/assetResolver";
import type { StudioAthleteProfile, AssetItem, StudioPost } from "@/hooks/useStudioAthlete";

interface StudioMyHaloTabProps {
  profile: StudioAthleteProfile | null;
  loading: boolean;
  assets: AssetItem[];
  posts: StudioPost[];
  onUpdateBio: (bio: string) => Promise<void>;
  onUpdateAvatar: (url: string) => Promise<void>;
  onUpdateBanner: (url: string) => Promise<void>;
  onUploadAsset: (file: File) => Promise<string | null>;
}

export const StudioMyHaloTab = ({
  profile,
  loading,
  assets,
  posts,
  onUpdateBio,
  onUpdateAvatar,
  onUpdateBanner,
  onUploadAsset,
}: StudioMyHaloTabProps) => {
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
    if (libraryTarget === "avatar") await onUpdateAvatar(asset.url);
    else if (libraryTarget === "banner") await onUpdateBanner(asset.url);
    setLibraryOpen(false);
  };

  const openLibraryFor = (target: "avatar" | "banner" | "general") => {
    setLibraryTarget(target);
    setLibraryOpen(true);
  };

  const publishedPosts = posts.filter((p) => p.status === "published").slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Profile card */}
      <StudioCard
        title="Profile"
        subtitle="Your banner, avatar and name visible to fans."
        ctaLabel="Edit images"
        onCtaClick={() => openLibraryFor("banner")}
      >
        <div className="relative rounded-lg overflow-hidden bg-muted h-32 md:h-40 mb-12">
          {profile.banner_url && (
            <img src={resolveAssetUrl(profile.banner_url)} alt="Banner" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
            <div className="flex items-end gap-3">
              <button onClick={() => openLibraryFor("avatar")} className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted-foreground/20 border-4 border-background overflow-hidden hover:ring-2 hover:ring-primary/40 transition-all">
                {profile.avatar_url ? (
                  <img src={resolveAssetUrl(profile.avatar_url)} alt={profile.display_name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                )}
              </button>
              <div className="pb-1">
                <h2 className="font-semibold text-foreground text-lg">{profile.display_name}</h2>
                <p className="text-xs text-muted-foreground">{profile.sport}</p>
              </div>
            </div>
          </div>
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

      {/* Fan preview card */}
      <StudioCard
        title="Fan preview"
        subtitle="This is what fans see on your athlete page."
        ctaLabel="Open fan view"
        onCtaClick={() => window.open(`/athlete/${profile.athlete_slug}`, "_blank")}
      >
        <div className="rounded-lg border border-border/40 bg-muted/20 p-4 space-y-3">
          {/* Mini header preview */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted-foreground/20">
              {profile.avatar_url && <img src={resolveAssetUrl(profile.avatar_url)} alt="" className="w-full h-full object-cover" />}
            </div>
            <div>
              <p className="text-sm font-medium">{profile.display_name}</p>
              <p className="text-[10px] text-muted-foreground">{profile.sport}</p>
            </div>
          </div>
          {/* Mini feed preview */}
          {publishedPosts.length > 0 ? (
            <div className="space-y-1.5">
              {publishedPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-2 p-2 rounded bg-muted/30">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 capitalize shrink-0">{post.type}</Badge>
                  <span className="text-xs truncate">{post.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-2">No published posts yet.</p>
          )}
        </div>
      </StudioCard>

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
