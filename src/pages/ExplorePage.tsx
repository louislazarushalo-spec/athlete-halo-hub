import { useState, useMemo } from "react";
import { FanSidebar } from "@/components/fan/FanSidebar";
import { MobileNav } from "@/components/fan/MobileNav";
import { HomepageAthleteCard } from "@/components/athletes/HomepageAthleteCard";
import { athletes } from "@/data/athletes";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique sports from athletes data
  const sportFilters = useMemo(() => {
    const sports = [...new Set(athletes.map((athlete) => athlete.sport))].sort();
    return ["All", ...sports];
  }, []);

  // Randomize athletes once on component mount
  const randomizedAthletes = useMemo(() => {
    return [...athletes].sort(() => Math.random() - 0.5);
  }, []);

  // Filter athletes based on search and sport filter
  const filteredAthletes = useMemo(() => {
    return randomizedAthletes.filter((athlete) => {
      const matchesSearch =
        athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.sport.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "All" ||
        athlete.sport.toLowerCase() === activeFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [randomizedAthletes, searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <FanSidebar />
      </div>

      <main className="md:ml-64 min-h-screen">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border md:hidden">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <MobileNav />
            <Link to="/home" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-sm">H</span>
              </div>
            </Link>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
          {/* Page Header */}
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-display font-bold mb-1 md:mb-2">Explore athletes</h1>
            <p className="text-sm md:text-lg text-muted-foreground">
              Discover new Halos and find your next favorite athlete.
            </p>
          </header>

          {/* Search Bar */}
          <div className="relative w-full mb-4 md:mb-6">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search athletes…"
              className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base bg-muted/30 border-border/50 focus:bg-background transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sport Filter Pills */}
          <ScrollArea className="w-full whitespace-nowrap mb-6 md:mb-8">
            <div className="flex gap-2 pb-2">
              {sportFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "gold" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className="rounded-full px-4 md:px-5 text-xs md:text-sm shrink-0"
                >
                  {filter}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>

          {/* Athlete Grid */}
          {filteredAthletes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredAthletes.map((athlete, index) => (
                <HomepageAthleteCard key={athlete.id} athlete={athlete} index={index} hideAccessLabels />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16">
              <p className="text-muted-foreground text-base md:text-lg">No athletes found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
