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
      timestamp: p.published_at ? new Date(p.published_at).toLocaleDateString() : "",
      stats: {},
    }));

  /* 2. Static media feed */
  const socialItems: ExtendedFeedItem[] = athlete.mediaFeed.map((item) => ({ ...item }));

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
          timestamp: "",
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
        timestamp: "",
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
        timestamp: "",
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
    timestamp: "",
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
        timestamp: "",
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
