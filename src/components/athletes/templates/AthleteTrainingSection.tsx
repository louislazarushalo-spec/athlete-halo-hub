import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Target, Apple, Brain, LucideIcon } from "lucide-react";

// Types for training content
export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface TrainingCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  programs: TrainingProgram[];
}

export interface AthleteTrainingSectionData {
  athleteSlug: string;
  categories: TrainingCategory[];
}

interface AthleteTrainingSectionProps {
  data: AthleteTrainingSectionData;
}

export const AthleteTrainingSection = ({ data }: AthleteTrainingSectionProps) => {
  const [activeCategory, setActiveCategory] = useState(data.categories[0]?.id || "fitness");
  const navigate = useNavigate();
  
  const currentCategory = data.categories.find(cat => cat.id === activeCategory);

  const handleProgramClick = (programId: string) => {
    navigate(`/athlete/${data.athleteSlug}/training/${programId}`);
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
      <div className="flex items-center justify-center gap-2 border-b border-border/30 pb-4">
        {data.categories.map((category) => (
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
