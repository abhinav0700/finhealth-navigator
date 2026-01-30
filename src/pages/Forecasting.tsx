import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Target, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const revenueProjection = [
  { month: "Jan", actual: 2450000, optimistic: 2450000, expected: 2450000, pessimistic: 2450000 },
  { month: "Feb", actual: 2580000, optimistic: 2650000, expected: 2580000, pessimistic: 2480000 },
  { month: "Mar", actual: null, optimistic: 2850000, expected: 2720000, pessimistic: 2550000 },
  { month: "Apr", actual: null, optimistic: 3100000, expected: 2880000, pessimistic: 2600000 },
  { month: "May", actual: null, optimistic: 3350000, expected: 3050000, pessimistic: 2650000 },
  { month: "Jun", actual: null, optimistic: 3600000, expected: 3220000, pessimistic: 2700000 },
];

const cashProjection = [
  { month: "Jan", balance: 870000 },
  { month: "Feb", balance: 920000 },
  { month: "Mar", balance: 850000 },
  { month: "Apr", balance: 780000 },
  { month: "May", balance: 920000 },
  { month: "Jun", balance: 1100000 },
];

const expenseProjection = [
  { month: "Jan", fixed: 550000, variable: 650000 },
  { month: "Feb", fixed: 560000, variable: 680000 },
  { month: "Mar", fixed: 570000, variable: 710000 },
  { month: "Apr", fixed: 580000, variable: 750000 },
  { month: "May", fixed: 590000, variable: 800000 },
  { month: "Jun", fixed: 600000, variable: 850000 },
];

const Forecasting = () => {
  return (
    <AppLayout title="Financial Forecasting" subtitle="AI-powered projections and scenario analysis">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Revenue Forecast (6M)</span>
            </div>
            <p className="text-3xl font-bold text-foreground tabular-nums">₹1.74 Cr</p>
            <p className="text-sm text-success mt-1">+18.5% projected growth</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Profit Margin Target</span>
            </div>
            <p className="text-3xl font-bold text-foreground tabular-nums">22%</p>
            <p className="text-sm text-muted-foreground mt-1">Current: 17.1% → Target: 22%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Cash Crunch Risk</span>
            </div>
            <p className="text-3xl font-bold text-warning tabular-nums">Medium</p>
            <p className="text-sm text-muted-foreground mt-1">Potential low in April</p>
          </motion.div>
        </div>

        {/* Revenue Scenarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Revenue Projection Scenarios</h3>
                <p className="text-sm text-muted-foreground">AI-generated 6-month forecast</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Optimistic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Expected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Pessimistic</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueProjection}>
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
                  tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                  }}
                  formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, ""]}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--foreground))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--foreground))", strokeWidth: 2, r: 4 }}
                  name="Actual"
                />
                <Line
                  type="monotone"
                  dataKey="optimistic"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Optimistic"
                />
                <Line
                  type="monotone"
                  dataKey="expected"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Expected"
                />
                <Line
                  type="monotone"
                  dataKey="pessimistic"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Pessimistic"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Cash & Expense Projections */}
        <div className="chart-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Cash Balance Projection</h3>
              <p className="text-sm text-muted-foreground">Expected cash position over 6 months</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashProjection}>
                  <defs>
                    <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
                    tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                    formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#cashGradient)"
                    name="Cash Balance"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Expense Projection</h3>
              <p className="text-sm text-muted-foreground">Fixed vs Variable cost trends</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={expenseProjection}>
                  <defs>
                    <linearGradient id="fixedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="varGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
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
                    tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                    formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="fixed"
                    stroke="hsl(var(--info))"
                    strokeWidth={2}
                    fill="url(#fixedGrad)"
                    stackId="1"
                    name="Fixed Costs"
                  />
                  <Area
                    type="monotone"
                    dataKey="variable"
                    stroke="hsl(var(--warning))"
                    strokeWidth={2}
                    fill="url(#varGrad)"
                    stackId="1"
                    name="Variable Costs"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI-Powered Recommendations</h3>
              <p className="text-sm text-muted-foreground">Strategic insights based on projections</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Secure credit facility by March",
                desc: "Cash dip predicted in April. Pre-approved ₹10L facility recommended.",
                impact: "Avoid cash crunch",
              },
              {
                title: "Accelerate Q2 collections",
                desc: "Tighten payment terms to 15 days for key clients to improve cash cycle.",
                impact: "+₹2.5L liquidity",
              },
              {
                title: "Defer non-critical capex",
                desc: "Postpone equipment purchase to Q3 when cash position strengthens.",
                impact: "Preserve ₹3L",
              },
              {
                title: "Negotiate vendor terms",
                desc: "Extend payables cycle from 30 to 45 days with top 3 suppliers.",
                impact: "+15 days runway",
              },
            ].map((rec, i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{rec.desc}</p>
                    <span className="inline-block mt-2 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {rec.impact}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Forecasting;
