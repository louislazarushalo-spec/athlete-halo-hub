import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PostCard } from "@/components/posts/PostCard";
import { ProductCard } from "@/components/products/ProductCard";
import { getAthleteById } from "@/data/athletes";
import { UserPlus, Users, Heart, Dumbbell, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AthletePage = () => {
  const { id } = useParams<{ id: string }>();
  const athlete = getAthleteById(id || "");
  const [isFollowing, setIsFollowing] = useState(false);

  if (!athlete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Athlete not found</h1>
          <Link to="/athletes">
            <Button variant="gold">Browse Athletes</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following!",
      description: isFollowing 
        ? `You unfollowed ${athlete.name}` 
        : `You're now following ${athlete.name}`,
    });
  };

  const progressPercent = (athlete.cause.raised / athlete.cause.target) * 100;

  return (
    <Layout>
      {/* Banner */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={athlete.banner}
          alt={`${athlete.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </section>

      {/* Profile Header */}
      <section className="relative -mt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={athlete.avatar}
                alt={athlete.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-4 border-background shadow-xl"
              />
              <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                {athlete.sport}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                {athlete.name}
              </h1>
              <p className="text-muted-foreground text-lg mb-4 max-w-2xl">
                {athlete.bio}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">
                    {athlete.followers.toLocaleString()} followers
                  </span>
                </div>
                <Button
                  variant={isFollowing ? "secondary" : "gold"}
                  onClick={handleFollow}
                >
                  <UserPlus className="h-4 w-4" />
                  {isFollowing ? "Following" : "Follow Athlete"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="training" className="w-full">
            <TabsList className="grid w-full max-w-lg grid-cols-3 mb-8">
              <TabsTrigger value="training" className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                <span className="hidden sm:inline">My Training</span>
                <span className="sm:hidden">Training</span>
              </TabsTrigger>
              <TabsTrigger value="life" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">My Life</span>
                <span className="sm:hidden">Life</span>
              </TabsTrigger>
              <TabsTrigger value="gear" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">My Gear</span>
                <span className="sm:hidden">Gear</span>
              </TabsTrigger>
            </TabsList>

            {/* Training Content */}
            <TabsContent value="training">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {athlete.training.length > 0 ? (
                  athlete.training.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground py-12">
                    No posts yet.
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Life Content */}
            <TabsContent value="life">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {athlete.life.length > 0 ? (
                  athlete.life.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground py-12">
                    No posts yet.
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Gear Content */}
            <TabsContent value="gear">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {athlete.gear.length > 0 ? (
                  athlete.gear.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground py-12">
                    No posts yet.
                  </p>
                )}
              </div>

              {/* Products */}
              <div>
                <h3 className="font-display text-2xl font-semibold mb-6">
                  Shop {athlete.name}'s Gear
                </h3>
                {athlete.products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {athlete.products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-12">
                    No products available.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Cause Section */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={athlete.cause.image}
                    alt={athlete.cause.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 hidden md:block" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="text-xs text-primary font-medium uppercase tracking-wide mb-2 block">
                    Cause Campaign
                  </span>
                  <h3 className="font-display text-2xl font-semibold mb-4">
                    {athlete.cause.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {athlete.cause.story}
                  </p>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {athlete.cause.currency}{athlete.cause.raised.toLocaleString()} / {athlete.cause.currency}{athlete.cause.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {progressPercent.toFixed(0)}% of goal reached
                    </p>
                  </div>

                  <Link to={`/athlete/${athlete.id}/cause`}>
                    <Button variant="gold" size="lg" className="w-full">
                      <Heart className="h-4 w-4" />
                      Support this Cause
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AthletePage;
