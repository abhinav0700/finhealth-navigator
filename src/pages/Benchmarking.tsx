import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Building2, Target, Award, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const industries = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "services", label: "Services" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "agriculture", label: "Agriculture" },
  { value: "logistics", label: "Logistics" },
];

const benchmarkData = [
  { metric: "Profit Margin", yours: 18, industry: 15, topQuartile: 25 },
  { metric: "Current Ratio", yours: 1.8, industry: 1.5, topQuartile: 2.2 },
  { metric: "Debt/Equity", yours: 0.6, industry: 0.8, topQuartile: 0.4 },
  { metric: "Inventory Turn", yours: 4.2, industry: 6, topQuartile: 8 },
  { metric: "Collection Days", yours: 45, industry: 35, topQuartile: 25 },
  { metric: "Operating Margin", yours: 12, industry: 10, topQuartile: 18 },
];

const radarData = [
  { subject: "Liquidity", yours: 82, industry: 70, fullMark: 100 },
  { subject: "Profitability", yours: 71, industry: 65, fullMark: 100 },
  { subject: "Efficiency", yours: 61, industry: 68, fullMark: 100 },
  { subject: "Solvency", yours: 78, industry: 72, fullMark: 100 },
  { subject: "Growth", yours: 85, industry: 60, fullMark: 100 },
];

const kpiComparisons = [
  { name: "Revenue Growth", yours: "18.5%", industry: "12.3%", status: "above", percentile: 78 },
  { name: "Gross Margin", yours: "42.3%", industry: "38.5%", status: "above", percentile: 65 },
  { name: "Net Profit Margin", yours: "8.2%", industry: "6.8%", status: "above", percentile: 72 },
  { name: "Current Ratio", yours: "1.8", industry: "1.5", status: "above", percentile: 68 },
  { name: "Inventory Turnover", yours: "4.2x", industry: "6.0x", status: "below", percentile: 35 },
  { name: "Days Sales Outstanding", yours: "45 days", industry: "35 days", status: "below", percentile: 28 },
  { name: "ROE", yours: "15.2%", industry: "12.8%", status: "above", percentile: 71 },
  { name: "Asset Turnover", yours: "1.2x", industry: "1.1x", status: "above", percentile: 58 },
];

const Benchmarking = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("manufacturing");

  return (
    <AppLayout title="Industry Benchmarking" subtitle="Compare your performance with industry peers">
      <div className="space-y-6">
        {/* Industry Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Select Industry for Comparison</h3>
              <p className="text-sm text-muted-foreground">Compare your KPIs against industry benchmarks</p>
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Award, label: "Overall Rank", value: "Top 25%", color: "text-success" },
            { icon: TrendingUp, label: "Above Average", value: "6 metrics", color: "text-success" },
            { icon: TrendingDown, label: "Below Average", value: "2 metrics", color: "text-warning" },
            { icon: Target, label: "Industry Percentile", value: "72nd", color: "text-primary" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-secondary ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Metric Comparison</h3>
            <div className="h-80">
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
                  <Legend />
                  <Bar dataKey="yours" name="Your Business" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="industry" name="Industry Avg" fill="hsl(var(--muted-foreground))" opacity={0.5} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="topQuartile" name="Top 25%" fill="hsl(var(--success))" opacity={0.5} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Performance Radar</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  />
                  <Radar
                    name="Your Business"
                    dataKey="yours"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Industry Avg"
                    dataKey="industry"
                    stroke="hsl(var(--muted-foreground))"
                    fill="hsl(var(--muted-foreground))"
                    fillOpacity={0.2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* KPI Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Detailed KPI Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">KPI</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Your Value</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Industry Avg</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Percentile</th>
                </tr>
              </thead>
              <tbody>
                {kpiComparisons.map((kpi, index) => (
                  <tr key={kpi.name} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{kpi.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{kpi.yours}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{kpi.industry}</td>
                    <td className="py-3 px-4">
                      <Badge variant={kpi.status === "above" ? "default" : "secondary"} className={kpi.status === "above" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}>
                        {kpi.status === "above" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {kpi.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${kpi.percentile >= 50 ? "bg-success" : "bg-warning"}`}
                            style={{ width: `${kpi.percentile}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{kpi.percentile}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Improvement Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Areas for Improvement</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
              <h4 className="font-medium text-foreground mb-2">Inventory Turnover</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Your inventory turnover of 4.2x is 30% below industry average. This indicates excess inventory holding.
              </p>
              <p className="text-sm text-warning">
                Recommendation: Implement just-in-time inventory management to reduce holding costs by up to ₹2.5L.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
              <h4 className="font-medium text-foreground mb-2">Days Sales Outstanding</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Your collection period of 45 days is 29% higher than industry average of 35 days.
              </p>
              <p className="text-sm text-warning">
                Recommendation: Offer early payment discounts to accelerate receivables and improve cash flow by ₹1.8L.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Benchmarking;
