import { FanSidebar } from "@/components/fan/FanSidebar";
import { MobileNav } from "@/components/fan/MobileNav";
import { UpcomingEventsSection } from "@/components/fan/sections/UpcomingEventsSection";
import { YourHalosSection } from "@/components/fan/sections/YourHalosSection";
import { MyNewsSection } from "@/components/fan/sections/MyNewsSection";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const FanHomePage = () => {
  const { user, getDisplayName, getFullName } = useAuth();
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Left Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <FanSidebar />
      </div>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between md:justify-end gap-3">
            {/* Mobile menu button */}
            <MobileNav />
            
            {/* Logo for mobile */}
            <Link to="/home" className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-sm">H</span>
              </div>
            </Link>

            <div className="flex items-center gap-2 md:gap-3">
              <Link to="/cart" className="relative p-2 rounded-full hover:bg-muted/50 transition-colors">
                <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-primary/60 to-primary/30 text-primary-foreground text-sm">
                    {user ? getDisplayName().charAt(0).toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{getFullName()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Sections */}
        <div className="px-4 md:px-6 py-6 md:py-8">
          {/* Welcome Message */}
          <div className="mb-6 md:mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-semibold">Welcome back, {getDisplayName()} 👋</h1>
          </div>

          <YourHalosSection />
          <UpcomingEventsSection />
          <MyNewsSection />
        </div>
      </main>
    </div>
  );
};

export default FanHomePage;
