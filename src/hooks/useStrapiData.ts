import { useQuery } from '@tanstack/react-query';
import {
  fetchAthletes,
  fetchAthleteById,
  fetchProducts,
  fetchPosts,
  fetchCauses,
  fetchEvents,
  fetchTrainings,
} from '@/services/strapi';

export function useAthletes() {
  return useQuery({
    queryKey: ['athletes'],
    queryFn: fetchAthletes,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useAthlete(id: string | undefined) {
  return useQuery({
    queryKey: ['athlete', id],
    queryFn: () => id ? fetchAthleteById(id) : null,
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProducts(athleteId?: string) {
  return useQuery({
    queryKey: ['products', athleteId],
    queryFn: () => fetchProducts(athleteId),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePosts(athleteId?: string) {
  return useQuery({
    queryKey: ['posts', athleteId],
    queryFn: () => fetchPosts(athleteId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCauses(athleteId?: string) {
  return useQuery({
    queryKey: ['causes', athleteId],
    queryFn: () => fetchCauses(athleteId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTrainings(athleteId?: string) {
  return useQuery({
    queryKey: ['trainings', athleteId],
    queryFn: () => fetchTrainings(athleteId),
    staleTime: 1000 * 60 * 5,
  });
}
