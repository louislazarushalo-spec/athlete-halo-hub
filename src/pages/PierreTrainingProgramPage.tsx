import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Dumbbell, Calendar, Target, Info, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AthleteHeader } from "@/components/layout/AthleteHeader";

// Training program images
import pierreFitness1 from "@/assets/pierre-fitness-1.jpg";
import pierreFitness2 from "@/assets/pierre-fitness-2.jpg";
import pierreFitness3 from "@/assets/pierre-fitness-3.png";
import pierreFitness4 from "@/assets/pierre-fitness-4.jpg";

// Program image mapping
const programImages: Record<string, string> = {
  "fitness-1": pierreFitness1,
  "fitness-2": pierreFitness2,
  "fitness-3": pierreFitness3,
  "fitness-4": pierreFitness4,
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
    title: "Neck & Core Strengthening",
    description: "A 4-week program designed to build the neck and core strength essential for handling 5G+ forces during high-speed cornering and heavy braking. F1 drivers experience forces that pull the head sideways and forward—this routine prepares you for the demands of the cockpit.",
    category: "Fitness Program",
    stats: {
      duration: "45–60 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Neck harness", "Resistance bands", "Medicine ball", "Cable machine", "Stability ball"],
    targetAreas: ["Neck muscles", "Core stability", "Trap development", "Spinal erectors"],
    weeks: [
      {
        number: 1,
        title: "Foundation Building",
        focus: "Establishing base neck and core strength with controlled movements",
        exercises: [
          { name: "Neck Flexion/Extension Holds", equipment: "Resistance band", thumbnail: "🔥" },
          { name: "Isometric Lateral Neck Holds", equipment: "Bodyweight", thumbnail: "💪" },
          { name: "Dead Bug Progressions", equipment: "Bodyweight", thumbnail: "🦎" },
          { name: "Pallof Press", equipment: "Cable machine", thumbnail: "🎯" },
          { name: "Plank Variations", equipment: "Bodyweight", thumbnail: "⏱️" },
          { name: "Bird Dog Holds", equipment: "Bodyweight", thumbnail: "🐕" }
        ]
      },
      {
        number: 2,
        title: "Resistance Progression",
        focus: "Adding load and multi-directional neck work",
        exercises: [
          { name: "Neck Harness Flexion", equipment: "Neck harness", thumbnail: "🏋️" },
          { name: "Lateral Neck Raises", equipment: "Neck harness", thumbnail: "💪" },
          { name: "Medicine Ball Rotations", equipment: "Medicine ball", thumbnail: "🔄" },
          { name: "Cable Anti-Rotation", equipment: "Cable machine", thumbnail: "🎯" },
          { name: "Stability Ball Rollouts", equipment: "Stability ball", thumbnail: "⚡" },
          { name: "Farmers Walk", equipment: "Dumbbells", thumbnail: "🚶" }
        ]
      },
      {
        number: 3,
        title: "G-Force Simulation",
        focus: "Replicating cockpit forces with dynamic movements",
        exercises: [
          { name: "Neck Circuit Training", equipment: "Neck harness", thumbnail: "🔥" },
          { name: "Rapid Head Movements", equipment: "Resistance band", thumbnail: "⚡" },
          { name: "Weighted Plank Holds", equipment: "Weight plate", thumbnail: "🏋️" },
          { name: "Cable Woodchops", equipment: "Cable machine", thumbnail: "💥" },
          { name: "Stability Ball Pike", equipment: "Stability ball", thumbnail: "🎯" },
          { name: "Hanging Leg Raises", equipment: "Pull-up bar", thumbnail: "💪" }
        ]
      },
      {
        number: 4,
        title: "Race Readiness",
        focus: "Peak strength and endurance for race conditions",
        exercises: [
          { name: "Full Neck Endurance Circuit", equipment: "Neck harness", thumbnail: "🏆" },
          { name: "Simulated G-Force Holds", equipment: "Resistance band", thumbnail: "🚀" },
          { name: "Core Endurance Finisher", equipment: "Mixed", thumbnail: "⏱️" },
          { name: "Anti-Extension Holds", equipment: "Stability ball", thumbnail: "💪" },
          { name: "Race Simulation Core Work", equipment: "Bodyweight", thumbnail: "🎯" },
          { name: "Recovery Stretching", equipment: "Bodyweight", thumbnail: "🧘" }
        ]
      }
    ]
  },
  "fitness-2": {
    title: "Cardiovascular Endurance Training",
    description: "A 4-week cardio program built for the unique demands of F1 racing. Drivers maintain heart rates of 150-170 BPM for nearly two hours while making split-second decisions. This program builds the aerobic base and heat tolerance needed to stay sharp from lights out to checkered flag.",
    category: "Fitness Program",
    stats: {
      duration: "60–90 min per session",
      exercises: "4–6",
      length: "4 weeks"
    },
    equipment: ["Cycling bike", "Rowing machine", "Treadmill", "Heart rate monitor", "Sauna access"],
    targetAreas: ["Aerobic capacity", "Heart rate recovery", "Heat tolerance", "Mental endurance"],
    weeks: [
      {
        number: 1,
        title: "Aerobic Base Building",
        focus: "Establishing steady-state cardio foundation",
        exercises: [
          { name: "Zone 2 Cycling", equipment: "Cycling bike", thumbnail: "🚴" },
          { name: "Easy Rowing Intervals", equipment: "Rowing machine", thumbnail: "🚣" },
          { name: "Incline Treadmill Walk", equipment: "Treadmill", thumbnail: "🚶" },
          { name: "Heart Rate Zone Training", equipment: "HR monitor", thumbnail: "❤️" },
          { name: "Active Recovery Sessions", equipment: "Mixed", thumbnail: "🔄" }
        ]
      },
      {
        number: 2,
        title: "Intensity Introduction",
        focus: "Adding interval work to build race-pace fitness",
        exercises: [
          { name: "Threshold Cycling Intervals", equipment: "Cycling bike", thumbnail: "🔥" },
          { name: "Rowing 500m Repeats", equipment: "Rowing machine", thumbnail: "💨" },
          { name: "Tempo Run Segments", equipment: "Treadmill", thumbnail: "🏃" },
          { name: "Heart Rate Variability Work", equipment: "HR monitor", thumbnail: "📈" },
          { name: "Heat Exposure Introduction", equipment: "Sauna", thumbnail: "🌡️" }
        ]
      },
      {
        number: 3,
        title: "Race Simulation Cardio",
        focus: "Replicating the 90-minute race cardiovascular demand",
        exercises: [
          { name: "90-Minute Endurance Ride", equipment: "Cycling bike", thumbnail: "🚀" },
          { name: "Rowing Race Pace", equipment: "Rowing machine", thumbnail: "🏆" },
          { name: "Variable Intensity Running", equipment: "Treadmill", thumbnail: "⚡" },
          { name: "Sauna Heat Training", equipment: "Sauna", thumbnail: "🔥" },
          { name: "Cognitive Load Training", equipment: "Mixed", thumbnail: "🧠" }
        ]
      },
      {
        number: 4,
        title: "Peak Performance Week",
        focus: "Sharpening fitness for race weekend readiness",
        exercises: [
          { name: "Race Simulation Circuit", equipment: "Mixed", thumbnail: "🏎️" },
          { name: "Recovery Cardio Sessions", equipment: "Cycling bike", thumbnail: "🌊" },
          { name: "Final Heat Adaptation", equipment: "Sauna", thumbnail: "🌡️" },
          { name: "Race Day Activation", equipment: "Bodyweight", thumbnail: "✨" },
          { name: "Mental Focus Training", equipment: "None", thumbnail: "🎯" }
        ]
      }
    ]
  },
  "fitness-3": {
    title: "Reaction Time & Reflexes",
    description: "A 4-week program focused on sharpening the split-second reactions essential for wheel-to-wheel racing. From race starts to avoiding incidents, F1 drivers need reactions measured in hundredths of a second. This routine trains your nervous system for lightning-fast responses.",
    category: "Fitness Program",
    stats: {
      duration: "40–50 min per session",
      exercises: "6–8",
      length: "4 weeks"
    },
    equipment: ["Reaction lights", "Tennis balls", "Agility ladder", "Balance board", "Eye tracking device"],
    targetAreas: ["Visual processing", "Hand-eye coordination", "Peripheral awareness", "Decision speed"],
    weeks: [
      {
        number: 1,
        title: "Neural Activation",
        focus: "Awakening the nervous system for speed",
        exercises: [
          { name: "Ball Drop Catches", equipment: "Tennis balls", thumbnail: "🎾" },
          { name: "Reaction Light Drills", equipment: "Reaction lights", thumbnail: "💡" },
          { name: "Ladder Speed Work", equipment: "Agility ladder", thumbnail: "👟" },
          { name: "Visual Tracking Exercises", equipment: "Eye device", thumbnail: "👁️" },
          { name: "Balance Board Holds", equipment: "Balance board", thumbnail: "⚖️" },
          { name: "Hand Speed Drills", equipment: "Bodyweight", thumbnail: "✋" }
        ]
      },
      {
        number: 2,
        title: "Speed Processing",
        focus: "Reducing reaction time through repetition",
        exercises: [
          { name: "Multi-Direction Ball Catches", equipment: "Tennis balls", thumbnail: "🔄" },
          { name: "Complex Light Sequences", equipment: "Reaction lights", thumbnail: "⚡" },
          { name: "Cognitive Ladder Patterns", equipment: "Agility ladder", thumbnail: "🧠" },
          { name: "Peripheral Vision Training", equipment: "Eye device", thumbnail: "👁️" },
          { name: "Unstable Surface Work", equipment: "Balance board", thumbnail: "💪" },
          { name: "Dual-Task Challenges", equipment: "Mixed", thumbnail: "🎯" }
        ]
      },
      {
        number: 3,
        title: "Decision Speed",
        focus: "Making correct choices under time pressure",
        exercises: [
          { name: "Choice Reaction Drills", equipment: "Reaction lights", thumbnail: "🚦" },
          { name: "Anticipation Training", equipment: "Mixed", thumbnail: "🔮" },
          { name: "Pattern Recognition Speed", equipment: "Eye device", thumbnail: "📊" },
          { name: "Multi-Stimulus Response", equipment: "Reaction lights", thumbnail: "💥" },
          { name: "Balance Under Distraction", equipment: "Balance board", thumbnail: "🎭" },
          { name: "Race Start Simulation", equipment: "Mixed", thumbnail: "🏎️" }
        ]
      },
      {
        number: 4,
        title: "Competition Sharpening",
        focus: "Peak reaction readiness for race conditions",
        exercises: [
          { name: "Lights Out Reaction Test", equipment: "Reaction lights", thumbnail: "🏆" },
          { name: "Fatigue-State Reactions", equipment: "Mixed", thumbnail: "💪" },
          { name: "Visual Overload Training", equipment: "Eye device", thumbnail: "⚡" },
          { name: "Split-Second Decision Drills", equipment: "Reaction lights", thumbnail: "🎯" },
          { name: "Race Simulation Reactions", equipment: "Mixed", thumbnail: "🏎️" },
          { name: "Maintenance Protocol", equipment: "Mixed", thumbnail: "🔄" }
        ]
      }
    ]
  },
  "fitness-4": {
    title: "Heat Acclimatization Protocol",
    description: "A 4-week program designed to prepare your body for racing in extreme heat conditions. F1 drivers face cockpit temperatures exceeding 50°C in races like Singapore, Qatar, and Bahrain. This protocol builds heat tolerance while maintaining cognitive function and physical performance.",
    category: "Fitness Program",
    stats: {
      duration: "60–75 min per session",
      exercises: "4–6",
      length: "4 weeks"
    },
    equipment: ["Sauna", "Hot yoga access", "Heat suit", "Cycling bike", "Hydration monitoring"],
    targetAreas: ["Thermoregulation", "Sweat efficiency", "Cognitive heat tolerance", "Hydration management"],
    weeks: [
      {
        number: 1,
        title: "Heat Introduction",
        focus: "Safely beginning heat exposure protocols",
        exercises: [
          { name: "Post-Workout Sauna (10 min)", equipment: "Sauna", thumbnail: "🌡️" },
          { name: "Hot Yoga Session", equipment: "Yoga studio", thumbnail: "🧘" },
          { name: "Warm Environment Cycling", equipment: "Heat room", thumbnail: "🚴" },
          { name: "Hydration Baseline Testing", equipment: "Scale", thumbnail: "💧" },
          { name: "Cool-Down Protocols", equipment: "Cold water", thumbnail: "❄️" }
        ]
      },
      {
        number: 2,
        title: "Progressive Exposure",
        focus: "Extending heat tolerance duration",
        exercises: [
          { name: "Sauna Sessions (15-20 min)", equipment: "Sauna", thumbnail: "🔥" },
          { name: "Heat Suit Training", equipment: "Heat suit", thumbnail: "🏋️" },
          { name: "Hot Environment Intervals", equipment: "Mixed", thumbnail: "⚡" },
          { name: "Sweat Rate Monitoring", equipment: "Hydration kit", thumbnail: "📊" },
          { name: "Cognitive Tasks in Heat", equipment: "Sauna", thumbnail: "🧠" }
        ]
      },
      {
        number: 3,
        title: "Race Simulation Heat",
        focus: "Replicating cockpit conditions",
        exercises: [
          { name: "Extended Sauna (25 min)", equipment: "Sauna", thumbnail: "🌡️" },
          { name: "Heat Suit Cardio (45 min)", equipment: "Heat suit + Bike", thumbnail: "🏎️" },
          { name: "Decision Making in Heat", equipment: "Sauna + Tasks", thumbnail: "🎯" },
          { name: "Race-Length Heat Exposure", equipment: "Mixed", thumbnail: "🏆" },
          { name: "Optimal Cooling Strategies", equipment: "Cold water", thumbnail: "❄️" }
        ]
      },
      {
        number: 4,
        title: "Peak Heat Readiness",
        focus: "Race-ready heat performance",
        exercises: [
          { name: "Full Race Heat Simulation", equipment: "Heat suit + Bike", thumbnail: "🚀" },
          { name: "Precision Tasks Under Heat", equipment: "Sauna", thumbnail: "🎯" },
          { name: "Recovery Optimization", equipment: "Cold bath", thumbnail: "❄️" },
          { name: "Race Week Heat Protocol", equipment: "Sauna", thumbnail: "🏎️" },
          { name: "Maintenance Heat Sessions", equipment: "Mixed", thumbnail: "🔄" }
        ]
      }
    ]
  }
};

// Default program for any program ID not found
const defaultProgram: ProgramData = programsData["fitness-1"];

export default function PierreTrainingProgramPage() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { isSubscribed } = useSubscription();
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]);
  const [programStarted, setProgramStarted] = useState(false);

  const isPremiumSubscribed = isSubscribed("pierre-gasly");
  const programData = programId ? programsData[programId] || defaultProgram : defaultProgram;
  const bannerImage = programId ? programImages[programId] || pierreFitness1 : pierreFitness1;

  // Redirect non-premium users
  useEffect(() => {
    if (!isPremiumSubscribed) {
      navigate(`/athlete/pierre-gasly`);
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
          <Button onClick={() => navigate(`/subscribe/pierre-gasly`)}>
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
      <div className="relative h-[400px] w-full overflow-hidden mt-16">
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
          className="absolute top-4 left-4 z-10 bg-background/50 backdrop-blur-sm hover:bg-background/70"
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
            <p className="text-sm text-muted-foreground">Length</p>
            <p className="font-semibold">{programData.stats.length}</p>
          </Card>
        </div>

        {/* Equipment & Target Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-5 bg-muted/20 border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Equipment Needed</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.equipment.map((item, i) => (
                <Badge key={i} variant="outline" className="bg-background/50">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
          <Card className="p-5 bg-muted/20 border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Target Areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programData.targetAreas.map((area, i) => (
                <Badge key={i} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Weekly Breakdown */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Weekly Breakdown</h2>
          
          {programData.weeks.map((week) => (
            <Collapsible
              key={week.number}
              open={openWeeks.includes(week.number)}
              onOpenChange={() => toggleWeek(week.number)}
            >
              <Card className="overflow-hidden border-border/50">
                <CollapsibleTrigger asChild>
                  <button className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-bold text-primary">{week.number}</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">{week.title}</h3>
                        <p className="text-sm text-muted-foreground">{week.focus}</p>
                      </div>
                    </div>
                    {openWeeks.includes(week.number) ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-3">
                    {week.exercises.map((exercise, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center text-2xl">
                          {exercise.thumbnail}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-sm text-muted-foreground">{exercise.equipment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Sticky Start Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border/50">
        <Button 
          className="w-full h-12 text-lg font-semibold"
          onClick={handleStartProgram}
        >
          {programStarted ? "Continue Program" : "Start Program"}
        </Button>
      </div>
    </div>
  );
}