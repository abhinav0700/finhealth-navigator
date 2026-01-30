import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";

const monthlyData = [
  { month: "Jan", inflow: 58000, outflow: 46000 },
  { month: "Feb", inflow: 62000, outflow: 48000 },
  { month: "Mar", inflow: 55000, outflow: 52000 },
  { month: "Apr", inflow: 71000, outflow: 49000 },
  { month: "May", inflow: 68000, outflow: 55000 },
  { month: "Jun", inflow: 75000, outflow: 58000 },
  { month: "Jul", inflow: 82000, outflow: 62000 },
];

const weeklyData = [
  { week: "W1", received: 18500, paid: 12400 },
  { week: "W2", received: 15200, paid: 18900 },
  { week: "W3", received: 22100, paid: 14200 },
  { week: "W4", received: 19800, paid: 16500 },
];

const projectionData = [
  { month: "Jan", actual: 12000, projected: 12000 },
  { month: "Feb", actual: 14000, projected: 13500 },
  { month: "Mar", actual: 3000, projected: 15000 },
  { month: "Apr", actual: null, projected: 16500 },
  { month: "May", actual: null, projected: 18000 },
  { month: "Jun", actual: null, projected: 20000 },
];

const CashFlow = () => {
  return (
    <AppLayout title="Cash Flow Analytics" subtitle="Monitor and forecast your cash position">
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="dashboard-grid">
          <StatCard
            title="Cash Inflow"
            value="₹82,000"
            subtitle="This month"
            change={9.8}
            changeLabel="vs last month"
            icon={ArrowUpRight}
            iconColor="text-success"
            delay={0.1}
          />
          <StatCard
            title="Cash Outflow"
            value="₹62,000"
            subtitle="This month"
            change={6.5}
            changeLabel="vs last month"
            icon={ArrowDownRight}
            iconColor="text-destructive"
            delay={0.2}
          />
          <StatCard
            title="Net Cash Flow"
            value="+₹20,000"
            subtitle="Positive balance"
            change={15.2}
            changeLabel="improvement"
            icon={TrendingUp}
            iconColor="text-primary"
            delay={0.3}
          />
          <StatCard
            title="Cash Runway"
            value="4.2 months"
            subtitle="At current burn rate"
            change={-0.3}
            changeLabel="months"
            icon={Calendar}
            iconColor="text-warning"
            delay={0.4}
          />
        </div>

        {/* Monthly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Monthly Cash Flow Trend</h3>
              <p className="text-sm text-muted-foreground">Inflow vs Outflow over time</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 6 months
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="outflowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
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
                <Area
                  type="monotone"
                  dataKey="inflow"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  fill="url(#inflowGradient)"
                  name="Inflow"
                />
                <Area
                  type="monotone"
                  dataKey="outflow"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  fill="url(#outflowGradient)"
                  name="Outflow"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Two Column Charts */}
        <div className="chart-grid">
          {/* Weekly Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Weekly Breakdown</h3>
              <p className="text-sm text-muted-foreground">This month's weekly performance</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="week"
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
                  />
                  <Bar dataKey="received" name="Received" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="paid" name="Paid" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Cash Projection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Cash Balance Projection</h3>
              <p className="text-sm text-muted-foreground">6-month forecast based on trends</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData}>
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
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    name="Actual"
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "hsl(var(--muted-foreground))", strokeWidth: 2 }}
                    name="Projected"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Cash Flow Summary Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <p className="text-sm text-muted-foreground">Latest cash movements</p>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "Jan 28", desc: "Client Payment - ABC Corp", cat: "Revenue", type: "inflow", amount: 125000 },
                  { date: "Jan 27", desc: "Vendor Payment - XYZ Ltd", cat: "Operations", type: "outflow", amount: 45000 },
                  { date: "Jan 26", desc: "Salary Disbursement", cat: "Payroll", type: "outflow", amount: 180000 },
                  { date: "Jan 25", desc: "Service Invoice #1234", cat: "Revenue", type: "inflow", amount: 78000 },
                  { date: "Jan 24", desc: "Utility Bills", cat: "Overhead", type: "outflow", amount: 12500 },
                ].map((tx, i) => (
                  <tr key={i}>
                    <td className="text-muted-foreground">{tx.date}</td>
                    <td className="font-medium">{tx.desc}</td>
                    <td>
                      <span className="px-2 py-1 text-xs rounded-full bg-secondary">{tx.cat}</span>
                    </td>
                    <td>
                      {tx.type === "inflow" ? (
                        <span className="flex items-center gap-1 text-success">
                          <ArrowUpRight className="h-3 w-3" /> Inflow
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-destructive">
                          <ArrowDownRight className="h-3 w-3" /> Outflow
                        </span>
                      )}
                    </td>
                    <td className={`text-right font-medium tabular-nums ${tx.type === "inflow" ? "text-success" : "text-destructive"}`}>
                      {tx.type === "inflow" ? "+" : "-"}₹{tx.amount.toLocaleString()}
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

export default CashFlow;
