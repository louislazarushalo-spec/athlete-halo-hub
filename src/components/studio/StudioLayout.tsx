import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useStudioRole } from "@/hooks/useStudioRole";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { AthleteSwitcher } from "./AthleteSwitcher";
import { useState } from "react";

const TABS = [
  { id: "my-halo", label: "My Halo" },
  { id: "copilot", label: "Copilot" },
  { id: "publish", label: "Publish" },
  { id: "monetize", label: "Monetize" },
  { id: "analytics", label: "Analytics" },
] as const;

const MOBILE_PRIMARY = ["my-halo", "copilot", "publish"] as const;
const MOBILE_MORE = ["monetize", "analytics"] as const;

type TabId = (typeof TABS)[number]["id"];

interface StudioLayoutProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  children: React.ReactNode;
  onGoHome?: () => void;
}

export type { TabId };

export const StudioLayout = ({ activeTab, onTabChange, children, onGoHome }: StudioLayoutProps) => {
  const { logout } = useAuth();
  const { hasAccess, loading } = useStudioRole();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-xl font-semibold mb-2">Studio access required</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Halo Studio is available to athletes and their agents. Contact us to get access.
          </p>
          <Button variant="outline" onClick={() => navigate("/home")}>
            Back to Halo
          </Button>
        </div>
      </div>
    );
  }

  const isMoreTab = MOBILE_MORE.includes(activeTab as any);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Desktop top nav */}
      {!isMobile && (
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-4 flex items-center justify-between h-14">
            <button onClick={() => onGoHome ? onGoHome() : navigate("/home")} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-dark via-primary to-blue-light flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">H</span>
              </div>
              <span className="font-display text-lg font-semibold">Studio</span>
            </button>

            <nav className="flex items-center bg-muted/50 rounded-lg p-1 gap-0.5">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "px-2.5 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <AthleteSwitcher />
              <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}>
                <LogOut className="h-4 w-4 mr-1" /> Exit
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Mobile top bar */}
      {isMobile && (
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50 px-4 flex items-center justify-between h-12">
          <button onClick={() => onGoHome ? onGoHome() : navigate("/home")} className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-dark via-primary to-blue-light flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px]">H</span>
            </div>
            <span className="font-display text-base font-semibold">Studio</span>
          </button>
          <div className="flex items-center gap-1">
            <AthleteSwitcher />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { logout(); navigate("/"); }}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>
      )}

      {/* Content */}
      <main className={cn("flex-1 pb-20 md:pb-8", isMobile ? "pt-2" : "pt-6")}>
        <div className="container mx-auto px-4 max-w-3xl">
          {children}
        </div>
      </main>

      {/* Mobile bottom tab bar */}
      {isMobile && (
        <>
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/50 flex items-center justify-around h-14 px-1">
            {MOBILE_PRIMARY.map((tabId) => {
              const tab = TABS.find((t) => t.id === tabId)!;
              return (
                <button
                  key={tab.id}
                  onClick={() => { onTabChange(tab.id); setMoreOpen(false); }}
                  className={cn(
                    "flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-colors min-w-0 flex-1",
                    activeTab === tab.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="text-[10px] font-medium leading-tight text-center">{tab.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-colors min-w-0 flex-1",
                isMoreTab || moreOpen ? "text-primary" : "text-muted-foreground"
              )}
            >
              <MoreHorizontal className="h-4 w-4 mb-0.5" />
              <span className="text-[10px] font-medium leading-tight">More</span>
            </button>
          </nav>

          {moreOpen && (
            <div className="fixed bottom-14 left-0 right-0 z-50 bg-background border-t border-border/50 px-4 py-2 space-y-1">
              {MOBILE_MORE.map((tabId) => {
                const tab = TABS.find((t) => t.id === tabId)!;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { onTabChange(tab.id); setMoreOpen(false); }}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
