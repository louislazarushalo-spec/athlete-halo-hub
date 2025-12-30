import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, Target, Apple, Brain } from "lucide-react";

// Import Cassandre training images
import cassandreTraining1 from "@/assets/cassandre-training-1.jpeg";
import cassandreTrainingBike from "@/assets/cassandre-training-bike.jpg";
import cassandreTrainingSwim2 from "@/assets/cassandre-training-swim-2.jpg";
import cassandreTrainingTransition from "@/assets/cassandre-training-transition.jpg";
import cassandreTrainingRun from "@/assets/cassandre-training-run.jpg";
import cassandreTrainingSwim from "@/assets/cassandre-training-swim.jpg";

// Import nutrition images
import nutritionRaceFuel from "@/assets/nutrition-race-fuel.jpg";
import nutritionTrainingBlock from "@/assets/nutrition-training-block.jpg";
import nutritionTravel from "@/assets/nutrition-travel.jpg";
import nutritionRecovery from "@/assets/nutrition-recovery.jpg";

// Import mental images
import cassandreMentalFocus from "@/assets/cassandre-mental-focus.png";

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
    description: "Build endurance across swim, bike, and run with Cassandre's complete triathlon conditioning program.",
    icon: <Dumbbell className="h-4 w-4" />,
    programs: [
      {
        id: "fitness-1",
        title: "WTCS Brick Engine",
        description: "Bike-to-run session to build race legs and lock in pace control off the bike.",
        image: cassandreTrainingTransition
      },
      {
        id: "fitness-2",
        title: "Run Speed & Economy",
        description: "Intervals that sharpen speed while keeping stride smooth and efficient.",
        image: cassandreTrainingRun
      },
      {
        id: "fitness-3",
        title: "Swim Aerobic Builder",
        description: "Endurance set to hold form, rhythm, and pace under fatigue.",
        image: cassandreTrainingSwim
      },
      {
        id: "fitness-4",
        title: "Strength for Durability",
        description: "Simple strength work to stay resilient through heavy blocks and travel.",
        image: cassandreTraining1
      }
    ]
  },
  {
    id: "skills",
    title: "Skills",
    description: "Master technique across all three disciplines with sport-specific drills and form work.",
    icon: <Target className="h-4 w-4" />,
    programs: [
      {
        id: "skills-1",
        title: "Transitions: T1 + T2",
        description: "Reps that make transitions automatic: fast, calm, no wasted moves.",
        image: cassandreTrainingTransition
      },
      {
        id: "skills-2",
        title: "Open Water Confidence",
        description: "Sighting, starts, drafting, and positioning for race-day chaos.",
        image: cassandreTrainingSwim2
      },
      {
        id: "skills-3",
        title: "Bike Handling at Speed",
        description: "Cornering, braking, and pack awareness to stay safe and sharp.",
        image: cassandreTrainingBike
      },
      {
        id: "skills-4",
        title: "Pacing Playbook",
        description: "How I manage effort across swim/bike/run to finish strong, not empty.",
        image: cassandreTrainingRun
      }
    ]
  },
  {
    id: "nutrition",
    title: "Nutrition",
    description: "Fuel your training and racing with Cassandre's nutrition protocols for endurance performance.",
    icon: <Apple className="h-4 w-4" />,
    programs: [
      {
        id: "nutrition-1",
        title: "Race Fuel Blueprint",
        description: "My fueling plan for WTCS/Olympic distance: before, during, after.",
        image: nutritionRaceFuel
      },
      {
        id: "nutrition-2",
        title: "Training Block Nutrition",
        description: "Daily structure to support volume, recovery, and consistency.",
        image: nutritionTrainingBlock
      },
      {
        id: "nutrition-3",
        title: "Travel Day Essentials",
        description: "What I pack and eat on the road to stay light, fueled, and ready.",
        image: nutritionTravel
      },
      {
        id: "nutrition-4",
        title: "Recovery Day Reset",
        description: "Hydration + protein + carbs to bounce back fast between sessions.",
        image: nutritionRecovery
      }
    ]
  },
  {
    id: "mental",
    title: "Mental",
    description: "Develop champion mindset with mental training techniques used by Olympic gold medalists.",
    icon: <Brain className="h-4 w-4" />,
    programs: [
      {
        id: "mental-1",
        title: "Pre-Race Calm Routine",
        description: "A quick routine to arrive clear, confident, and ready to race.",
        image: cassandreMentalFocus
      },
      {
        id: "mental-2",
        title: "Managing the Red Zone",
        description: "Cues to stay composed when it hurts and decisions matter.",
        image: cassandreTrainingTransition
      },
      {
        id: "mental-3",
        title: "Reset After a Tough Race",
        description: "How I review, learn, and move on without carrying weight.",
        image: cassandreTrainingRun
      },
      {
        id: "mental-4",
        title: "Confidence Habits",
        description: "Small daily practices that keep mindset stable through the season.",
        image: cassandreTraining1
      }
    ]
  }
];

export const CassandreTrainingSection = () => {
  const [activeCategory, setActiveCategory] = useState("fitness");
  const navigate = useNavigate();
  
  const currentCategory = trainingCategories.find(cat => cat.id === activeCategory);

  const handleProgramClick = (programId: string) => {
    // Placeholder for future navigation
    console.log("Program clicked:", programId);
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
