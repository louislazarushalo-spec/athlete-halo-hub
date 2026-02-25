import { Link } from "react-router-dom";
import { useFollowedAthletes } from "@/hooks/useFollowedAthletes";
import { useAthleteProfiles } from "@/hooks/useAthleteProfiles";
import { getEventsBySport } from "@/data/sportEvents";
import { Calendar } from "lucide-react";

const monthToNumber: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

export const UpcomingEventsSection = () => {
  const { athletes } = useAthleteProfiles();
  const { followedIds, loading } = useFollowedAthletes();

  if (loading) return null;

  const followedAthletes = athletes.filter((a) => followedIds.includes(a.id));
  if (followedAthletes.length === 0) return null;

  const now = new Date();

  // Find next upcoming event across all followed athletes
  const nextEvent = followedAthletes
    .flatMap((athlete) => {
      const events = athlete.events || getEventsBySport(athlete.sport, athlete.gender);
      return events.map((e) => ({
        ...e,
        athlete,
        sortDate: new Date(parseInt(e.year), monthToNumber[e.month] ?? 0, parseInt(e.date)),
      }));
    })
    .filter((e) => e.sortDate >= now)
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())[0];

  if (!nextEvent) {
    return (
      <section className="mb-6">
        <h2 className="font-display text-lg font-semibold mb-3">Next event</h2>
        <div className="rounded-2xl border border-border/40 bg-card p-5 text-center">
          <Calendar className="h-7 w-7 mx-auto mb-2 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No upcoming events yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="font-display text-lg font-semibold mb-3">Next event</h2>
      <Link to={`/athlete/${nextEvent.athlete.id}`} className="group block">
        <article className="rounded-2xl border border-border/40 bg-card p-4 transition-all hover:border-primary/30 flex items-center gap-3">
          <img
            src={nextEvent.athlete.avatar}
            alt={nextEvent.athlete.name}
            className="w-12 h-12 rounded-full object-cover object-top ring-2 ring-border shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {nextEvent.name}
            </h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              {nextEvent.athlete.name} · {nextEvent.category}
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>
                {nextEvent.date} {nextEvent.month} {nextEvent.year}
              </span>
              <span>{nextEvent.countryFlag}</span>
            </div>
          </div>
        </article>
      </Link>
    </section>
  );
};
