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
  ChevronRight,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

// Types for athlete content
export interface PrizeDraw {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  iconBg: string;
}

export interface ExclusiveContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: string;
  icon: LucideIcon;
}

export interface DiscussionThread {
  id: string;
  title: string;
  description: string;
  participants: number;
  lastActive: string;
}

export interface AthleteExclusiveZoneData {
  athleteId: string;
  prizeDraws: PrizeDraw[];
  exclusiveContent: ExclusiveContent[];
  discussionThreads: DiscussionThread[];
}

interface ContestEntry {
  contest_type: string;
  created_at: string;
}

interface AthleteExclusiveZoneProps {
  data: AthleteExclusiveZoneData;
}

export const AthleteExclusiveZone = ({ data }: AthleteExclusiveZoneProps) => {
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
      .eq('athlete_id', data.athleteId);
    
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
        athlete_id: data.athleteId,
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
      <div className="flex items-center justify-center gap-2 border-b border-border/30 pb-4">
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
            {data.prizeDraws.map((draw) => {
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
            {data.exclusiveContent.map((content) => {
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
            {data.discussionThreads.map((thread) => (
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
