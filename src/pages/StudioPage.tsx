import { useState, useEffect, useCallback } from "react";
import { StudioLayout, type TabId } from "@/components/studio/StudioLayout";
import { OnboardingBanner } from "@/components/studio/OnboardingBanner";
import { StudioMyHaloTab } from "@/components/studio/tabs/StudioMyHaloTab";
import { StudioCopilotTab } from "@/components/studio/tabs/StudioCopilotTab";
import { StudioPublishTab } from "@/components/studio/tabs/StudioPublishTab";

import { StudioMonetizeTab } from "@/components/studio/tabs/StudioMonetizeTab";
import { StudioAnalyticsTab } from "@/components/studio/tabs/StudioAnalyticsTab";
import { BrandStrategyPage } from "@/components/studio/BrandStrategyPage";
import { SourcesManager } from "@/components/studio/SourcesManager";
import { useStudioAthlete } from "@/hooks/useStudioAthlete";
import { useStudioSources } from "@/hooks/useStudioSources";
import { useStudioBrandStrategy } from "@/hooks/useStudioBrandStrategy";
import { useStudioAthleteContext, StudioAthleteProvider } from "@/contexts/StudioAthleteContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const StudioPageInner = () => {
  const { currentAthleteSlug, ensureProfile } = useStudioAthleteContext();
  const studio = useStudioAthlete(currentAthleteSlug);
  const sources = useStudioSources(currentAthleteSlug);
  const brandStrategy = useStudioBrandStrategy(currentAthleteSlug);

  // Determine default tab
  const getDefaultTab = useCallback((): TabId => {
    return "copilot";
  }, []);

  const [activeTab, setActiveTab] = useState<TabId>("copilot");
  const [initialized, setInitialized] = useState(false);
  const [showStrategy, setShowStrategy] = useState(false);
  const [showSources, setShowSources] = useState(false);

  // Set default tab once data loads
  useEffect(() => {
    if (!studio.loading && !initialized) {
      setActiveTab(getDefaultTab());
      setInitialized(true);
    }
  }, [studio.loading, initialized, getDefaultTab]);

  // Auto-create profile if it doesn't exist yet
  useEffect(() => {
    if (!studio.loading && studio.needsSetup && currentAthleteSlug) {
      ensureProfile(currentAthleteSlug);
    }
  }, [studio.loading, studio.needsSetup, currentAthleteSlug, ensureProfile]);

  // Draft state for publish tab
  const [publishDraft, setPublishDraft] = useState<{ title: string; body: string; type: string } | undefined>();

  const navigateToPublish = (draft?: { title: string; body: string; type: string }) => {
    if (draft) setPublishDraft(draft);
    setActiveTab("publish");
  };

  const goToCopilot = () => { setShowStrategy(false); setActiveTab("copilot"); };

  // Brand Strategy page overlay
  if (showStrategy) {
    return (
      <StudioLayout activeTab={activeTab} onTabChange={(tab) => { setShowStrategy(false); setActiveTab(tab); }} onGoHome={goToCopilot}>
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
        />
      </StudioLayout>
    );
  }

  return (
    <StudioLayout activeTab={activeTab} onTabChange={setActiveTab} onGoHome={goToCopilot}>
      {/* Onboarding banner on all sections */}
      <OnboardingBanner
        profile={studio.profile}
        sources={sources.sources}
        strategyPack={brandStrategy.strategyPack}
        brandProfileAnswers={brandStrategy.brandProfile?.answers_json as Record<string, any> | null}
        weeklyPacks={brandStrategy.weeklyPacks}
        posts={studio.posts}
        onNavigate={setActiveTab}
        onOpenSources={() => setShowSources(true)}
        onOpenStrategy={() => setShowStrategy(true)}
        onGenerateWeeklyPack={() => {
          brandStrategy.generateWeeklyPack("training", brandStrategy.strategyPack?.pack_json || {});
          setActiveTab("copilot");
        }}
        onNavigatePublish={() => navigateToPublish()}
        athleteSlug={currentAthleteSlug}
      />

      {activeTab === "my-halo" && (
        <StudioMyHaloTab
          profile={studio.profile}
          loading={studio.loading}
          assets={studio.assets}
          posts={studio.posts}
          onUpdateBio={studio.updateBio}
          onUpdateAvatar={studio.updateAvatar}
          onUpdateBanner={studio.updateBanner}
          onUploadAsset={studio.uploadAsset}
        />
      )}

      {activeTab === "copilot" && (
        <StudioCopilotTab
          brandProfile={brandStrategy.brandProfile}
          strategyPack={brandStrategy.strategyPack}
          weeklyPacks={brandStrategy.weeklyPacks}
          generating={brandStrategy.generating}
          onOpenStrategy={() => setShowStrategy(true)}
          onGenerateWeeklyPack={brandStrategy.generateWeeklyPack}
          onNavigatePublish={navigateToPublish}
          sources={sources.sources}
          onOpenSources={() => setShowSources(true)}
        />
      )}

      {activeTab === "publish" && (
        <StudioPublishTab
          onCreatePost={studio.createPost}
          assets={studio.assets}
          onUploadAsset={studio.uploadAsset}
          draft={publishDraft}
          engagements={studio.engagements}
          onCreateEngagement={studio.createEngagement}
          posts={studio.posts}
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

      {/* Sources modal */}
      <Dialog open={showSources} onOpenChange={setShowSources}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <SourcesManager
            sources={sources.sources}
            onAddSource={sources.addSource}
            onUpdateSource={sources.updateSource}
            onRemoveSource={sources.removeSource}
            onSync={sources.syncSources}
            syncing={sources.syncing}
            loading={sources.loading}
          />
        </DialogContent>
      </Dialog>
    </StudioLayout>
  );
};

const StudioPage = () => (
  <StudioAthleteProvider>
    <StudioPageInner />
  </StudioAthleteProvider>
);

export default StudioPage;
