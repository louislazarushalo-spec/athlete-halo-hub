import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface PremiumLockedContentProps {
  athleteId: string;
  athleteName: string;
  children: React.ReactNode;
  customSubtitle?: string;
}

export const PremiumLockedContent = ({ 
  athleteId, 
  athleteName, 
  children,
  customSubtitle
}: PremiumLockedContentProps) => {
  return (
    <div className="relative">
      {/* Blurred preview content */}
      <div className="blur-md pointer-events-none select-none opacity-50">
        {children}
      </div>

      {/* Premium overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass-card p-8 max-w-md w-full text-center mx-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Premium Access Required</h3>
          <p className="text-muted-foreground mb-6">
            {customSubtitle || `Subscribe to unlock exclusive content and deeper access to ${athleteName}'s world.`}
          </p>
          <Link to={`/subscribe/${athleteId}`}>
            <Button variant="gold" size="lg" className="w-full">
              <Lock className="h-4 w-4 mr-2" />
              Unlock Premium (€4.50 / month)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
