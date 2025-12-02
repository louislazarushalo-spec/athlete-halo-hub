import { useAuth } from "@/contexts/AuthContext";

export const PersonalHeroHeader = () => {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] || "there";

  return (
    <section className="mb-8">
      <h1 className="font-display text-3xl font-bold mb-2">
        Welcome back {firstName} 👋
      </h1>
      <p className="text-muted-foreground text-lg">
        Here's what's new from your Halos today.
      </p>
    </section>
  );
};
