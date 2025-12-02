import { useState } from "react";
import { FanSidebar } from "@/components/fan/FanSidebar";
import { FanSearchBar } from "@/components/fan/FanSearchBar";
import { FanFilterPills } from "@/components/fan/FanFilterPills";
import { PersonalHeroHeader } from "@/components/fan/sections/PersonalHeroHeader";
import { UpcomingEventsSection } from "@/components/fan/sections/UpcomingEventsSection";
import { YourHalosSection } from "@/components/fan/sections/YourHalosSection";
import { LiveUpdatesSection } from "@/components/fan/sections/LiveUpdatesSection";
import { GearYourAthletesTrustSection } from "@/components/fan/sections/GearYourAthletesTrustSection";
import { TrainLikeThemSection } from "@/components/fan/sections/TrainLikeThemSection";
import { SupportCausesSection } from "@/components/fan/sections/SupportCausesSection";
import { PopularNowSection } from "@/components/fan/sections/PopularNowSection";
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
                    {user ? user.email?.charAt(0).toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.email?.split('@')[0]}</span>
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
              <PersonalHeroHeader />
              <UpcomingEventsSection />
              <YourHalosSection />
              <LiveUpdatesSection />
              <GearYourAthletesTrustSection />
              <TrainLikeThemSection />
              <SupportCausesSection />
              <PopularNowSection />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default FanHomePage;
