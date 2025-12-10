import { EnergyReading } from "@/lib/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface ConsumptionChartProps {
  readings: EnergyReading[];
}

export function ConsumptionChart({ readings }: ConsumptionChartProps) {
  const data = readings.map((reading) => ({
    time: format(reading.timestamp, "HH:mm"),
    watts: Math.round(reading.watts),
    cost: reading.cost.toFixed(3),
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorWatts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(190, 95%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(190, 95%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(222, 47%, 15%)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            stroke="hsl(215, 20%, 55%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(215, 20%, 55%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}kW`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 47%, 8%)",
              border: "1px solid hsl(222, 47%, 15%)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
            labelStyle={{ color: "hsl(210, 40%, 98%)" }}
            itemStyle={{ color: "hsl(190, 95%, 50%)" }}
            formatter={(value: number) => [`${value.toLocaleString()} W`, "Power"]}
          />
          <Area
            type="monotone"
            dataKey="watts"
            stroke="hsl(190, 95%, 50%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorWatts)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
