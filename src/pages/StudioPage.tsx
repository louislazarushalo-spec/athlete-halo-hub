import { useState } from "react";
import { StudioLayout, type TabId } from "@/components/studio/StudioLayout";
import { StudioHomeTab } from "@/components/studio/tabs/StudioHomeTab";
import { StudioPublishTab } from "@/components/studio/tabs/StudioPublishTab";
import { StudioEngageTab } from "@/components/studio/tabs/StudioEngageTab";
import { StudioMonetizeTab } from "@/components/studio/tabs/StudioMonetizeTab";
import { StudioAnalyticsTab } from "@/components/studio/tabs/StudioAnalyticsTab";

const StudioPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <StudioLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "home" && <StudioHomeTab onNavigate={(tab) => setActiveTab(tab as TabId)} />}
      {activeTab === "publish" && <StudioPublishTab />}
      {activeTab === "engage" && <StudioEngageTab />}
      {activeTab === "monetize" && <StudioMonetizeTab />}
      {activeTab === "analytics" && <StudioAnalyticsTab />}
    </StudioLayout>
  );
};

export default StudioPage;
