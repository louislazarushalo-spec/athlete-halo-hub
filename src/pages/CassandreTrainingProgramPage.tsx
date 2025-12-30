import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Dumbbell, Calendar, Target, Info, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AthleteHeader } from "@/components/layout/AthleteHeader";

// Training program images - matching the program cards
import cassandreTrainingTransition from "@/assets/cassandre-training-transition.jpg";
import cassandreTrainingRun from "@/assets/cassandre-training-run.jpg";
import cassandreTrainingSwim from "@/assets/cassandre-training-swim.jpg";
import cassandreStrength from "@/assets/cassandre-strength.jpg";

// Program image mapping
const programImages: Record<string, string> = {
  "fitness-1": cassandreTrainingTransition,
  "fitness-2": cassandreTrainingRun,
  "fitness-3": cassandreTrainingSwim,
  "fitness-4": cassandreStrength,
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
    title: "WTCS Brick Engine",
    description: "A 4-week program designed to build the explosive bike-to-run transition power that defines world-class triathlon. Structured to improve lactate clearance, leg turnover speed, and the ability to run fast on tired legs immediately off the bike.",
    category: "Fitness Program",
    stats: {
      duration: "60–90 min per session",
      exercises: "5–7",
      length: "4 weeks"
    },
    equipment: ["Bike trainer", "Running shoes", "Heart rate monitor", "Foam roller"],
    targetAreas: ["Legs", "Cardiovascular system", "Lactate threshold", "Neuromuscular adaptation"],
    weeks: [
      {
        number: 1,
        title: "Bike-Run Foundation",
        focus: "Building the base transition pattern and leg adaptation",
        exercises: [
          { name: "Easy Spin to Jog Transition", equipment: "Bike + Running shoes", thumbnail: "🚴" },
          { name: "Cadence Builds on Bike", equipment: "Bike trainer", thumbnail: "⚡" },
          { name: "Short Brick Intervals (5x)", equipment: "Bike + Running shoes", thumbnail: "🏃" },
          { name: "Hip Flexor Mobility Drills", equipment: "Bodyweight", thumbnail: "🧘" },
          { name: "Easy Recovery Spin", equipment: "Bike trainer", thumbnail: "🔄" }
        ]
      },
      {
        number: 2,
        title: "Intensity Introduction",
        focus: "Adding race-pace efforts to transition work",
        exercises: [
          { name: "Threshold Bike Intervals", equipment: "Bike trainer", thumbnail: "🔥" },
          { name: "Fast-Start Run Reps", equipment: "Running shoes", thumbnail: "💨" },
          { name: "Brick Combo: 20min Bike + 10min Run", equipment: "Bike + Running shoes", thumbnail: "🎯" },
          { name: "Leg Turnover Drills", equipment: "Bodyweight", thumbnail: "⚡" },
          { name: "Core Stability for Transition", equipment: "Bodyweight", thumbnail: "💪" }
        ]
      },
      {
        number: 3,
        title: "Race-Specific Power",
        focus: "Simulating WTCS race conditions and pace",
        exercises: [
          { name: "Race-Pace Bike Surges", equipment: "Bike trainer", thumbnail: "🚀" },
          { name: "Negative Split Run off Bike", equipment: "Bike + Running shoes", thumbnail: "🏃" },
          { name: "Multi-Brick Session", equipment: "Bike + Running shoes", thumbnail: "💥" },
          { name: "Lactate Clearance Intervals", equipment: "Bike trainer", thumbnail: "🔄" },
          { name: "Mental Toughness Run Finisher", equipment: "Running shoes", thumbnail: "🧠" }
        ]
      },
      {
        number: 4,
        title: "Peak & Race Simulation",
        focus: "Fine-tuning for race-day execution",
        exercises: [
          { name: "Full Race Simulation Brick", equipment: "Bike + Running shoes", thumbnail: "🏆" },
          { name: "Sprint Finish Practice", equipment: "Running shoes", thumbnail: "⚡" },
          { name: "Taper Brick: Quality over Volume", equipment: "Bike + Running shoes", thumbnail: "🎯" },
          { name: "Pre-Race Activation Routine", equipment: "Bodyweight", thumbnail: "✨" },
          { name: "Race Day Visualization", equipment: "None", thumbnail: "🧘" }
        ]
      }
    ]
  },
  "fitness-2": {
    title: "Run Speed & Economy",
    description: "A 4-week program focused on developing running speed and efficiency through targeted intervals and form work. Designed to sharpen your pace while maintaining smooth, economical stride mechanics.",
    category: "Fitness Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "5–6",
      length: "4 weeks"
    },
    equipment: ["Running shoes", "Track or flat road", "Heart rate monitor", "Stopwatch"],
    targetAreas: ["Running economy", "Speed", "Stride mechanics", "Aerobic capacity"],
    weeks: [
      {
        number: 1,
        title: "Form & Foundation",
        focus: "Establishing efficient running mechanics",
        exercises: [
          { name: "Running Drills Circuit", equipment: "Bodyweight", thumbnail: "🏃" },
          { name: "Easy Pace Technique Runs", equipment: "Running shoes", thumbnail: "👟" },
          { name: "Strides x 6", equipment: "Track", thumbnail: "⚡" },
          { name: "Cadence Awareness Work", equipment: "Running shoes", thumbnail: "🎵" },
          { name: "Post-Run Mobility", equipment: "Bodyweight", thumbnail: "🧘" }
        ]
      },
      {
        number: 2,
        title: "Speed Introduction",
        focus: "Building speed while maintaining form",
        exercises: [
          { name: "200m Repeats x 8", equipment: "Track", thumbnail: "🔥" },
          { name: "Tempo Run Segments", equipment: "Running shoes", thumbnail: "💨" },
          { name: "Hill Sprints x 6", equipment: "Running shoes", thumbnail: "⛰️" },
          { name: "Leg Speed Drills", equipment: "Bodyweight", thumbnail: "⚡" },
          { name: "Cool Down & Stretch", equipment: "Bodyweight", thumbnail: "🧘" }
        ]
      },
      {
        number: 3,
        title: "Interval Power",
        focus: "Peak speed development",
        exercises: [
          { name: "400m Repeats x 6", equipment: "Track", thumbnail: "🚀" },
          { name: "Fartlek Session", equipment: "Running shoes", thumbnail: "🎯" },
          { name: "Over-Speed Downhill Strides", equipment: "Running shoes", thumbnail: "💨" },
          { name: "1km Tempo Repeats x 3", equipment: "Running shoes", thumbnail: "🔥" },
          { name: "Recovery Jog", equipment: "Running shoes", thumbnail: "🔄" }
        ]
      },
      {
        number: 4,
        title: "Race Sharpening",
        focus: "Fine-tuning for race execution",
        exercises: [
          { name: "Race Pace 3km Time Trial", equipment: "Track", thumbnail: "🏆" },
          { name: "Short Sharp Strides", equipment: "Running shoes", thumbnail: "⚡" },
          { name: "Easy Aerobic Runs", equipment: "Running shoes", thumbnail: "🌊" },
          { name: "Pre-Race Activation", equipment: "Bodyweight", thumbnail: "✨" },
          { name: "Mental Race Preparation", equipment: "None", thumbnail: "🧠" }
        ]
      }
    ]
  },
  "fitness-3": {
    title: "Swim Aerobic Builder",
    description: "A 4-week swimming program designed to build aerobic endurance and maintain form under fatigue. Perfect for developing the swim fitness needed to lead or stay in the front pack.",
    category: "Fitness Program",
    stats: {
      duration: "60–75 min per session",
      exercises: "4–6 sets",
      length: "4 weeks"
    },
    equipment: ["Pool access", "Pull buoy", "Paddles", "Kickboard", "Fins"],
    targetAreas: ["Swim endurance", "Stroke efficiency", "Pacing", "Aerobic base"],
    weeks: [
      {
        number: 1,
        title: "Aerobic Base Building",
        focus: "Establishing steady-state swimming fitness",
        exercises: [
          { name: "Continuous 1500m Swim", equipment: "Pool", thumbnail: "🏊" },
          { name: "100m Repeats x 10 @ Easy Pace", equipment: "Pool", thumbnail: "🔄" },
          { name: "Technique Focus Drills", equipment: "Pool", thumbnail: "🎯" },
          { name: "Pull Set with Buoy", equipment: "Pull buoy", thumbnail: "💪" },
          { name: "Easy Cool Down", equipment: "Pool", thumbnail: "🌊" }
        ]
      },
      {
        number: 2,
        title: "Volume Progression",
        focus: "Increasing distance while maintaining form",
        exercises: [
          { name: "2000m Continuous Swim", equipment: "Pool", thumbnail: "🏊" },
          { name: "200m Repeats x 6", equipment: "Pool", thumbnail: "🔥" },
          { name: "Paddles Power Set", equipment: "Paddles", thumbnail: "💪" },
          { name: "Kick Set for Legs", equipment: "Kickboard", thumbnail: "🦵" },
          { name: "Descending 400s x 4", equipment: "Pool", thumbnail: "📉" }
        ]
      },
      {
        number: 3,
        title: "Threshold Development",
        focus: "Building race-pace sustainability",
        exercises: [
          { name: "Threshold 400m x 5", equipment: "Pool", thumbnail: "🚀" },
          { name: "Negative Split 800m x 2", equipment: "Pool", thumbnail: "📈" },
          { name: "Race-Pace 100m Repeats", equipment: "Pool", thumbnail: "⚡" },
          { name: "Fins Speed Work", equipment: "Fins", thumbnail: "💨" },
          { name: "Long Aerobic Swim 2500m", equipment: "Pool", thumbnail: "🏊" }
        ]
      },
      {
        number: 4,
        title: "Race Readiness",
        focus: "Peak fitness and race simulation",
        exercises: [
          { name: "Race Simulation 1500m", equipment: "Pool", thumbnail: "🏆" },
          { name: "Fast 50m Repeats x 10", equipment: "Pool", thumbnail: "⚡" },
          { name: "Open Water Simulation", equipment: "Pool", thumbnail: "🌊" },
          { name: "Taper Technique Focus", equipment: "Pool", thumbnail: "🎯" },
          { name: "Pre-Race Swim Activation", equipment: "Pool", thumbnail: "✨" }
        ]
      }
    ]
  },
  "fitness-4": {
    title: "Strength for Durability",
    description: "A 4-week strength program designed to build resilience and prevent injury through the demanding triathlon season. Simple, effective exercises that support performance across all three disciplines.",
    category: "Fitness Program",
    stats: {
      duration: "40–50 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Dumbbells", "Resistance bands", "Kettlebell", "Bodyweight"],
    targetAreas: ["Core stability", "Hip strength", "Shoulder durability", "Leg power"],
    weeks: [
      {
        number: 1,
        title: "Foundation Strength",
        focus: "Building base strength and movement patterns",
        exercises: [
          { name: "Goblet Squats", equipment: "Kettlebell", thumbnail: "🏋️" },
          { name: "Dead Bug Variations", equipment: "Bodyweight", thumbnail: "🦎" },
          { name: "Single-Leg RDL", equipment: "Dumbbells", thumbnail: "🦵" },
          { name: "Push-Up Progressions", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Band Pull-Aparts", equipment: "Resistance bands", thumbnail: "🎯" },
          { name: "Plank Holds", equipment: "Bodyweight", thumbnail: "⏱️" }
        ]
      },
      {
        number: 2,
        title: "Load Progression",
        focus: "Increasing resistance and complexity",
        exercises: [
          { name: "Bulgarian Split Squats", equipment: "Dumbbells", thumbnail: "🔥" },
          { name: "Pallof Press", equipment: "Resistance bands", thumbnail: "💪" },
          { name: "Hip Thrusts", equipment: "Bodyweight", thumbnail: "🍑" },
          { name: "Rows & Pulls", equipment: "Dumbbells", thumbnail: "🎯" },
          { name: "Shoulder Stability Circuit", equipment: "Resistance bands", thumbnail: "💫" },
          { name: "Side Plank Series", equipment: "Bodyweight", thumbnail: "⏱️" }
        ]
      },
      {
        number: 3,
        title: "Power & Stability",
        focus: "Adding dynamic movements and power",
        exercises: [
          { name: "Jump Squats", equipment: "Bodyweight", thumbnail: "🚀" },
          { name: "Kettlebell Swings", equipment: "Kettlebell", thumbnail: "💥" },
          { name: "Step-Up to Balance", equipment: "Dumbbells", thumbnail: "⚖️" },
          { name: "Push Press", equipment: "Dumbbells", thumbnail: "💪" },
          { name: "Core Anti-Rotation Work", equipment: "Resistance bands", thumbnail: "🔄" },
          { name: "Single-Leg Stability", equipment: "Bodyweight", thumbnail: "🦵" }
        ]
      },
      {
        number: 4,
        title: "Maintenance & Resilience",
        focus: "Sustainable strength for racing",
        exercises: [
          { name: "Full-Body Circuit", equipment: "Mixed", thumbnail: "🏆" },
          { name: "Mobility & Activation Combo", equipment: "Bodyweight", thumbnail: "🧘" },
          { name: "Light Power Work", equipment: "Kettlebell", thumbnail: "⚡" },
          { name: "Shoulder Health Routine", equipment: "Resistance bands", thumbnail: "💫" },
          { name: "Core Endurance Set", equipment: "Bodyweight", thumbnail: "⏱️" },
          { name: "Recovery Stretching", equipment: "Bodyweight", thumbnail: "🌊" }
        ]
      }
    ]
  }
};

// Default program for any program ID not found
const defaultProgram: ProgramData = programsData["fitness-1"];

export default function CassandreTrainingProgramPage() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { isSubscribed } = useSubscription();
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]);
  const [programStarted, setProgramStarted] = useState(false);

  const isPremiumSubscribed = isSubscribed("cassandre-beaugrand");
  const programData = programId ? programsData[programId] || defaultProgram : defaultProgram;
  const bannerImage = programId ? programImages[programId] || cassandreTrainingTransition : cassandreTrainingTransition;

  // Redirect non-premium users
  useEffect(() => {
    if (!isPremiumSubscribed) {
      navigate(`/athlete/cassandre-beaugrand`);
    }
  }, [isPremiumSubscribed, navigate]);

  const toggleWeek = (weekNum: number) => {
    setOpenWeeks(prev => 
      prev.includes(weekNum) 
        ? prev.filter(w => w !== weekNum)
        : [...prev, weekNum]
    );
  };

  const handleStartProgram = () => {
    setProgramStarted(true);
  };

  if (!isPremiumSubscribed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Premium Content</h2>
          <p className="text-muted-foreground mb-4">Subscribe to access this training program</p>
          <Button onClick={() => navigate(`/subscribe/cassandre-beaugrand`)}>
            Unlock Premium
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <AthleteHeader />
      
      {/* Banner Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img 
          src={bannerImage} 
          alt={programData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/50 backdrop-blur-sm hover:bg-background/70"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Banner Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Badge className="mb-3 bg-primary/90">{programData.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl">
            {programData.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
            {programData.description}
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center bg-muted/30 border-border/50">
            <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="font-semibold">{programData.stats.duration}</p>
          </Card>
          <Card className="p-4 text-center bg-muted/30 border-border/50">
            <Dumbbell className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Exercises</p>
            <p className="font-semibold">{programData.stats.exercises} per session</p>
          </Card>
          <Card className="p-4 text-center bg-muted/30 border-border/50">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Program Length</p>
            <p className="font-semibold">{programData.stats.length}</p>
          </Card>
        </div>

        {/* Equipment & Target Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card className="p-6 bg-muted/20 border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Equipment Needed</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.equipment.map((item) => (
                <Badge key={item} variant="secondary" className="px-3 py-1">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-muted/20 border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Target Areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.targetAreas.map((area) => (
                <Badge key={area} variant="outline" className="px-3 py-1 border-primary/50 text-primary">
                  {area}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Weekly Breakdown */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Weekly Breakdown</h2>
          <div className="space-y-4">
            {programData.weeks.map((week) => (
              <Collapsible 
                key={week.number}
                open={openWeeks.includes(week.number)}
                onOpenChange={() => toggleWeek(week.number)}
              >
                <Card className="overflow-hidden border-border/50">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="text-left">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                            Week {week.number}
                          </span>
                          <h3 className="font-semibold">{week.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{week.focus}</p>
                      </div>
                      {openWeeks.includes(week.number) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-5 pb-5 pt-2 border-t border-border/50">
                      <div className="grid gap-3">
                        {week.exercises.map((exercise, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl">
                              {exercise.thumbnail}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{exercise.name}</p>
                              <p className="text-xs text-muted-foreground">{exercise.equipment}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Info className="h-4 w-4" />
                            </Button>
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border/50">
        <div className="container mx-auto max-w-lg">
          <Button 
            variant="gold" 
            size="lg" 
            className="w-full text-base font-semibold"
            onClick={handleStartProgram}
          >
            {programStarted ? "Resume Program" : "Start Week 1"}
          </Button>
        </div>
      </div>
    </div>
  );
}
