import { Calendar, MapPin, Trophy, TrendingUp, Users, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const TommyUpcomingTournamentBlock = () => {
  const upcomingTournament = {
    name: "The Open Championship",
    course: "Royal Troon",
    location: "Troon, Scotland",
    date: "July 17-20, 2025",
    purse: "$17,000,000",
    defending: "Brian Harman",
    previousFinishes: [
      { year: 2024, finish: "T12", course: "Royal Troon" },
      { year: 2023, finish: "T6", course: "Royal Liverpool" },
      { year: 2019, finish: "2nd", course: "Royal Portrush" },
    ],
    courseStats: {
      avgScore: 70.2,
      birdies: 14,
      rounds: 8,
    }
  };

  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Tournament Info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <Badge className="mb-2 bg-amber-500/20 text-amber-400 border-amber-500/30">
                Major Championship
              </Badge>
              <h5 className="text-lg sm:text-xl font-bold text-foreground">
                {upcomingTournament.name}
              </h5>
              <p className="text-sm text-muted-foreground mt-1">
                {upcomingTournament.course}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Purse</p>
              <p className="font-bold text-green-500">{upcomingTournament.purse}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{upcomingTournament.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{upcomingTournament.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span>Def: {upcomingTournament.defending}</span>
            </div>
          </div>
        </div>

        {/* Previous Finishes at this tournament */}
        <div className="lg:w-64 space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <h6 className="font-semibold text-sm text-foreground">Open Championship History</h6>
          </div>
          <div className="space-y-2">
            {upcomingTournament.previousFinishes.map((finish, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
              >
                <span className="text-xs text-muted-foreground">{finish.year}</span>
                <span className={`text-sm font-semibold ${
                  finish.finish === "1st" ? "text-amber-400" :
                  finish.finish === "2nd" ? "text-slate-400" :
                  finish.finish.startsWith("T") && parseInt(finish.finish.slice(1)) <= 10 ? "text-green-400" :
                  "text-foreground"
                }`}>
                  {finish.finish}
                </span>
                <span className="text-xs text-muted-foreground truncate max-w-20">{finish.course}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Stats */}
        <div className="lg:w-48 space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h6 className="font-semibold text-sm text-foreground">At This Course</h6>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
            <div className="p-2 rounded-lg bg-muted/30 text-center">
              <p className="text-lg font-bold text-foreground">{upcomingTournament.courseStats.avgScore}</p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/30 text-center">
              <p className="text-lg font-bold text-green-500">{upcomingTournament.courseStats.birdies}</p>
              <p className="text-xs text-muted-foreground">Total Birdies</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/30 text-center">
              <p className="text-lg font-bold text-foreground">{upcomingTournament.courseStats.rounds}</p>
              <p className="text-xs text-muted-foreground">Rounds Played</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
