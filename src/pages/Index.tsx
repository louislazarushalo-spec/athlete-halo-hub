import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { HomepageAthleteCard } from "@/components/athletes/HomepageAthleteCard";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

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

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  // Random 10 faces, shuffled once per mount
  const fomoFaces = useMemo(() => shuffle(athletes).slice(0, 10), [athletes]);

  const featuredAthletes = useMemo(() => {
    return ['arthur-cazaux','iga-swiatek','antoine-dupont','victor-wembanyama','leon-marchand','alexia-putellas']
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
        {/* Hero */}
        <section className="relative min-h-[calc(100svh-3rem)] sm:min-h-[calc(100svh-3.5rem)] flex items-center justify-center overflow-hidden">
          <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="https://videos.pexels.com/video-files/4729192/4729192-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />

          <div className="relative z-10 w-full px-5 sm:px-6">
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4 sm:mb-5 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-xs text-primary font-medium">Welcome to Halo Collective</span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-[1.65rem] sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 leading-[1.15] animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
                Step inside your favorite{" "}
                <span className="gradient-text">athletes' worlds</span>
              </h1>

              {/* Subtitle — new copy */}
              <p className="text-sm sm:text-base text-muted-foreground max-w-sm sm:max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed line-clamp-2 animate-fade-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
                Where fans belong - and the journey unfolds.
              </p>

              {/* Single primary CTA */}
              <div className="w-full sm:max-w-xs animate-fade-up opacity-0 stagger-3 mb-6 sm:mb-8" style={{ animationFillMode: 'forwards' }}>
                <Link to="/signup" className="block">
                  <Button variant="hero" size="xl" className="w-full rounded-full">
                    Explore athletes
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Premium athlete tiles row */}
              <div className="w-full animate-fade-up opacity-0 stagger-4" style={{ animationFillMode: 'forwards' }}>
                <div className="flex gap-2.5 overflow-x-auto scrollbar-none snap-x snap-mandatory px-1 pb-2">
                  {fomoFaces.map((athlete) => (
                    <Link
                      key={athlete.id}
                      to={`/athlete/${athlete.id}`}
                      className="shrink-0 snap-start w-[72px] h-[96px] sm:w-[80px] sm:h-[106px] rounded-xl overflow-hidden border border-border/30 transition-all duration-200 hover:border-primary/40 hover:shadow-[0_0_12px_hsl(var(--primary)/0.25)] active:shadow-[0_0_16px_hsl(var(--primary)/0.35)] active:scale-[0.97]"
                    >
                      <img
                        src={athlete.avatar}
                        alt={athlete.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Scroll affordance */}
              <button
                onClick={scrollToAthletes}
                className="mt-6 sm:mt-8 flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors animate-fade-up opacity-0 stagger-4"
                style={{ animationFillMode: 'forwards' }}
              >
                Meet the athletes
                <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
              </button>
            </div>
          </div>
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
  );
};

export default Index;
