import { Link } from "react-router-dom";
import { athletes } from "@/data/athletes";
import { tennisEvents, golfEvents, lpgaEvents, womenCyclingEvents } from "@/data/sportEvents";
import { Calendar, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Hardcoded followed athletes for demo
const followedAthleteIds = ["arthur-cazaux", "tommy-fleetwood", "elisa-balsamo"];

// Month name to number mapping
const monthToNumber: Record<string, number> = {
  "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
  "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
};

export const UpcomingEventsSection = () => {
  const followedAthletes = athletes.filter(a => followedAthleteIds.includes(a.id));
  
  // Get events based on followed athletes' sports
  const athleteEvents = followedAthletes.flatMap(athlete => {
    let events: typeof tennisEvents = [];
    
    // Arthur Cazaux = Tennis (ATP)
    if (athlete.sport === "Tennis" && athlete.gender === "male") {
      events = tennisEvents;
    }
    // Tommy Fleetwood = Golf (PGA)
    else if (athlete.sport === "Golf" && athlete.gender === "male") {
      events = golfEvents;
    }
    // Elisa Balsamo = Cycling (Women's)
    else if (athlete.sport === "Cycling" && athlete.gender === "female") {
      events = womenCyclingEvents;
    }
    
    return events.map(event => ({
      ...event,
      athlete,
      // Create sortable date
      sortDate: new Date(
        parseInt(event.year),
        monthToNumber[event.month] || 0,
        parseInt(event.date)
      ),
    }));
  });

  // Sort chronologically and filter future events
  const now = new Date();
  const upcomingEvents = athleteEvents
    .filter(event => event.sortDate >= now)
    .sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime())
    .slice(0, 8);

  if (upcomingEvents.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold mb-1">Upcoming events</h2>
        <p className="text-muted-foreground">Stay updated on the next matches, tournaments, and races from your athletes.</p>
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {upcomingEvents.map((event, index) => (
            <Link
              key={`${event.id}-${event.athlete.id}-${index}`}
              to={`/athlete/${event.athlete.id}`}
              className="group shrink-0 w-80"
            >
              <article className="glass-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-glow-gold">
                <div className="flex items-start gap-4">
                  <img
                    src={event.athlete.avatar}
                    alt={event.athlete.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-border"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                      {event.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {event.athlete.name} • {event.category}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{event.date} {event.month} {event.year}</span>
                      <span>{event.countryFlag}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    View Halo
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
