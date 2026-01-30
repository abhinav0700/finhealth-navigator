import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jul", inflow: 45000, outflow: 32000, balance: 13000 },
  { month: "Aug", inflow: 52000, outflow: 38000, balance: 14000 },
  { month: "Sep", inflow: 48000, outflow: 41000, balance: 7000 },
  { month: "Oct", inflow: 61000, outflow: 45000, balance: 16000 },
  { month: "Nov", inflow: 55000, outflow: 48000, balance: 7000 },
  { month: "Dec", inflow: 67000, outflow: 52000, balance: 15000 },
  { month: "Jan", inflow: 58000, outflow: 46000, balance: 12000 },
];

const formatCurrency = (value: number) => {
  return `₹${(value / 1000).toFixed(0)}K`;
};

export function CashFlowChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cash Flow Trends</h3>
          <p className="text-sm text-muted-foreground">Monthly inflow vs outflow analysis</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1" />
            <span className="text-muted-foreground">Inflow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-5" />
            <span className="text-muted-foreground">Outflow</span>
          </div>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 4px 24px hsl(var(--foreground) / 0.1)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="inflow"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInflow)"
              name="Inflow"
            />
            <Area
              type="monotone"
              dataKey="outflow"
              stroke="hsl(var(--chart-5))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOutflow)"
              name="Outflow"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Avg. Monthly Inflow</p>
          <p className="text-xl font-bold text-success tabular-nums">₹55,143</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Avg. Monthly Outflow</p>
          <p className="text-xl font-bold text-destructive tabular-nums">₹43,143</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Net Cash Flow</p>
          <p className="text-xl font-bold text-primary tabular-nums">+₹12,000</p>
        </div>
      </div>
    </motion.div>
  );
}
