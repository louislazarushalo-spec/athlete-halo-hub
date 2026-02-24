import { useState } from "react";
import { StudioLayout, type TabId } from "@/components/studio/StudioLayout";
import { StudioHomeTab } from "@/components/studio/tabs/StudioHomeTab";
import { StudioPublishTab } from "@/components/studio/tabs/StudioPublishTab";
import { StudioEngageTab } from "@/components/studio/tabs/StudioEngageTab";
import { StudioMonetizeTab } from "@/components/studio/tabs/StudioMonetizeTab";
import { StudioAnalyticsTab } from "@/components/studio/tabs/StudioAnalyticsTab";
import { useStudioAthlete } from "@/hooks/useStudioAthlete";
import { athletes as hardcodedAthletes } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const StudioPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const studio = useStudioAthlete();

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
        />
      )}
      {activeTab === "publish" && (
        <StudioPublishTab
          onCreatePost={studio.createPost}
          assets={studio.assets}
          onUploadAsset={studio.uploadAsset}
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

export default StudioPage;
