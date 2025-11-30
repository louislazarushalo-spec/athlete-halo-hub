import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AthleteCard } from "@/components/athletes/AthleteCard";
import { CauseCard } from "@/components/causes/CauseCard";
import { athletes, femaleAthleteIds } from "@/data/athletes";
import { Search, Dumbbell, Heart, Package, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo, useRef, useEffect } from "react";

const sportFilters = ["All", "Rugby", "Football", "Tennis", "Swimming", "Basketball", "Golf"];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slow down video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Randomize athletes on each page load - 3 men and 3 women
  const randomAthletes = useMemo(() => {
    const maleAthletes = athletes.filter(a => !femaleAthleteIds.includes(a.id));
    const femaleAthletes = athletes.filter(a => femaleAthleteIds.includes(a.id));
    
    const shuffledMales = [...maleAthletes].sort(() => Math.random() - 0.5).slice(0, 3);
    const shuffledFemales = [...femaleAthletes].sort(() => Math.random() - 0.5).slice(0, 3);
    
    return [...shuffledMales, ...shuffledFemales].sort(() => Math.random() - 0.5);
  }, []);

  const filteredAthletes = randomAthletes.filter(athlete => {
    const matchesFilter = activeFilter === "All" || athlete.sport === activeFilter;
    const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         athlete.sport.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/4729192/4729192-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
        
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
              Get unprecedented access to their real lives, daily habits, and trusted gear - and connect with them on a whole new level.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAthletes.map((athlete, index) => (
              <AthleteCard key={athlete.id} athlete={athlete} index={index} />
            ))}
          </div>

          {filteredAthletes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No athletes found matching your search.</p>
            </div>
          )}

          {/* Discover More CTA */}
          <div className="text-center mt-10">
            <Link to="/athletes">
              <Button variant="hero" size="lg">
                Discover more
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
