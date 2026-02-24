import { useState } from "react";
import { StudioCard } from "../StudioCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { ContentLibraryModal } from "../ContentLibraryModal";
import { cn } from "@/lib/utils";
import type { StudioAthleteProfile, AssetItem } from "@/hooks/useStudioAthlete";

const SOCIAL_SOURCES = [
  { name: "Instagram", color: "bg-pink-500/10 text-pink-400" },
  { name: "TikTok", color: "bg-cyan-500/10 text-cyan-400" },
  { name: "YouTube", color: "bg-red-500/10 text-red-400" },
  { name: "X", color: "bg-foreground/10 text-foreground" },
  { name: "Facebook", color: "bg-blue-500/10 text-blue-400" },
  { name: "Snapchat", color: "bg-yellow-500/10 text-yellow-400" },
];

const WEEKLY_PACK_ITEMS = [
  { type: "BTS", title: "Training session recap", why: "Your training posts get 3× more engagement" },
  { type: "Access", title: "Pre-match voice note", why: "Fans love hearing your pre-game mindset" },
  { type: "Participate", title: "Weekly fan vote", why: "Polls drive 5× opt-ins vs static posts" },
  { type: "Auto", title: "Highlight reel from last match", why: "AI detected 4 new clips from media coverage" },
  { type: "Recap", title: "Result announcement + reaction", why: "Fresh from yesterday's performance" },
  { type: "Program", title: "Training program teaser", why: "Drives premium conversions" },
];

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
}: StudioHomeTabProps) => {
  const [bioEditing, setBioEditing] = useState(false);
  const [bioTemp, setBioTemp] = useState("");
  const [bioSaving, setBioSaving] = useState(false);
  const [expandedSource, setExpandedSource] = useState<string | null>(null);
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
            <Textarea
              value={bioTemp}
              onChange={(e) => setBioTemp(e.target.value)}
              className="min-h-[80px] resize-none"
              maxLength={300}
            />
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
      <StudioCard
        title="Sources"
        subtitle="Connect channels so Halo can auto-create content and learn what performs best."
      >
        <div className="space-y-3">
          <div className="rounded-lg border border-border/50 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Social media</span>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setExpandedSource(expandedSource === "social" ? null : "social")}>
                {expandedSource === "social" ? "Minimize" : "Manage"}
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SOCIAL_SOURCES.map((s) => (
                <Badge key={s.name} variant="secondary" className={cn("text-xs font-normal", s.color)}>{s.name}</Badge>
              ))}
            </div>
            {expandedSource === "social" && (
              <p className="text-xs text-muted-foreground mt-3 p-2 bg-muted/50 rounded">Connect your social accounts to auto-import content. Coming soon.</p>
            )}
          </div>

          <div className="rounded-lg border border-border/50 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Owned channels</span>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setExpandedSource(expandedSource === "owned" ? null : "owned")}>
                {expandedSource === "owned" ? "Minimize" : "Manage"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Federation, League, Club URLs</p>
            {expandedSource === "owned" && (
              <p className="text-xs text-muted-foreground mt-3 p-2 bg-muted/50 rounded">Add your federation or club page URLs. Coming soon.</p>
            )}
          </div>

          <div className="rounded-lg border border-border/50 p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Earned channels</span>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setExpandedSource(expandedSource === "earned" ? null : "earned")}>
                {expandedSource === "earned" ? "Minimize" : "Manage"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Sports media, Specialist media, Fan blogs</p>
            {expandedSource === "earned" && (
              <p className="text-xs text-muted-foreground mt-3 p-2 bg-muted/50 rounded">Add media outlets and fan blog URLs. Coming soon.</p>
            )}
          </div>
        </div>
      </StudioCard>

      {/* Planning card */}
      <StudioCard title="Planning" subtitle="This week's priorities and what to do next.">
        <div className="space-y-2">
          {[
            { title: "Connect sources", helper: "Link your social accounts for auto-content", cta: "Connect" },
            { title: "Run brand audit", helper: "Analyze your online presence and positioning", cta: "Run audit" },
            { title: "Generate weekly pack", helper: "Get AI-suggested posts for this week", cta: "Generate" },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.helper}</p>
              </div>
              <Button variant="outline" size="sm" className="h-9 shrink-0">{item.cta}</Button>
            </div>
          ))}
        </div>
      </StudioCard>

      {/* Weekly pack card (hero) */}
      <StudioCard
        title="Weekly pack"
        subtitle="Suggested posts you can publish this week — based on your strategy + what performs best."
        ctaLabel="Generate weekly pack"
        onCtaClick={() => {}}
        hero
      >
        <div className="space-y-2">
          {WEEKLY_PACK_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/60 border border-border/30">
              <div className="min-w-0 flex-1 mr-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <Badge variant="secondary" className="text-[10px] font-normal px-1.5 py-0">{item.type}</Badge>
                  <span className="text-sm font-medium truncate">{item.title}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.why}</p>
              </div>
              <Button variant="outline" size="sm" className="h-9 shrink-0" onClick={() => onNavigate("publish")}>Create</Button>
            </div>
          ))}
        </div>
      </StudioCard>

      {/* Growth snapshot */}
      <StudioCard title="Growth snapshot (7D)" subtitle="Your key metrics at a glance.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Posts", value: String(postCount) },
            { label: "Assets", value: String(assets.length) },
            { label: "Engagements", value: String(engagementCount) },
            { label: "Followers", value: "—" },
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
