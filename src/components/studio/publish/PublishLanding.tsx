import { Sparkles, Plus } from "lucide-react";

interface PublishLandingProps {
  onSelectAI: () => void;
  onSelectManual: () => void;
}

const cardClass =
  "group relative flex flex-col items-center justify-center text-center rounded-2xl p-5 md:p-6 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]";

const cardStyle = {
  background: "linear-gradient(155deg, hsl(220 30% 14%) 0%, hsl(220 40% 9%) 100%)",
  border: "1.5px solid hsl(220 60% 40% / 0.45)",
  boxShadow:
    "0 0 0 0.5px hsl(220 60% 50% / 0.15), " +
    "inset 0 1px 0 0 hsl(220 60% 60% / 0.1), " +
    "0 0 20px -2px hsl(220 80% 55% / 0.25), " +
    "0 6px 24px -6px hsl(0 0% 0% / 0.5)",
};

export const PublishLanding = ({ onSelectAI, onSelectManual }: PublishLandingProps) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg md:text-xl font-semibold text-foreground">
        Publish something for your fans.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {/* Card A — Create with AI */}
        <button onClick={onSelectAI} className={cardClass} style={cardStyle}>
          <div className="relative w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-3 shadow-lg">
            <Sparkles className="h-5 w-5 text-background" />
          </div>
          <p className="text-[15px] font-semibold text-foreground mb-0.5 relative">Create with AI</p>
          <p className="text-[11px] text-muted-foreground leading-snug relative max-w-[200px]">
            Generate a draft from highlights, interviews, and coverage.
          </p>
        </button>

        {/* Card B — Create my own */}
        <button onClick={onSelectManual} className={cardClass} style={cardStyle}>
          <div className="relative w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-3 shadow-lg">
            <Plus className="h-5 w-5 text-background" />
          </div>
          <p className="text-[15px] font-semibold text-foreground mb-0.5 relative">Create my own</p>
          <p className="text-[11px] text-muted-foreground leading-snug relative max-w-[200px]">
            Choose what to create and build it step by step.
          </p>
        </button>
      </div>
    </div>
  );
};
