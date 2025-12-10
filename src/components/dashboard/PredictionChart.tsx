import { Prediction } from "@/lib/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface PredictionChartProps {
  predictions: Prediction[];
}

export function PredictionChart({ predictions }: PredictionChartProps) {
  const currentHour = new Date().getHours();
  
  const data = predictions.slice(0, 12).map((pred, index) => ({
    hour: `${((currentHour + index) % 24).toString().padStart(2, '0')}:00`,
    watts: Math.round(pred.predictedWatts),
    confidence: (pred.confidence * 100).toFixed(0),
    isNow: index === 0,
  }));

  const getBarColor = (watts: number) => {
    if (watts > 3000) return "hsl(0, 84%, 60%)";
    if (watts > 2000) return "hsl(38, 92%, 50%)";
    return "hsl(190, 95%, 50%)";
  };

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(222, 47%, 15%)"
            vertical={false}
          />
          <XAxis
            dataKey="hour"
            stroke="hsl(215, 20%, 55%)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(215, 20%, 55%)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 47%, 8%)",
              border: "1px solid hsl(222, 47%, 15%)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
            labelStyle={{ color: "hsl(210, 40%, 98%)" }}
            formatter={(value: number, name: string, props: { payload: { confidence: string } }) => [
              `${value.toLocaleString()} W (${props.payload.confidence}% confidence)`,
              "Predicted",
            ]}
          />
          <Bar dataKey="watts" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.watts)}
                opacity={entry.isNow ? 1 : 0.7}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
