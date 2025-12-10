import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { DeviceCard } from "@/components/dashboard/DeviceCard";
import { AlertItem } from "@/components/dashboard/AlertItem";
import { ConsumptionChart } from "@/components/dashboard/ConsumptionChart";
import { PredictionChart } from "@/components/dashboard/PredictionChart";
import { EfficiencyGauge } from "@/components/dashboard/EfficiencyGauge";
import {
  mockDevices,
  mockAlerts,
  generateHourlyReadings,
  generatePredictions,
  homeStats,
  Alert,
  EnergyReading,
  Prediction,
} from "@/lib/mockData";
import { Zap, DollarSign, TrendingUp, Activity, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [readings, setReadings] = useState<EnergyReading[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [currentWatts, setCurrentWatts] = useState(homeStats.totalConsumption);

  useEffect(() => {
    setReadings(generateHourlyReadings());
    setPredictions(generatePredictions());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setCurrentWatts((prev) => {
        const change = (Math.random() - 0.5) * 200;
        return Math.max(500, Math.min(5000, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const totalDeviceWatts = mockDevices.reduce(
    (sum, device) => sum + device.currentWatts,
    0
  );

  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Good afternoon, Alex</h2>
          <p className="text-muted-foreground">
            Here's your energy overview for today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Current Power"
            value={`${currentWatts.toLocaleString()} W`}
            subtitle="Real-time consumption"
            icon={Zap}
            variant="primary"
            trend={{ value: 8.2, isPositive: false }}
          />
          <StatCard
            title="Today's Cost"
            value={`$${homeStats.todayCost.toFixed(2)}`}
            subtitle={`Rate: $${homeStats.electricityRate}/kWh`}
            icon={DollarSign}
            variant="default"
          />
          <StatCard
            title="Monthly Cost"
            value={`$${homeStats.monthCost.toFixed(2)}`}
            subtitle="Projected: $168.50"
            icon={TrendingUp}
            variant="warning"
            trend={{ value: 12.5, isPositive: false }}
          />
          <StatCard
            title="Active Devices"
            value={`${mockDevices.filter((d) => d.status === "ACTIVE").length}/${mockDevices.length}`}
            subtitle="1 device offline"
            icon={Activity}
            variant="default"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Charts */}
          <div className="space-y-6 lg:col-span-2">
            {/* Consumption Chart */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Energy Consumption</h3>
                  <p className="text-sm text-muted-foreground">
                    Last 24 hours overview
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    Day
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    Week
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    Month
                  </Button>
                </div>
              </div>
              <ConsumptionChart readings={readings} />
            </div>

            {/* Devices Grid */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Connected Devices</h3>
                  <p className="text-sm text-muted-foreground">
                    {mockDevices.filter((d) => d.status === "ACTIVE").length} active
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {mockDevices.slice(0, 4).map((device) => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    totalWatts={totalDeviceWatts}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Efficiency Score */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Energy Efficiency</h3>
              <EfficiencyGauge value={homeStats.efficiency} />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Better than 65% of similar homes
              </p>
            </div>

            {/* AI Predictions */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">AI Forecast</h3>
                  <p className="text-sm text-muted-foreground">Next 12 hours</p>
                </div>
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                  86% accuracy
                </span>
              </div>
              <PredictionChart predictions={predictions} />
            </div>

            {/* Alerts */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Alerts</h3>
                  {unacknowledgedAlerts.length > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
                      {unacknowledgedAlerts.length}
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  Clear All
                </Button>
              </div>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <AlertItem
                    key={alert.id}
                    alert={alert}
                    onDismiss={dismissAlert}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
