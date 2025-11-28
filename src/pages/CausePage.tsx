import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { getAthleteById } from "@/data/athletes";
import { Heart, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CausePage = () => {
  const { id } = useParams<{ id: string }>();
  const athlete = getAthleteById(id || "");
  const [donationAmount, setDonationAmount] = useState("");
  const [donated, setDonated] = useState(false);

  if (!athlete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Cause not found</h1>
          <Link to="/athletes">
            <Button variant="gold">Browse Athletes</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const { cause } = athlete;
  const progressPercent = (cause.raised / cause.target) * 100;

  const handleDonate = () => {
    if (donationAmount && parseFloat(donationAmount) > 0) {
      setDonated(true);
    }
  };

  const presetAmounts = [10, 25, 50, 100];

  if (donated) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="glass-card max-w-md mx-auto p-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h1 className="font-display text-2xl font-semibold mb-2">
                  Donation Successful
                </h1>
                <p className="text-muted-foreground mb-6">
                  Thanks for your donation — your support matters.
                </p>
                <Link to={`/athlete/${athlete.id}`}>
                  <Button variant="gold">Back to {athlete.name}'s Halo</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="glass-card overflow-hidden mb-8">
              <div className="relative h-64 sm:h-80">
                <img
                  src={cause.image}
                  alt={cause.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>
              <div className="p-8 -mt-20 relative">
                <Link 
                  to={`/athlete/${athlete.id}`}
                  className="text-primary text-sm font-medium hover:underline mb-2 block"
                >
                  ← Back to {athlete.name}'s Halo
                </Link>
                <span className="text-xs text-primary font-medium uppercase tracking-wide mb-2 block">
                  Cause Campaign
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  {cause.title}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {cause.story}
                </p>
              </div>
            </div>

            {/* Donation Card */}
            <div className="glass-card p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Progress */}
                <div>
                  <h2 className="font-display text-xl font-semibold mb-4">Progress</h2>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Raised so far</span>
                      <span className="font-bold text-primary">
                        {cause.currency}{cause.raised.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-4" />
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-muted-foreground">
                        {progressPercent.toFixed(0)}% of goal
                      </span>
                      <span className="text-muted-foreground">
                        Goal: {cause.currency}{cause.target.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Every donation brings us closer to making a real impact. Thank you for your support.
                  </p>
                </div>

                {/* Donation Form */}
                <div>
                  <h2 className="font-display text-xl font-semibold mb-4">Make a Donation</h2>
                  
                  {/* Preset amounts */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {presetAmounts.map(amount => (
                      <Button
                        key={amount}
                        variant={donationAmount === String(amount) ? "gold" : "outline"}
                        size="sm"
                        onClick={() => setDonationAmount(String(amount))}
                      >
                        {cause.currency}{amount}
                      </Button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="relative mb-4">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {cause.currency}
                    </span>
                    <Input
                      type="number"
                      placeholder="Custom amount"
                      className="pl-8"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                    />
                  </div>

                  <Button 
                    variant="gold" 
                    className="w-full" 
                    size="lg"
                    onClick={handleDonate}
                    disabled={!donationAmount || parseFloat(donationAmount) <= 0}
                  >
                    <Heart className="h-4 w-4" />
                    Donate {donationAmount && `${cause.currency}${donationAmount}`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CausePage;
