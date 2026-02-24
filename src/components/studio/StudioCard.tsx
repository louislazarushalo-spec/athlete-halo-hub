import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StudioCardProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  hero?: boolean;
}

export const StudioCard = ({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  children,
  className,
  hero,
}: StudioCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-card p-5 md:p-6",
        hero && "border-primary/30 bg-gradient-to-br from-card to-primary/5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-1">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-foreground leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1 leading-snug">
              {subtitle}
            </p>
          )}
        </div>
        {ctaLabel && (
          <Button
            size="sm"
            variant={hero ? "default" : "outline"}
            className="shrink-0 h-9"
            onClick={onCtaClick}
          >
            {ctaLabel}
          </Button>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};
