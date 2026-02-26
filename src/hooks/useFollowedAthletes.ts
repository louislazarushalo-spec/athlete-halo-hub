import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useFollowedAthletes() {
  const { user } = useAuth();
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFollowedIds([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("followed_athletes")
      .select("athlete_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setFollowedIds((data || []).map((r) => r.athlete_id));
        setLoading(false);
      });
  }, [user]);

  const isFollowing = useCallback(
    (athleteId: string) => followedIds.includes(athleteId),
    [followedIds],
  );

  const toggleFollow = useCallback(
    async (athleteId: string) => {
      if (!user) return;
      const alreadyFollowing = followedIds.includes(athleteId);

      // Optimistic update
      setFollowedIds((prev) =>
        alreadyFollowing ? prev.filter((id) => id !== athleteId) : [...prev, athleteId],
      );

      if (alreadyFollowing) {
        const { error } = await supabase
          .from("followed_athletes")
          .delete()
          .eq("user_id", user.id)
          .eq("athlete_id", athleteId);
        if (error) {
          // Rollback
          setFollowedIds((prev) => [...prev, athleteId]);
        }
      } else {
        const { error } = await supabase
          .from("followed_athletes")
          .insert({ user_id: user.id, athlete_id: athleteId });
        if (error) {
          // If duplicate key, the follow already exists — keep optimistic state
          if (error.code === "23505") return;
          // Rollback on other errors
          setFollowedIds((prev) => prev.filter((id) => id !== athleteId));
        }
      }
    },
    [user, followedIds],
  );

  return { followedIds, isFollowing, toggleFollow, loading };
}
