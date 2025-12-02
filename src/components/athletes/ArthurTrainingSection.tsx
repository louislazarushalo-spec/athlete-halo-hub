import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Target, Apple, Brain } from "lucide-react";

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface TrainingCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  programs: TrainingProgram[];
}

const trainingCategories: TrainingCategory[] = [
  {
    id: "fitness",
    title: "FITNESS",
    description: "Build the physical foundation for explosive tennis, including power, endurance, speed and recovery.",
    icon: <Dumbbell className="h-5 w-5" />,
    programs: [
      {
        id: "fitness-1",
        title: "Court Movement & Footwork Speed",
        description: "My session for developing fast first steps, quick recoveries, and sharp direction changes.",
        category: "Fitness"
      },
      {
        id: "fitness-2",
        title: "Match-Ready Endurance Set",
        description: "The interval routine I use to stay explosive deep into long sets, mixing court sprints with short rest.",
        category: "Fitness"
      },
      {
        id: "fitness-3",
        title: "Rotational Power for Forehand & Backhand",
        description: "The core and trunk rotation exercises that help me generate ball speed and stability on both wings.",
        category: "Fitness"
      },
      {
        id: "fitness-4",
        title: "Recovery Mobility Routine",
        description: "My mobility flow after tough match days to stay loose, reduce stiffness, and prevent injury.",
        category: "Fitness"
      }
    ]
  },
  {
    id: "skills",
    title: "SKILLS",
    description: "Technical sessions focused on sharpening the weapons I rely on in matches.",
    icon: <Target className="h-5 w-5" />,
    programs: [
      {
        id: "skills-1",
        title: "Heavy Forehand Patterns",
        description: "The forehand patterns I drill every week, including inside-out, inside-in, and finishing at the net.",
        category: "Skills"
      },
      {
        id: "skills-2",
        title: "Serve + First Ball Domination",
        description: "The playbook I use to take control early in the point through serve placement and aggressive first shots.",
        category: "Skills"
      },
      {
        id: "skills-3",
        title: "Backhand Stability Under Pressure",
        description: "A repetition session designed to keep my backhand solid and reliable against deep, heavy balls.",
        category: "Skills"
      },
      {
        id: "skills-4",
        title: "Transition to the Net and Finishing Points",
        description: "Footwork sequences, volley precision and swing volleys that help me finish points confidently.",
        category: "Skills"
      }
    ]
  },
  {
    id: "nutrition",
    title: "NUTRITION",
    description: "How I fuel during tournaments, training blocks, and recovery days.",
    icon: <Apple className="h-5 w-5" />,
    programs: [
      {
        id: "nutrition-1",
        title: "Match Day Fuel Plan",
        description: "What I eat before, during, and after matches to stay energized, sharp, and fully recovered.",
        category: "Nutrition"
      },
      {
        id: "nutrition-2",
        title: "Tournament Week Eating Routine",
        description: "My daily nutrition structure during multi-day events, built to keep digestion light and energy constant.",
        category: "Nutrition"
      },
      {
        id: "nutrition-3",
        title: "Recovery Day Menu",
        description: "Meals focused on protein, hydration, and anti-inflammatory foods after demanding match play.",
        category: "Nutrition"
      },
      {
        id: "nutrition-4",
        title: "Travel Day Essentials",
        description: "What I pack and eat when traveling to events to avoid fatigue and maintain consistent performance.",
        category: "Nutrition"
      }
    ]
  },
  {
    id: "mental",
    title: "MENTAL PERFORMANCE",
    description: "The tools I use to stay calm, confident, and focused in key moments.",
    icon: <Brain className="h-5 w-5" />,
    programs: [
      {
        id: "mental-1",
        title: "Pre-Match Focus Ritual",
        description: "My breathing and visualization routine before stepping on court for important matches.",
        category: "Mental Performance"
      },
      {
        id: "mental-2",
        title: "Handling Pressure Points",
        description: "The mental cues I rely on when serving out sets or facing break points.",
        category: "Mental Performance"
      },
      {
        id: "mental-3",
        title: "Post-Match Reset Routine",
        description: "How I decompress, reflect, and mentally reset after both wins and tough losses.",
        category: "Mental Performance"
      },
      {
        id: "mental-4",
        title: "Confidence Builder Daily Routine",
        description: "Short daily habits that build my self-belief and help me stay aggressive in my game plan.",
        category: "Mental Performance"
      }
    ]
  }
];

const categoryColors: Record<string, string> = {
  "Fitness": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Skills": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Nutrition": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Mental Performance": "bg-purple-500/20 text-purple-400 border-purple-500/30"
};

export const ArthurTrainingSection = () => {
  return (
    <div className="space-y-12">
      {trainingCategories.map((category) => (
        <div key={category.id}>
          {/* Category Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold tracking-wide">{category.title}</h3>
            </div>
            <p className="text-muted-foreground ml-12">{category.description}</p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.programs.map((program) => (
              <article 
                key={program.id} 
                className="glass-card p-5 flex flex-col hover:border-primary/30 transition-all duration-300 group cursor-pointer"
              >
                <Badge 
                  variant="outline" 
                  className={`self-start mb-3 text-xs ${categoryColors[program.category]}`}
                >
                  {program.category}
                </Badge>
                <h4 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors leading-snug">
                  {program.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">
                  {program.description}
                </p>
                <Button variant="outline" size="sm" className="w-full mt-auto">
                  View Program
                </Button>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
