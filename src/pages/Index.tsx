import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HomepageAthleteCard } from "@/components/athletes/HomepageAthleteCard";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const athleteSectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { athletes } = useAthleteProfiles();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const featuredAthleteIds = [
    'arthur-cazaux',
    'iga-swiatek',
    'antoine-dupont',
    'victor-wembanyama',
    'leon-marchand',
    'alexia-putellas'
  ];

  const featuredAthletes = useMemo(() => {
    return featuredAthleteIds
      .map(id => athletes.find(a => a.id === id))
      .filter(Boolean) as typeof athletes;
  }, [athletes]);

  const scrollToAthletes = () => {
    athleteSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MinimalHeader />
      <main className="flex-1 pt-12 sm:pt-14">
        {/* Hero Section — fits above fold on mobile */}
        <section className="relative min-h-[calc(100svh-3rem)] sm:min-h-[calc(100svh-3.5rem)] flex items-center justify-center overflow-hidden">
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

          {/* Strong gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          {/* Subtle glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />

          <div className="relative z-10 w-full px-5 sm:px-6">
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-5 sm:mb-6 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-xs text-primary font-medium">Welcome to Halo Collective</span>
              </div>

              {/* Title — tighter on mobile */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-[1.15] animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
                Step inside your favorite{" "}
                <span className="gradient-text">athletes' worlds</span>
              </h1>

              {/* Subtitle — clamped to 2 lines on mobile */}
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md sm:max-w-lg mx-auto mb-6 sm:mb-8 leading-relaxed line-clamp-2 sm:line-clamp-none animate-fade-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
                Get unprecedented access to their real lives, daily habits, and trusted gear — and connect with them on a whole new level.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto animate-fade-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto rounded-full">
                    Get started
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-border/60 text-foreground/80 hover:text-foreground">
                    Log in
                  </Button>
                </Link>
              </div>

              {/* Scroll affordance */}
              <button
                onClick={scrollToAthletes}
                className="mt-8 sm:mt-10 flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors animate-fade-up opacity-0 stagger-4"
                style={{ animationFillMode: 'forwards' }}
              >
                Explore athletes
                <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
              </button>
            </div>
          </div>
        </section>

        {/* Athlete Preview Section */}
        <section ref={athleteSectionRef} className="py-12 sm:py-16 lg:py-20 bg-card/20">
          <div className="px-4 sm:px-6 max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Meet the Athletes
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                Explore the universes of world-class athletes and step inside their Halos.
              </p>
            </div>

            {/* Athletes Grid — 2-col mobile, 3-col desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {featuredAthletes.map((athlete, index) => (
                <HomepageAthleteCard key={athlete.id} athlete={athlete} index={index} hideAccessLabels />
              ))}
            </div>

            {/* Discover More CTA */}
            <div className="mt-8 sm:mt-12 px-4 sm:px-0">
              <Link to="/athletes" className="block max-w-md mx-auto">
                <Button variant="hero" size="xl" className="w-full rounded-full">
                  Discover more athletes
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
