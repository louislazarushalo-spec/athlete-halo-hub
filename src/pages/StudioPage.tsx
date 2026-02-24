import { useState, useEffect } from "react";
import { StudioLayout, type TabId } from "@/components/studio/StudioLayout";
import { StudioHomeTab } from "@/components/studio/tabs/StudioHomeTab";
import { StudioPublishTab } from "@/components/studio/tabs/StudioPublishTab";
import { StudioEngageTab } from "@/components/studio/tabs/StudioEngageTab";
import { StudioMonetizeTab } from "@/components/studio/tabs/StudioMonetizeTab";
import { StudioAnalyticsTab } from "@/components/studio/tabs/StudioAnalyticsTab";
import { MediaRadarPage } from "@/components/studio/MediaRadarPage";
import { BrandStrategyPage } from "@/components/studio/BrandStrategyPage";
import { useStudioAthlete } from "@/hooks/useStudioAthlete";
import { useStudioSources } from "@/hooks/useStudioSources";
import { useStudioBrandStrategy } from "@/hooks/useStudioBrandStrategy";
import { useMediaRadar } from "@/hooks/useMediaRadar";
import { useStudioAthleteContext, StudioAthleteProvider } from "@/contexts/StudioAthleteContext";

const StudioPageInner = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [showMediaRadar, setShowMediaRadar] = useState(false);
  const [showStrategy, setShowStrategy] = useState(false);
  const { currentAthleteSlug, ensureProfile } = useStudioAthleteContext();
  const studio = useStudioAthlete(currentAthleteSlug);
  const sources = useStudioSources(currentAthleteSlug);
  const brandStrategy = useStudioBrandStrategy(currentAthleteSlug);
  const mediaRadar = useMediaRadar(currentAthleteSlug);

  // Auto-create profile if it doesn't exist yet
  useEffect(() => {
    if (!studio.loading && studio.needsSetup && currentAthleteSlug) {
      ensureProfile(currentAthleteSlug);
    }
  }, [studio.loading, studio.needsSetup, currentAthleteSlug, ensureProfile]);

  // Draft state for publish tab (prefilled from weekly pack)
  const [publishDraft, setPublishDraft] = useState<{ title: string; body: string; type: string } | undefined>();

  const navigateToPublish = (draft?: { title: string; body: string; type: string }) => {
    if (draft) setPublishDraft(draft);
    setActiveTab("publish");
  };

  // Media Radar page
  if (showMediaRadar) {
    return (
      <StudioLayout activeTab={activeTab} onTabChange={(tab) => { setShowMediaRadar(false); setActiveTab(tab); }}>
        <MediaRadarPage
          mediaRadar={mediaRadar}
          athleteName={studio.profile?.display_name || ""}
          athleteSport={studio.profile?.sport || undefined}
          onBack={() => setShowMediaRadar(false)}
        />
      </StudioLayout>
    );
  }

  // Brand Strategy page
  if (showStrategy) {
    return (
      <StudioLayout activeTab={activeTab} onTabChange={(tab) => { setShowStrategy(false); setActiveTab(tab); }}>
        <BrandStrategyPage
          brandProfile={brandStrategy.brandProfile}
          strategyPack={brandStrategy.strategyPack}
          contentItems={sources.contentItems}
          sourcesCount={sources.sources.filter(s => s.status === "connected").length}
          onSaveBrandProfile={brandStrategy.saveBrandProfile}
          onGenerateStrategy={brandStrategy.generateStrategyPack}
          onSyncSources={sources.syncSources}
          generating={brandStrategy.generating}
          syncing={sources.syncing}
          onNavigatePublish={navigateToPublish}
          mediaRadarMentions30d={mediaRadar.mentions30d.length}
          mediaRadarTopPublishers={mediaRadar.topPublishers}
          mediaRadarNarratives={mediaRadar.latestNarratives}
          onOpenMediaRadar={() => { setShowStrategy(false); setShowMediaRadar(true); }}
        />
      </StudioLayout>
    );
  }

  return (
    <StudioLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "home" && (
        <StudioHomeTab
          onNavigate={(tab) => {
            if (tab === "strategy") { setShowStrategy(true); }
            else setActiveTab(tab as TabId);
          }}
          profile={studio.profile}
          loading={studio.loading}
          assets={studio.assets}
          onUpdateBio={studio.updateBio}
          onUpdateAvatar={studio.updateAvatar}
          onUpdateBanner={studio.updateBanner}
          onUploadAsset={studio.uploadAsset}
          postCount={studio.posts.length}
          engagementCount={studio.engagements.length}
          sources={sources}
          brandStrategy={brandStrategy}
          mediaRadar={mediaRadar}
          onNavigatePublish={navigateToPublish}
          onOpenMediaRadar={() => setShowMediaRadar(true)}
        />
      )}
      {activeTab === "publish" && (
        <StudioPublishTab
          onCreatePost={studio.createPost}
          assets={studio.assets}
          onUploadAsset={studio.uploadAsset}
          draft={publishDraft}
        />
      )}
      {activeTab === "engage" && (
        <StudioEngageTab
          engagements={studio.engagements}
          onCreateEngagement={studio.createEngagement}
        />
      )}
      {activeTab === "monetize" && (
        <StudioMonetizeTab
          monetization={studio.monetization}
          onSaveMonetization={studio.saveMonetization}
        />
      )}
      {activeTab === "analytics" && (
        <StudioAnalyticsTab
          posts={studio.posts}
          engagements={studio.engagements}
        />
      )}
    </StudioLayout>
  );
};

const StudioPage = () => (
  <StudioAthleteProvider>
    <StudioPageInner />
  </StudioAthleteProvider>
);

export default StudioPage;
