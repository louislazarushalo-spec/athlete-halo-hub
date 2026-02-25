import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/posts/PostCard";
import { Badge } from "@/components/ui/badge";
import { athletes } from "@/data/athletes";
import { useState, useEffect } from "react";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { Link } from "react-router-dom";
import { Dumbbell, Heart, Package, Grid } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const filterOptions = [
  { key: "all", label: "All", icon: Grid },
  { key: "training", label: "My Training", icon: Dumbbell },
  { key: "life", label: "My Life", icon: Heart },
  { key: "gear", label: "My Gear", icon: Package },
];

interface StudioPostItem {
  id: string;
  athlete_id: string;
  type: string;
  title: string;
  body: string;
  media: string[];
  published_at: string;
}

const FeedPage = () => {
  const { resolve } = useAthleteProfiles();
  const [activeFilter, setActiveFilter] = useState("all");
  const [studioPosts, setStudioPosts] = useState<StudioPostItem[]>([]);
  
  const followedAthletes = athletes.slice(0, 2);
  const hasFollowedAthletes = followedAthletes.length > 0;

  // Fetch published studio posts for followed athletes
  useEffect(() => {
    const followedIds = followedAthletes.map(a => a.id);
    if (followedIds.length === 0) return;
    
    supabase
      .from("studio_posts")
      .select("id, athlete_id, type, title, body, media, published_at")
      .eq("status", "published")
      .in("athlete_id", followedIds)
      .order("published_at", { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setStudioPosts(data as unknown as StudioPostItem[]);
      });
  }, []);

  const allPosts = followedAthletes.flatMap(athlete => {
    const posts = [
      ...athlete.training.map(p => ({ ...p, athleteName: athlete.name, athleteId: athlete.id })),
      ...athlete.life.map(p => ({ ...p, athleteName: athlete.name, athleteId: athlete.id })),
      ...athlete.gear.map(p => ({ ...p, athleteName: athlete.name, athleteId: athlete.id })),
    ];
    return posts;
  });

  const filteredPosts = allPosts.filter(post => {
    if (activeFilter === "all") return true;
    return post.category === activeFilter;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Studio published posts */}
              {studioPosts.length > 0 && (
                <div className="space-y-4">
                  {studioPosts.map((post) => {
                    const athlete = followedAthletes.find(a => a.id === post.athlete_id);
                    if (!athlete) return null;
                    return (
                      <Link key={post.id} to={`/athlete/${post.athlete_id}`}>
                        <article className="glass-card overflow-hidden group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300">
                          <div className="p-3 md:p-4 flex items-center gap-3 border-b border-border/50">
                            <img src={resolve(athlete.id, athlete.avatar, athlete.banner).avatar} alt={athlete.name} className="w-8 h-8 rounded-full object-cover" />
                            <div className="flex-1 min-w-0">
                              <span className="font-semibold text-sm">{athlete.name}</span>
                              <Badge variant="secondary" className="ml-2 text-[10px] capitalize">{post.type.replace("_", " ")}</Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">{post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}</span>
                          </div>
                          {post.media && post.media.length > 0 && (
                            <div className="aspect-video overflow-hidden">
                              <img src={post.media[0]} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="p-3 md:p-4">
                            <h4 className="font-semibold text-sm mb-1">{post.title}</h4>
                            {post.body && <p className="text-xs text-muted-foreground line-clamp-2">{post.body}</p>}
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              )}
              
              {filteredPosts.length === 0 && studioPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No posts in this category yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <Link key={post.id} to={`/athlete/${post.athleteId}`}>
                      <PostCard post={post} athleteName={post.athleteName} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default FeedPage;
