import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/posts/PostCard";
import { athletes } from "@/data/athletes";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dumbbell, Heart, Package, Grid } from "lucide-react";

const filterOptions = [
  { key: "all", label: "All", icon: Grid },
  { key: "training", label: "My Training", icon: Dumbbell },
  { key: "life", label: "My Life", icon: Heart },
  { key: "gear", label: "My Gear", icon: Package },
];

const FeedPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Simulate followed athletes (in real app, this would come from user state)
  const followedAthletes = athletes.slice(0, 2);
  const hasFollowedAthletes = followedAthletes.length > 0;

  // Get all posts from followed athletes
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Your Feed
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Stay up to date with the latest from athletes you follow.
            </p>
          </div>

          {/* Filters */}
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

          {/* Content */}
          {!hasFollowedAthletes ? (
            <div className="text-center py-20">
              <div className="glass-card max-w-md mx-auto p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold mb-2">
                  Your feed is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Follow athletes to fill it.
                </p>
                <Link to="/athletes">
                  <Button variant="gold">Browse Athletes</Button>
                </Link>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No posts in this category yet.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Link key={post.id} to={`/athlete/${post.athleteId}`}>
                    <PostCard post={post} athleteName={post.athleteName} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default FeedPage;
