import { cn } from "@/lib/utils";

interface EfficiencyGaugeProps {
  value: number;
  label?: string;
}

export function EfficiencyGauge({ value, label = "Efficiency Score" }: EfficiencyGaugeProps) {
  const getColor = () => {
    if (value >= 80) return "text-success";
    if (value >= 60) return "text-warning";
    return "text-destructive";
  };

  const getGradient = () => {
    if (value >= 80) return "from-success/20 to-success/5";
    if (value >= 60) return "from-warning/20 to-warning/5";
    return "from-destructive/20 to-destructive/5";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-32 w-32">
        <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(222, 47%, 15%)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-1000", getColor())}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-3xl font-bold", getColor())}>{value}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <div className={cn("mt-4 rounded-full px-4 py-1.5 text-sm font-medium bg-gradient-to-r", getGradient())}>
        {label}
      </div>
    </div>
  );
}
