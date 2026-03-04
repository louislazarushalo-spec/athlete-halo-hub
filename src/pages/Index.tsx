import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HomepageAthleteCard } from "@/components/athletes/HomepageAthleteCard";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SplashScreen } from "@/components/SplashScreen";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const athleteSectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { athletes } = useAthleteProfiles();
  const [showSplash, setShowSplash] = useState(true);
  const [landingVisible, setLandingVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    // Small delay so the landing fade-in starts after splash is removed
    requestAnimationFrame(() => setLandingVisible(true));
  }, []);

  // Random athlete faces for the hero tiles — shuffled once per mount
  const heroTiles = useMemo(() => shuffle(athletes).slice(0, 8), [athletes]);

  const featuredAthletes = useMemo(() => {
    return ['arthur-cazaux', 'iga-swiatek', 'antoine-dupont', 'victor-wembanyama', 'leon-marchand', 'alexia-putellas']
      .map(id => athletes.find(a => a.id === id))
      .filter(Boolean) as typeof athletes;
  }, [athletes]);

  const scrollToAthletes = () => {
    athleteSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={1000} />}

      <div
        className={`min-h-screen flex flex-col bg-background transition-all duration-500 ease-out ${
          landingVisible ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
        }`}
      >
        <MinimalHeader />
        <main className="flex-1 pt-12 sm:pt-14">
          {/* Hero */}
          <section className="relative min-h-[calc(100svh-3rem)] sm:min-h-[calc(100svh-3.5rem)] flex flex-col overflow-hidden">
            <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/4729192/4729192-hd_1920_1080_25fps.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            {/* Top spacer */}
            <div className="flex-[3]" />

            {/* Content block */}
            <div className="relative z-10 w-full px-5 sm:px-6">
              <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-3 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs text-primary font-medium">Welcome to Halo Collective</span>
                </div>

                {/* Headline */}
                <h1 className="font-display text-[1.65rem] sm:text-4xl md:text-5xl font-bold mb-1.5 sm:mb-2 leading-[1.15] animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
                  Step inside your favorite{" "}
                  <span className="gradient-text">athletes' worlds</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-muted-foreground max-w-sm sm:max-w-md mx-auto mb-5 leading-relaxed line-clamp-2 animate-fade-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
                  Exclusive access to their real lives — and a closer connection.
                </p>

                {/* CTA */}
                <div className="w-full max-w-[220px] sm:max-w-[240px] animate-fade-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
                  <Link to="/signup" className="block">
                    <Button
                      size="lg"
                      className="w-full rounded-full bg-gradient-to-r from-[hsl(220,70%,50%)] to-[hsl(210,60%,45%)] hover:from-[hsl(220,70%,55%)] hover:to-[hsl(210,60%,50%)] text-white shadow-[0_4px_24px_hsl(217,91%,55%,0.25)] text-sm font-semibold h-12 border border-white/10"
                    >
                      Explore athletes
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Spacer between CTA and tiles */}
            <div className="flex-[1.5]" />

            {/* Premium athlete tiles — horizontal snap scroll, no overlays */}
            <div className="relative z-10 w-full px-3 sm:px-4 animate-fade-up opacity-0 stagger-4" style={{ animationFillMode: 'forwards' }}>
              <div className="max-w-xl mx-auto">
                <div className="flex gap-2.5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-2 -mx-1 px-1">
                  {heroTiles.map((athlete, i) => (
                    <Link
                      key={athlete.id}
                      to={`/athlete/${athlete.id}`}
                      className="shrink-0 snap-start group"
                    >
                      <div className="w-[72px] h-[96px] sm:w-[82px] sm:h-[110px] rounded-[14px] sm:rounded-[18px] overflow-hidden border border-white/10 shadow-lg shadow-black/40 transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_hsl(217,91%,55%,0.2)] group-active:scale-[0.96]">
                        <img
                          src={athlete.avatar}
                          alt={athlete.name}
                          loading={i < 5 ? "eager" : "lazy"}
                          className="w-full h-full object-cover object-top"
                          draggable={false}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll hint */}
            <button
              onClick={scrollToAthletes}
              className="relative z-10 mx-auto mt-3 mb-4 flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors animate-fade-up opacity-0 stagger-4"
              style={{ animationFillMode: 'forwards' }}
            >
              Meet the athletes
              <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            </button>
          </section>

          {/* Athlete Preview Section */}
          <section ref={athleteSectionRef} className="py-12 sm:py-16 lg:py-20 bg-card/20">
            <div className="px-4 sm:px-6 max-w-6xl mx-auto">
              <div className="text-center mb-6 sm:mb-10">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  Meet the Athletes
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                  Explore the universes of world-class athletes and step inside their Halos.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {featuredAthletes.map((athlete, index) => (
                  <HomepageAthleteCard key={athlete.id} athlete={athlete} index={index} hideAccessLabels />
                ))}
              </div>

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
    </>
  );
};

export default Index;
