import { useEffect, useState } from "react";

interface PerformanceMetric {
  label: string;
  value: number;
  max: number;
}

const metrics: PerformanceMetric[] = [
  { label: "Overtakes Made", value: 73, max: 100 },
  { label: "Position Gains", value: 58, max: 100 },
  { label: "Tire Management", value: 81, max: 100 },
  { label: "Consistency Rating", value: 77, max: 100 },
];

// Overall race performance index (weighted average)
const overallRaceIndex = 72;

export const PierreRacePerformanceGauge = () => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(overallRaceIndex);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Calculate the arc path for the gauge
  const radius = 80;
  const strokeWidth = 12;
  const center = 100;
  const startAngle = -180;
  const endAngle = 0;
  const angleRange = endAngle - startAngle;
  const valueAngle = startAngle + (animatedValue / 100) * angleRange;
  
  const polarToCartesian = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    };
  };
  
  const startPoint = polarToCartesian(startAngle);
  const endPoint = polarToCartesian(endAngle);
  const valuePoint = polarToCartesian(valueAngle);
  
  const largeArcFlag = animatedValue > 50 ? 1 : 0;
  
  const backgroundArc = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 1 1 ${endPoint.x} ${endPoint.y}`;
  const valueArc = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${valuePoint.x} ${valuePoint.y}`;

  return (
    <div className="glass-card p-4 sm:p-6 border border-border/30 animate-fade-in" style={{ animationDelay: "0.5s" }}>
      <div className="mb-4">
        <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">Race Performance</h4>
        <p className="text-xs sm:text-sm text-muted-foreground">Overall race day efficiency index</p>
      </div>
      
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 200 120" className="w-full max-w-[220px] h-auto">
          {/* Background arc */}
          <path
            d={backgroundArc}
            fill="none"
            stroke="hsl(0, 0%, 20%)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Value arc with F1 gradient */}
          <defs>
            <linearGradient id="pierreRaceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 84%, 40%)" />
              <stop offset="50%" stopColor="hsl(0, 84%, 60%)" />
              <stop offset="100%" stopColor="hsl(45, 93%, 47%)" />
            </linearGradient>
          </defs>
          <path
            d={valueArc}
            fill="none"
            stroke="url(#pierreRaceGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              transition: "all 1s ease-out",
            }}
          />
          
          {/* Center value text */}
          <text
            x={center}
            y={center - 10}
            textAnchor="middle"
            className="fill-foreground text-3xl font-bold"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {animatedValue}
          </text>
          <text
            x={center}
            y={center + 10}
            textAnchor="middle"
            className="fill-muted-foreground text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            / 100
          </text>
        </svg>
        
        <p className="text-sm text-muted-foreground mt-2 text-center">
          <span className="text-primary font-medium">Strong racer</span> — excels on race day
        </p>
      </div>
      
      {/* Metric breakdown */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4 pt-4 border-t border-border/30">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center p-2 rounded-lg bg-muted/30">
            <span className="text-lg sm:text-xl font-bold text-foreground">{metric.value}%</span>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-tight">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
