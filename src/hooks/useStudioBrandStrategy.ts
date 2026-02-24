import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface BrandProfile {
  id: string;
  athlete_id: string;
  answers_json: Record<string, any>;
  updated_at: string;
}

export interface StrategyPack {
  id: string;
  athlete_id: string;
  pack_json: Record<string, any>;
  updated_at: string;
}

export interface WeeklyPack {
  id: string;
  athlete_id: string;
  week_start_date: string;
  context: string;
  pack_json: Record<string, any>;
  created_at: string;
}

export function useStudioBrandStrategy(athleteSlug: string | null) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [strategyPack, setStrategyPack] = useState<StrategyPack | null>(null);
  const [weeklyPacks, setWeeklyPacks] = useState<WeeklyPack[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const load = useCallback(async () => {
    if (!athleteSlug || !user) return;
    setLoading(true);
    try {
      const [bpRes, spRes, wpRes] = await Promise.all([
        supabase.from("athlete_brand_profile").select("*").eq("athlete_id", athleteSlug).maybeSingle(),
        supabase.from("athlete_strategy_pack").select("*").eq("athlete_id", athleteSlug).maybeSingle(),
        supabase.from("athlete_weekly_packs").select("*").eq("athlete_id", athleteSlug).order("created_at", { ascending: false }).limit(5),
      ]);

      if (bpRes.data) setBrandProfile(bpRes.data as unknown as BrandProfile);
      else setBrandProfile(null);
      
      if (spRes.data) setStrategyPack(spRes.data as unknown as StrategyPack);
      else setStrategyPack(null);
      
      setWeeklyPacks((wpRes.data as unknown as WeeklyPack[]) || []);
    } catch (err) {
      console.error("Error loading brand strategy:", err);
    } finally {
      setLoading(false);
    }
  }, [athleteSlug, user]);

  const saveBrandProfile = async (answers: Record<string, any>) => {
    if (!user || !athleteSlug) return;
    try {
      if (brandProfile) {
        const { error } = await supabase
          .from("athlete_brand_profile")
          .update({ answers_json: answers as any })
          .eq("id", brandProfile.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("athlete_brand_profile")
          .insert({ athlete_id: athleteSlug, user_id: user.id, answers_json: answers as any } as any);
        if (error) throw error;
      }
      await load();
      toast({ title: "Brand profile saved" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const generateStrategyPack = async (contentItems: any[], brandAnswers: Record<string, any>, mediaRadarData?: { mentions_count: number; top_publishers: [string, number][]; narratives: string[] }) => {
    if (!user || !athleteSlug) return;
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("studio-generate-strategy", {
        body: { athlete_id: athleteSlug, content_items: contentItems, brand_answers: brandAnswers, media_radar: mediaRadarData },
      });
      if (error) throw error;

      // Save strategy pack
      if (strategyPack) {
        await supabase
          .from("athlete_strategy_pack")
          .update({ pack_json: data.pack as any })
          .eq("id", strategyPack.id);
      } else {
        await supabase
          .from("athlete_strategy_pack")
          .insert({ athlete_id: athleteSlug, user_id: user.id, pack_json: data.pack as any } as any);
      }

      await load();
      toast({ title: "Strategy pack generated" });
    } catch (err: any) {
      toast({ title: "Error generating strategy", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const generateWeeklyPack = async (context: string, strategyPackData: Record<string, any>, mediaNarratives?: string[]) => {
    if (!user || !athleteSlug) return;
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("studio-generate-weekly-pack", {
        body: { athlete_id: athleteSlug, context, strategy_pack: strategyPackData, media_narratives: mediaNarratives },
      });
      if (error) throw error;

      const today = new Date();
      const day = today.getDay();
      const monday = new Date(today);
      monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
      const weekStart = monday.toISOString().split("T")[0];

      await supabase.from("athlete_weekly_packs").insert({
        athlete_id: athleteSlug,
        user_id: user.id,
        week_start_date: weekStart,
        context,
        pack_json: data.pack as any,
      } as any);

      await load();
      toast({ title: "Weekly pack generated" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => { load(); }, [load]);

  return {
    brandProfile,
    strategyPack,
    weeklyPacks,
    loading,
    generating,
    saveBrandProfile,
    generateStrategyPack,
    generateWeeklyPack,
    reload: load,
  };
}
