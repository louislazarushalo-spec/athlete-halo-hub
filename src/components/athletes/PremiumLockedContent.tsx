import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Crown, Sparkles, Star, ArrowLeft } from "lucide-react";

interface PremiumLockedContentProps {
  athleteId: string;
  athleteName: string;
  children: React.ReactNode;
  customSubtitle?: string;
  onGoBack?: () => void;
}

export const PremiumLockedContent = ({ 
  athleteId, 
  athleteName, 
  children,
  customSubtitle,
  onGoBack
}: PremiumLockedContentProps) => {
  return (
    <div className="relative min-h-[400px]">
      {/* Blurred preview content with darker overlay */}
      <div className="blur-sm pointer-events-none select-none">
        {children}
      </div>

      {/* Premium overlay - soft dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background/95 backdrop-blur-[2px]" />

      {/* Centered premium content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative max-w-lg w-full">
          {/* Glow effect behind card */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 animate-pulse" />
          
          {/* Premium card */}
          <div className="relative bg-gradient-to-b from-card/95 to-card border border-primary/20 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-sm">
            {/* Decorative sparkles */}
            <div className="absolute -top-3 -right-3">
              <Sparkles className="h-6 w-6 text-primary/60 animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Star className="h-5 w-5 text-primary/40" />
            </div>

            {/* Premium badge */}
            <div className="relative mx-auto mb-6 w-20 h-20">
              {/* Outer ring with gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 animate-glow-pulse" />
              {/* Inner circle */}
              <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center">
                <Crown className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Premium Access Required
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-6 text-base leading-relaxed max-w-md mx-auto">
              {customSubtitle || `Subscribe to unlock exclusive training programs, behind-the-scenes content, and a deeper connection with ${athleteName}.`}
            </p>

            {/* Features list */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary">
                <Lock className="h-3.5 w-3.5" />
                Exclusive Content
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary">
                <Crown className="h-3.5 w-3.5" />
                Premium Access
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Member Benefits
              </span>
            </div>

            {/* CTA Button */}
            <Link to={`/subscribe/${athleteId}`} className="block">
              <Button 
                variant="gold" 
                size="lg" 
                className="w-full max-w-xs mx-auto text-base font-semibold py-6 group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Lock className="h-5 w-5 mr-2" />
                Unlock Premium
              </Button>
            </Link>

            {/* Back button */}
            {onGoBack && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onGoBack}
                className="mt-4 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go back
              </Button>
            )}

            {/* Price hint */}
            <p className="mt-4 text-sm text-muted-foreground">
              Starting at <span className="text-primary font-semibold">€4.50</span> / month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
