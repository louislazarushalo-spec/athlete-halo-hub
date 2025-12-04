import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Dumbbell, Calendar, Target, Info, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { AthleteHeader } from "@/components/layout/AthleteHeader";

// Training program banner image
import bannerImage from "@/assets/matthieu-fitness-speed.png";

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

const programData = {
  title: "Acceleration & Line-Break Speed",
  description: "A 4-week program designed to develop explosive first steps, acceleration power, and the breakaway speed needed to exploit gaps and create tries. Structured to improve reaction time, build raw acceleration, and develop the sprint mechanics required for elite fly-half play.",
  stats: {
    duration: "45–60 min per session",
    exercises: "6–8",
    length: "4 weeks"
  },
  equipment: ["Agility ladder", "Cones", "Resistance bands", "Sled (optional)"],
  targetAreas: ["Glutes & hip flexors", "Hamstrings", "Calves", "Core stability"],
  weeks: [
    {
      number: 1,
      title: "Acceleration Foundations",
      focus: "Building explosive start mechanics and first-step power",
      exercises: [
        { name: "Split Stance Starts", equipment: "Bodyweight", thumbnail: "🏉" },
        { name: "Wall Drive Holds", equipment: "Bodyweight", thumbnail: "💪" },
        { name: "Falling Starts", equipment: "Bodyweight", thumbnail: "⚡" },
        { name: "A-Skip Progression", equipment: "Bodyweight", thumbnail: "🦵" },
        { name: "Band-Resisted Marches", equipment: "Resistance bands", thumbnail: "🔥" },
        { name: "Reactive Cone Sprints", equipment: "Cones", thumbnail: "🎯" }
      ]
    },
    {
      number: 2,
      title: "Power Transfer & Drive Phase",
      focus: "Developing force application and ground contact efficiency",
      exercises: [
        { name: "Sled Push Sprints", equipment: "Sled (optional)", thumbnail: "🏋️" },
        { name: "Broad Jump to Sprint", equipment: "Bodyweight", thumbnail: "🚀" },
        { name: "Single-Leg Bounds", equipment: "Bodyweight", thumbnail: "💥" },
        { name: "Resisted Acceleration Runs", equipment: "Resistance bands", thumbnail: "⚡" },
        { name: "Hip Flexor Power Drives", equipment: "Resistance bands", thumbnail: "🔥" },
        { name: "Ladder Quick Feet to Sprint", equipment: "Agility ladder", thumbnail: "👟" }
      ]
    },
    {
      number: 3,
      title: "Reactive Speed & Gap Exploitation",
      focus: "Developing decision-making speed and line-break timing",
      exercises: [
        { name: "Mirror Drill Sprints", equipment: "Cones", thumbnail: "🪞" },
        { name: "Reactive Ball Drop Sprints", equipment: "Rugby ball", thumbnail: "🏉" },
        { name: "Angle Cut Accelerations", equipment: "Cones", thumbnail: "↗️" },
        { name: "Shadow Defender Breaks", equipment: "Cones", thumbnail: "💨" },
        { name: "3-Cone L-Drill to Sprint", equipment: "Cones", thumbnail: "⚡" }
      ]
    },
    {
      number: 4,
      title: "Match-Specific Line-Break Speed",
      focus: "Integrating speed work into game-like scenarios",
      exercises: [
        { name: "Receive & Accelerate Drills", equipment: "Rugby ball", thumbnail: "🏉" },
        { name: "Support Line Sprint Patterns", equipment: "Cones", thumbnail: "📐" },
        { name: "Break & Finish (Try Line)", equipment: "Rugby ball", thumbnail: "🏆" },
        { name: "Counter-Attack Speed Work", equipment: "Cones", thumbnail: "⚡" },
        { name: "Full-Speed Decision Sprints", equipment: "Cones", thumbnail: "🧠" },
        { name: "Repeat Sprint Recovery", equipment: "Bodyweight", thumbnail: "🔄" }
      ]
    }
  ] as Week[]
};

export default function MatthieuTrainingProgramPage() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const { isSubscribed } = useSubscription();
  const [openWeeks, setOpenWeeks] = useState<number[]>([1]);
  const [programStarted, setProgramStarted] = useState(false);

  const isPremiumSubscribed = isSubscribed("matthieu-jalibert");

  // Redirect non-premium users
  useEffect(() => {
    if (!isPremiumSubscribed) {
      navigate(`/athlete/matthieu-jalibert`);
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
          <Button onClick={() => navigate(`/subscribe/matthieu-jalibert`)}>
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
          alt="Acceleration & Line-Break Speed Training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-background/50 backdrop-blur-sm hover:bg-background/70"
          onClick={() => navigate(`/athlete/matthieu-jalibert`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Banner Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Badge className="mb-3 bg-primary/90">Fitness Program</Badge>
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