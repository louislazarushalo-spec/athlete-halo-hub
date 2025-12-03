import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SubscriptionContextType {
  subscribedAthletes: Set<string>;
  isSubscribed: (athleteId: string) => boolean;
  subscribe: (athleteId: string) => void;
  unsubscribe: (athleteId: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscribedAthletes, setSubscribedAthletes] = useState<Set<string>>(() => {
    const stored = localStorage.getItem("subscribedAthletes");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("subscribedAthletes", JSON.stringify([...subscribedAthletes]));
  }, [subscribedAthletes]);

  const isSubscribed = (athleteId: string) => subscribedAthletes.has(athleteId);

  const subscribe = (athleteId: string) => {
    setSubscribedAthletes(prev => new Set([...prev, athleteId]));
  };

  const unsubscribe = (athleteId: string) => {
    setSubscribedAthletes(prev => {
      const newSet = new Set(prev);
      newSet.delete(athleteId);
      return newSet;
    });
  };

  return (
    <SubscriptionContext.Provider value={{ subscribedAthletes, isSubscribed, subscribe, unsubscribe }}>
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
