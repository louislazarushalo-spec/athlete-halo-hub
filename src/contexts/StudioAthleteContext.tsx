import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { athletes as hardcodedAthletes } from "@/data/athletes";

interface ManagedAthlete {
  slug: string;
  display_name: string;
  avatar_url: string;
  sport: string;
  hasProfile: boolean; // whether an athlete_profiles row exists
}

interface StudioAthleteContextValue {
  currentAthleteSlug: string | null;
  setCurrentAthleteSlug: (slug: string) => void;
  managedAthletes: ManagedAthlete[];
  loading: boolean;
  ensureProfile: (slug: string) => Promise<void>;
}

const StudioAthleteContext = createContext<StudioAthleteContextValue>({
  currentAthleteSlug: null,
  setCurrentAthleteSlug: () => {},
  managedAthletes: [],
  loading: true,
  ensureProfile: async () => {},
});

export const useStudioAthleteContext = () => useContext(StudioAthleteContext);

const STORAGE_KEY = "halo_studio_athlete";

export const StudioAthleteProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [currentAthleteSlug, setCurrentAthleteSlugState] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );
  const [profileSlugs, setProfileSlugs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const setCurrentAthleteSlug = useCallback((slug: string) => {
    setCurrentAthleteSlugState(slug);
    localStorage.setItem(STORAGE_KEY, slug);
  }, []);

  // Build the full athlete list from hardcoded data, marking which have DB profiles
  const managedAthletes: ManagedAthlete[] = hardcodedAthletes.map((a) => ({
    slug: a.id,
    display_name: a.name,
    avatar_url: a.avatar,
    sport: a.sport,
    hasProfile: profileSlugs.has(a.id),
  }));

  // Ensure an athlete_profiles row exists for a given slug (create if missing)
  const ensureProfile = useCallback(async (slug: string) => {
    if (!user) return;
    // Skip if we already know it exists
    if (profileSlugs.has(slug)) return;

    const athlete = hardcodedAthletes.find((a) => a.id === slug);
    if (!athlete) return;

    try {
      // Check if profile already exists (maybe created by another session)
      const { data: existing } = await supabase
        .from("athlete_profiles")
        .select("id")
        .eq("athlete_slug", slug)
        .eq("user_id", user.id)
        .maybeSingle();

      if (!existing) {
        const { error } = await supabase
          .from("athlete_profiles")
          .insert({
            user_id: user.id,
            athlete_slug: slug,
            display_name: athlete.name,
            bio: athlete.bio || "",
            avatar_url: athlete.avatar || "",
            banner_url: athlete.banner || "",
            sport: athlete.sport || "",
          });
        if (error) throw error;
      }
      setProfileSlugs((prev) => new Set([...prev, slug]));
    } catch (err) {
      console.error("Error ensuring athlete profile:", err);
    }
  }, [user, profileSlugs]);

  // Load existing profile slugs for this user
  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("athlete_profiles")
          .select("athlete_slug")
          .eq("user_id", user.id);
        if (error) throw error;

        const slugs = new Set((data || []).map((d: any) => d.athlete_slug as string));
        setProfileSlugs(slugs);

        // Auto-select if nothing selected
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved || !hardcodedAthletes.find((a) => a.id === saved)) {
          // Pick the first athlete that has a profile, else first hardcoded
          const firstWithProfile = hardcodedAthletes.find((a) => slugs.has(a.id));
          setCurrentAthleteSlug(firstWithProfile?.id || hardcodedAthletes[0]?.id || "");
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
    <StudioAthleteContext.Provider value={{ currentAthleteSlug, setCurrentAthleteSlug, managedAthletes, loading, ensureProfile }}>
      {children}
    </StudioAthleteContext.Provider>
  );
};
