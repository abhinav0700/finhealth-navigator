import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Salaries & Wages", value: 38, amount: 456000, color: "hsl(var(--chart-1))" },
  { name: "Raw Materials", value: 25, amount: 300000, color: "hsl(var(--chart-2))" },
  { name: "Operations", value: 18, amount: 216000, color: "hsl(var(--chart-3))" },
  { name: "Marketing", value: 10, amount: 120000, color: "hsl(var(--chart-4))" },
  { name: "Utilities", value: 5, amount: 60000, color: "hsl(var(--chart-5))" },
  { name: "Others", value: 4, amount: 48000, color: "hsl(var(--muted-foreground))" },
];

export function ExpenseBreakdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Expense Breakdown</h3>
        <p className="text-sm text-muted-foreground">Current month distribution</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Pie Chart */}
        <div className="w-48 h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                }}
                formatter={(value: number, name: string) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">₹12L</span>
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground tabular-nums">
                  ₹{(item.amount / 1000).toFixed(0)}K
                </span>
                <span className="text-sm text-muted-foreground w-10 text-right tabular-nums">
                  {item.value}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
