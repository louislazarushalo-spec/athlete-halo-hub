import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  index?: number;
}

export const StatCard = ({ label, value, sublabel, icon: Icon, trend, index = 0 }: StatCardProps) => {
  return (
    <div 
      className="glass-card p-4 sm:p-5 border border-border/30 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 animate-fade-in group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </span>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-foreground">
          {value}
        </span>
        {trend && (
          <span className={`text-xs font-medium ${
            trend === "up" ? "text-green-500" : 
            trend === "down" ? "text-red-500" : 
            "text-muted-foreground"
          }`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "•"}
          </span>
        )}
      </div>
      {sublabel && (
        <span className="text-xs text-muted-foreground mt-1 block">
          {sublabel}
        </span>
      )}
    </div>
  );
};
