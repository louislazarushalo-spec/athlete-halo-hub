import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card/30 border-t border-border/30 mt-12 sm:mt-16">
      <div className="px-4 sm:px-6 max-w-6xl mx-auto py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-dark via-primary to-blue-light flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-[10px]">H</span>
              </div>
              <span className="font-display text-sm font-semibold">Halo Collective</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
              Get unprecedented access to athletes' real lives, daily habits, and trusted gear.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-xs mb-3 text-foreground/70 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li><Link to="/athletes" className="hover:text-foreground transition-colors">Athletes</Link></li>
              <li><Link to="/feed" className="hover:text-foreground transition-colors">Feed</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-xs mb-3 text-foreground/70 uppercase tracking-wider">Account</h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li><Link to="/login" className="hover:text-foreground transition-colors">Log in</Link></li>
              <li><Link to="/signup" className="hover:text-foreground transition-colors">Create account</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-6 pt-5 text-center text-[11px] text-muted-foreground/60">
          <p>© {new Date().getFullYear()} Halo Collective. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
