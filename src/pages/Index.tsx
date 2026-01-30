import { AppLayout } from "@/components/layout/AppLayout";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { CashFlowChart } from "@/components/dashboard/CashFlowChart";
import { ExpenseBreakdown } from "@/components/dashboard/ExpenseBreakdown";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { IndustryBenchmark } from "@/components/dashboard/IndustryBenchmark";
import { QuickReports } from "@/components/dashboard/QuickReports";
import {
  IndianRupee,
  TrendingUp,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Index = () => {
  return (
    <AppLayout title="Financial Overview" subtitle="Welcome back, Rahul">
      <div className="space-y-6">
        {/* Financial Health Score */}
        <HealthScoreCard
          score={73}
          previousScore={68}
          subScores={{
            liquidity: 82,
            profitability: 71,
            solvency: 78,
            efficiency: 61,
          }}
        />

        {/* Key Stats Grid */}
        <div className="dashboard-grid">
          <StatCard
            title="Total Revenue"
            value="₹24.5L"
            subtitle="This month"
            change={12.5}
            changeLabel="vs last month"
            icon={IndianRupee}
            iconColor="text-success"
            delay={0.1}
          />
          <StatCard
            title="Net Profit"
            value="₹4.2L"
            subtitle="17.1% margin"
            change={8.3}
            changeLabel="vs last month"
            icon={TrendingUp}
            iconColor="text-primary"
            delay={0.2}
          />
          <StatCard
            title="Cash Balance"
            value="₹8.7L"
            subtitle="Available liquidity"
            change={-5.2}
            changeLabel="vs last week"
            icon={Wallet}
            iconColor="text-warning"
            delay={0.3}
          />
          <StatCard
            title="Outstanding Dues"
            value="₹6.3L"
            subtitle="From 12 customers"
            change={3.1}
            changeLabel="vs last month"
            icon={CreditCard}
            iconColor="text-destructive"
            delay={0.4}
          />
        </div>

        {/* Charts Row */}
        <div className="chart-grid">
          <CashFlowChart />
          <ExpenseBreakdown />
        </div>

        {/* Insights and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIInsights />
          <AlertsPanel />
        </div>

        {/* Benchmark and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IndustryBenchmark />
          <QuickReports />
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Upload Statement", icon: ArrowUpRight, color: "bg-primary/10 text-primary" },
              { label: "Generate Report", icon: ArrowDownRight, color: "bg-success/10 text-success" },
              { label: "View Projections", icon: TrendingUp, color: "bg-info/10 text-info" },
              { label: "Check Compliance", icon: Wallet, color: "bg-warning/10 text-warning" },
            ].map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className={`p-3 rounded-xl ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
