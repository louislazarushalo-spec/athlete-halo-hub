import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Compass, MessageCircle, Bell, Settings, X, LogOut, User, Menu } from "lucide-react";
import { getAthleteById } from "@/data/athletes";
import { useAuth } from "@/contexts/AuthContext";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { useFollowedAthletes } from "@/hooks/useFollowedAthletes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { label: "Home", icon: Home, path: "/home" },
  { label: "Explore", icon: Compass, path: "/explore" },
  { label: "Chats", icon: MessageCircle, path: "/chats" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { resolve } = useAthleteProfiles();
  const { followedIds, loading: followLoading } = useFollowedAthletes();
  const [open, setOpen] = useState(false);

  const followedAthletes = followedIds
    .map(id => getAthleteById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getAthleteById>>[];

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setOpen(false);
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userInitials = userName.substring(0, 2).toUpperCase();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-sm">H</span>
            </div>
            <span className="font-display text-lg font-semibold">Halo Collective</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)}
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

        <div className="mx-4 my-2 border-t border-border" />

        {/* Followed Athletes */}
        <div className="px-4 py-3 flex-1 overflow-y-auto max-h-[40vh]">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            My Followed Athletes
          </h3>
          <div className="space-y-2">
            {followLoading ? (
              <p className="text-xs text-muted-foreground">Loading…</p>
            ) : followedAthletes.length === 0 ? (
              <p className="text-xs text-muted-foreground">No athletes followed yet.</p>
            ) : (
              followedAthletes.map((athlete) => (
                <Link
                  key={athlete.id}
                  to={`/athlete/${athlete.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={resolve(athlete.id, athlete.avatar, athlete.banner).avatar}
                    alt={athlete.name}
                    className="w-8 h-8 rounded-full object-cover object-top"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{athlete.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{athlete.sport}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border bg-card">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/60 to-primary/30 flex items-center justify-center">
              <span className="font-medium text-primary-foreground">{userInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => { navigate("/profile"); setOpen(false); }}
            >
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
