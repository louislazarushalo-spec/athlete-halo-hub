import { cn } from "@/lib/utils";

interface PublishStepperProps {
  steps: string[];
  currentStep: number;
  onChangeFlow?: () => void;
}

export const PublishStepper = ({ steps, currentStep, onChangeFlow }: PublishStepperProps) => {
  return (
    <div className="sticky top-[44px] md:top-14 z-40 bg-background/90 backdrop-blur-sm py-2.5 -mx-4 px-4">
      <div className="flex items-center justify-between gap-2">
        {onChangeFlow && (
          <button
            onClick={onChangeFlow}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 min-h-[44px] flex items-center"
          >
            ← Change flow
          </button>
        )}
        <div className="flex items-center gap-1 ml-auto">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <span
                className={cn(
                  "text-[11px] md:text-xs font-medium px-2 py-1 rounded-full transition-colors",
                  i === currentStep
                    ? "bg-primary text-primary-foreground"
                    : i < currentStep
                      ? "text-primary"
                      : "text-muted-foreground"
                )}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <span className={cn("text-[10px]", i < currentStep ? "text-primary/50" : "text-muted-foreground/40")}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
