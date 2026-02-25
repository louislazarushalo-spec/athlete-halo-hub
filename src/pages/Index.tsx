import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HomepageAthleteCard } from "@/components/athletes/HomepageAthleteCard";
import { athletes as staticAthletes } from "@/data/athletes";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { athletes } = useAthleteProfiles();

  // Redirect to /home if logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  // Slow down video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Featured athletes with high quality photos
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MinimalHeader />
      <main className="flex-1 pt-16">
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

              {/* Scroll indicator */}
              <div className="animate-fade-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
                <div className="inline-flex flex-col items-center gap-2 text-muted-foreground">
                  <span className="text-sm">Scroll to discover</span>
                  <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-muted-foreground/50 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Athlete Preview Section */}
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Meet the Athletes
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Explore the universes of world-class athletes and step inside their Halos.
              </p>
            </div>

            {/* Athletes Grid - Larger cards, premium spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredAthletes.map((athlete, index) => (
                <HomepageAthleteCard key={athlete.id} athlete={athlete} index={index} hideAccessLabels />
              ))}
            </div>

            {/* Discover More CTA */}
            <div className="text-center mt-16">
              <Link to="/athletes">
                <Button variant="hero" size="xl">
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
