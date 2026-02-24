import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface MediaRadarConfig {
  id: string;
  athlete_id: string;
  provider: string;
  language: string;
  region: string | null;
  is_daily_scan_enabled: boolean;
}

export interface MediaRadarQuery {
  id: string;
  athlete_id: string;
  query_text: string;
  is_enabled: boolean;
  created_at: string;
}

export interface MediaMention {
  id: string;
  athlete_id: string;
  query_id: string | null;
  title: string;
  publisher: string | null;
  url: string;
  published_at: string | null;
  snippet: string | null;
  image_url: string | null;
  relevance_status: "unknown" | "relevant" | "irrelevant" | "uncertain";
  created_at: string;
  raw_json?: any;
}

export interface MediaScan {
  id: string;
  athlete_id: string;
  started_at: string;
  finished_at: string | null;
  status: string;
  error_message: string | null;
  mention_count: number;
  narratives: string[];
}

export function useMediaRadar(athleteSlug: string | null) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [config, setConfig] = useState<MediaRadarConfig | null>(null);
  const [queries, setQueries] = useState<MediaRadarQuery[]>([]);
  const [mentions, setMentions] = useState<MediaMention[]>([]);
  const [scans, setScans] = useState<MediaScan[]>([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [lastDigest, setLastDigest] = useState<string>("");
  const [serviceAvailable, setServiceAvailable] = useState<boolean | null>(null);

  const load = useCallback(async () => {
    if (!athleteSlug || !user) return;
    setLoading(true);
    try {
      const [cfgRes, qRes, mRes, sRes] = await Promise.all([
        supabase.from("media_radar_config").select("*").eq("athlete_id", athleteSlug).maybeSingle(),
        supabase.from("media_radar_queries").select("*").eq("athlete_id", athleteSlug).order("created_at"),
        supabase.from("media_mentions").select("*").eq("athlete_id", athleteSlug).order("created_at", { ascending: false }).limit(200),
        supabase.from("media_scans").select("*").eq("athlete_id", athleteSlug).order("started_at", { ascending: false }).limit(10),
      ]);

      setConfig(cfgRes.data as any);
      setQueries((qRes.data as any) || []);
      setMentions((mRes.data as any) || []);
      setScans((sRes.data as any) || []);
    } catch (err) {
      console.error("Error loading media radar:", err);
    } finally {
      setLoading(false);
    }
  }, [athleteSlug, user]);

  const runScan = async (athleteName: string, sport?: string, clubTeam?: string, language?: string) => {
    if (!user || !athleteSlug) return;
    setScanning(true);
    setServiceAvailable(null);
    try {
      const { data, error } = await supabase.functions.invoke("media-radar-ai-scan", {
        body: {
          athlete_id: athleteSlug,
          athlete_name: athleteName,
          sport,
          club_team: clubTeam,
          language: language || "all",
        },
      });
      if (error) throw error;
      if (data?.error === "media_radar_not_configured") {
        setServiceAvailable(false);
        toast({ title: "Media Radar unavailable", description: "The search provider is not configured yet. Please contact an admin.", variant: "destructive" });
        return;
      }
      if (data?.error) throw new Error(data.error);
      setServiceAvailable(true);
      setLastDigest(data.digest || "");
      toast({ title: "Scan complete", description: `Found ${data.mention_count} mentions across ${data.queries_generated} queries.` });
      await load();
    } catch (err: any) {
      toast({ title: "Scan failed", description: err.message, variant: "destructive" });
    } finally {
      setScanning(false);
    }
  };

  const updateRelevance = async (mentionId: string, status: "relevant" | "irrelevant") => {
    try {
      const { error } = await supabase.from("media_mentions").update({ relevance_status: status } as any).eq("id", mentionId);
      if (error) throw error;
      setMentions((prev) => prev.map((m) => m.id === mentionId ? { ...m, relevance_status: status } : m));
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const addQuery = async (queryText: string) => {
    if (!athleteSlug) return;
    try {
      const { error } = await supabase.from("media_radar_queries").insert({ athlete_id: athleteSlug, query_text: queryText } as any);
      if (error) throw error;
      await load();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const removeQuery = async (queryId: string) => {
    try {
      const { error } = await supabase.from("media_radar_queries").delete().eq("id", queryId);
      if (error) throw error;
      await load();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const toggleQuery = async (queryId: string, enabled: boolean) => {
    try {
      const { error } = await supabase.from("media_radar_queries").update({ is_enabled: enabled } as any).eq("id", queryId);
      if (error) throw error;
      setQueries((prev) => prev.map((q) => q.id === queryId ? { ...q, is_enabled: enabled } : q));
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  // Computed
  const mentions30d = mentions.filter((m) => new Date(m.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const mentions7d = mentions.filter((m) => new Date(m.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

  const topPublishers = (() => {
    const counts: Record<string, number> = {};
    mentions30d.forEach((m) => { if (m.publisher) counts[m.publisher] = (counts[m.publisher] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  })();

  const uncertainMentions = mentions.filter((m) => m.relevance_status === "uncertain" || m.relevance_status === "unknown");
  const latestScan = scans[0] || null;
  const latestNarratives: string[] = (latestScan?.narratives as any) || [];

  const narrativesWithEvidence = latestNarratives.map((theme) => {
    const evidence = mentions
      .filter((m) => m.raw_json?.narrative_tag === theme && m.relevance_status !== "irrelevant")
      .slice(0, 3);
    return { theme, evidence };
  });

  useEffect(() => { load(); }, [load]);

  return {
    config,
    queries,
    mentions,
    mentions30d,
    mentions7d,
    scans,
    loading,
    scanning,
    serviceAvailable,
    topPublishers,
    latestScan,
    latestNarratives,
    narrativesWithEvidence,
    uncertainMentions,
    lastDigest,
    runScan,
    updateRelevance,
    addQuery,
    removeQuery,
    toggleQuery,
    reload: load,
  };
}
