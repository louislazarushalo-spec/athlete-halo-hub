import { useState, useEffect } from "react";
import { StudioLayout, type TabId } from "@/components/studio/StudioLayout";
import { StudioHomeTab } from "@/components/studio/tabs/StudioHomeTab";
import { StudioPublishTab } from "@/components/studio/tabs/StudioPublishTab";
import { StudioEngageTab } from "@/components/studio/tabs/StudioEngageTab";
import { StudioMonetizeTab } from "@/components/studio/tabs/StudioMonetizeTab";
import { StudioAnalyticsTab } from "@/components/studio/tabs/StudioAnalyticsTab";
import { BrandStrategyPage } from "@/components/studio/BrandStrategyPage";
import { useStudioAthlete } from "@/hooks/useStudioAthlete";
import { useStudioSources } from "@/hooks/useStudioSources";
import { useStudioBrandStrategy } from "@/hooks/useStudioBrandStrategy";
import { useStudioAthleteContext, StudioAthleteProvider } from "@/contexts/StudioAthleteContext";
import { athletes as hardcodedAthletes } from "@/data/athletes";
import { Button } from "@/components/ui/button";

const StudioPageInner = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const { currentAthleteSlug, managedAthletes } = useStudioAthleteContext();
  const studio = useStudioAthlete(currentAthleteSlug);
  const sources = useStudioSources(currentAthleteSlug);
  const brandStrategy = useStudioBrandStrategy(currentAthleteSlug);

  // Draft state for publish tab (prefilled from weekly pack)
  const [publishDraft, setPublishDraft] = useState<{ title: string; body: string; type: string } | undefined>();

  const navigateToPublish = (draft?: { title: string; body: string; type: string }) => {
    if (draft) setPublishDraft(draft);
    setActiveTab("publish");
  };

  // Athlete setup screen
  if (!studio.loading && studio.needsSetup) {
    return (
      <StudioLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <div className="max-w-lg mx-auto text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Set up your Studio</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Select the athlete profile you want to manage.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {hardcodedAthletes.slice(0, 12).map((a) => (
              <button
                key={a.id}
                onClick={() => studio.setupProfile(a.id)}
                className="p-3 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full overflow-hidden bg-muted mb-2">
                  <img src={a.avatar} alt={a.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-medium truncate">{a.name}</p>
                <p className="text-[10px] text-muted-foreground">{a.sport}</p>
              </button>
            ))}
          </div>
        </div>
      </StudioLayout>
    );
  }

  return (
    <StudioLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "home" && (
        <StudioHomeTab
          onNavigate={(tab) => setActiveTab(tab as TabId)}
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
          onNavigatePublish={navigateToPublish}
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
      {activeTab === "strategy" && (
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
