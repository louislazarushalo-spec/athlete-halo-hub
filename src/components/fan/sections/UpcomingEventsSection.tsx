import { Link } from "react-router-dom";
import { athletes } from "@/data/athletes";
import { tennisEvents, golfEvents, womenCyclingEvents } from "@/data/sportEvents";
import { Calendar, ChevronRight } from "lucide-react";

// Hardcoded followed athletes for demo
const followedAthleteIds = ["arthur-cazaux", "tommy-fleetwood", "elisa-balsamo"];

// Month name to number mapping
const monthToNumber: Record<string, number> = {
  "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
  "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
};

export const UpcomingEventsSection = () => {
  const followedAthletes = athletes.filter(a => followedAthleteIds.includes(a.id));
  
  // Get ONE event per followed athlete (next upcoming)
  const athleteNextEvents = followedAthletes.map(athlete => {
    let events: typeof tennisEvents = [];
    
    // Arthur Cazaux = Tennis (ATP/WTA)
    if (athlete.sport === "Tennis") {
      events = tennisEvents;
    }
    // Tommy Fleetwood = Golf (PGA)
    else if (athlete.sport === "Golf") {
      events = golfEvents;
    }
    // Elisa Balsamo = Cycling (UCI Women's World Tour)
    else if (athlete.sport === "Cycling") {
      events = womenCyclingEvents;
    }
    
    const now = new Date();
    
    // Find the next upcoming event for this athlete
    const nextEvent = events
      .map(event => ({
        ...event,
        athlete,
        sortDate: new Date(
          parseInt(event.year),
          monthToNumber[event.month] || 0,
          parseInt(event.date)
        ),
      }))
      .filter(event => event.sortDate >= now)
      .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())[0];
    
    return nextEvent;
  }).filter(Boolean);

  // Sort all events chronologically
  const upcomingEvents = athleteNextEvents.sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime());

  if (upcomingEvents.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Upcoming events</h2>
        <p className="text-muted-foreground">Stay updated on the next matches, tournaments, and races from your athletes.</p>
      </div>
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <Link
            key={`${event.id}-${event.athlete.id}`}
            to={`/athlete/${event.athlete.id}`}
            className="group block"
          >
            <article className="glass-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-glow-soft">
              <div className="flex items-center gap-4">
                <img
                  src={event.athlete.avatar}
                  alt={event.athlete.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-border"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {event.athlete.name} • {event.category}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date} {event.month} {event.year}</span>
                    <span>{event.countryFlag}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  View Halo
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};
