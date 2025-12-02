import { Link, useLocation } from "react-router-dom";
import { Home, Compass, MessageCircle, Bell, Settings, Smartphone, ChevronDown, LogOut, User } from "lucide-react";
import { athletes, getAthleteById } from "@/data/athletes";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", icon: Home, path: "/home" },
  { label: "Explore", icon: Compass, path: "/explore" },
  { label: "Chats", icon: MessageCircle, path: "/chats" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

// Followed athletes: Arthur Cazaux, Tommy Fleetwood, Elisa Balsamo
const followedAthleteIds = ['arthur-cazaux', 'tommy-fleetwood', 'elisa-balsamo'];
const followedAthletes = followedAthleteIds
  .map(id => getAthleteById(id))
  .filter(Boolean) as typeof athletes;

// Simulated recently viewed (last 3)
const recentlyViewed = athletes.slice(0, 3);

export const FanSidebar = () => {
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 border-b border-border">
        <Link to="/home" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-sm">H</span>
          </div>
          <span className="font-display text-lg font-semibold">Halo Collective</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-5 my-2 border-t border-border" />

      {/* My Followed Athletes */}
      <div className="px-5 py-3 flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          My Followed Athletes
        </h3>
        <div className="space-y-2">
          {followedAthletes.map((athlete) => (
            <Link
              key={athlete.id}
              to={`/athlete/${athlete.id}`}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <img
                src={athlete.avatar}
                alt={athlete.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary/30 transition-all"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {athlete.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">{athlete.sport}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recently Viewed */}
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-3">
          Recently Viewed
        </h3>
        <div className="space-y-2">
          {recentlyViewed.map((athlete) => (
            <Link
              key={`recent-${athlete.id}`}
              to={`/athlete/${athlete.id}`}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <img
                src={athlete.avatar}
                alt={athlete.name}
                className="w-7 h-7 rounded-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <p className="text-sm text-muted-foreground truncate group-hover:text-foreground transition-colors">
                {athlete.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Get the App */}
      <div className="px-5 py-3">
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <Smartphone className="h-4 w-4" />
          Get the App
        </Button>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-border">
        <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/60 to-primary/30 flex items-center justify-center">
                <span className="font-medium text-primary-foreground">JD</span>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
              </div>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link to="/account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login" className="flex items-center gap-2 text-destructive">
                <LogOut className="h-4 w-4" />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};
