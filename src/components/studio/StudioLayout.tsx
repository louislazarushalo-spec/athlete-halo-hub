import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useStudioRole } from "@/hooks/useStudioRole";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, MoreHorizontal, Home, Sparkles, Send, BarChart3, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { AthleteSwitcher } from "./AthleteSwitcher";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const TABS = [
  { id: "my-halo", label: "Halo", icon: Home },
  { id: "copilot", label: "Copilot", icon: Sparkles },
  { id: "publish", label: "Publish", icon: Send },
  { id: "monetize", label: "Monetize", icon: DollarSign },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
] as const;

const MOBILE_PRIMARY_IDS = ["my-halo", "copilot", "publish"] as const;
const MOBILE_MORE_IDS = ["monetize", "analytics"] as const;

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

  const isMoreTab = MOBILE_MORE_IDS.includes(activeTab as any);

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

      {/* Mobile top bar — compact 44px */}
      {isMobile && (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 px-3 flex items-center justify-between h-11">
          <button onClick={() => onGoHome ? onGoHome() : navigate("/home")} className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-dark via-primary to-blue-light flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px]">H</span>
            </div>
            <span className="font-display text-[15px] font-semibold">Studio</span>
          </button>
          <div className="flex items-center gap-0.5">
            <AthleteSwitcher />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { logout(); navigate("/"); }}>
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </header>
      )}

      {/* Content — proper bottom padding for mobile nav */}
      <main className={cn("flex-1", isMobile ? "pt-1.5 pb-[calc(60px+env(safe-area-inset-bottom,0px)+8px)]" : "pt-6 pb-8")}>
        <div className={cn("container mx-auto max-w-3xl", isMobile ? "px-3" : "px-4")}>
          {children}
        </div>
      </main>

      {/* Mobile bottom tab bar — safe-area aware, 56px + safe area */}
      {isMobile && (
        <>
          <nav
            className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/50"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <div className="flex items-stretch h-14">
              {MOBILE_PRIMARY_IDS.map((tabId) => {
                const tab = TABS.find((t) => t.id === tabId)!;
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { onTabChange(tab.id); setMoreOpen(false); }}
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[44px] transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-[10px] font-medium leading-none">{tab.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[44px] transition-colors",
                  isMoreTab || moreOpen ? "text-primary" : "text-muted-foreground"
                )}
              >
                <MoreHorizontal className="h-[18px] w-[18px]" strokeWidth={isMoreTab || moreOpen ? 2.5 : 2} />
                <span className="text-[10px] font-medium leading-none">More</span>
              </button>
            </div>
          </nav>

          {/* More sheet */}
          <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
            <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-8" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)" }}>
              <div className="w-10 h-1 rounded-full bg-muted mx-auto mb-4 mt-1" />
              <div className="space-y-1">
                {MOBILE_MORE_IDS.map((tabId) => {
                  const tab = TABS.find((t) => t.id === tabId)!;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { onTabChange(tab.id); setMoreOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors min-h-[48px]",
                        activeTab === tab.id ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
};
