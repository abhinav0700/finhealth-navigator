import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const benchmarkData = [
  { metric: "Profit Margin", yours: 18, industry: 15, topQuartile: 25 },
  { metric: "Current Ratio", yours: 1.8, industry: 1.5, topQuartile: 2.2 },
  { metric: "Debt/Equity", yours: 0.6, industry: 0.8, topQuartile: 0.4 },
  { metric: "Inventory Turn", yours: 4.2, industry: 6, topQuartile: 8 },
  { metric: "Collection Days", yours: 45, industry: 35, topQuartile: 25 },
];

export function IndustryBenchmark() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Industry Benchmark</h3>
          <p className="text-sm text-muted-foreground">Comparing against Manufacturing sector</p>
        </div>
        <select className="text-sm bg-secondary border border-border rounded-lg px-3 py-1.5 text-foreground">
          <option>Manufacturing</option>
          <option>Retail</option>
          <option>Services</option>
          <option>E-commerce</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={benchmarkData}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 80, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              dataKey="metric"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
              }}
            />
            <Bar dataKey="yours" name="Your Business" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            <Bar dataKey="industry" name="Industry Avg" fill="hsl(var(--muted-foreground))" opacity={0.5} radius={[0, 4, 4, 0]} />
            <Bar dataKey="topQuartile" name="Top 25%" fill="hsl(var(--success))" opacity={0.5} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance indicators */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">3 metrics above average</p>
            <p className="text-xs text-muted-foreground">Better than 60% of peers</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <TrendingDown className="h-4 w-4 text-warning" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">2 metrics need improvement</p>
            <p className="text-xs text-muted-foreground">Inventory & Collections</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
