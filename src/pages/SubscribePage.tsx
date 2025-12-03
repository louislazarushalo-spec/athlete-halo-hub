import { useParams, useNavigate, Link } from "react-router-dom";
import { getAthleteById } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { Lock, Check, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const SubscribePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const athlete = getAthleteById(id || "");
  const { isAuthenticated } = useAuth();

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

  const handleSubscribe = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    // In a real app, this would trigger a payment flow
    toast({
      title: "Subscription coming soon",
      description: "Premium subscriptions will be available soon!",
    });
  };

  const benefits = [
    "Full access to training programs",
    "Exclusive community discussions",
    "Music playlists & podcasts",
    "Behind-the-scenes content",
    "Priority contest entries",
    "Direct Q&A sessions",
  ];

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
        {/* Back Button */}
        <Link 
          to={`/athlete/${athlete.id}`}
          className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to profile</span>
        </Link>

        {/* Lock Icon */}
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-8 animate-pulse">
          <Lock className="h-10 w-10 text-primary" />
        </div>

        {/* Athlete Avatar */}
        <img 
          src={athlete.avatar} 
          alt={athlete.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-2xl mb-6"
        />

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-center mb-3">
          Subscribe to {athlete.name}
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center max-w-md mb-8 text-lg">
          Unlock full access to his training programs, community discussions, music, and exclusive behind-the-scenes content.
        </p>

        {/* Pricing Card */}
        <div className="glass-card p-8 max-w-sm w-full text-center mb-8">
          <div className="mb-6">
            <span className="text-5xl font-bold text-foreground">€4.50</span>
            <span className="text-muted-foreground text-lg"> / month</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">
            Cancel anytime. Instant access after subscribing.
          </p>

          {/* Benefits List */}
          <ul className="space-y-3 text-left mb-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button 
            variant="gold" 
            size="lg" 
            className="w-full text-lg h-14"
            onClick={handleSubscribe}
          >
            <Lock className="h-5 w-5 mr-2" />
            Unlock Premium (€4.50 / month)
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          By subscribing, you agree to our Terms of Service. Your subscription will auto-renew monthly until canceled.
        </p>
      </div>
    </div>
  );
};

export default SubscribePage;
