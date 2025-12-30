import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Target, Apple, Brain } from "lucide-react";

// Import fitness images
import action1 from "@/assets/arthur-cazaux-action1.png";
import action2 from "@/assets/arthur-cazaux-action2.png";
import action3 from "@/assets/arthur-cazaux-action3.png";
import action4 from "@/assets/arthur-cazaux-action4.png";

// Import skills images (real Arthur photos)
import skills1 from "@/assets/arthur-skills-1.png";
import skills2 from "@/assets/arthur-skills-2.png";
import skills3 from "@/assets/arthur-skills-3.png";
import skills4 from "@/assets/arthur-skills-4.png";

// Import nutrition images
import nutrition1 from "@/assets/arthur-nutrition-1.png";
import nutrition2 from "@/assets/arthur-nutrition-2.png";
import nutrition3 from "@/assets/arthur-nutrition-3.png";
import nutrition4 from "@/assets/arthur-nutrition-4.png";

// Import mental images (real Arthur photos)
import mentalReal1 from "@/assets/arthur-mental-real-1.png";
import mentalReal2 from "@/assets/arthur-mental-real-2.png";
import mentalReal3 from "@/assets/arthur-mental-real-3.png";

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  image?: string;
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
    title: "Fitness",
    description: "Build the physical foundation for explosive tennis, including power, endurance, speed and recovery.",
    icon: <Dumbbell className="h-4 w-4" />,
    programs: [
      {
        id: "fitness-1",
        title: "Court Movement & Footwork Speed",
        description: "My session for developing fast first steps, quick recoveries, and sharp direction changes.",
        image: action1
      },
      {
        id: "fitness-2",
        title: "Match-Ready Endurance Set",
        description: "The interval routine I use to stay explosive deep into long sets, mixing court sprints with short rest.",
        image: action2
      },
      {
        id: "fitness-3",
        title: "Rotational Power for Forehand & Backhand",
        description: "The core and trunk rotation exercises that help me generate ball speed and stability on both wings.",
        image: action3
      },
      {
        id: "fitness-4",
        title: "Recovery Mobility Routine",
        description: "My mobility flow after tough match days to stay loose, reduce stiffness, and prevent injury.",
        image: action4
      }
    ]
  },
  {
    id: "skills",
    title: "Skills",
    description: "Technical sessions focused on sharpening the weapons I rely on in matches.",
    icon: <Target className="h-4 w-4" />,
    programs: [
      {
        id: "skills-1",
        title: "Heavy Forehand Patterns",
        description: "The forehand patterns I drill every week, including inside-out, inside-in, and finishing at the net.",
        image: skills1
      },
      {
        id: "skills-2",
        title: "Serve + First Ball Domination",
        description: "The playbook I use to take control early in the point through serve placement and aggressive first shots.",
        image: skills2
      },
      {
        id: "skills-3",
        title: "Backhand Stability Under Pressure",
        description: "A repetition session designed to keep my backhand solid and reliable against deep, heavy balls.",
        image: skills3
      },
      {
        id: "skills-4",
        title: "Transition to the Net and Finishing Points",
        description: "Footwork sequences, volley precision and swing volleys that help me finish points confidently.",
        image: skills4
      }
    ]
  },
  {
    id: "nutrition",
    title: "Nutrition",
    description: "How I fuel during tournaments, training blocks, and recovery days.",
    icon: <Apple className="h-4 w-4" />,
    programs: [
      {
        id: "nutrition-1",
        title: "Match Day Fuel Plan",
        description: "What I eat before, during, and after matches to stay energized, sharp, and fully recovered.",
        image: nutrition1
      },
      {
        id: "nutrition-2",
        title: "Tournament Week Eating Routine",
        description: "My daily nutrition structure during multi-day events, built to keep digestion light and energy constant.",
        image: nutrition2
      },
      {
        id: "nutrition-3",
        title: "Recovery Day Menu",
        description: "Meals focused on protein, hydration, and anti-inflammatory foods after demanding match play.",
        image: nutrition3
      },
      {
        id: "nutrition-4",
        title: "Travel Day Essentials",
        description: "What I pack and eat when traveling to events to avoid fatigue and maintain consistent performance.",
        image: nutrition4
      }
    ]
  },
  {
    id: "mental",
    title: "Mental",
    description: "The tools I use to stay calm, confident, and focused in key moments.",
    icon: <Brain className="h-4 w-4" />,
    programs: [
      {
        id: "mental-1",
        title: "Pre-Match Focus Ritual",
        description: "My breathing and visualization routine before stepping on court for important matches.",
        image: mentalReal1
      },
      {
        id: "mental-2",
        title: "Handling Pressure Points",
        description: "The mental cues I rely on when serving out sets or facing break points.",
        image: mentalReal3
      },
      {
        id: "mental-3",
        title: "Post-Match Reset Routine",
        description: "How I decompress, reflect, and mentally reset after both wins and tough losses.",
        image: mentalReal2
      },
      {
        id: "mental-4",
        title: "Confidence Builder Daily Routine",
        description: "Short daily habits that build my self-belief and help me stay aggressive in my game plan.",
        image: action2
      }
    ]
  }
];

export const ArthurTrainingSection = () => {
  const [activeCategory, setActiveCategory] = useState("fitness");
  const navigate = useNavigate();
  
  const currentCategory = trainingCategories.find(cat => cat.id === activeCategory);

  const handleProgramClick = (programId: string) => {
    navigate(`/athlete/arthur-cazaux/training/${programId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header with Premium Badge */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Premium Members Only</Badge>
        <h2 className="text-2xl font-bold mb-2">Performance Lab</h2>
        <p className="text-muted-foreground text-sm">
          Train like me. My complete fitness, skills, nutrition, and mental routines — all in one place.
        </p>
      </div>

      {/* Sub-tabs like My Life */}
      <div className="flex items-center gap-2 border-b border-border/30 pb-4">
        {trainingCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 ${
              activeCategory === category.id 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {category.icon}
            {category.title}
          </Button>
        ))}
      </div>

      {/* Category Description */}
      {currentCategory && (
        <p className="text-muted-foreground">{currentCategory.description}</p>
      )}

      {/* Programs Grid */}
      {currentCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentCategory.programs.map((program) => (
            <article 
              key={program.id} 
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${
                program.image ? "h-64" : "glass-card p-5 flex flex-col"
              }`}
              onClick={() => handleProgramClick(program.id)}
            >
              {program.image ? (
                <>
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${program.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <h4 className="font-semibold text-lg text-white mb-2 group-hover:text-primary transition-colors">
                      {program.title}
                    </h4>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                      {program.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-fit bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProgramClick(program.id);
                      }}
                    >
                      View Program
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors leading-snug">
                    {program.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">
                    {program.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProgramClick(program.id);
                    }}
                  >
                    View Program
                  </Button>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
