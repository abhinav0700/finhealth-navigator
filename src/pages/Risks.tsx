import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  AlertTriangle,
  TrendingDown,
  Clock,
  Users,
  CreditCard,
  FileWarning,
  Shield,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface RiskItem {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  impact: string;
  recommendation: string;
  icon: React.ElementType;
  score: number;
}

const risks: RiskItem[] = [
  {
    id: "1",
    title: "Cash crunch predicted in 15 days",
    description: "Based on current burn rate and expected receivables, cash reserves may fall below minimum threshold.",
    severity: "critical",
    category: "Liquidity",
    impact: "Unable to meet payroll and vendor payments",
    recommendation: "Accelerate collections or arrange short-term credit facility",
    icon: TrendingDown,
    score: 92,
  },
  {
    id: "2",
    title: "High customer concentration risk",
    description: "65% of revenue comes from top 2 customers. Loss of either would severely impact business.",
    severity: "high",
    category: "Revenue",
    impact: "Business continuity risk",
    recommendation: "Diversify customer base, aim for <30% concentration",
    icon: Users,
    score: 78,
  },
  {
    id: "3",
    title: "Delayed receivables aging",
    description: "₹2.8L in receivables are over 60 days past due. Collection probability decreases over time.",
    severity: "high",
    category: "Collections",
    impact: "Potential bad debt of ₹1.2L",
    recommendation: "Initiate aggressive follow-up and consider payment plans",
    icon: Clock,
    score: 71,
  },
  {
    id: "4",
    title: "Rising debt-to-equity ratio",
    description: "D/E ratio increased from 0.4 to 0.6 in last 6 months. Approaching lender covenant limits.",
    severity: "medium",
    category: "Solvency",
    impact: "May trigger loan covenant breach",
    recommendation: "Focus on debt repayment, avoid new borrowing",
    icon: CreditCard,
    score: 58,
  },
  {
    id: "5",
    title: "GST compliance gaps detected",
    description: "Input tax credit mismatch of ₹45,000 identified. May result in notices.",
    severity: "medium",
    category: "Compliance",
    impact: "Potential penalties and interest",
    recommendation: "Reconcile ITC with GSTR-2A before filing",
    icon: FileWarning,
    score: 45,
  },
];

const severityConfig = {
  critical: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30" },
  high: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
  medium: { color: "text-info", bg: "bg-info/10", border: "border-info/30" },
  low: { color: "text-success", bg: "bg-success/10", border: "border-success/30" },
};

const Risks = () => {
  const criticalCount = risks.filter(r => r.severity === "critical").length;
  const highCount = risks.filter(r => r.severity === "high").length;
  const overallRiskScore = Math.round(risks.reduce((sum, r) => sum + r.score, 0) / risks.length);

  return (
    <AppLayout title="Risk Alerts" subtitle="AI-detected financial risks and mitigation strategies">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 col-span-1 md:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-destructive/10">
                  <Shield className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Overall Risk Score</h3>
                  <p className="text-sm text-muted-foreground">Based on 5 risk factors</p>
                </div>
              </div>
              <span className="text-3xl font-bold text-destructive tabular-nums">{overallRiskScore}</span>
            </div>
            <Progress value={overallRiskScore} className="h-3" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <span className="text-sm font-medium text-muted-foreground">Critical</span>
            </div>
            <p className="text-3xl font-bold text-destructive tabular-nums">{criticalCount}</p>
            <p className="text-sm text-muted-foreground mt-1">Immediate action needed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium text-muted-foreground">High Priority</span>
            </div>
            <p className="text-3xl font-bold text-warning tabular-nums">{highCount}</p>
            <p className="text-sm text-muted-foreground mt-1">Monitor closely</p>
          </motion.div>
        </div>

        {/* Risk List */}
        <div className="space-y-4">
          {risks.map((risk, index) => {
            const config = severityConfig[risk.severity];
            const Icon = risk.icon;

            return (
              <motion.div
                key={risk.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`glass-card rounded-2xl p-6 border ${config.border}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${config.bg}`}>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold text-foreground">{risk.title}</h4>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${config.bg} ${config.color}`}>
                            {risk.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{risk.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-2xl font-bold text-foreground tabular-nums">{risk.score}</div>
                        <div className="text-xs text-muted-foreground">Risk Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Category</p>
                        <p className="text-sm text-foreground">{risk.category}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Impact</p>
                        <p className="text-sm text-foreground">{risk.impact}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Recommendation</p>
                        <p className="text-sm text-foreground">{risk.recommendation}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <Button size="sm">
                        Take Action
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resolved Risks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <h3 className="text-lg font-semibold text-foreground">Recently Resolved</h3>
          </div>
          <div className="space-y-3">
            {[
              { title: "Vendor payment overdue", resolved: "Jan 25, 2026" },
              { title: "TDS filing deadline", resolved: "Jan 20, 2026" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/20">
                <span className="text-foreground">{item.title}</span>
                <span className="text-sm text-muted-foreground">Resolved: {item.resolved}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Risks;
