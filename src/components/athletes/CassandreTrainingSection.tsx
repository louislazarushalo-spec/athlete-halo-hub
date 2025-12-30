import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Target, Apple, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Cassandre assets imports
import cassandreKitSundaysImg from "@/assets/cassandre-kit-sundays.jpeg";
import cassandreKitTrackImg from "@/assets/cassandre-kit-track.jpg";
import cassandreKitRideImg from "@/assets/cassandre-kit-ride.jpeg";
import cassandreKitOffduyImg from "@/assets/cassandre-kit-offduty.jpeg";
import adidasTriathlonTenueImg from "@/assets/adidas-triathlon-tenue.jpeg";
import adidasTriathlonTenue2Img from "@/assets/adidas-triathlon-tenue-2.jpeg";
import cassandreBeaugrandBannerImg from "@/assets/cassandre-beaugrand-banner.avif";
import cassandreBeaugrandImg from "@/assets/cassandre-beaugrand.jpeg";

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
        title: "WTCS Brick Engine",
        description: "Bike-to-run session to build race legs and lock in pace control off the bike.",
        image: cassandreKitRideImg
      },
      {
        id: "fitness-2",
        title: "Run Speed & Economy",
        description: "Intervals that sharpen speed while keeping stride smooth and efficient.",
        image: cassandreKitTrackImg
      },
      {
        id: "fitness-3",
        title: "Swim Aerobic Builder",
        description: "Endurance set to hold form, rhythm, and pace under fatigue.",
        image: cassandreKitSundaysImg
      },
      {
        id: "fitness-4",
        title: "Strength for Durability",
        description: "Simple strength work to stay resilient through heavy blocks and travel.",
        image: adidasTriathlonTenueImg
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
        title: "Transitions: T1 + T2",
        description: "Reps that make transitions automatic: fast, calm, no wasted moves.",
        image: adidasTriathlonTenue2Img
      },
      {
        id: "skills-2",
        title: "Open Water Confidence",
        description: "Sighting, starts, drafting, and positioning for race-day chaos.",
        image: cassandreKitSundaysImg
      },
      {
        id: "skills-3",
        title: "Bike Handling at Speed",
        description: "Cornering, braking, and pack awareness to stay safe and sharp.",
        image: cassandreKitRideImg
      },
      {
        id: "skills-4",
        title: "Pacing Playbook",
        description: "How I manage effort across swim/bike/run to finish strong, not empty.",
        image: cassandreKitTrackImg
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
        title: "Race Fuel Blueprint",
        description: "My fueling plan for WTCS/Olympic distance: before, during, after.",
        image: cassandreBeaugrandBannerImg
      },
      {
        id: "nutrition-2",
        title: "Training Block Nutrition",
        description: "Daily structure to support volume, recovery, and consistency.",
        image: cassandreKitOffduyImg
      },
      {
        id: "nutrition-3",
        title: "Travel Day Essentials",
        description: "What I pack and eat on the road to stay light, fueled, and ready.",
        image: adidasTriathlonTenueImg
      },
      {
        id: "nutrition-4",
        title: "Recovery Day Reset",
        description: "Hydration + protein + carbs to bounce back fast between sessions.",
        image: cassandreBeaugrandImg
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
        title: "Pre-Race Calm Routine",
        description: "A quick routine to arrive clear, confident, and ready to race.",
        image: cassandreKitSundaysImg
      },
      {
        id: "mental-2",
        title: "Managing the Red Zone",
        description: "Cues to stay composed when it hurts and decisions matter.",
        image: cassandreKitTrackImg
      },
      {
        id: "mental-3",
        title: "Reset After a Tough Race",
        description: "How I review, learn, and move on without carrying weight.",
        image: adidasTriathlonTenue2Img
      },
      {
        id: "mental-4",
        title: "Confidence Habits",
        description: "Small daily practices that keep mindset stable through the season.",
        image: cassandreKitOffduyImg
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
