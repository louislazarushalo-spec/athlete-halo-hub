import { useState, useMemo } from "react";
import { FanSidebar } from "@/components/fan/FanSidebar";
import { MobileNav } from "@/components/fan/MobileNav";
import { ExploreAthleteCard } from "@/components/athletes/ExploreAthleteCard";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { useFollowedAthletes } from "@/hooks/useFollowedAthletes";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const { athletes } = useAthleteProfiles();
  const { toggleFollow } = useFollowedAthletes();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const sportFilters = useMemo(() => {
    const sports = [...new Set(athletes.map((a) => a.sport))] as string[];
    sports.sort();
    return ["All", ...sports];
  }, [athletes]);

  const randomizedAthletes = useMemo(
    () => [...athletes].sort(() => Math.random() - 0.5),
    [athletes],
  );

  const filteredAthletes = useMemo(() => {
    return randomizedAthletes.filter((athlete) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q || athlete.name.toLowerCase().includes(q) || athlete.sport.toLowerCase().includes(q);
      const matchesFilter =
        activeFilter === "All" || athlete.sport.toLowerCase() === activeFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [randomizedAthletes, searchQuery, activeFilter]);

  const clearSearch = () => {
    setSearchQuery("");
    setActiveFilter("All");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <FanSidebar />
      </div>

      <main className="md:ml-64 min-h-screen pb-20 md:pb-0">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border md:hidden">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <MobileNav />
            <Link to="/home" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-sm">H</span>
              </div>
            </Link>
            <div className="w-10" />
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-5 md:pt-10">
          {/* Page Header */}
          <header className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-3xl font-display font-bold">Explore</h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Discover athletes and follow their journey.
            </p>
          </header>

          {/* Sticky search */}
          <div className="sticky top-[57px] md:top-0 z-30 bg-background/80 backdrop-blur-lg -mx-4 px-4 md:mx-0 md:px-0 pb-3 pt-1">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search athletes…"
                className="pl-9 pr-9 h-10 text-sm bg-muted/30 border-border/50 focus:bg-background transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-3"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Sport Filter Pills */}
            <ScrollArea className="w-full whitespace-nowrap mt-3">
              <div className="flex gap-2 pb-1">
                {sportFilters.map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "gold" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter)}
                    className="rounded-full px-4 text-xs shrink-0 h-8"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </div>

          {/* Grid */}
          {filteredAthletes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-2">
              {filteredAthletes.map((athlete) => (
                <ExploreAthleteCard
                  key={athlete.id}
                  athlete={athlete}
                  onToggleFollow={toggleFollow}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm mb-3">No athletes found.</p>
              <Button variant="outline" size="sm" onClick={clearSearch}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
