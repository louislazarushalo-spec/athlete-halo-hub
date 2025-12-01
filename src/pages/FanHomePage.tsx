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
import { FilteredAthletesSection } from "@/components/fan/sections/FilteredAthletesSection";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const FanHomePage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const { totalItems } = useCart();

  // Get initials from user name
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Left Sidebar */}
      <FanSidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="px-6 py-4 flex items-center gap-4">
            <div className="flex-1">
              <FanSearchBar onSearch={setSearchQuery} />
            </div>
            {/* Profile and Cart */}
            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-muted/50 transition-colors">
                <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-primary/60 to-primary/30 text-primary-foreground text-sm">
                    {user ? getInitials(user.name) : "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
            </div>
          </div>
          <div className="px-6 pb-4">
            <FanFilterPills activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>
        </header>

        {/* Content Sections */}
        <div className="px-6 py-8">
          {["Rugby", "Football", "Tennis", "Swimming"].includes(activeFilter) ? (
            <FilteredAthletesSection sport={activeFilter} />
          ) : (
            <>
              <RecentlyViewedSection />
              <ForYouSection />
              <TrendingSection />
              <ExploreGearSection />
              <GearTheyUseSection />
              <ExploreTrainingsSection />
              <ActiveNowSection />
              <SupportCausesSection />
              <DiscoverAllSection />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default FanHomePage;
