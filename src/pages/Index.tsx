import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AthleteCard } from "@/components/athletes/AthleteCard";
import { CauseCard } from "@/components/causes/CauseCard";
import { athletes } from "@/data/athletes";
import { Search, Dumbbell, Heart, Package, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const sportFilters = ["All", "Rugby", "Football", "Tennis", "Swimming"];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAthletes = athletes.filter(athlete => {
    const matchesFilter = activeFilter === "All" || athlete.sport === activeFilter;
    const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         athlete.sport.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">Welcome to Halo Collective</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
              Step inside your favorite{" "}
              <span className="gradient-text">athletes' worlds</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
              Discover how they train, live, and what they wear — and support them directly.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
              <Link to="/athletes">
                <Button variant="hero" size="xl">
                  Browse Athletes
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex gap-3">
                <Link to="/login">
                  <Button variant="glass" size="lg">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" size="lg">Create Account</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Athlete Discovery Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Discover Athletes
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore the universes of world-class athletes and step inside their Halos.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
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
          </div>

          {/* Athletes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* What You'll Find Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              What You'll Find Inside
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every athlete's Halo is packed with exclusive content across three dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Training */}
            <div className="glass-card p-8 text-center group hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">My Training</h3>
              <p className="text-muted-foreground text-sm">
                Workouts, routines and recovery — train like the pros.
              </p>
            </div>

            {/* Life */}
            <div className="glass-card p-8 text-center group hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">My Life</h3>
              <p className="text-muted-foreground text-sm">
                Stories, passions, and behind-the-scenes moments.
              </p>
            </div>

            {/* Gear */}
            <div className="glass-card p-8 text-center group hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">My Gear</h3>
              <p className="text-muted-foreground text-sm">
                Performance gear, apparel, and essentials they rely on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Causes Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Support Their Causes
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Athletes are using their platforms to make a difference. Join them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {athletes.map(athlete => (
              <CauseCard
                key={athlete.cause.id}
                cause={athlete.cause}
                athleteId={athlete.id}
                athleteName={athlete.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto gradient-border">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready to explore?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Create your account and start following your favorite athletes today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Create Account
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/athletes">
                <Button variant="glass" size="lg">
                  Browse Athletes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
