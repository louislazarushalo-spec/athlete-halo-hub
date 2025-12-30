import { Gift, MessageCircle, Video, Trophy, Star, Users, Calendar, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const CassandreExclusiveZone = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
      {/* Header - Matching Arthur's exact styling */}
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Members Only</Badge>
        <h2 className="text-3xl font-bold mb-3">Exclusive Zone</h2>
        <p className="text-muted-foreground">
          Prize draws, curated content, and fan discussions — all in one place.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Prize Draws */}
        <article className="glass-card p-6 group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Prize Draws</h4>
              <Badge variant="secondary" className="text-[10px] mt-1">Monthly</Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Win signed gear, race day experiences, and exclusive merchandise from Cassandre's collection.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Enter Draw
          </Button>
        </article>

        {/* Direct Messages */}
        <article className="glass-card p-6 group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Q&A Sessions</h4>
              <Badge variant="secondary" className="text-[10px] mt-1">Weekly</Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Ask Cassandre your triathlon questions and get personal responses during exclusive Q&A sessions.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Submit Question
          </Button>
        </article>

        {/* Behind the Scenes */}
        <article className="glass-card p-6 group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
              <Video className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">BTS Content</h4>
              <Badge variant="secondary" className="text-[10px] mt-1">Exclusive</Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Access training camp footage, race day preparation, and recovery routines never shared publicly.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Watch Now
          </Button>
        </article>

        {/* Race Predictions */}
        <article className="glass-card p-6 group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Race Predictions</h4>
              <Badge variant="secondary" className="text-[10px] mt-1">Competition</Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Predict race outcomes and compete with other fans for exclusive prizes and recognition.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Make Prediction
          </Button>
        </article>

        {/* Members Community */}
        <article className="glass-card p-6 group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Members Community</h4>
              <Badge variant="secondary" className="text-[10px] mt-1">Private</Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Connect with fellow fans and discuss triathlon training, racing, and all things endurance sports.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Join Community
          </Button>
        </article>

        {/* Meet & Greet */}
        <article className="glass-card p-6 group hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-500/5 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Meet & Greet</h4>
              <Badge variant="secondary" className="text-[10px] mt-1">Events</Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Priority access to fan meetups, race day experiences, and exclusive events with Cassandre.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            View Events
          </Button>
        </article>
      </div>

      {/* Premium Highlight */}
      <div className="glass-card p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shrink-0">
            <Star className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold text-foreground mb-2">Premium Member Benefits</h4>
            <p className="text-muted-foreground mb-4">
              As a premium subscriber, you get first access to all exclusive content, priority entry to competitions, 
              and direct connection to Cassandre's triathlon journey.
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <Badge className="bg-primary/10 text-primary border-primary/20">Early Access</Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">Exclusive Content</Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">Direct Interaction</Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">Prize Priority</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
