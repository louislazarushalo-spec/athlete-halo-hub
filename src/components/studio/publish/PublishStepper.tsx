import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PublishStepperProps {
  steps: string[];
  currentStep: number;
  onBack: () => void;
  /** If true, show a confirm dialog before navigating back */
  confirmLeave?: boolean;
}

export const PublishStepper = ({ steps, currentStep, onBack, confirmLeave }: PublishStepperProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBack = () => {
    if (confirmLeave) {
      setShowConfirm(true);
    } else {
      onBack();
    }
  };

  return (
    <>
      <div className="sticky top-[44px] md:top-14 z-40 bg-background/90 backdrop-blur-sm py-2 -mx-4 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center justify-center shrink-0 w-11 h-11 rounded-full hover:bg-muted/50 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
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

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave this draft?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost if you leave now.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction onClick={onBack}>Leave</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
