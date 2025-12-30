import { useState, useEffect } from "react";
import { 
  Trophy, 
  MessageCircle, 
  Gift,
  Star,
  Check,
  Loader2,
  Play,
  Image,
  TrendingUp,
  Users,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

// Import Cassandre images for curated content
import cassandreTraining1 from "@/assets/cassandre-training-1.jpeg";
import cassandreTrainingBike from "@/assets/cassandre-training-bike.jpg";
import cassandreTrainingSwim2 from "@/assets/cassandre-training-swim-2.jpg";
import cassandreTrainingTransition from "@/assets/cassandre-training-transition.jpg";
import cassandreTrainingRun from "@/assets/cassandre-training-run.jpg";

interface ContestEntry {
  contest_type: string;
  created_at: string;
}

export const CassandreExclusiveZone = () => {
  const { user } = useAuth();
  const [contestEntries, setContestEntries] = useState<ContestEntry[]>([]);
  const [loadingContest, setLoadingContest] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"prize-draws" | "exclusive-content" | "discussions">("prize-draws");

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    const { data: entries } = await supabase
      .from('contest_entries')
      .select('contest_type, created_at')
      .eq('user_id', user.id)
      .eq('athlete_id', 'cassandre-beaugrand');
    
    if (entries) setContestEntries(entries);
  };

  const hasEntered = (contestType: string) => {
    return contestEntries.some(e => e.contest_type === contestType);
  };

  const handleEnterDraw = async (contestType: string, contestName: string) => {
    if (!user) {
      toast({ title: "Please log in", description: "You need to be logged in to enter draws." });
      return;
    }

    setLoadingContest(contestType);
    
    const { error } = await supabase
      .from('contest_entries')
      .insert({
        user_id: user.id,
        athlete_id: 'cassandre-beaugrand',
        contest_type: contestType
      });

    if (error) {
      toast({ title: "Error", description: "Failed to enter draw. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "You're In!", description: `You've entered the ${contestName}. Good luck!` });
      fetchUserData();
    }
    
    setLoadingContest(null);
  };

  // Prize Draws Data (Platform-Managed)
  const prizeDraws = [
    {
      id: "signed_wetsuit",
      title: "Win Signed Cassandre Beaugrand Wetsuit",
      description: "Authenticated race wetsuit signed by Cassandre after her Olympic gold victory",
      badge: "Ends Jan 15",
      icon: Trophy,
      iconBg: "from-amber-500 to-orange-600"
    },
    {
      id: "gear_pack",
      title: "Halo Triathlon Gear Pack",
      description: "Premium tri suit, goggles, race belt, and transition bag curated by Halo",
      badge: "Monthly Draw",
      icon: Gift,
      iconBg: "from-green-500 to-emerald-600"
    },
    {
      id: "virtual_qa",
      title: "Virtual Q&A Access",
      description: "Join a platform-hosted live Q&A session with Cassandre and other fans",
      badge: "Next: Feb 2025",
      icon: Users,
      iconBg: "from-blue-500 to-indigo-600"
    },
    {
      id: "meetup_event",
      title: "Halo Triathlon Meetup Ticket",
      description: "Attend an exclusive Halo-organized triathlon event in Paris",
      badge: "Limited",
      icon: Star,
      iconBg: "from-purple-500 to-pink-600"
    }
  ];

  // Exclusive Content Data (Platform-Curated)
  const exclusiveContent = [
    {
      id: "race_stats",
      title: "Cassandre's 2024 Season Stats Breakdown",
      description: "Swim splits, T1/T2 times, and key performance metrics from the WTCS Tour",
      thumbnail: cassandreTrainingRun,
      type: "Stats",
      icon: TrendingUp
    },
    {
      id: "highlight_reel",
      title: "Top 10 Moments - Paris Olympics",
      description: "Curated highlight compilation from Cassandre's gold medal performance",
      thumbnail: cassandreTrainingTransition,
      type: "Highlights",
      icon: Play
    },
    {
      id: "tour_life",
      title: "Inside the Tour: What Pros Actually Do Between Races",
      description: "A platform feature exploring recovery routines, nutrition, and downtime on tour",
      thumbnail: cassandreTrainingBike,
      type: "Feature",
      icon: Image
    },
    {
      id: "warmup_guide",
      title: "How Pros Warm Up: WTCS Edition",
      description: "Breakdown of professional warm-up routines before stepping to the start line",
      thumbnail: cassandreTraining1,
      type: "Guide",
      icon: Play
    },
    {
      id: "paris_feature",
      title: "Paris 2024: Olympic Gold Moments",
      description: "Photo gallery and key moments from Cassandre's home Games victory",
      thumbnail: cassandreTrainingSwim2,
      type: "Gallery",
      icon: Image
    }
  ];

  // Discussion Threads Data (Fan-Driven, Platform-Hosted)
  const discussionThreads = [
    {
      id: "race_reactions",
      title: "Race Reactions",
      description: "Discuss Cassandre's latest races, results, and pivotal moments",
      participants: 1247,
      lastActive: "2 hours ago"
    },
    {
      id: "race_predictions",
      title: "Race Predictions",
      description: "Share your predictions for upcoming WTCS events and Championships",
      participants: 2134,
      lastActive: "30 min ago"
    },
    {
      id: "training_tips",
      title: "Training Tips (Fan to Fan)",
      description: "Exchange triathlon training advice, drills, and improvement strategies",
      participants: 862,
      lastActive: "1 hour ago"
    },
    {
      id: "gear_talk",
      title: "Triathlon Gear Talk",
      description: "Discuss bikes, wetsuits, running shoes, and equipment choices",
      participants: 623,
      lastActive: "45 min ago"
    }
  ];

  const tabs = [
    { id: "prize-draws" as const, label: "Prize Draws", icon: <Trophy className="h-4 w-4" /> },
    { id: "exclusive-content" as const, label: "Exclusive Content", icon: <Play className="h-4 w-4" /> },
    { id: "discussions" as const, label: "Discussions", icon: <MessageCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Premium Members Only</Badge>
        <h2 className="text-2xl font-bold mb-2">Exclusive Zone</h2>
        <p className="text-muted-foreground text-sm">
          Win prizes, access content you won't find anywhere else, and connect with the community.
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-border/30 pb-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 ${
              activeTab === tab.id 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Prize Draws Tab */}
      {activeTab === "prize-draws" && (
        <div className="space-y-4">
          <p className="text-muted-foreground">Platform-managed giveaways and experiences</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {prizeDraws.map((draw) => {
              const IconComponent = draw.icon;
              const entered = hasEntered(draw.id);
              return (
                <article 
                  key={draw.id} 
                  className="glass-card p-5 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${draw.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">{draw.badge}</Badge>
                      </div>
                      <h4 className="font-semibold mb-1 line-clamp-1">{draw.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{draw.description}</p>
                      {entered ? (
                        <Button size="sm" variant="secondary" className="w-full" disabled>
                          <Check className="h-4 w-4 mr-1" />
                          Entered
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleEnterDraw(draw.id, draw.title)}
                          disabled={loadingContest === draw.id}
                        >
                          {loadingContest === draw.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Enter Draw'
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Exclusive Content Tab */}
      {activeTab === "exclusive-content" && (
        <div className="space-y-4">
          <p className="text-muted-foreground">Curated features, stats, and highlights</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exclusiveContent.map((content) => {
              const IconComponent = content.icon;
              return (
                <article 
                  key={content.id} 
                  className="glass-card overflow-hidden group hover:border-primary/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img 
                      src={content.thumbnail} 
                      alt={content.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground border-0 text-xs">
                      <IconComponent className="h-3 w-3 mr-1" />
                      {content.type}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {content.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === "discussions" && (
        <div className="space-y-4">
          <p className="text-muted-foreground">Fan conversations hosted by Halo</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {discussionThreads.map((thread) => (
              <article 
                key={thread.id} 
                className="glass-card p-5 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold group-hover:text-primary transition-colors">{thread.title}</h4>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{thread.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {thread.participants.toLocaleString()} members
                  </span>
                  <span>Active {thread.lastActive}</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Join Conversation
                </Button>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};