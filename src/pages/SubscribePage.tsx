import { useParams, useNavigate, Link } from "react-router-dom";
import { getAthleteById } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ArrowLeft, CreditCard, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useState, useEffect } from "react";

const SubscribePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const athlete = getAthleteById(id || "");
  const { isAuthenticated } = useAuth();
  const { isSubscribed, subscribe } = useSubscription();
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if already subscribed
  useEffect(() => {
    if (athlete && isSubscribed(athlete.id)) {
      navigate(`/subscribe/${athlete.id}/success`);
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

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Basic validation
    if (!cardName.trim() || !cardNumber.trim() || !expiry.trim() || !cvc.trim()) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mark as subscribed
    subscribe(athlete.id);
    
    // Navigate to success page
    navigate(`/subscribe/${athlete.id}/success`);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const benefits = [
    "Full access to My Training",
    "Access to Community & fan discussions",
    "Access to My Music and exclusive playlists",
    "New premium content as it drops",
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
          className="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-2xl mb-6"
        />

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-center mb-3">
          Subscribe to {athlete.name}
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center max-w-md mb-8 text-lg">
          Unlock full access to his training programs, community discussions, music, and exclusive behind-the-scenes content.
        </p>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-3xl w-full">
          {/* Pricing Card */}
          <div className="glass-card p-6 flex-1">
            <h3 className="text-lg font-semibold mb-1">{athlete.name} Premium</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-foreground">€4.50</span>
              <span className="text-muted-foreground"> / month</span>
            </div>
            
            {/* Benefits List */}
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Form */}
          <div className="glass-card p-6 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Payment Details</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  className="bg-background/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength={4}
                    className="bg-background/50"
                  />
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                variant="gold" 
                size="lg" 
                className="w-full text-lg h-12 mt-4"
                onClick={handleSubscribe}
                disabled={isProcessing || !cardName || !cardNumber || !expiry || !cvc}
              >
                {isProcessing ? (
                  <>
                    <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Confirm and Unlock Premium
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <p className="text-xs text-muted-foreground text-center max-w-md mt-6">
          By subscribing, you will be charged €4.50 per month. Cancel anytime in your account settings.
        </p>
      </div>
    </div>
  );
};

export default SubscribePage;
