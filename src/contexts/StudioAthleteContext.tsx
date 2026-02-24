import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { athletes as hardcodedAthletes } from "@/data/athletes";

interface ManagedAthlete {
  slug: string;
  display_name: string;
  avatar_url: string;
  sport: string;
}

interface StudioAthleteContextValue {
  currentAthleteSlug: string | null;
  setCurrentAthleteSlug: (slug: string) => void;
  managedAthletes: ManagedAthlete[];
  loading: boolean;
}

const StudioAthleteContext = createContext<StudioAthleteContextValue>({
  currentAthleteSlug: null,
  setCurrentAthleteSlug: () => {},
  managedAthletes: [],
  loading: true,
});

export const useStudioAthleteContext = () => useContext(StudioAthleteContext);

const STORAGE_KEY = "halo_studio_athlete";

export const StudioAthleteProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [currentAthleteSlug, setCurrentAthleteSlugState] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );
  const [managedAthletes, setManagedAthletes] = useState<ManagedAthlete[]>([]);
  const [loading, setLoading] = useState(true);

  const setCurrentAthleteSlug = useCallback((slug: string) => {
    setCurrentAthleteSlugState(slug);
    localStorage.setItem(STORAGE_KEY, slug);
  }, []);

  // Load athlete profiles the user manages
  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("athlete_profiles")
          .select("athlete_slug, display_name, avatar_url, sport")
          .eq("user_id", user.id);

        if (error) throw error;

        const athletes: ManagedAthlete[] = (data || []).map((d: any) => ({
          slug: d.athlete_slug,
          display_name: d.display_name,
          avatar_url: d.avatar_url,
          sport: d.sport,
        }));

        setManagedAthletes(athletes);

        // Auto-select if nothing selected or selection invalid
        const saved = localStorage.getItem(STORAGE_KEY);
        if (athletes.length > 0) {
          if (!saved || !athletes.find((a) => a.slug === saved)) {
            setCurrentAthleteSlug(athletes[0].slug);
          }
        }
      } catch (err) {
        console.error("Error loading managed athletes:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, setCurrentAthleteSlug]);

  return (
    <StudioAthleteContext.Provider value={{ currentAthleteSlug, setCurrentAthleteSlug, managedAthletes, loading }}>
      {children}
    </StudioAthleteContext.Provider>
  );
};
