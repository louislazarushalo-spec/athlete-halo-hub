import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { athletes as hardcodedAthletes } from "@/data/athletes";
import { useToast } from "@/hooks/use-toast";

export interface StudioAthleteProfile {
  id: string;
  user_id: string;
  athlete_slug: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  banner_url: string;
  sport: string;
  social_sources: Record<string, any>;
  owned_channels: Record<string, any>;
  earned_channels: Record<string, any>;
}

export interface StudioPost {
  id: string;
  athlete_id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  media: string[];
  status: string;
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
}

export interface StudioEngagement {
  id: string;
  athlete_id: string;
  user_id: string;
  type: string;
  title: string;
  description: string;
  payload: Record<string, any>;
  status: string;
  created_at: string;
}

export interface StudioMonetizationConfig {
  id: string;
  athlete_id: string;
  user_id: string;
  type: string;
  config: Record<string, any>;
  status: string;
  created_at: string;
}

export interface AssetItem {
  id: string;
  url: string;
  type: "photo" | "video" | "logo";
  title?: string;
  width?: number;
  height?: number;
  isLowQuality?: boolean;
  created_at?: string;
}

export function useStudioAthlete(athleteSlug?: string | null) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudioAthleteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [posts, setPosts] = useState<StudioPost[]>([]);
  const [engagements, setEngagements] = useState<StudioEngagement[]>([]);
  const [monetization, setMonetization] = useState<StudioMonetizationConfig[]>([]);
  const [assets, setAssets] = useState<AssetItem[]>([]);

  // Reset state when slug changes to prevent stale data
  useEffect(() => {
    setProfile(null);
    setPosts([]);
    setEngagements([]);
    setMonetization([]);
    setAssets([]);
    setNeedsSetup(false);
  }, [athleteSlug]);

  // Load athlete profile - either by slug or by user_id
  const loadProfile = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      let query = supabase.from("athlete_profiles").select("*");

      if (athleteSlug) {
        query = query.eq("athlete_slug", athleteSlug);
      }
      // Don't filter by user_id - admin users need to see all profiles
      // RLS policies handle access control

      const { data, error } = await query.maybeSingle();
      if (error) throw error;

      if (data) {
        setProfile(data as unknown as StudioAthleteProfile);
        setNeedsSetup(false);
      } else {
        // No DB profile yet — build a temporary one from hardcoded data
        const athlete = hardcodedAthletes.find((a) => a.id === athleteSlug);
        if (athlete) {
          setProfile({
            id: "",
            user_id: user.id,
            athlete_slug: athlete.id,
            display_name: athlete.name,
            bio: athlete.bio || "",
            avatar_url: athlete.avatar || "",
            banner_url: athlete.banner || "",
            sport: athlete.sport || "",
            social_sources: {},
            owned_channels: {},
            earned_channels: {},
          } as StudioAthleteProfile);
        }
        setNeedsSetup(true);
      }
    } catch (err) {
      console.error("Error loading athlete profile:", err);
    } finally {
      setLoading(false);
    }
  }, [user, athleteSlug]);

  const setupProfile = async (slug: string) => {
    if (!user) return;
    const athlete = hardcodedAthletes.find((a) => a.id === slug);
    if (!athlete) return;

    try {
      const { data, error } = await supabase
        .from("athlete_profiles")
        .insert({
          user_id: user.id,
          athlete_slug: slug,
          display_name: athlete.name,
          bio: athlete.bio,
          avatar_url: athlete.avatar,
          banner_url: athlete.banner,
          sport: athlete.sport,
        })
        .select()
        .single();

      if (error) throw error;
      setProfile(data as unknown as StudioAthleteProfile);
      setNeedsSetup(false);
      toast({ title: "Profile linked", description: `You're now managing ${athlete.name}'s Studio.` });
    } catch (err: any) {
      console.error("Error setting up profile:", err);
      toast({ title: "Error", description: err.message || "Failed to set up profile.", variant: "destructive" });
    }
  };

  const updateBio = async (newBio: string) => {
    if (!user || !profile) return;
    try {
      const { error } = await supabase.from("athlete_profiles").update({ bio: newBio }).eq("id", profile.id);
      if (error) throw error;
      setProfile((p) => p ? { ...p, bio: newBio } : p);
      toast({ title: "Bio updated" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const updateAvatar = async (url: string) => {
    if (!user || !profile) return;
    try {
      const { error } = await supabase.from("athlete_profiles").update({ avatar_url: url }).eq("id", profile.id);
      if (error) throw error;
      setProfile((p) => p ? { ...p, avatar_url: url } : p);
      toast({ title: "Avatar updated" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const updateBanner = async (url: string) => {
    if (!user || !profile) return;
    try {
      const { error } = await supabase.from("athlete_profiles").update({ banner_url: url }).eq("id", profile.id);
      if (error) throw error;
      setProfile((p) => p ? { ...p, banner_url: url } : p);
      toast({ title: "Banner updated" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const loadPosts = useCallback(async () => {
    if (!profile) return;
    try {
      const { data, error } = await supabase
        .from("studio_posts")
        .select("*")
        .eq("athlete_id", profile.athlete_slug)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPosts((data as unknown as StudioPost[]) || []);
    } catch (err) {
      console.error("Error loading posts:", err);
    }
  }, [profile]);

  const createPost = async (postData: { title: string; body: string; type: string; media: string[]; publish?: boolean }) => {
    if (!user || !profile) return null;
    try {
      const { data, error } = await supabase
        .from("studio_posts")
        .insert({
          athlete_id: profile.athlete_slug,
          user_id: user.id,
          title: postData.title,
          body: postData.body,
          type: postData.type,
          media: postData.media,
          status: postData.publish ? "published" : "draft",
          published_at: postData.publish ? new Date().toISOString() : null,
        })
        .select()
        .single();
      if (error) throw error;
      await loadPosts();
      toast({ title: postData.publish ? "Post published!" : "Draft saved" });
      return data;
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      return null;
    }
  };

  const loadEngagements = useCallback(async () => {
    if (!profile) return;
    try {
      const { data, error } = await supabase
        .from("studio_engagements")
        .select("*")
        .eq("athlete_id", profile.athlete_slug)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setEngagements((data as unknown as StudioEngagement[]) || []);
    } catch (err) {
      console.error("Error loading engagements:", err);
    }
  }, [profile]);

  const createEngagement = async (engData: { type: string; title: string; description: string; payload?: Record<string, any> }) => {
    if (!user || !profile) return null;
    try {
      const { data, error } = await supabase
        .from("studio_engagements")
        .insert({
          athlete_id: profile.athlete_slug,
          user_id: user.id,
          type: engData.type,
          title: engData.title,
          description: engData.description,
          payload: engData.payload || {},
          status: "active",
        })
        .select()
        .single();
      if (error) throw error;
      await loadEngagements();
      toast({ title: "Engagement created!" });
      return data;
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      return null;
    }
  };

  const loadMonetization = useCallback(async () => {
    if (!profile) return;
    try {
      const { data, error } = await supabase
        .from("studio_monetization")
        .select("*")
        .eq("athlete_id", profile.athlete_slug)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setMonetization((data as unknown as StudioMonetizationConfig[]) || []);
    } catch (err) {
      console.error("Error loading monetization:", err);
    }
  }, [profile]);

  const saveMonetization = async (monData: { type: string; config: Record<string, any> }) => {
    if (!user || !profile) return null;
    try {
      const existing = monetization.find((m) => m.type === monData.type);
      if (existing) {
        const { error } = await supabase
          .from("studio_monetization")
          .update({ config: monData.config as any, status: "active" })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("studio_monetization")
          .insert({
            athlete_id: profile.athlete_slug,
            user_id: user.id,
            type: monData.type,
            config: monData.config as any,
            status: "draft",
          });
        if (error) throw error;
      }
      await loadMonetization();
      toast({ title: "Settings saved" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      return null;
    }
  };

  const buildAssets = useCallback(() => {
    if (!profile) return;
    const slug = profile.athlete_slug;
    const athlete = hardcodedAthletes.find((a) => a.id === slug);
    const items: AssetItem[] = [];

    if (athlete) {
      if (athlete.avatar) items.push({ id: `avatar-${slug}`, url: athlete.avatar, type: "photo", title: "Avatar" });
      if (athlete.banner) items.push({ id: `banner-${slug}`, url: athlete.banner, type: "photo", title: "Banner" });
      [...athlete.training, ...athlete.life, ...athlete.gear].forEach((post) => {
        if (post.image) items.push({ id: post.id, url: post.image, type: "photo", title: post.title, created_at: post.createdAt });
      });
      athlete.products.forEach((product) => {
        if (product.image) items.push({ id: product.id, url: product.image, type: "photo", title: product.name });
      });
      athlete.gearCollections?.forEach((gc) => {
        if (gc.actionImage) items.push({ id: gc.id, url: gc.actionImage, type: "photo", title: gc.name });
      });
      athlete.mediaFeed?.forEach((mf) => {
        if (mf.image) items.push({ id: mf.id, url: mf.image, type: "photo", title: mf.title || mf.content.slice(0, 40) });
      });
    }

    posts.forEach((post) => {
      post.media?.forEach((url, i) => {
        items.push({ id: `post-media-${post.id}-${i}`, url, type: "photo", title: post.title });
      });
    });

    setAssets(items);
  }, [profile, posts]);

  const uploadAsset = async (file: File): Promise<string | null> => {
    if (!profile) return null;
    try {
      const ext = file.name.split(".").pop();
      const path = `${profile.athlete_slug}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("athlete-content").upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("athlete-content").getPublicUrl(path);
      return urlData.publicUrl;
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
      return null;
    }
  };

  useEffect(() => { loadProfile(); }, [loadProfile]);
  useEffect(() => { if (profile) { loadPosts(); loadEngagements(); loadMonetization(); } }, [profile, loadPosts, loadEngagements, loadMonetization]);
  useEffect(() => { buildAssets(); }, [buildAssets]);

  return {
    profile,
    loading,
    needsSetup,
    setupProfile,
    updateBio,
    updateAvatar,
    updateBanner,
    posts,
    createPost,
    engagements,
    createEngagement,
    monetization,
    saveMonetization,
    assets,
    uploadAsset,
    loadPosts,
    loadEngagements,
  };
}
