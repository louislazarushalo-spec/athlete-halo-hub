import { useState, useMemo } from "react";
import { FanSidebar } from "@/components/fan/FanSidebar";
import { HomepageAthleteCard } from "@/components/athletes/HomepageAthleteCard";
import { athletes } from "@/data/athletes";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const sportFilters = ["All", "Tennis", "Golf", "Cycling", "Rugby"];

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

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
    <div className="min-h-screen bg-background flex">
      <FanSidebar />

      <main className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {/* Page Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2">Explore athletes</h1>
            <p className="text-lg text-muted-foreground">
              Discover new Halos and find your next favorite athlete.
            </p>
          </header>

          {/* Search Bar */}
          <div className="relative w-full mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search athletes…"
              className="pl-12 h-12 text-base bg-muted/30 border-border/50 focus:bg-background transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sport Filter Pills */}
          <ScrollArea className="w-full whitespace-nowrap mb-8">
            <div className="flex gap-2 pb-2">
              {sportFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "gold" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className="rounded-full px-5 shrink-0"
                >
                  {filter}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>

          {/* Athlete Grid */}
          {filteredAthletes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAthletes.map((athlete, index) => (
                <HomepageAthleteCard key={athlete.id} athlete={athlete} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No athletes found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
