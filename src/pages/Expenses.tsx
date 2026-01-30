import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";

const expenseCategories = [
  { name: "Salaries & Wages", value: 456000, percent: 38, color: "hsl(var(--chart-1))", change: 5.2 },
  { name: "Raw Materials", value: 300000, percent: 25, color: "hsl(var(--chart-2))", change: -3.1 },
  { name: "Operations", value: 216000, percent: 18, color: "hsl(var(--chart-3))", change: 8.7 },
  { name: "Marketing", value: 120000, percent: 10, color: "hsl(var(--chart-4))", change: 15.4 },
  { name: "Utilities", value: 60000, percent: 5, color: "hsl(var(--chart-5))", change: 2.1 },
  { name: "Others", value: 48000, percent: 4, color: "hsl(var(--muted-foreground))", change: -1.5 },
];

const monthlyExpenses = [
  { month: "Aug", fixed: 280000, variable: 180000 },
  { month: "Sep", fixed: 285000, variable: 195000 },
  { month: "Oct", fixed: 282000, variable: 210000 },
  { month: "Nov", fixed: 290000, variable: 225000 },
  { month: "Dec", fixed: 295000, variable: 240000 },
  { month: "Jan", fixed: 300000, variable: 255000 },
];

const anomalies = [
  { category: "Marketing", amount: 45000, expected: 28000, variance: 60.7, status: "high" },
  { category: "Travel", amount: 18500, expected: 12000, variance: 54.2, status: "high" },
  { category: "Software", amount: 8200, expected: 9000, variance: -8.9, status: "normal" },
];

const Expenses = () => {
  const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <AppLayout title="Expense Analytics" subtitle="Detailed cost breakdown and optimization insights">
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="dashboard-grid">
          <StatCard
            title="Total Expenses"
            value="₹12.0L"
            subtitle="This month"
            change={7.2}
            changeLabel="vs last month"
            icon={ArrowUpRight}
            iconColor="text-destructive"
            delay={0.1}
          />
          <StatCard
            title="Fixed Costs"
            value="₹5.5L"
            subtitle="45.8% of total"
            change={1.7}
            changeLabel="vs last month"
            icon={TrendingUp}
            iconColor="text-info"
            delay={0.2}
          />
          <StatCard
            title="Variable Costs"
            value="₹6.5L"
            subtitle="54.2% of total"
            change={12.5}
            changeLabel="vs last month"
            icon={TrendingDown}
            iconColor="text-warning"
            delay={0.3}
          />
          <StatCard
            title="Cost per Revenue"
            value="49%"
            subtitle="Efficiency ratio"
            change={-2.1}
            changeLabel="improvement"
            icon={AlertTriangle}
            iconColor="text-success"
            delay={0.4}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Expense Distribution</h3>
              <p className="text-sm text-muted-foreground">By category</p>
            </div>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                    formatter={(value: number) => [`₹${(value / 1000).toFixed(0)}K`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">₹12L</span>
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Category Breakdown</h3>
                <p className="text-sm text-muted-foreground">Detailed expense analysis</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="space-y-4">
              {expenseCategories.map((cat, index) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground truncate">{cat.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground tabular-nums">
                          ₹{(cat.value / 1000).toFixed(0)}K
                        </span>
                        <span className={`text-xs ${cat.change > 0 ? "text-destructive" : "text-success"}`}>
                          {cat.change > 0 ? "+" : ""}{cat.change}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.percent}%` }}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fixed vs Variable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Fixed vs Variable Costs</h3>
              <p className="text-sm text-muted-foreground">Monthly trend analysis</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Fixed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-muted-foreground">Variable</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyExpenses}>
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
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
                />
                <Bar dataKey="fixed" name="Fixed Costs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} stackId="expenses" />
                <Bar dataKey="variable" name="Variable Costs" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} stackId="expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Anomalies Detection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Expense Anomalies</h3>
                <p className="text-sm text-muted-foreground">AI-detected unusual spending patterns</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Actual Spend</th>
                  <th>Expected</th>
                  <th>Variance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {anomalies.map((item, i) => (
                  <tr key={i}>
                    <td className="font-medium">{item.category}</td>
                    <td className="tabular-nums">₹{item.amount.toLocaleString()}</td>
                    <td className="tabular-nums text-muted-foreground">₹{item.expected.toLocaleString()}</td>
                    <td className={`tabular-nums ${item.variance > 0 ? "text-destructive" : "text-success"}`}>
                      {item.variance > 0 ? "+" : ""}{item.variance}%
                    </td>
                    <td>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "high" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
                      }`}>
                        {item.status === "high" ? "Above threshold" : "Normal"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Expenses;
