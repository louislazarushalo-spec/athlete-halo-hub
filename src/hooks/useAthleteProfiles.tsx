import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolveAssetUrl } from "@/lib/assetResolver";
import { athletes as staticAthletes, type Athlete } from "@/data/athletes";

interface DbOverrides {
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
}

interface AthleteProfilesContextValue {
  /** Returns athletes list with DB-resolved avatar/banner/bio */
  athletes: Athlete[];
  /** Resolve a single athlete's fields */
  resolve: (slug: string, staticAvatar: string, staticBanner: string, staticBio?: string) => {
    avatar: string;
    banner: string;
    bio: string;
  };
}

const AthleteProfilesContext = createContext<AthleteProfilesContextValue>({
  athletes: staticAthletes,
  resolve: (_slug, avatar, banner, bio) => ({ avatar, banner, bio: bio || "" }),
});

export const useAthleteProfiles = () => useContext(AthleteProfilesContext);

export const AthleteProfilesProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileMap, setProfileMap] = useState<Map<string, DbOverrides>>(new Map());

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      const { data } = await supabase
        .from("athlete_profiles")
        .select("athlete_slug, avatar_url, banner_url, bio");

      if (cancelled || !data) return;

      const map = new Map<string, DbOverrides>();
      for (const row of data) {
        if (!map.has(row.athlete_slug)) {
          map.set(row.athlete_slug, row as DbOverrides);
        }
      }
      setProfileMap(map);
    };

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  const resolve = useCallback(
    (slug: string, staticAvatar: string, staticBanner: string, staticBio?: string) => {
      const db = profileMap.get(slug);
      return {
        avatar: db?.avatar_url && db.avatar_url.length > 0
          ? resolveAssetUrl(db.avatar_url) : staticAvatar,
        banner: db?.banner_url && db.banner_url.length > 0
          ? resolveAssetUrl(db.banner_url) : staticBanner,
        bio: db?.bio && db.bio.length > 0 ? db.bio : (staticBio || ""),
      };
    },
    [profileMap]
  );

  // Build resolved athletes list
  const athletes = useMemo(() => {
    return staticAthletes.map((a) => {
      const r = resolve(a.id, a.avatar, a.banner, a.bio);
      return { ...a, avatar: r.avatar, banner: r.banner, bio: r.bio };
    });
  }, [resolve]);

  return (
    <AthleteProfilesContext.Provider value={{ athletes, resolve }}>
      {children}
    </AthleteProfilesContext.Provider>
  );
};
