import { useState, useEffect } from "react";
import { 
  Trophy, 
  MessageCircle, 
  Plane, 
  HelpCircle, 
  Target, 
  Briefcase, 
  Lightbulb, 
  Gift,
  Play,
  Star,
  Check,
  Loader2,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface ContestEntry {
  contest_type: string;
  created_at: string;
}

interface MatchPrediction {
  prediction_score: string;
  created_at: string;
}

interface FanQuestion {
  question: string;
  status: string;
  answer: string | null;
  created_at: string;
}

export const ArthurExclusiveZone = () => {
  const { user } = useAuth();
  const [contestEntries, setContestEntries] = useState<ContestEntry[]>([]);
  const [predictions, setPredictions] = useState<MatchPrediction[]>([]);
  const [questions, setQuestions] = useState<FanQuestion[]>([]);
  const [predictionScore, setPredictionScore] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [loadingContest, setLoadingContest] = useState<string | null>(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    // Fetch contest entries
    const { data: entries } = await supabase
      .from('contest_entries')
      .select('contest_type, created_at')
      .eq('user_id', user.id)
      .eq('athlete_id', 'arthur-cazaux');
    
    if (entries) setContestEntries(entries);

    // Fetch predictions
    const { data: preds } = await supabase
      .from('match_predictions')
      .select('prediction_score, created_at')
      .eq('user_id', user.id)
      .eq('athlete_id', 'arthur-cazaux')
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (preds) setPredictions(preds);

    // Fetch questions
    const { data: qs } = await supabase
      .from('fan_questions')
      .select('question, status, answer, created_at')
      .eq('user_id', user.id)
      .eq('athlete_id', 'arthur-cazaux')
      .order('created_at', { ascending: false });
    
    if (qs) setQuestions(qs);
  };

  const hasEntered = (contestType: string) => {
    return contestEntries.some(e => e.contest_type === contestType);
  };

  const handleEnterContest = async (contestType: string, contestName: string) => {
    if (!user) {
      toast({ title: "Please log in", description: "You need to be logged in to enter contests." });
      return;
    }

    setLoadingContest(contestType);
    
    const { error } = await supabase
      .from('contest_entries')
      .insert({
        user_id: user.id,
        athlete_id: 'arthur-cazaux',
        contest_type: contestType
      });

    if (error) {
      toast({ title: "Error", description: "Failed to enter contest. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Entry Submitted!", description: `You've entered the ${contestName} contest. Good luck!` });
      fetchUserData();
    }
    
    setLoadingContest(null);
  };

  const handleSubmitPrediction = async () => {
    if (!user) {
      toast({ title: "Please log in", description: "You need to be logged in to submit predictions." });
      return;
    }

    if (!predictionScore.trim()) {
      toast({ title: "Enter a score", description: "Please enter your predicted match score.", variant: "destructive" });
      return;
    }

    setLoadingPrediction(true);
    
    const { error } = await supabase
      .from('match_predictions')
      .insert({
        user_id: user.id,
        athlete_id: 'arthur-cazaux',
        prediction_score: predictionScore.trim()
      });

    if (error) {
      toast({ title: "Error", description: "Failed to submit prediction. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Prediction Submitted!", description: `Your prediction: ${predictionScore}. Let's see if you're right!` });
      setPredictionScore("");
      fetchUserData();
    }
    
    setLoadingPrediction(false);
  };

  const handleSubmitQuestion = async () => {
    if (!user) {
      toast({ title: "Please log in", description: "You need to be logged in to ask questions." });
      return;
    }

    if (!newQuestion.trim()) {
      toast({ title: "Enter a question", description: "Please write your question before submitting.", variant: "destructive" });
      return;
    }

    if (newQuestion.length > 500) {
      toast({ title: "Question too long", description: "Please keep your question under 500 characters.", variant: "destructive" });
      return;
    }

    setLoadingQuestion(true);
    
    const { error } = await supabase
      .from('fan_questions')
      .insert({
        user_id: user.id,
        athlete_id: 'arthur-cazaux',
        question: newQuestion.trim()
      });

    if (error) {
      toast({ title: "Error", description: "Failed to submit question. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Question Submitted!", description: "Your question has been sent. Arthur may answer it soon!" });
      setNewQuestion("");
      fetchUserData();
    }
    
    setLoadingQuestion(false);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Premium Access</Badge>
        <h2 className="text-3xl font-bold mb-3">Welcome to My Exclusive Zone</h2>
        <p className="text-muted-foreground">
          Get deeper access to my tennis world. Exclusive contests, insights, Q&As, and behind-the-scenes content just for you.
        </p>
      </div>

      {/* Match Week Contests */}
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Match Week Contests</h3>
            <p className="text-sm text-muted-foreground">Tennis-themed prize draws & giveaways</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Win Signed Wristband */}
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-amber-500" />
              <Badge variant="secondary" className="text-xs">Active</Badge>
            </div>
            <h4 className="font-semibold mb-1">Win Signed Wristband</h4>
            <p className="text-sm text-muted-foreground mb-3">Match-worn and signed after my next ATP match</p>
            {hasEntered('wristband') ? (
              <Button size="sm" variant="secondary" className="w-full" disabled>
                <Check className="h-4 w-4 mr-1" />
                Entered
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => handleEnterContest('wristband', 'Win Signed Wristband')}
                disabled={loadingContest === 'wristband'}
              >
                {loadingContest === 'wristband' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enter Draw'}
              </Button>
            )}
          </article>

          {/* Predict Match Score */}
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-blue-500" />
              <Badge variant="secondary" className="text-xs">Predict</Badge>
            </div>
            <h4 className="font-semibold mb-1">Predict My Match Score</h4>
            <p className="text-sm text-muted-foreground mb-3">Guess the exact score and win exclusive merch</p>
            {predictions.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Your prediction: <span className="text-primary font-medium">{predictions[0].prediction_score}</span></p>
                <Input
                  placeholder="Update prediction (e.g., 6-4, 7-5)"
                  value={predictionScore}
                  onChange={(e) => setPredictionScore(e.target.value)}
                  className="h-8 text-sm"
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSubmitPrediction}
                  disabled={loadingPrediction}
                >
                  {loadingPrediction ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Input
                  placeholder="e.g., 6-4, 7-5"
                  value={predictionScore}
                  onChange={(e) => setPredictionScore(e.target.value)}
                  className="h-8 text-sm"
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSubmitPrediction}
                  disabled={loadingPrediction}
                >
                  {loadingPrediction ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Prediction'}
                </Button>
              </div>
            )}
          </article>

          {/* Training Session Giveaway */}
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-4 w-4 text-green-500" />
              <Badge variant="secondary" className="text-xs">Giveaway</Badge>
            </div>
            <h4 className="font-semibold mb-1">Training Session Giveaway</h4>
            <p className="text-sm text-muted-foreground mb-3">Win a virtual 1-on-1 session with me</p>
            {hasEntered('training_session') ? (
              <Button size="sm" variant="secondary" className="w-full" disabled>
                <Check className="h-4 w-4 mr-1" />
                Entered
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => handleEnterContest('training_session', 'Training Session Giveaway')}
                disabled={loadingContest === 'training_session'}
              >
                {loadingContest === 'training_session' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enter Giveaway'}
              </Button>
            )}
          </article>
        </div>
      </section>

      {/* Post-Match Breakdown */}
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Post-Match Breakdown</h3>
            <p className="text-sm text-muted-foreground">My tactical insights after every match</p>
          </div>
        </div>
        <div className="space-y-4">
          <article className="p-5 bg-muted/50 rounded-xl border border-border/50">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2 text-xs">Latest</Badge>
                <h4 className="font-semibold mb-1">ATP 250 Montpellier R16 Breakdown</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  What worked: Aggressive forehand approach. What didn't: Second serve consistency. My tactical adjustment for the QF.
                </p>
                <Button size="sm" variant="outline">Watch Analysis</Button>
              </div>
            </div>
          </article>
          <article className="p-5 bg-muted/50 rounded-xl border border-border/50">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Cincinnati Open R32 Breakdown</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Playing against a big server: my return positioning and patterns that helped me break serve twice.
                </p>
                <Button size="sm" variant="outline">Watch Analysis</Button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Tournament Insider Feed */}
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Tournament Insider Feed</h3>
            <p className="text-sm text-muted-foreground">Behind-the-scenes from the tour</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <Badge variant="secondary" className="mb-2 text-xs">Travel</Badge>
            <h4 className="font-semibold mb-1">Arriving in Melbourne</h4>
            <p className="text-sm text-muted-foreground">Early morning flight, jet lag protocol, first practice session</p>
          </article>
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <Badge variant="secondary" className="mb-2 text-xs">Routine</Badge>
            <h4 className="font-semibold mb-1">Between-Match Recovery</h4>
            <p className="text-sm text-muted-foreground">Ice bath, physio, and what I eat to recover for back-to-back matches</p>
          </article>
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <Badge variant="secondary" className="mb-2 text-xs">Morning</Badge>
            <h4 className="font-semibold mb-1">5AM Warmup Routine</h4>
            <p className="text-sm text-muted-foreground">My match-day morning: activation exercises, breakfast, and mental prep</p>
          </article>
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <Badge variant="secondary" className="mb-2 text-xs">Prep</Badge>
            <h4 className="font-semibold mb-1">Racquet Stringing Session</h4>
            <p className="text-sm text-muted-foreground">Watching my stringer work - why I use 25kg tension for clay</p>
          </article>
        </div>
      </section>

      {/* Training Tips Q&A */}
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <HelpCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Training Tips Q&A</h3>
            <p className="text-sm text-muted-foreground">Ask me tennis questions - I answer selected ones</p>
          </div>
        </div>
        <div className="space-y-4">
          {/* Sample answered questions */}
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <p className="text-sm text-primary font-medium mb-2">@tennis_fan_marc asked:</p>
            <p className="font-medium mb-2">"How do you practice forehand patterns under pressure?"</p>
            <p className="text-sm text-muted-foreground italic">
              "I do repetition drills where I have to hit 10 inside-out forehands in a row to a target. If I miss, I start over. Builds focus under fatigue."
            </p>
          </article>
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <p className="text-sm text-primary font-medium mb-2">@backhand_student asked:</p>
            <p className="font-medium mb-2">"What's your secret for backhand stability on big points?"</p>
            <p className="text-sm text-muted-foreground italic">
              "Shorter backswing, earlier contact. On big points I simplify - no hero shots, just placement."
            </p>
          </article>

          {/* User's submitted questions */}
          {questions.length > 0 && (
            <div className="border-t border-border pt-4 mt-4">
              <p className="text-sm font-medium mb-3">Your Questions:</p>
              {questions.map((q, idx) => (
                <article key={idx} className="p-4 bg-primary/5 rounded-xl border border-primary/20 mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {q.status === 'pending' ? 'Pending' : q.status === 'answered' ? 'Answered' : 'Reviewed'}
                    </Badge>
                  </div>
                  <p className="font-medium text-sm mb-1">"{q.question}"</p>
                  {q.answer && (
                    <p className="text-sm text-muted-foreground italic mt-2">Arthur's answer: "{q.answer}"</p>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* Submit new question */}
          <div className="border-t border-border pt-4 mt-4">
            <p className="text-sm font-medium mb-3">Ask Arthur a Question:</p>
            <div className="space-y-3">
              <Textarea
                placeholder="Ask about forehand technique, serve strategy, mental prep, or anything tennis-related..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="min-h-[80px] resize-none"
                maxLength={500}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{newQuestion.length}/500 characters</span>
                <Button 
                  onClick={handleSubmitQuestion}
                  disabled={loadingQuestion || !newQuestion.trim()}
                >
                  {loadingQuestion ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Submit Question
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fan Challenges */}
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Fan Challenges</h3>
            <p className="text-sm text-muted-foreground">Weekly tennis drills - try them yourself!</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <Badge className="mb-2 bg-red-500/20 text-red-400 border-red-500/30 text-xs">This Week</Badge>
            <h4 className="font-semibold mb-1">Consistency Drill</h4>
            <p className="text-sm text-muted-foreground mb-3">100 crosscourt rallies without an error. Share your score!</p>
            <Button size="sm" variant="outline" className="w-full">View Drill</Button>
          </article>
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <Badge className="mb-2 bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Serve</Badge>
            <h4 className="font-semibold mb-1">Serve Accuracy Challenge</h4>
            <p className="text-sm text-muted-foreground mb-3">Hit 7/10 serves to each corner. Time yourself!</p>
            <Button size="sm" variant="outline" className="w-full">View Drill</Button>
          </article>
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <Badge className="mb-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">Footwork</Badge>
            <h4 className="font-semibold mb-1">Footwork Ladder Patterns</h4>
            <p className="text-sm text-muted-foreground mb-3">3 ladder patterns I do every warmup. Try for speed!</p>
            <Button size="sm" variant="outline" className="w-full">View Drill</Button>
          </article>
        </div>
      </section>

      {/* What's In My Bag */}
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">What's In My Bag</h3>
            <p className="text-sm text-muted-foreground">My complete racquet setup & accessories</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <h4 className="font-semibold mb-2">Racquet Setup</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Babolat Pure Aero 98 (customized)</li>
              <li>• String: RPM Blast @ 25kg</li>
              <li>• Grip: Babolat VS Original + overgrip</li>
              <li>• Weight: 320g strung</li>
            </ul>
          </article>
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <h4 className="font-semibold mb-2">Match Accessories</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Lacoste wristbands (always 2 per arm)</li>
              <li>• Dampener: yes, custom position</li>
              <li>• Spare racquets: 4 in bag</li>
              <li>• Shoes: Lacoste AG-LT23 Ultra</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Pro Tips Library */}
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Pro Tips Library</h3>
            <p className="text-sm text-muted-foreground">Bite-sized advice from my experience</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <h4 className="font-semibold mb-2">Warmup Habits</h4>
            <p className="text-sm text-muted-foreground">
              "I always start with mini-tennis for 5 minutes. It wakes up my hands and helps my timing before going deep."
            </p>
          </article>
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <h4 className="font-semibold mb-2">Hydration Routine</h4>
            <p className="text-sm text-muted-foreground">
              "I drink every changeover, even if not thirsty. Small sips. Electrolytes in hot conditions, plain water otherwise."
            </p>
          </article>
          <article className="p-4 bg-muted/50 rounded-xl border border-border/50">
            <h4 className="font-semibold mb-2">Mental Prep</h4>
            <p className="text-sm text-muted-foreground">
              "Before walking on court, I visualize my first service game. I see myself holding serve confidently."
            </p>
          </article>
        </div>
      </section>

      {/* Meet & Greet Opportunities */}
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Meet & Greet Opportunities</h3>
            <p className="text-sm text-muted-foreground">Exclusive fan experiences</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <article className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <Badge className="mb-2 bg-primary/20 text-primary border-primary/30 text-xs">Coming Soon</Badge>
            <h4 className="font-semibold mb-2">Hitting Session Giveaway</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Win a 30-minute hitting session with me at my training base in France. Travel included.
            </p>
            {hasEntered('meet_greet') ? (
              <Button size="sm" variant="secondary" className="w-full" disabled>
                <Check className="h-4 w-4 mr-1" />
                Notified
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="gold" 
                className="w-full"
                onClick={() => handleEnterContest('meet_greet', 'Hitting Session Giveaway')}
                disabled={loadingContest === 'meet_greet'}
              >
                {loadingContest === 'meet_greet' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Notify Me'}
              </Button>
            )}
          </article>
          <article className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <Badge className="mb-2 bg-primary/20 text-primary border-primary/30 text-xs">Monthly</Badge>
            <h4 className="font-semibold mb-2">Video Call Winners</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Every month, I pick 2 premium members for a 15-minute video call. Just to chat!
            </p>
            {hasEntered('video_call') ? (
              <Button size="sm" variant="secondary" className="w-full" disabled>
                <Check className="h-4 w-4 mr-1" />
                You're Entered
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="gold" 
                className="w-full"
                onClick={() => handleEnterContest('video_call', 'Monthly Video Call')}
                disabled={loadingContest === 'video_call'}
              >
                {loadingContest === 'video_call' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enter Draw'}
              </Button>
            )}
          </article>
        </div>
      </section>
    </div>
  );
};
