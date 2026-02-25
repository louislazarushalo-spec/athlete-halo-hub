import { Button } from "@/components/ui/button";
import { Sparkles, Plus } from "lucide-react";

interface PublishLandingProps {
  onSelectAI: () => void;
  onSelectManual: () => void;
}

export const PublishLanding = ({ onSelectAI, onSelectManual }: PublishLandingProps) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg md:text-xl font-semibold text-foreground">
        Publish something for your fans.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {/* Card A — Create with AI */}
        <button
          onClick={onSelectAI}
          className="group relative flex flex-col items-center justify-center text-center rounded-2xl aspect-square sm:aspect-[4/3] p-6 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[180px]"
          style={{
            background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(220 40% 8%) 100%)",
            boxShadow: "0 0 0 1px hsl(220 60% 30% / 0.3), 0 0 24px -4px hsl(220 80% 50% / 0.15), 0 8px 32px -8px hsl(0 0% 0% / 0.4)",
          }}
        >
          {/* Glow overlay */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: "inset 0 0 40px hsl(220 80% 50% / 0.08), 0 0 32px -4px hsl(220 80% 50% / 0.2)" }} />

          {/* Icon circle */}
          <div className="relative w-14 h-14 rounded-full bg-foreground flex items-center justify-center mb-4 shadow-lg">
            <Sparkles className="h-6 w-6 text-background" />
          </div>

          <p className="text-[15px] font-semibold text-foreground mb-1 relative">Create with AI</p>
          <p className="text-xs text-muted-foreground leading-snug relative max-w-[200px]">
            Generate a draft from highlights, interviews, and coverage.
          </p>
        </button>

        {/* Card B — Create my own */}
        <button
          onClick={onSelectManual}
          className="group relative flex flex-col items-center justify-center text-center rounded-2xl aspect-square sm:aspect-[4/3] p-6 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[180px]"
          style={{
            background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(220 40% 8%) 100%)",
            boxShadow: "0 0 0 1px hsl(220 60% 30% / 0.3), 0 0 24px -4px hsl(220 80% 50% / 0.15), 0 8px 32px -8px hsl(0 0% 0% / 0.4)",
          }}
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: "inset 0 0 40px hsl(220 80% 50% / 0.08), 0 0 32px -4px hsl(220 80% 50% / 0.2)" }} />

          <div className="relative w-14 h-14 rounded-full bg-foreground flex items-center justify-center mb-4 shadow-lg">
            <Plus className="h-6 w-6 text-background" />
          </div>

          <p className="text-[15px] font-semibold text-foreground mb-1 relative">Create my own</p>
          <p className="text-xs text-muted-foreground leading-snug relative max-w-[200px]">
            Choose what to create and build it step by step.
          </p>
        </button>
      </div>
    </div>
  );
};
