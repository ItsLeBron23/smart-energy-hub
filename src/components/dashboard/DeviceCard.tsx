import { cn } from "@/lib/utils";
import { Device } from "@/lib/mockData";
import { Switch } from "@/components/ui/switch";
import {
  Thermometer,
  Refrigerator,
  Monitor,
  Waves,
  Flame,
  Lightbulb,
  Plug,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

interface DeviceCardProps {
  device: Device;
  totalWatts: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  thermometer: Thermometer,
  refrigerator: Refrigerator,
  monitor: Monitor,
  waves: Waves,
  flame: Flame,
  lightbulb: Lightbulb,
  plug: Plug,
};

export function DeviceCard({ device, totalWatts }: DeviceCardProps) {
  const [isOn, setIsOn] = useState(device.status === 'ACTIVE' && device.currentWatts > 0);
  const Icon = iconMap[device.icon] || Plug;
  const percentage = totalWatts > 0 ? (device.currentWatts / totalWatts) * 100 : 0;
  
  const isOffline = device.status === 'OFFLINE';
  const isError = device.status === 'ERROR';

  const getStatusColor = () => {
    if (isOffline) return 'text-muted-foreground';
    if (isError) return 'text-destructive';
    if (percentage > 50) return 'text-energy-high';
    if (percentage > 20) return 'text-warning';
    return 'text-success';
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card p-4 transition-all duration-300",
        isOffline ? "border-border opacity-60" : "border-border hover:border-primary/50",
        isError && "border-destructive/50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
              isOffline ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium">{device.name}</h4>
            <p className="text-sm text-muted-foreground">{device.location}</p>
          </div>
        </div>
        
        {isOffline ? (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>Offline</span>
          </div>
        ) : (
          <Switch
            checked={isOn}
            onCheckedChange={setIsOn}
            disabled={isError}
          />
        )}
      </div>

      {!isOffline && (
        <div className="mt-4 space-y-2">
          <div className="flex items-end justify-between">
            <span className={cn("text-2xl font-bold tabular-nums", getStatusColor())}>
              {device.currentWatts.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground"> W</span>
            </span>
            <span className="text-sm text-muted-foreground">
              {percentage.toFixed(1)}% of total
            </span>
          </div>
          
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                percentage > 50 ? "bg-energy-high" : percentage > 20 ? "bg-warning" : "bg-success"
              )}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
