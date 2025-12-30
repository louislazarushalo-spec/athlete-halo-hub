import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  updateProfile: (data: { first_name?: string; last_name?: string }) => Promise<{ error: any }>;
  getDisplayName: () => string;
  getFullName: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, first_name, last_name")
      .eq("id", userId)
      .maybeSingle();
    
    if (data && !error) {
      setProfile(data);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer profile fetch with setTimeout to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signup = async (email: string, password: string, firstName?: string, lastName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const resetPasswordRequest = async (email: string) => {
    const redirectUrl = `${window.location.origin}/reset-password`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { error };
  };

  const updateProfile = async (data: { first_name?: string; last_name?: string }) => {
    if (!user) return { error: new Error("No user logged in") };
    
    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", user.id);
    
    if (!error) {
      // Refresh profile data
      await fetchProfile(user.id);
    }
    
    return { error };
  };

  // Helper to get display name (first name only, properly capitalized)
  const getDisplayName = (): string => {
    if (profile?.first_name) {
      return profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1).toLowerCase();
    }
    // Fallback to email username
    if (user?.email) {
      const username = user.email.split('@')[0];
      return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
    }
    return "there";
  };

  // Helper to get full name (FirstName LastName, properly capitalized)
  const getFullName = (): string => {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    
    if (profile?.first_name && profile?.last_name) {
      return `${capitalize(profile.first_name)} ${capitalize(profile.last_name)}`;
    }
    if (profile?.first_name) {
      return capitalize(profile.first_name);
    }
    // Fallback to email username
    if (user?.email) {
      const username = user.email.split('@')[0];
      return capitalize(username);
    }
    return "User";
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile,
      isAuthenticated: !!user, 
      login, 
      signup, 
      logout, 
      resetPasswordRequest, 
      updatePassword,
      updateProfile,
      getDisplayName,
      getFullName
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
