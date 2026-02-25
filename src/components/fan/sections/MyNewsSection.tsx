import { Link } from "react-router-dom";
import { useFollowedAthletes } from "@/hooks/useFollowedAthletes";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { buildUnifiedFeed } from "@/components/athletes/feed/buildUnifiedFeed";
import { UnifiedFeedItem, type ExtendedFeedItem } from "@/components/athletes/feed/FeedCards";
import { Rss } from "lucide-react";
import { useMemo } from "react";

export const MyNewsSection = () => {
  const { athletes } = useAthleteProfiles();
  const { followedIds, loading } = useFollowedAthletes();

  const followedAthletes = useMemo(
    () => athletes.filter((a) => followedIds.includes(a.id)),
    [athletes, followedIds],
  );

  // Build unified feed across all followed athletes
  const feedItems = useMemo(() => {
    if (followedAthletes.length === 0) return [];

    const allItems: (ExtendedFeedItem & { _athleteAvatar: string; _athleteName: string; _athleteSlug: string })[] = [];

    for (const athlete of followedAthletes) {
      const items = buildUnifiedFeed(athlete, []);
      for (const item of items) {
        allItems.push({
          ...item,
          _athleteAvatar: athlete.avatar,
          _athleteName: athlete.name,
          _athleteSlug: item._athleteSlug || athlete.id,
        });
      }
    }

    // Sort by timestamp desc, items without timestamp go to bottom
    return allItems.sort((a, b) => {
      const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return tb - ta;
    });
  }, [followedAthletes]);

  if (loading) return null;

  if (feedItems.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="font-display text-lg font-semibold mb-3">From your athletes</h2>
      <div className="space-y-4">
        {feedItems.slice(0, 30).map((item) => (
          <UnifiedFeedItem
            key={`${item._athleteSlug}-${item.id}`}
            item={item}
            avatarSrc={item._athleteAvatar}
            name={item._athleteName}
            athleteSlug={item._athleteSlug}
          />
        ))}
      </div>
    </section>
  );
};
