import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const MinimalHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/30" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-dark via-primary to-blue-light flex items-center justify-center shadow-glow-blue">
              <span className="text-primary-foreground font-bold text-xs">H</span>
            </div>
            <span className="font-display text-base sm:text-lg font-semibold whitespace-nowrap">Halo Collective</span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm h-8 sm:h-9 px-3">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="gold" size="sm" className="text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-4 rounded-full whitespace-nowrap">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
