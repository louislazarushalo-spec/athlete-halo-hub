import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Image, ArrowRight, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({ users: 0, content: 0, activeToday: 0 });

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        navigate("/home");
        return;
      }

      setIsAdmin(true);

      // Fetch stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const [usersRes, contentRes, activeTodayRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("athlete_content").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }).gte("last_sign_in", today.toISOString()),
      ]);

      setStats({
        users: usersRes.count || 0,
        content: contentRes.count || 0,
        activeToday: activeTodayRes.count || 0,
      });

      setLoading(false);
    };

    checkAdminAndFetch();
  }, [user, navigate]);

  if (!isAdmin && !loading) {
    return null;
  }

  const adminFeatures = [
    {
      title: "Users",
      description: "View all registered users and their emails",
      icon: Users,
      href: "/admin/users",
      stat: stats.users,
      statLabel: "registered users",
    },
    {
      title: "Active Today",
      description: "Users who signed in today",
      icon: Clock,
      href: "/admin/users",
      stat: stats.activeToday,
      statLabel: "users active today",
    },
    {
      title: "Content Manager",
      description: "Manage athlete images and content uploads",
      icon: Image,
      href: "/admin/content",
      stat: stats.content,
      statLabel: "content items",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your platform</p>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {adminFeatures.map((feature) => (
              <Card
                key={feature.href}
                className="cursor-pointer hover:border-primary/50 transition-colors group"
                onClick={() => navigate(feature.href)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-primary/10 w-fit">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{feature.stat}</div>
                  <p className="text-sm text-muted-foreground">{feature.statLabel}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
