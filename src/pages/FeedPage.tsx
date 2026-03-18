import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { athletes, getAthleteById } from "@/data/athletes";
import { useState, useEffect, useMemo } from "react";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { useFollowedAthletes } from "@/hooks/useFollowedAthletes";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Dumbbell, Heart, Package, Grid, ShoppingBag, Trophy, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { buildUnifiedFeed } from "@/components/athletes/feed/buildUnifiedFeed";
import { UnifiedFeedItem, type ExtendedFeedItem } from "@/components/athletes/feed/FeedCards";

const filterOptions = [
  { key: "all", label: "All", icon: Grid },
  { key: "social", label: "Social", icon: Heart },
  { key: "program", label: "Programs", icon: Dumbbell },
  { key: "kit_room", label: "Kit Room", icon: ShoppingBag },
  { key: "prize_draw", label: "Prizes", icon: Trophy },
  { key: "cause", label: "Causes", icon: MessageCircle },
];

interface StudioPostItem {
  id: string;
  athlete_id: string;
  type: string;
  title: string;
  body: string;
  media: string[];
  published_at: string;
  status?: string;
}

const FeedPage = () => {
  const { resolve } = useAthleteProfiles();
  const { user } = useAuth();
  const { followedIds, loading: followLoading } = useFollowedAthletes();
  const [activeFilter, setActiveFilter] = useState("all");
  const [studioPosts, setStudioPosts] = useState<StudioPostItem[]>([]);

  // Use followed athletes if logged in, otherwise show key athletes as demo
  const followedAthletes = useMemo(() => {
    if (user && followedIds.length > 0) {
      return followedIds
        .map((id) => getAthleteById(id))
        .filter(Boolean) as typeof athletes;
    }
    // Fallback: show key athletes for non-logged-in or no follows
    const keyIds = ["pierre-gasly", "cassandre-beaugrand", "tommy-fleetwood", "arthur-cazaux", "matthieu-jalibert", "nic-von-rupp"];
    return athletes.filter((a) => keyIds.includes(a.id));
  }, [user, followedIds]);

  const hasFollowedAthletes = followedAthletes.length > 0;

  // Fetch published studio posts for followed athletes
  useEffect(() => {
    const ids = followedAthletes.map(a => a.id);
    if (ids.length === 0) return;
    
    supabase
      .from("studio_posts")
      .select("id, athlete_id, type, title, body, media, published_at, status")
      .eq("status", "published")
      .in("athlete_id", ids)
      .order("published_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (data) setStudioPosts(data as unknown as StudioPostItem[]);
      });
  }, [followedAthletes]);

  // Build unified feed across all followed athletes
  const feedItems = useMemo(() => {
    const allItems: (ExtendedFeedItem & { _athleteName: string; _avatarSrc: string; _athleteSlug: string })[] = [];

    for (const athlete of followedAthletes) {
      const athletePosts = studioPosts.filter(p => p.athlete_id === athlete.id);
      const resolved = resolve(athlete.id, athlete.avatar, athlete.banner);
      const items = buildUnifiedFeed(athlete, athletePosts);
      for (const item of items) {
        allItems.push({
          ...item,
          _athleteName: athlete.name,
          _avatarSrc: resolved.avatar,
          _athleteSlug: athlete.id,
        });
      }
    }

    // Sort by timestamp descending
    allItems.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return allItems;
  }, [followedAthletes, studioPosts, resolve]);

  // Filter
  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return feedItems;
    return feedItems.filter(item => {
      if (activeFilter === "social") return !item._cardType; // standard social/video/article
      return item._cardType === activeFilter;
    });
  }, [feedItems, activeFilter]);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Your Feed</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Stay up to date with the latest from athletes you follow.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {filterOptions.map(option => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.key}
                  variant={activeFilter === option.key ? "gold" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter(option.key)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {option.label}
                </Button>
              );
            })}
          </div>

          {!hasFollowedAthletes ? (
            <div className="text-center py-20">
              <div className="glass-card max-w-md mx-auto p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold mb-2">Your feed is empty</h2>
                <p className="text-muted-foreground mb-6">Follow athletes to fill it.</p>
                <Link to="/athletes">
                  <Button variant="gold">Browse Athletes</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No posts in this category yet.</p>
                </div>
              ) : (
                filteredItems.slice(0, 40).map((item) => (
                  <UnifiedFeedItem
                    key={`${item._athleteSlug}-${item.id}`}
                    item={item}
                    avatarSrc={item._avatarSrc}
                    name={item._athleteName}
                    athleteSlug={item._athleteSlug}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default FeedPage;
