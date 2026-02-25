import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, Check } from "lucide-react";
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
      <div className="sticky top-[44px] md:top-14 z-40 bg-background/90 backdrop-blur-sm -mx-4 px-4">
        <div className="flex items-center h-11 gap-1 overflow-hidden whitespace-nowrap">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full hover:bg-muted/50 transition-colors -ml-1"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Stepper — single line, never wraps */}
          <div className="flex items-center gap-0.5 min-w-0">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center gap-0.5 shrink-0">
                {i < currentStep ? (
                  /* Completed: small check dot */
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                ) : (
                  <span
                    className={cn(
                      "text-[11px] font-medium px-1.5 py-0.5 rounded-full leading-none",
                      i === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                )}
                {i < steps.length - 1 && (
                  <span className="text-[9px] text-muted-foreground/40 mx-0.5">›</span>
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
