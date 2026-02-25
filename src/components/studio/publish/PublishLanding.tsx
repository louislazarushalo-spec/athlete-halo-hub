import { Button } from "@/components/ui/button";

interface PublishLandingProps {
  onSelectAI: () => void;
  onSelectManual: () => void;
}

export const PublishLanding = ({ onSelectAI, onSelectManual }: PublishLandingProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-foreground">
          Publish something for your fans.
        </h2>
      </div>

      <div className="space-y-3">
        {/* Card A — Create with AI */}
        <div className="rounded-xl border border-border/60 bg-card p-4 md:p-6 flex flex-col">
          <h3 className="text-[15px] md:text-base font-semibold text-foreground mb-1">
            Create with AI
          </h3>
          <p className="text-[12px] md:text-sm text-muted-foreground mb-4 leading-snug">
            Generate a draft from highlights, interviews, and coverage.
          </p>
          <Button
            size="sm"
            className="self-start h-11 min-w-[100px] text-sm"
            onClick={onSelectAI}
          >
            Start
          </Button>
        </div>

        {/* Card B — Create my own */}
        <div className="rounded-xl border border-border/60 bg-card p-4 md:p-6 flex flex-col">
          <h3 className="text-[15px] md:text-base font-semibold text-foreground mb-1">
            Create my own
          </h3>
          <p className="text-[12px] md:text-sm text-muted-foreground mb-4 leading-snug">
            Choose what to create and build it step by step.
          </p>
          <Button
            size="sm"
            className="self-start h-11 min-w-[100px] text-sm"
            onClick={onSelectManual}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};
