import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Dumbbell, Calendar, Target, Info, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AthleteHeader } from "@/components/layout/AthleteHeader";

// Import all program images
import fitness1 from "@/assets/tommy-fitness-1.jpg";
import fitness2 from "@/assets/tommy-fitness-2.jpg";
import fitness3 from "@/assets/tommy-fitness-3.jpg";
import fitness4 from "@/assets/tommy-fitness-4.jpg";

// Program image mapping
const programImages: Record<string, string> = {
  "fitness-1": fitness1,
  "fitness-2": fitness2,
  "fitness-3": fitness3,
  "fitness-4": fitness4,
};

interface Exercise {
  name: string;
  equipment: string;
  thumbnail: string;
}

interface Week {
  number: number;
  title: string;
  focus: string;
  exercises: Exercise[];
}

interface ProgramData {
  title: string;
  description: string;
  category: string;
  stats: {
    duration: string;
    exercises: string;
    length: string;
  };
  equipment: string[];
  targetAreas: string[];
  weeks: Week[];
}

const programsData: Record<string, ProgramData> = {
  "fitness-1": {
    title: "Iron Play Precision",
    description: "A 4-week program designed to develop the consistency, timing, and technique needed for tour-level iron shots. Build the ball-striking foundation that allows you to attack pins and control trajectory.",
    category: "Skills Program",
    stats: {
      duration: "60–90 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Irons (6-PW)", "Range balls", "Alignment sticks", "Impact bag"],
    targetAreas: ["Ball striking", "Trajectory control", "Distance consistency", "Spin management"],
    weeks: [
      {
        number: 1,
        title: "Foundation & Setup",
        focus: "Building consistent setup and ball position for pure contact",
        exercises: [
          { name: "Address Position Fundamentals", equipment: "Alignment sticks", thumbnail: "⛳" },
          { name: "Ball Position Mapping", equipment: "Irons", thumbnail: "🎯" },
          { name: "Weight Distribution Drills", equipment: "Bodyweight", thumbnail: "⚖️" },
          { name: "Grip Pressure Awareness", equipment: "Irons", thumbnail: "✋" },
          { name: "Pre-Shot Routine Development", equipment: "All clubs", thumbnail: "🧠" },
          { name: "Static Impact Position Holds", equipment: "Impact bag", thumbnail: "💪" }
        ]
      },
      {
        number: 2,
        title: "Contact Quality",
        focus: "Developing center-face contact and compression",
        exercises: [
          { name: "Strike Location Feedback", equipment: "Impact tape", thumbnail: "🎯" },
          { name: "Half-Swing Compression Drills", equipment: "7-iron", thumbnail: "⚡" },
          { name: "Descending Blow Practice", equipment: "Alignment sticks", thumbnail: "📐" },
          { name: "Divot Pattern Analysis", equipment: "Practice range", thumbnail: "👁️" },
          { name: "Slow Motion Impact Training", equipment: "Irons", thumbnail: "🐢" },
          { name: "Punch Shot Sequences", equipment: "8-iron", thumbnail: "💥" }
        ]
      },
      {
        number: 3,
        title: "Trajectory & Distance Control",
        focus: "Managing ball flight and yardage gaps",
        exercises: [
          { name: "Low-Mid-High Shot Ladder", equipment: "7-iron", thumbnail: "📊" },
          { name: "Three-Quarter Swing Calibration", equipment: "All irons", thumbnail: "⚙️" },
          { name: "Wind Adjustment Practice", equipment: "Irons", thumbnail: "💨" },
          { name: "Yardage Gap Testing", equipment: "All irons", thumbnail: "📏" },
          { name: "Fade & Draw Shaping", equipment: "6-iron", thumbnail: "↗️" },
          { name: "Knockdown Shot Mastery", equipment: "8-iron", thumbnail: "⬇️" }
        ]
      },
      {
        number: 4,
        title: "Course Application",
        focus: "Translating range work to on-course performance",
        exercises: [
          { name: "Pin Attack Simulations", equipment: "Irons", thumbnail: "🏆" },
          { name: "Variable Lie Practice", equipment: "Practice area", thumbnail: "⛳" },
          { name: "Pressure Shot Scenarios", equipment: "Irons", thumbnail: "💪" },
          { name: "First-Shot Execution", equipment: "All irons", thumbnail: "1️⃣" },
          { name: "18-Hole Simulation Round", equipment: "Full bag", thumbnail: "🎯" }
        ]
      }
    ]
  },
  "fitness-2": {
    title: "Short Game Secrets",
    description: "A 4-week deep dive into chipping, pitching, and bunker play. Learn the techniques I use to get up and down from anywhere and save strokes around the green.",
    category: "Skills Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "8–10",
      length: "4 weeks"
    },
    equipment: ["Wedges (52°, 56°, 60°)", "Chipping net", "Bunker", "Practice green"],
    targetAreas: ["Chipping technique", "Pitch shot variety", "Bunker play", "Distance control"],
    weeks: [
      {
        number: 1,
        title: "Chipping Fundamentals",
        focus: "Building a reliable, repeatable chip technique",
        exercises: [
          { name: "Bump & Run Basics", equipment: "52° wedge", thumbnail: "⛳" },
          { name: "Club Selection Strategy", equipment: "All wedges", thumbnail: "🎯" },
          { name: "Landing Spot Focus", equipment: "Practice green", thumbnail: "👁️" },
          { name: "Hands-Forward Contact", equipment: "56° wedge", thumbnail: "✋" },
          { name: "One-Lever Chipping Drill", equipment: "Wedges", thumbnail: "📐" },
          { name: "Roll-Out Prediction Practice", equipment: "Practice green", thumbnail: "🔮" }
        ]
      },
      {
        number: 2,
        title: "Pitch Shot Mastery",
        focus: "Developing variety and touch on pitch shots",
        exercises: [
          { name: "30-50-70 Yard Calibration", equipment: "56° wedge", thumbnail: "📏" },
          { name: "High Soft Landing Practice", equipment: "60° wedge", thumbnail: "⬆️" },
          { name: "Low Running Pitch", equipment: "52° wedge", thumbnail: "⬇️" },
          { name: "Clock Face Distance Control", equipment: "All wedges", thumbnail: "🕐" },
          { name: "Spin Rate Management", equipment: "Practice green", thumbnail: "🔄" },
          { name: "Awkward Lie Adaptations", equipment: "Wedges", thumbnail: "⚡" }
        ]
      },
      {
        number: 3,
        title: "Bunker Expertise",
        focus: "Conquering greenside sand with confidence",
        exercises: [
          { name: "Explosion Shot Technique", equipment: "56° wedge", thumbnail: "💥" },
          { name: "Open Face Fundamentals", equipment: "60° wedge", thumbnail: "📐" },
          { name: "Sand Depth Control", equipment: "Bunker", thumbnail: "🏖️" },
          { name: "Uphill & Downhill Lies", equipment: "Bunker", thumbnail: "⛰️" },
          { name: "Long Bunker Shot Practice", equipment: "52° wedge", thumbnail: "📏" },
          { name: "Buried Lie Recovery", equipment: "56° wedge", thumbnail: "🔥" }
        ]
      },
      {
        number: 4,
        title: "Scoring Zone Integration",
        focus: "Putting it all together for lower scores",
        exercises: [
          { name: "Up & Down Challenges", equipment: "Full wedge set", thumbnail: "🏆" },
          { name: "Random Lie Practice", equipment: "Practice area", thumbnail: "🎲" },
          { name: "Pressure Putting After Chip", equipment: "Putter + wedges", thumbnail: "💪" },
          { name: "9-Hole Short Game Scramble", equipment: "Full short game set", thumbnail: "⛳" },
          { name: "Competition Scoring Drills", equipment: "All equipment", thumbnail: "🎯" }
        ]
      }
    ]
  },
  "fitness-3": {
    title: "Putting Masterclass",
    description: "A 4-week program to transform your putting. Learn to read greens, develop a repeatable stroke, and drain more putts under pressure. The fastest way to lower your scores.",
    category: "Skills Program",
    stats: {
      duration: "30–45 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Putter", "Practice green", "Putting mirror", "Alignment aids"],
    targetAreas: ["Green reading", "Stroke mechanics", "Speed control", "Pressure putting"],
    weeks: [
      {
        number: 1,
        title: "Stroke Fundamentals",
        focus: "Building a mechanically sound, repeatable stroke",
        exercises: [
          { name: "Grip & Setup Assessment", equipment: "Putting mirror", thumbnail: "👁️" },
          { name: "Eye Line Positioning", equipment: "Mirror", thumbnail: "👀" },
          { name: "Pendulum Motion Development", equipment: "Putter", thumbnail: "🔄" },
          { name: "Face Angle Control", equipment: "Alignment aids", thumbnail: "📐" },
          { name: "Tempo & Rhythm Drills", equipment: "Putter", thumbnail: "🎵" },
          { name: "Impact Quality Focus", equipment: "Practice green", thumbnail: "💥" }
        ]
      },
      {
        number: 2,
        title: "Speed Control",
        focus: "Mastering distance control on all putts",
        exercises: [
          { name: "Lag Putt Ladders", equipment: "Practice green", thumbnail: "📏" },
          { name: "Gate Speed Drill", equipment: "Tees", thumbnail: "⛳" },
          { name: "Uphill/Downhill Feel", equipment: "Practice green", thumbnail: "⛰️" },
          { name: "Die vs. Ram Speed Practice", equipment: "Putter", thumbnail: "💨" },
          { name: "Eyes Closed Distance Feel", equipment: "Practice green", thumbnail: "🙈" },
          { name: "30-Footer Touch Development", equipment: "Practice green", thumbnail: "🎯" }
        ]
      },
      {
        number: 3,
        title: "Green Reading Mastery",
        focus: "Learning to see and trust the correct line",
        exercises: [
          { name: "Fall Line Identification", equipment: "Practice green", thumbnail: "📐" },
          { name: "Low Point Reading", equipment: "Practice green", thumbnail: "👁️" },
          { name: "Grain Effect Understanding", equipment: "Practice green", thumbnail: "🌿" },
          { name: "Break Visualization Drills", equipment: "Putter", thumbnail: "🧠" },
          { name: "AimPoint Fundamentals", equipment: "Hands", thumbnail: "☝️" },
          { name: "Commit & Execute Practice", equipment: "Practice green", thumbnail: "✅" }
        ]
      },
      {
        number: 4,
        title: "Pressure Performance",
        focus: "Putting your best when it matters most",
        exercises: [
          { name: "3-Foot Circle Mastery", equipment: "Practice green", thumbnail: "🏆" },
          { name: "Make 10 in a Row Challenge", equipment: "Putter", thumbnail: "🔥" },
          { name: "First Putt Focus Drill", equipment: "Practice green", thumbnail: "1️⃣" },
          { name: "Competition Putting Games", equipment: "Practice green", thumbnail: "🎮" },
          { name: "Pre-Round Routine Practice", equipment: "All equipment", thumbnail: "📋" }
        ]
      }
    ]
  },
  "fitness-4": {
    title: "Course Management",
    description: "A 4-week strategic program focused on smart decision-making, shot selection, and mental approach. Learn to play smarter golf and shoot lower scores without changing your swing.",
    category: "Mental Program",
    stats: {
      duration: "On-course & analysis sessions",
      exercises: "5–7 concepts",
      length: "4 weeks"
    },
    equipment: ["Full bag", "Course access", "Notebook", "Shot tracking app"],
    targetAreas: ["Decision making", "Risk assessment", "Mental approach", "Score management"],
    weeks: [
      {
        number: 1,
        title: "Tee Shot Strategy",
        focus: "Making smart decisions off the tee",
        exercises: [
          { name: "Target Zone Mapping", equipment: "Notebook", thumbnail: "🗺️" },
          { name: "Miss Pattern Analysis", equipment: "Shot tracker", thumbnail: "📊" },
          { name: "Driver vs. Iron Decision Framework", equipment: "Full bag", thumbnail: "🤔" },
          { name: "Penalty Avoidance Planning", equipment: "Course map", thumbnail: "⚠️" },
          { name: "Angle of Attack Selection", equipment: "Full bag", thumbnail: "📐" }
        ]
      },
      {
        number: 2,
        title: "Approach Shot Selection",
        focus: "Attacking pins wisely and managing misses",
        exercises: [
          { name: "Pin Position Assessment", equipment: "Course", thumbnail: "🎯" },
          { name: "Miss Side Selection", equipment: "Yardage book", thumbnail: "↔️" },
          { name: "Yardage Verification Habits", equipment: "Rangefinder", thumbnail: "📏" },
          { name: "Elevation & Wind Adjustments", equipment: "Notebook", thumbnail: "💨" },
          { name: "Safe Zone Targeting", equipment: "Course", thumbnail: "✅" }
        ]
      },
      {
        number: 3,
        title: "Scoring Situations",
        focus: "Maximizing opportunities and minimizing damage",
        exercises: [
          { name: "Par-5 Strategy Optimization", equipment: "Course", thumbnail: "🦅" },
          { name: "Short Par-4 Attack Plans", equipment: "Full bag", thumbnail: "⚡" },
          { name: "Bogey Avoidance Mindset", equipment: "Mental", thumbnail: "🧠" },
          { name: "Up & Down Conversion Focus", equipment: "Short game", thumbnail: "💪" },
          { name: "Birdie Hole Identification", equipment: "Course analysis", thumbnail: "🔥" }
        ]
      },
      {
        number: 4,
        title: "Competitive Mindset",
        focus: "Managing pressure and making clutch decisions",
        exercises: [
          { name: "First Tee Nerves Management", equipment: "Mental", thumbnail: "😤" },
          { name: "Recovery Shot Mentality", equipment: "Course", thumbnail: "🔄" },
          { name: "Closing Holes Strategy", equipment: "Full bag", thumbnail: "🏁" },
          { name: "Score Awareness Balance", equipment: "Mental", thumbnail: "⚖️" },
          { name: "Post-Round Analysis Routine", equipment: "Notebook", thumbnail: "📝" }
        ]
      }
    ]
  }
};

const defaultProgram: ProgramData = {
  title: "Golf Training Program",
  description: "A comprehensive program to elevate your golf game.",
  category: "Program",
  stats: {
    duration: "45–60 min per session",
    exercises: "6–8",
    length: "4 weeks"
  },
  equipment: ["Golf clubs", "Practice facility"],
  targetAreas: ["Technique", "Consistency", "Scoring"],
  weeks: []
};

const TommyTrainingProgramPage = () => {
  const navigate = useNavigate();
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]);
  const { programId } = useParams<{ programId: string }>();
  const { isSubscribed } = useSubscription();
  const [programStarted, setProgramStarted] = useState(false);

  const isPremiumSubscribed = isSubscribed("tommy-fleetwood");
  const programData = programId ? (programsData[programId] || defaultProgram) : defaultProgram;
  const bannerImage = programId ? (programImages[programId] || fitness1) : fitness1;

  useEffect(() => {
    if (!isPremiumSubscribed) {
      navigate(`/subscribe/tommy-fleetwood`);
    }
  }, [isPremiumSubscribed, navigate]);

  const toggleWeek = (weekNum: number) => {
    setOpenWeeks((prev) =>
      prev.includes(weekNum)
        ? prev.filter((w) => w !== weekNum)
        : [...prev, weekNum]
    );
  };

  const handleStartProgram = () => {
    setProgramStarted(true);
  };

  if (!isPremiumSubscribed) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AthleteHeader />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Premium Content</h2>
            <p className="text-muted-foreground mb-4">
              Subscribe to Tommy's Halo to access this training program.
            </p>
            <Button onClick={() => navigate(`/subscribe/tommy-fleetwood`)}>
              Subscribe Now
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AthleteHeader />

      {/* Banner */}
      <div className="relative h-[340px] w-full overflow-hidden">
        <img
          src={bannerImage}
          alt={programData.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-full z-10"
          onClick={() => navigate(`/athlete/tommy-fleetwood?tab=training`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Program Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge className="mb-2 bg-primary/90">{programData.category}</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{programData.title}</h1>
          <p className="text-muted-foreground max-w-2xl">{programData.description}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm">{programData.stats.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-primary" />
              <span className="text-sm">{programData.stats.exercises} exercises</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm">{programData.stats.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Equipment & Target Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Equipment Needed</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.equipment.map((item, i) => (
                <Badge key={i} variant="secondary">{item}</Badge>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Target Areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.targetAreas.map((area, i) => (
                <Badge key={i} variant="outline">{area}</Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Weekly Breakdown */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-4 w-4 text-primary" />
            <h2 className="font-display text-xl font-semibold">Weekly Breakdown</h2>
          </div>

          <div className="space-y-3">
            {programData.weeks.map((week) => (
              <Collapsible
                key={week.number}
                open={openWeeks.includes(week.number)}
                onOpenChange={() => toggleWeek(week.number)}
              >
                <Card className="overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{week.number}</span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">{week.title}</h3>
                          <p className="text-sm text-muted-foreground">{week.focus}</p>
                        </div>
                      </div>
                      {openWeeks.includes(week.number) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-2 border-t border-border">
                      <div className="grid gap-2">
                        {week.exercises.map((exercise, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-lg">
                              {exercise.thumbnail}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{exercise.name}</h4>
                              <p className="text-xs text-muted-foreground">{exercise.equipment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="max-w-4xl mx-auto">
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleStartProgram}
          >
            {programStarted ? "Continue Program" : "Start Program"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TommyTrainingProgramPage;
