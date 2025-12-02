import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const MinimalHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-dark via-primary to-blue-light flex items-center justify-center shadow-glow-blue">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="font-display text-xl font-semibold">Halo Collective</span>
          </Link>

          {/* Login Button Only */}
          <Link to="/login">
            <Button variant="gold" size="sm">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
