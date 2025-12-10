import { cn } from "@/lib/utils";
import { Alert } from "@/lib/mockData";
import { AlertTriangle, AlertCircle, Info, Bell, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AlertItemProps {
  alert: Alert;
  onDismiss?: (id: string) => void;
}

const severityStyles = {
  LOW: {
    bg: 'bg-muted/50',
    border: 'border-muted-foreground/20',
    icon: Info,
    iconColor: 'text-muted-foreground',
  },
  MEDIUM: {
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    icon: Bell,
    iconColor: 'text-primary',
  },
  HIGH: {
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    icon: AlertTriangle,
    iconColor: 'text-warning',
  },
  CRITICAL: {
    bg: 'bg-destructive/10',
    border: 'border-destructive/30',
    icon: AlertCircle,
    iconColor: 'text-destructive',
  },
};

export function AlertItem({ alert, onDismiss }: AlertItemProps) {
  const style = severityStyles[alert.severity];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 rounded-lg border p-4 transition-all duration-200",
        style.bg,
        style.border,
        alert.acknowledged && "opacity-60"
      )}
    >
      <div className={cn("mt-0.5", style.iconColor)}>
        <Icon className="h-5 w-5" />
      </div>
      
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-tight">{alert.message}</p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
        </p>
      </div>

      {onDismiss && !alert.acknowledged && (
        <button
          onClick={() => onDismiss(alert.id)}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </button>
      )}
    </div>
  );
}
