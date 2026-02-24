import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AthleteSource {
  id: string;
  athlete_id: string;
  user_id: string;
  category: "social" | "owned" | "earned";
  subtype: string;
  url: string | null;
  handle: string | null;
  channel_id: string | null;
  status: string;
  last_synced_at: string | null;
  metadata_json: Record<string, any>;
  created_at: string;
}

export interface ContentItem {
  id: string;
  athlete_id: string;
  source_id: string | null;
  type: string;
  title: string | null;
  text_snippet: string | null;
  media_urls: string[];
  external_url: string | null;
  published_at: string | null;
  created_at: string;
}

export function useStudioSources(athleteSlug: string | null) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sources, setSources] = useState<AthleteSource[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const loadSources = useCallback(async () => {
    if (!athleteSlug || !user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("athlete_sources")
        .select("*")
        .eq("athlete_id", athleteSlug)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setSources((data as unknown as AthleteSource[]) || []);
    } catch (err) {
      console.error("Error loading sources:", err);
    } finally {
      setLoading(false);
    }
  }, [athleteSlug, user]);

  const loadContentItems = useCallback(async () => {
    if (!athleteSlug) return;
    try {
      const { data, error } = await supabase
        .from("athlete_content_items")
        .select("*")
        .eq("athlete_id", athleteSlug)
        .order("published_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      setContentItems((data as unknown as ContentItem[]) || []);
    } catch (err) {
      console.error("Error loading content items:", err);
    }
  }, [athleteSlug]);

  const addSource = async (source: {
    category: "social" | "owned" | "earned";
    subtype: string;
    url?: string;
    handle?: string;
  }) => {
    if (!user || !athleteSlug) return null;
    try {
      const { data, error } = await supabase
        .from("athlete_sources")
        .insert({
          athlete_id: athleteSlug,
          user_id: user.id,
          category: source.category,
          subtype: source.subtype,
          url: source.url || null,
          handle: source.handle || null,
          status: source.url || source.handle ? "connected" : "disconnected",
        } as any)
        .select()
        .single();
      if (error) throw error;
      await loadSources();
      toast({ title: "Source added" });
      return data;
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      return null;
    }
  };

  const updateSource = async (id: string, updates: { url?: string; handle?: string; status?: string }) => {
    try {
      const { error } = await supabase
        .from("athlete_sources")
        .update(updates as any)
        .eq("id", id);
      if (error) throw error;
      await loadSources();
      toast({ title: "Source updated" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const removeSource = async (id: string) => {
    try {
      const { error } = await supabase
        .from("athlete_sources")
        .delete()
        .eq("id", id);
      if (error) throw error;
      await loadSources();
      toast({ title: "Source removed" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const syncSources = async () => {
    if (!athleteSlug || !user) return;
    setSyncing(true);
    try {
      // Call the edge function for content ingestion
      const { data, error } = await supabase.functions.invoke("studio-sync-sources", {
        body: { athlete_id: athleteSlug },
      });
      if (error) throw error;
      
      // Update last_synced_at on all connected sources
      const connectedIds = sources.filter(s => s.status === "connected").map(s => s.id);
      if (connectedIds.length > 0) {
        await supabase
          .from("athlete_sources")
          .update({ last_synced_at: new Date().toISOString() } as any)
          .in("id", connectedIds);
      }

      await loadSources();
      await loadContentItems();
      toast({ title: "Sync complete", description: `${data?.items_found || 0} items discovered.` });
    } catch (err: any) {
      console.error("Sync error:", err);
      toast({ title: "Sync failed", description: err.message || "Could not sync sources. Try again.", variant: "destructive" });
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => { loadSources(); loadContentItems(); }, [loadSources, loadContentItems]);

  return {
    sources,
    contentItems,
    loading,
    syncing,
    addSource,
    updateSource,
    removeSource,
    syncSources,
    reload: () => { loadSources(); loadContentItems(); },
  };
}
