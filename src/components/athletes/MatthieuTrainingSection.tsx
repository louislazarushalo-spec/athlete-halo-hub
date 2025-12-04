import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Target, Apple, Brain } from "lucide-react";

// Import fitness images
import fitness1 from "@/assets/matthieu-fitness-1.png";
import fitness2 from "@/assets/matthieu-fitness-2.png";
import fitness3 from "@/assets/matthieu-fitness-3.png";
import fitness4 from "@/assets/matthieu-fitness-4.png";

// Import skills images
import skills1 from "@/assets/matthieu-skills-1.png";
import skills2 from "@/assets/matthieu-skills-2.png";
import skills3 from "@/assets/matthieu-skills-3.png";

// Import nutrition images (same as Arthur's)
import nutrition1 from "@/assets/arthur-nutrition-1.png";
import nutrition2 from "@/assets/arthur-nutrition-2.png";
import nutrition3 from "@/assets/arthur-nutrition-3.png";
import nutrition4 from "@/assets/arthur-nutrition-4.png";

// Import mental images
import mental1 from "@/assets/matthieu-mental-1.png";
import mental2 from "@/assets/matthieu-mental-2.png";
import mental3 from "@/assets/matthieu-mental-3.png";
import mental4 from "@/assets/matthieu-mental-4.png";

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
    description: "Build the physical foundation for elite fly-half play, including explosive power, endurance, and rugby-specific conditioning.",
    icon: <Dumbbell className="h-4 w-4" />,
    programs: [
      {
        id: "fitness-1",
        title: "Acceleration & Line-Break Speed",
        description: "My program focused on explosive first steps and attacking gaps to create opportunities in the backline.",
        image: fitness1
      },
      {
        id: "fitness-2",
        title: "Core Rotation & Kicking Power",
        description: "The hip and trunk power exercises I use to generate distance and accuracy on my long-range kicks.",
        image: fitness3
      },
      {
        id: "fitness-3",
        title: "Agility & Reactive Footwork",
        description: "Sessions improving lateral quickness, change of direction, and evasion skills against rush defense.",
        image: fitness4
      },
      {
        id: "fitness-4",
        title: "Contact Strength & Body Control",
        description: "Building stability through tackles, collisions, and maintaining passing accuracy under pressure.",
        image: fitness2
      }
    ]
  },
  {
    id: "skills",
    title: "Skills",
    description: "Technical sessions focused on the core weapons of a fly-half: distribution, kicking game, and defensive reads.",
    icon: <Target className="h-4 w-4" />,
    programs: [
      {
        id: "skills-1",
        title: "Passing Precision & Quick Distribution",
        description: "Drills for flat passes, skip passes, long passes, and keeping distribution sharp under defensive pressure.",
        image: skills1
      },
      {
        id: "skills-2",
        title: "Kicking Accuracy & Tactical Variety",
        description: "Perfecting cross-kicks, grubbers, contestable kicks, and exit kicks to control territory and create chances.",
        image: skills3
      },
      {
        id: "skills-3",
        title: "Tackling Technique & Defensive Control",
        description: "Safe shoulder tackles, defensive alignment, and controlled stopping to shut down attacking threats.",
        image: fitness2
      },
      {
        id: "skills-4",
        title: "Evasion & Tackle Avoidance",
        description: "Sidesteps, fends, late footwork, and maintaining momentum through traffic to break the defensive line.",
        image: skills2
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
        description: "My breathing and visualization routine before stepping on the pitch for important matches.",
        image: mental1
      },
      {
        id: "mental-2",
        title: "Handling Pressure Points",
        description: "The mental cues I rely on when taking crucial kicks or facing high-pressure moments.",
        image: mental2
      },
      {
        id: "mental-3",
        title: "Post-Match Reset Routine",
        description: "How I decompress, reflect, and mentally reset after both wins and tough losses.",
        image: mental3
      },
      {
        id: "mental-4",
        title: "Confidence Builder Daily Routine",
        description: "Short daily habits that build my self-belief and help me stay aggressive in my game plan.",
        image: mental4
      }
    ]
  }
];

export const MatthieuTrainingSection = () => {
  const [activeCategory, setActiveCategory] = useState("fitness");
  
  const currentCategory = trainingCategories.find(cat => cat.id === activeCategory);

  const handleProgramClick = (programId: string) => {
    // Program detail pages can be added later
    console.log("Navigate to program:", programId);
  };

  return (
    <div className="space-y-6">
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
