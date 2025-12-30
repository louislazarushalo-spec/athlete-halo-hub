import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Target, Apple, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  icon: typeof Dumbbell;
  programs: TrainingProgram[];
}

const trainingCategories: TrainingCategory[] = [
  {
    id: "fitness",
    title: "Fitness",
    description: "Build endurance across swim, bike, and run with Cassandre's complete triathlon conditioning program.",
    icon: Dumbbell,
    programs: [
      {
        id: "fitness-1",
        title: "Triathlon Endurance Base",
        description: "8-week foundation program for multi-discipline endurance.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
      },
      {
        id: "fitness-2",
        title: "Transition Power",
        description: "Speed up your T1 and T2 with explosive transition training.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop"
      },
      {
        id: "fitness-3",
        title: "Race Day Conditioning",
        description: "Peak performance training for competition day.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop"
      },
      {
        id: "fitness-4",
        title: "Recovery & Mobility",
        description: "Essential recovery protocols for triathlon athletes.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop"
      }
    ]
  },
  {
    id: "skills",
    title: "Skills",
    description: "Master technique across all three disciplines with sport-specific drills and form work.",
    icon: Target,
    programs: [
      {
        id: "skills-1",
        title: "Open Water Swim Technique",
        description: "Navigate waves, sighting, and pack swimming.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
      },
      {
        id: "skills-2",
        title: "Bike Handling Mastery",
        description: "Cornering, drafting, and race-day bike skills.",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=400&fit=crop"
      },
      {
        id: "skills-3",
        title: "Run Form Optimization",
        description: "Efficient running technique off the bike.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop"
      },
      {
        id: "skills-4",
        title: "Race Strategy Workshop",
        description: "Tactical decisions that win races.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop"
      }
    ]
  },
  {
    id: "nutrition",
    title: "Nutrition",
    description: "Fuel your training and racing with Cassandre's nutrition protocols for endurance performance.",
    icon: Apple,
    programs: [
      {
        id: "nutrition-1",
        title: "Training Day Nutrition",
        description: "Daily fueling strategies for multi-sport training.",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop"
      },
      {
        id: "nutrition-2",
        title: "Race Week Protocol",
        description: "Carb loading and hydration for peak performance.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop"
      },
      {
        id: "nutrition-3",
        title: "In-Race Fueling",
        description: "Gels, drinks, and timing for race day.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop"
      },
      {
        id: "nutrition-4",
        title: "Recovery Nutrition",
        description: "Post-training and post-race nutrition protocols.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
      }
    ]
  },
  {
    id: "mental",
    title: "Mental",
    description: "Develop champion mindset with mental training techniques used by Olympic gold medalists.",
    icon: Brain,
    programs: [
      {
        id: "mental-1",
        title: "Race Day Visualization",
        description: "Mental rehearsal techniques for competition.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop"
      },
      {
        id: "mental-2",
        title: "Pain Cave Mastery",
        description: "Push through the dark moments in racing.",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop"
      },
      {
        id: "mental-3",
        title: "Pre-Race Focus",
        description: "Calm the nerves and find your zone.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop"
      },
      {
        id: "mental-4",
        title: "Champion's Mindset",
        description: "Think like an Olympic champion.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop"
      }
    ]
  }
];

export const CassandreTrainingSection = () => {
  const [activeCategory, setActiveCategory] = useState("fitness");
  const navigate = useNavigate();

  const currentCategory = trainingCategories.find(c => c.id === activeCategory) || trainingCategories[0];

  const handleProgramClick = (programId: string) => {
    // Placeholder for future navigation
    console.log("Program clicked:", programId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
      {/* Section Header - Premium Badge matching Arthur's Exclusive Zone */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Members Only</Badge>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Performance Lab</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Train like an Olympic champion with Cassandre's complete triathlon methodology
        </p>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
        {trainingCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="rounded-full h-9 sm:h-10 px-4 sm:px-6 text-xs sm:text-sm"
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
              {category.title}
            </Button>
          );
        })}
      </div>

      {/* Category Description */}
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          {currentCategory.description}
        </p>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {currentCategory.programs.map((program, index) => (
          <article 
            key={program.id} 
            className="glass-card overflow-hidden group cursor-pointer hover:border-primary/30 hover:shadow-glow-soft transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleProgramClick(program.id)}
          >
            <div className="relative h-36 sm:h-44 overflow-hidden">
              {program.image && (
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] sm:text-xs">
                {currentCategory.title}
              </Badge>
            </div>
            <div className="p-3 sm:p-4">
              <h4 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-1">
                {program.title}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">
                {program.description}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs sm:text-sm h-8 sm:h-9"
              >
                View Program
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
