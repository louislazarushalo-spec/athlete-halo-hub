import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export function useStudioRole() {
  const { user, isAuthenticated } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setHasAccess(false);
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        if (error) throw error;

        const roles = data?.map((r) => r.role) || [];
        const isAthlete = roles.includes("athlete");
        const isAgent = roles.includes("agent");
        const isAdmin = roles.includes("admin");

        setHasAccess(isAthlete || isAgent || isAdmin);
        setRole(isAthlete ? "athlete" : isAgent ? "agent" : isAdmin ? "admin" : null);
      } catch (err) {
        console.error("Error checking studio role:", err);
        setHasAccess(false);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [user]);

  return { hasAccess, role, loading, isAuthenticated };
}
