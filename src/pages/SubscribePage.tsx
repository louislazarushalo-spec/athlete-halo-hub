import { useParams, useNavigate, Link } from "react-router-dom";
import { getAthleteById } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Sparkles } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useEffect } from "react";

const SubscribePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const athlete = getAthleteById(id || "");
  const { isSubscribed } = useSubscription();

  // Redirect if already subscribed
  useEffect(() => {
    if (athlete && isSubscribed(athlete.id)) {
      navigate(`/athlete/${athlete.id}`);
    }
  }, [athlete, isSubscribed, navigate]);

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

  const benefits = [
    "Full access to My Training",
    "Access to Community & fan discussions",
    "Access to My Music and playlists",
    "Early or exclusive content drops",
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
        <p className="text-muted-foreground text-center max-w-md mb-10 text-lg">
          Unlock full access to his world.
        </p>

        {/* Pricing Card */}
        <div className="glass-card p-8 max-w-md w-full">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">{athlete.name} Premium</h3>
          </div>
          
          <div className="mb-6">
            <span className="text-5xl font-bold text-foreground">€4.50</span>
            <span className="text-muted-foreground text-lg"> / month</span>
          </div>
          
          {/* Benefits List */}
          <ul className="space-y-4 mb-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Button 
            variant="gold" 
            size="lg" 
            className="w-full text-lg h-14"
            onClick={() => navigate(`/subscribe/${athlete.id}/payment`)}
          >
            Unlock Premium
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
