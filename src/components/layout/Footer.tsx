import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-dark via-primary to-blue-light flex items-center justify-center shadow-glow-blue">
                <span className="text-primary-foreground font-bold text-sm">H</span>
              </div>
              <span className="font-display text-xl font-semibold">Halo Collective</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Step inside the real lives, routines, and gear of the world's best athletes — and get closer than ever.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/athletes" className="hover:text-foreground transition-colors">Browse Athletes</Link></li>
              <li><Link to="/feed" className="hover:text-foreground transition-colors">Your Feed</Link></li>
              <li><Link to="/cart" className="hover:text-foreground transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-foreground transition-colors">Log In</Link></li>
              <li><Link to="/signup" className="hover:text-foreground transition-colors">Create Account</Link></li>
              <li><Link to="/account" className="hover:text-foreground transition-colors">My Account</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Halo Collective. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
