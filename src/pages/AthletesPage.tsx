import { Layout } from "@/components/layout/Layout";
import { AthleteCard } from "@/components/athletes/AthleteCard";
import { athletes } from "@/data/athletes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

const sportFilters = ["All", "Rugby", "Football", "Tennis", "Swimming", "Basketball", "Judo"];
const sortOptions = ["Trending", "Most Followed", "New"];

const AthletesPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Trending");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAthletes = athletes
    .filter(athlete => {
      const matchesFilter = activeFilter === "All" || athlete.sport === activeFilter;
      const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           athlete.sport.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "Most Followed") {
        return b.followers - a.followers;
      }
      return 0;
    });

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Browse Athletes
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover world-class athletes and step inside their Halos.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search athletes…"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sport Filters */}
            <div className="flex gap-2 flex-wrap justify-center">
              {sportFilters.map(filter => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "gold" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              {sortOptions.map(option => (
                <Button
                  key={option}
                  variant={sortBy === option ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Athletes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAthletes.map((athlete, index) => (
              <AthleteCard key={athlete.id} athlete={athlete} index={index} />
            ))}
          </div>

          {filteredAthletes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No athletes found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AthletesPage;
