import { useState, useEffect } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { ContentLibraryModal } from "../ContentLibraryModal";
import { resolveAssetUrl } from "@/lib/assetResolver";
import { supabase } from "@/integrations/supabase/client";
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
  const [fanPosts, setFanPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!profile?.athlete_slug) return;
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("studio_posts")
        .select("id, athlete_id, type, title, body, media, published_at, status")
        .eq("athlete_id", profile.athlete_slug)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(10);
      setFanPosts(data || []);
    };
    fetchPosts();
  }, [profile?.athlete_slug, posts]);

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


  return (
    <div className="space-y-2.5">
      {/* Profile card */}
      <StudioCard
        title="Profile"
        subtitle="Your banner, avatar and name visible to fans."
        ctaLabel="Edit images"
        onCtaClick={() => openLibraryFor("banner")}
      >
        <div
          onClick={() => openLibraryFor("banner")}
          className="relative rounded-lg overflow-hidden bg-muted h-32 md:h-40 mb-4 w-full group cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") openLibraryFor("banner"); }}
        >
          {profile.banner_url && (
            <img src={resolveAssetUrl(profile.banner_url)} alt="Banner" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center pointer-events-none">
            <span className="text-xs font-medium text-white/0 group-hover:text-white/90 transition-colors select-none">
              Tap to edit banner
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3">
            <div className="flex items-end gap-3">
              <button onClick={(e) => { e.stopPropagation(); openLibraryFor("avatar"); }} className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-muted-foreground/20 border-[3px] border-background overflow-hidden hover:ring-2 hover:ring-primary/40 transition-all">
                {profile.avatar_url ? (
                  <img src={resolveAssetUrl(profile.avatar_url)} alt={profile.display_name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                )}
              </button>
              <div className="pb-0.5">
                <h2 className="font-semibold text-foreground text-base leading-tight">{profile.display_name}</h2>
                <p className="text-[11px] text-muted-foreground">{profile.sport}</p>
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

      {/* Feed preview card — shows only feed items fans see */}
      <StudioCard
        title="Feed preview"
        subtitle="The feed items fans see on your athlete page."
        ctaLabel="Open fan view"
        onCtaClick={() => window.open(`/athlete/${profile.athlete_slug}`, "_blank")}
      >
        <div className="rounded-lg border border-border/40 bg-muted/20 overflow-hidden">
          <div className="px-3 py-2 space-y-1.5 max-h-[300px] overflow-y-auto">
            {fanPosts.length > 0 ? (
              fanPosts.map((post) => (
                <div key={post.id} className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
                  {post.media && post.media.length > 0 && post.media[0] && (
                    <div className="w-12 h-10 rounded overflow-hidden shrink-0 bg-muted">
                      <img src={resolveAssetUrl(post.media[0])} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Badge variant="secondary" className="text-[9px] px-1 py-0 capitalize shrink-0">{post.type?.replace("_", " ")}</Badge>
                      {post.published_at && (
                        <span className="text-[9px] text-muted-foreground">{new Date(post.published_at).toLocaleDateString()}</span>
                      )}
                    </div>
                    <span className="text-[11px] font-medium leading-tight line-clamp-1 block">{post.title}</span>
                    {post.body && <span className="text-[10px] text-muted-foreground line-clamp-1 block">{post.body}</span>}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground text-center py-3">No published posts yet.</p>
            )}
          </div>
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
