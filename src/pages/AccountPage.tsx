import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { athletes } from "@/data/athletes";
import { AthleteCard } from "@/components/athletes/AthleteCard";
import { User, Heart, ShoppingBag, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const AccountPage = () => {
  // Mock data
  const followedAthletes = athletes.slice(0, 2);
  const savedContent: any[] = [];
  const orderHistory = [
    {
      id: "order-1",
      date: "2024-02-15",
      total: 138,
      items: ["Elite Rugby Agility Program", "Signed Match Ball"],
      status: "Delivered"
    }
  ];

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">
              Manage your profile, followed athletes, and order history.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="following" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="following" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Following
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Orders
              </TabsTrigger>
            </TabsList>

            {/* Following */}
            <TabsContent value="following">
              {followedAthletes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {followedAthletes.map((athlete, index) => (
                    <AthleteCard key={athlete.id} athlete={athlete} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 glass-card">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    You're not following any athletes yet.
                  </p>
                  <Link to="/athletes">
                    <Button variant="gold">Browse Athletes</Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            {/* Saved Content */}
            <TabsContent value="saved">
              {savedContent.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Saved content cards */}
                </div>
              ) : (
                <div className="text-center py-12 glass-card">
                  <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    No saved content yet.
                  </p>
                  <Link to="/athletes">
                    <Button variant="gold">Explore Athletes</Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            {/* Order History */}
            <TabsContent value="orders">
              {orderHistory.length > 0 ? (
                <div className="space-y-4">
                  {orderHistory.map(order => (
                    <article key={order.id} className="glass-card p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">
                          {order.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        {order.items.join(", ")}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary">€{order.total}</span>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 glass-card">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    No orders yet.
                  </p>
                  <Link to="/athletes">
                    <Button variant="gold">Shop Athlete Gear</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default AccountPage;
