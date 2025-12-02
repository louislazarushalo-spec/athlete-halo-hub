import { FanSidebar } from "@/components/fan/FanSidebar";
import { UpcomingEventsSection } from "@/components/fan/sections/UpcomingEventsSection";
import { YourHalosSection } from "@/components/fan/sections/YourHalosSection";
import { MyNewsSection } from "@/components/fan/sections/MyNewsSection";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const FanHomePage = () => {
  const { user } = useAuth();
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Left Sidebar */}
      <FanSidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="px-6 py-4 flex items-center justify-end gap-3">
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-muted/50 transition-colors">
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-primary/60 to-primary/30 text-primary-foreground text-sm">
                  {user ? user.email?.charAt(0).toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user?.email?.split('@')[0]}</span>
            </div>
          </div>
        </header>

        {/* Content Sections */}
        <div className="px-6 py-8">
          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold">Welcome back Louis 👋</h1>
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
