import { useState, useRef, useEffect } from "react";
import { useStudioAthleteContext } from "@/contexts/StudioAthleteContext";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveAssetUrl } from "@/lib/assetResolver";

export const AthleteSwitcher = () => {
  const { currentAthleteSlug, setCurrentAthleteSlug, managedAthletes, ensureProfile } = useStudioAthleteContext();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const current = managedAthletes.find((a) => a.slug === currentAthleteSlug);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = managedAthletes.filter((a) =>
    a.display_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (slug: string) => {
    setCurrentAthleteSlug(slug);
    setOpen(false);
    setSearch("");
    // Fire-and-forget: ensure a DB profile exists (don't block UI)
    ensureProfile(slug);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
      >
        <div className="w-6 h-6 rounded-full overflow-hidden bg-muted-foreground/20">
          {current?.avatar_url && <img src={resolveAssetUrl(current.avatar_url)} alt="" className="w-full h-full object-cover" />}
        </div>
        <span className="text-sm font-medium max-w-[120px] truncate">{current?.display_name || "Select athlete"}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 w-72 bg-popover border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-2 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search athletes..."
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-muted/50 rounded-lg border-0 outline-none placeholder:text-muted-foreground"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-72 overflow-y-auto py-1">
            {filtered.map((a) => (
              <button
                key={a.slug}
                onClick={() => handleSelect(a.slug)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-muted/50 transition-colors",
                  a.slug === currentAthleteSlug && "bg-primary/5"
                )}
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-muted-foreground/20 shrink-0">
                  {a.avatar_url && <img src={resolveAssetUrl(a.avatar_url)} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{a.display_name}</p>
                  <p className="text-[10px] text-muted-foreground">{a.sport}</p>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">No athletes found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
