import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

interface SubscriptionContextType {
  subscribedAthletes: Set<string>;
  isSubscribed: (athleteId: string) => boolean;
  subscribe: (athleteId: string) => Promise<boolean>;
  unsubscribe: (athleteId: string) => Promise<boolean>;
  isLoading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscribedAthletes, setSubscribedAthletes] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch subscriptions from database when user changes
  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user) {
        setSubscribedAthletes(new Set());
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('athlete_id')
          .eq('user_id', user.id)
          .eq('status', 'active');

        if (error) {
          console.error('Error fetching subscriptions:', error);
          setSubscribedAthletes(new Set());
        } else {
          const athleteIds = data?.map(sub => sub.athlete_id) || [];
          setSubscribedAthletes(new Set(athleteIds));
        }
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setSubscribedAthletes(new Set());
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, [user]);

  const isSubscribed = useCallback((athleteId: string) => {
    return subscribedAthletes.has(athleteId);
  }, [subscribedAthletes]);

  const subscribe = useCallback(async (athleteId: string): Promise<boolean> => {
    if (!user) {
      console.error('User must be authenticated to subscribe');
      return false;
    }

    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          athlete_id: athleteId,
          status: 'active'
        });

      if (error) {
        // Handle unique constraint violation (already subscribed)
        if (error.code === '23505') {
          console.log('Already subscribed to this athlete');
          setSubscribedAthletes(prev => new Set([...prev, athleteId]));
          return true;
        }
        console.error('Error subscribing:', error);
        return false;
      }

      setSubscribedAthletes(prev => new Set([...prev, athleteId]));
      return true;
    } catch (err) {
      console.error('Error subscribing:', err);
      return false;
    }
  }, [user]);

  const unsubscribe = useCallback(async (athleteId: string): Promise<boolean> => {
    if (!user) {
      console.error('User must be authenticated to unsubscribe');
      return false;
    }

    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('user_id', user.id)
        .eq('athlete_id', athleteId);

      if (error) {
        console.error('Error unsubscribing:', error);
        return false;
      }

      setSubscribedAthletes(prev => {
        const newSet = new Set(prev);
        newSet.delete(athleteId);
        return newSet;
      });
      return true;
    } catch (err) {
      console.error('Error unsubscribing:', err);
      return false;
    }
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{ subscribedAthletes, isSubscribed, subscribe, unsubscribe, isLoading }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};
