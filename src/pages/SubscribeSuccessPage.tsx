import { useParams, useNavigate, Link } from "react-router-dom";
import { getAthleteById } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useSubscription } from "@/contexts/SubscriptionContext";

const SubscribeSuccessPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const athlete = getAthleteById(id || "");
  const { isSubscribed, isLoading } = useSubscription();

  useEffect(() => {
    // If not subscribed and done loading, redirect to subscribe page
    if (!isLoading && athlete && !isSubscribed(athlete.id)) {
      navigate(`/subscribe/${athlete.id}`);
    }
  }, [athlete, isSubscribed, navigate, isLoading]);

  if (!athlete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Athlete not found</h1>
          <Link to="/explore">
            <Button variant="gold">Browse Athletes</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
        style={{ backgroundImage: `url(${athlete.banner})` }}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Success Animation */}
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-8 animate-scale-in">
          <Check className="h-12 w-12 text-primary-foreground" strokeWidth={3} />
        </div>

        {/* Athlete Avatar */}
        <img 
          src={athlete.avatar} 
          alt={athlete.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-2xl mb-6"
        />

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-center mb-3 flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-primary" />
          You've unlocked {athlete.name}'s Premium Halo
          <Sparkles className="h-8 w-8 text-primary" />
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center max-w-md mb-4 text-lg">
          You now have full access to his training, community, and music.
        </p>

        {/* Thank you */}
        <p className="text-foreground/80 text-center mb-8">
          Thanks for supporting {athlete.name}.
        </p>

        {/* CTA Button */}
        <Button 
          variant="gold" 
          size="lg" 
          className="text-lg h-14 px-8"
          onClick={() => navigate(`/athlete/${athlete.id}`)}
        >
          Go to {athlete.name}'s Halo
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SubscribeSuccessPage;
