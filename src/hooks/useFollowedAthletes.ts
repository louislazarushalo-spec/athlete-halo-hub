import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const followedAthletesKey = (userId?: string) => ["followed-athletes", userId] as const;
const followedAthleteStatusKey = (userId?: string, athleteId?: string) =>
  ["followed-athlete-status", userId, athleteId] as const;

export function useFollowedAthleteStatus(athleteId: string) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: followedAthleteStatusKey(user?.id, athleteId),
    enabled: Boolean(user?.id && athleteId),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    queryFn: async () => {
      if (!user?.id || !athleteId) return false;

      const { data, error } = await supabase
        .from("followed_athletes")
        .select("id")
        .eq("user_id", user.id)
        .eq("athlete_id", athleteId)
        .maybeSingle();

      if (error) throw error;
      return Boolean(data?.id);
    },
  });

  return {
    isFollowing: query.data ?? false,
    loading: query.isLoading || query.isFetching,
    refetch: query.refetch,
  };
}

export function useFollowedAthletes() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const followedQuery = useQuery({
    queryKey: followedAthletesKey(user?.id),
    enabled: Boolean(user?.id),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    queryFn: async () => {
      if (!user?.id) return [] as string[];

      const { data, error } = await supabase
        .from("followed_athletes")
        .select("athlete_id")
        .eq("user_id", user.id);

      if (error) throw error;
      return (data || []).map((row) => row.athlete_id);
    },
  });

  const followedIds = followedQuery.data ?? [];

  const isFollowing = useCallback(
    (athleteId: string) => followedIds.includes(athleteId),
    [followedIds],
  );

  const mutation = useMutation({
    mutationFn: async (athleteId: string) => {
      if (!user?.id) return;

      const alreadyFollowing = followedIds.includes(athleteId);

      if (alreadyFollowing) {
        const { error } = await supabase
          .from("followed_athletes")
          .delete()
          .eq("user_id", user.id)
          .eq("athlete_id", athleteId);

        if (error) throw error;
        return;
      }

      const { error } = await supabase
        .from("followed_athletes")
        .upsert(
          { user_id: user.id, athlete_id: athleteId },
          { onConflict: "user_id,athlete_id", ignoreDuplicates: true },
        );

      if (error) throw error;
    },
    onMutate: async (athleteId) => {
      if (!user?.id) return;

      await queryClient.cancelQueries({ queryKey: followedAthletesKey(user.id) });
      await queryClient.cancelQueries({ queryKey: followedAthleteStatusKey(user.id, athleteId) });

      const previousFollowed = queryClient.getQueryData<string[]>(followedAthletesKey(user.id)) ?? [];
      const nextFollowed = previousFollowed.includes(athleteId)
        ? previousFollowed.filter((id) => id !== athleteId)
        : [...previousFollowed, athleteId];

      queryClient.setQueryData(followedAthletesKey(user.id), nextFollowed);
      queryClient.setQueryData(followedAthleteStatusKey(user.id, athleteId), nextFollowed.includes(athleteId));

      return { previousFollowed, athleteId };
    },
    onError: (_error, _athleteId, context) => {
      if (!user?.id || !context) return;

      queryClient.setQueryData(followedAthletesKey(user.id), context.previousFollowed);
      queryClient.setQueryData(
        followedAthleteStatusKey(user.id, context.athleteId),
        context.previousFollowed.includes(context.athleteId),
      );
    },
    onSettled: async (_data, _error, athleteId) => {
      if (!user?.id) return;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: followedAthletesKey(user.id) }),
        queryClient.invalidateQueries({ queryKey: followedAthleteStatusKey(user.id, athleteId) }),
      ]);
    },
  });

  const toggleFollow = useCallback(
    async (athleteId: string) => {
      await mutation.mutateAsync(athleteId);
    },
    [mutation],
  );

  return {
    followedIds,
    isFollowing,
    toggleFollow,
    loading: followedQuery.isLoading || followedQuery.isFetching,
  };
}

