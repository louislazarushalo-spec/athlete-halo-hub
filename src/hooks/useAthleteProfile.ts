import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolveAssetUrl } from "@/lib/assetResolver";
import { getAthleteById, Athlete } from "@/data/athletes";

export interface AthleteProfileData {
  /** The static athlete data (always available if athlete exists) */
  athlete: Athlete | null;
  /** DB overrides for avatar, banner, bio (may be null if no DB profile) */
  avatarUrl: string;
  bannerUrl: string;
  bio: string;
  displayName: string;
  sport: string;
  /** Published studio posts for this athlete */
  studioPosts: StudioPostPublic[];
  loading: boolean;
}

export interface StudioPostPublic {
  id: string;
  athlete_id: string;
  type: string;
  title: string;
  body: string;
  media: string[];
  published_at: string;
  created_at: string;
}

/**
 * Hook that merges static athlete data with DB profile data.
 * DB data wins for avatar, banner, bio when available.
 * Also fetches published studio_posts.
 */
export function useAthleteProfile(athleteId: string | undefined): AthleteProfileData {
  const athlete = athleteId ? getAthleteById(athleteId) : null;
  const [dbProfile, setDbProfile] = useState<{
    avatar_url: string | null;
    banner_url: string | null;
    bio: string | null;
    display_name: string;
    sport: string | null;
  } | null>(null);
  const [studioPosts, setStudioPosts] = useState<StudioPostPublic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!athleteId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);

      // Fetch DB profile and published posts in parallel
      const [profileRes, postsRes] = await Promise.all([
        supabase
          .from("athlete_profiles")
          .select("avatar_url, banner_url, bio, display_name, sport")
          .eq("athlete_slug", athleteId)
          .maybeSingle(),
        supabase
          .from("studio_posts")
          .select("id, athlete_id, type, title, body, media, published_at, created_at")
          .eq("athlete_id", athleteId)
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(50),
      ]);

      if (cancelled) return;

      if (profileRes.data) {
        setDbProfile(profileRes.data as any);
      } else {
        setDbProfile(null);
      }

      setStudioPosts((postsRes.data as unknown as StudioPostPublic[]) || []);
      setLoading(false);
    };

    fetchData();
    return () => { cancelled = true; };
  }, [athleteId]);

  // Merge: DB wins over static when values are non-empty
  const avatarUrl = (dbProfile?.avatar_url && dbProfile.avatar_url.length > 0)
    ? resolveAssetUrl(dbProfile.avatar_url)
    : (athlete?.avatar || "");
  const bannerUrl = (dbProfile?.banner_url && dbProfile.banner_url.length > 0)
    ? resolveAssetUrl(dbProfile.banner_url)
    : (athlete?.banner || "");
  const bio = (dbProfile?.bio && dbProfile.bio.length > 0)
    ? dbProfile.bio
    : (athlete?.bio || "");
  const displayName = dbProfile?.display_name || athlete?.name || "";
  const sport = dbProfile?.sport || athlete?.sport || "";

  return {
    athlete,
    avatarUrl,
    bannerUrl,
    bio,
    displayName,
    sport,
    studioPosts,
    loading,
  };
}
