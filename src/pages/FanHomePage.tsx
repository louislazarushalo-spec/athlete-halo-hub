import { useState } from "react";
import { FanSidebar } from "@/components/fan/FanSidebar";
import { FanSearchBar } from "@/components/fan/FanSearchBar";
import { FanFilterPills } from "@/components/fan/FanFilterPills";
import { RecentlyViewedSection } from "@/components/fan/sections/RecentlyViewedSection";
import { ForYouSection } from "@/components/fan/sections/ForYouSection";
import { TrendingSection } from "@/components/fan/sections/TrendingSection";
import { ExploreGearSection } from "@/components/fan/sections/ExploreGearSection";
import { GearTheyUseSection } from "@/components/fan/sections/GearTheyUseSection";
import { ExploreTrainingsSection } from "@/components/fan/sections/ExploreTrainingsSection";
import { ActiveNowSection } from "@/components/fan/sections/ActiveNowSection";
import { SupportCausesSection } from "@/components/fan/sections/SupportCausesSection";
import { DiscoverAllSection } from "@/components/fan/sections/DiscoverAllSection";

const FanHomePage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Left Sidebar */}
      <FanSidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="px-6 py-4">
            <FanSearchBar onSearch={setSearchQuery} />
          </div>
          <div className="px-6 pb-4">
            <FanFilterPills activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>
        </header>

        {/* Content Sections */}
        <div className="px-6 py-8">
          <RecentlyViewedSection />
          <ForYouSection />
          <TrendingSection />
          <ExploreGearSection />
          <GearTheyUseSection />
          <ExploreTrainingsSection />
          <ActiveNowSection />
          <SupportCausesSection />
          <DiscoverAllSection />
        </div>
      </main>
    </div>
  );
};

export default FanHomePage;
