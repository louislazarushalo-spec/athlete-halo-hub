import { useParams, useNavigate, Link } from "react-router-dom";
import { getAthleteById } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";

const SubscribePaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const athlete = getAthleteById(id || "");
  const { avatarUrl: resolvedAvatar, bannerUrl: resolvedBanner } = useAthleteProfile(id);
  const { isAuthenticated, user } = useAuth();
  const { isSubscribed, subscribe, isLoading } = useSubscription();
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if already subscribed
  useEffect(() => {
    if (!isLoading && athlete && isSubscribed(athlete.id)) {
      navigate(`/athlete/${athlete.id}`);
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

  const handleSubscribe = async () => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }

    // Basic validation
    if (!cardName.trim() || !cardNumber.trim() || !expiry.trim() || !cvc.trim()) {
      toast.error("Please fill in all payment fields");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Note: In production, integrate with Stripe or another payment processor
      // This currently creates the subscription record without real payment processing
      const success = await subscribe(athlete.id);
      
      if (success) {
        navigate(`/subscribe/${athlete.id}/success`);
      } else {
        toast.error("Failed to process subscription. Please try again.");
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
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
        style={{ backgroundImage: `url(${resolvedBanner || athlete.banner})` }}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Back Button */}
        <Link 
          to={`/subscribe/${athlete.id}`}
          className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>

        {/* Athlete Avatar */}
        <img 
          src={resolvedAvatar || athlete.avatar} 
          alt={athlete.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-2xl mb-6"
        />

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-center mb-3">
          Complete your subscription
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-center max-w-md mb-10 text-lg">
          You're about to unlock {athlete.name} Premium for €4.50 / month.
        </p>

        {/* Payment Form */}
        <div className="glass-card p-8 max-w-md w-full">
          <div className="flex items-center gap-2 mb-6">
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
                <Label htmlFor="expiry">Expiration Date</Label>
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
              className="w-full text-lg h-14 mt-4"
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
                  Confirm and Start Subscription
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Legal Text */}
        <p className="text-xs text-muted-foreground text-center max-w-md mt-6">
          You will be charged €4.50 per month. Cancel anytime in your account settings.
        </p>
      </div>
    </div>
  );
};

export default SubscribePaymentPage;
