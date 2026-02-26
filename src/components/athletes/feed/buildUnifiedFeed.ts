import type { Athlete, MediaFeedItem } from "@/data/athletes";
import type { ExtendedFeedItem } from "./FeedCards";
import * as content from "@/data/athleteContent";

type TrainingData = typeof content.arthurTrainingData;
type ExclusiveData = typeof content.arthurExclusiveZoneData;

/* ─── Mappings from athlete slug → structured data ─── */
const trainingDataMap: Record<string, TrainingData> = {
  "arthur-cazaux": content.arthurTrainingData,
  "matthieu-jalibert": content.matthieuTrainingData,
  "cassandre-beaugrand": content.cassandreTrainingData,
  "pierre-gasly": content.pierreTrainingData,
  "tommy-fleetwood": content.tommyTrainingData,
  "nic-von-rupp": content.nicTrainingData,
};

const exclusiveDataMap: Record<string, ExclusiveData> = {
  "arthur-cazaux": content.arthurExclusiveZoneData,
  "matthieu-jalibert": content.matthieuExclusiveZoneData,
  "cassandre-beaugrand": content.cassandreExclusiveZoneData,
  "pierre-gasly": content.pierreExclusiveZoneData,
  "tommy-fleetwood": content.tommyExclusiveZoneData,
  "nic-von-rupp": content.nicExclusiveZoneData,
};

/**
 * Convert relative timestamps like "2 hours ago", "3 days ago" to ISO strings.
 * Uses a deterministic seed based on item id so dates don't shift on every render.
 */
function resolveTimestamp(relativeStr: string, itemId: string): string {
  const now = new Date();
  const match = relativeStr.match(/^(\d+)\s+(hour|hours|day|days|week|weeks|minute|minutes)/i);
  if (match) {
    const val = parseInt(match[1]);
    const unit = match[2].toLowerCase().replace(/s$/, "");
    const ms =
      unit === "minute" ? val * 60_000 :
      unit === "hour" ? val * 3_600_000 :
      unit === "day" ? val * 86_400_000 :
      unit === "week" ? val * 7 * 86_400_000 : 0;
    return new Date(now.getTime() - ms).toISOString();
  }
  // Fallback: hash-based offset (1-14 days) for items without parseable timestamps
  let hash = 0;
  for (let i = 0; i < itemId.length; i++) hash = (hash * 31 + itemId.charCodeAt(i)) | 0;
  const offsetDays = (Math.abs(hash) % 14) + 1;
  const offsetHours = Math.abs(hash) % 24;
  return new Date(now.getTime() - offsetDays * 86_400_000 - offsetHours * 3_600_000).toISOString();
}

/**
 * Builds a unified feed array for any athlete, merging:
 * - Studio DB posts (passed in)
 * - Static media feed items
 * - Training programs
 * - Engagement items (prize draws, discussions)
 * - Kit room / gear collections
 * - Cause
 */
export function buildUnifiedFeed(
  athlete: Athlete,
  studioPosts: Array<{ id: string; type: string; title: string; body?: string | null; media?: string[] | null; published_at?: string | null; status?: string }> = [],
): ExtendedFeedItem[] {
  const slug = athlete.id;

  /* 1. Studio DB posts */
  const dbItems: ExtendedFeedItem[] = studioPosts
    .filter((p) => !p.status || p.status === "published")
    .map((p) => ({
      id: p.id,
      type: (p.type === "video" ? "video" : p.type === "article" ? "article" : "social") as MediaFeedItem["type"],
      platform: "instagram" as MediaFeedItem["platform"],
      title: p.title,
      content: p.body || "",
      image: p.media?.[0] || "",
      timestamp: p.published_at || "",
      stats: {},
    }));

  /* 2. Static media feed — convert relative timestamps to ISO */
  /*
   * Filter out items whose image is a scraped/stock external URL.
   * Real athlete images are bundled assets (start with "/" or "data:") or empty (text-only posts).
   * External URLs (https://images.unsplash.com etc.) are generic stock images.
   * Items explicitly marked media_origin = 'athlete' | 'social' | 'upload' bypass the filter.
   */
  const isScrapedImage = (img: string, origin?: string): boolean => {
    if (origin && origin !== 'scraped_web') return false; // explicitly marked as real
    if (!img || img === '') return false; // text-only post, keep it
    return img.startsWith('http://') || img.startsWith('https://');
  };

  const socialItems: ExtendedFeedItem[] = athlete.mediaFeed
    .filter((item) => !isScrapedImage(item.image, item.media_origin))
    .map((item) => ({
      ...item,
      timestamp: resolveTimestamp(item.timestamp, `${slug}-${item.id}`),
    }));

  /* 3. Training programs */
  const trainingData = trainingDataMap[slug];
  const programItems: ExtendedFeedItem[] = trainingData
    ? trainingData.categories.flatMap((cat) =>
        cat.programs.map((p) => ({
          id: `program-${cat.id}-${p.id}`,
          type: "social" as MediaFeedItem["type"],
          platform: "instagram" as MediaFeedItem["platform"],
          title: p.title,
          content: p.description || "",
          image: p.image || "",
          timestamp: resolveTimestamp("", `program-${slug}-${cat.id}-${p.id}`),
          stats: {},
          _cardType: "program",
          _category: cat.title,
          _athleteSlug: slug,
        }))
      )
    : [];

  /* 4. Engagement items (prize draws + discussions) */
  const exclusiveData = exclusiveDataMap[slug];
  const prizeDrawItems: ExtendedFeedItem[] = exclusiveData
    ? exclusiveData.prizeDraws.map((pd) => ({
        id: `prize-draw-${pd.id}`,
        type: "social" as MediaFeedItem["type"],
        platform: "instagram" as MediaFeedItem["platform"],
        title: pd.title,
        content: pd.description,
        image: "",
        timestamp: resolveTimestamp("", `prize-${slug}-${pd.id}`),
        stats: {},
        _cardType: "prize_draw",
        _badge: pd.badge,
      }))
    : [];

  const discussionItems: ExtendedFeedItem[] = exclusiveData
    ? exclusiveData.discussionThreads.map((dt) => ({
        id: `discussion-${dt.id}`,
        type: "social" as MediaFeedItem["type"],
        platform: "instagram" as MediaFeedItem["platform"],
        title: dt.title,
        content: dt.description,
        image: "",
        timestamp: resolveTimestamp("", `discuss-${slug}-${dt.id}`),
        stats: {},
        _cardType: "live_discussion",
        _participants: dt.participants,
        _lastActive: dt.lastActive,
      }))
    : [];

  /* 5. Kit room / gear collections */
  const kitRoomItems: ExtendedFeedItem[] = (athlete.gearCollections || []).map((gc) => ({
    id: `kit-room-${gc.id}`,
    type: "social" as MediaFeedItem["type"],
    platform: "instagram" as MediaFeedItem["platform"],
    title: gc.name,
    content: gc.description,
    image: gc.actionImage || gc.products?.[0]?.image || "",
    timestamp: resolveTimestamp("", `kit-${slug}-${gc.id}`),
    stats: {},
    _cardType: "kit_room",
    _products: gc.products.map((p) => ({ name: p.name, brand: p.category, image: p.image })),
  }));

  /* 6. Cause */
  const causeItems: ExtendedFeedItem[] = athlete.cause
    ? [{
        id: `cause-${slug}`,
        type: "social" as MediaFeedItem["type"],
        platform: "instagram" as MediaFeedItem["platform"],
        title: athlete.cause.title,
        content: athlete.cause.story || "",
        image: athlete.cause.image || "",
        timestamp: resolveTimestamp("", `cause-${slug}`),
        stats: {},
        _cardType: "cause",
      }]
    : [];

  return [
    ...dbItems,
    ...socialItems,
    ...programItems,
    ...prizeDrawItems,
    ...discussionItems,
    ...kitRoomItems,
    ...causeItems,
  ];
}
