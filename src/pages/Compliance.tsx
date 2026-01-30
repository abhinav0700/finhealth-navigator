import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Calendar,
  ExternalLink,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ComplianceItem {
  id: string;
  name: string;
  type: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue" | "upcoming";
  description: string;
  filingPeriod: string;
}

const complianceItems: ComplianceItem[] = [
  {
    id: "1",
    name: "GSTR-3B",
    type: "GST Filing",
    dueDate: "Feb 20, 2026",
    status: "upcoming",
    description: "Monthly summary return",
    filingPeriod: "January 2026",
  },
  {
    id: "2",
    name: "TDS Return - 26Q",
    type: "Tax Deducted at Source",
    dueDate: "Jan 31, 2026",
    status: "pending",
    description: "Quarterly TDS return for non-salary payments",
    filingPeriod: "Q3 FY 2025-26",
  },
  {
    id: "3",
    name: "GSTR-1",
    type: "GST Filing",
    dueDate: "Feb 11, 2026",
    status: "upcoming",
    description: "Outward supplies return",
    filingPeriod: "January 2026",
  },
  {
    id: "4",
    name: "Advance Tax",
    type: "Income Tax",
    dueDate: "Mar 15, 2026",
    status: "upcoming",
    description: "Fourth installment of advance tax",
    filingPeriod: "FY 2025-26",
  },
  {
    id: "5",
    name: "GSTR-3B",
    type: "GST Filing",
    dueDate: "Jan 20, 2026",
    status: "completed",
    description: "Monthly summary return",
    filingPeriod: "December 2025",
  },
  {
    id: "6",
    name: "PF Payment",
    type: "Employee Benefits",
    dueDate: "Jan 15, 2026",
    status: "completed",
    description: "Monthly PF contribution",
    filingPeriod: "December 2025",
  },
];

const gstHealth = {
  itcUtilization: 87,
  filingAccuracy: 94,
  matchScore: 82,
  issues: [
    { type: "ITC Mismatch", amount: 45000, status: "unresolved" },
    { type: "Late Fee Pending", amount: 2000, status: "pending" },
  ],
};

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Completed" },
  pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10", label: "Pending" },
  overdue: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", label: "Overdue" },
  upcoming: { icon: Calendar, color: "text-info", bg: "bg-info/10", label: "Upcoming" },
};

const Compliance = () => {
  const pendingCount = complianceItems.filter(i => i.status === "pending" || i.status === "upcoming").length;
  const completedCount = complianceItems.filter(i => i.status === "completed").length;

  return (
    <AppLayout title="Tax & GST Compliance" subtitle="Track filings, deadlines, and compliance status">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium text-muted-foreground">Pending Filings</span>
            </div>
            <p className="text-3xl font-bold text-warning tabular-nums">{pendingCount}</p>
            <p className="text-sm text-muted-foreground mt-1">Action required</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-muted-foreground">Completed</span>
            </div>
            <p className="text-3xl font-bold text-success tabular-nums">{completedCount}</p>
            <p className="text-sm text-muted-foreground mt-1">This quarter</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span className="text-sm font-medium text-muted-foreground">Issues Found</span>
            </div>
            <p className="text-3xl font-bold text-destructive tabular-nums">{gstHealth.issues.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Need attention</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Compliance Score</span>
            </div>
            <p className="text-3xl font-bold text-primary tabular-nums">{gstHealth.filingAccuracy}%</p>
            <p className="text-sm text-muted-foreground mt-1">Filing accuracy</p>
          </motion.div>
        </div>

        {/* GST Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">GST Health Dashboard</h3>
              <p className="text-sm text-muted-foreground">Real-time compliance metrics</p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync with GST Portal
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">ITC Utilization</span>
                <span className="text-sm font-medium text-foreground">{gstHealth.itcUtilization}%</span>
              </div>
              <Progress value={gstHealth.itcUtilization} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Filing Accuracy</span>
                <span className="text-sm font-medium text-foreground">{gstHealth.filingAccuracy}%</span>
              </div>
              <Progress value={gstHealth.filingAccuracy} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">GSTR-2A Match Score</span>
                <span className="text-sm font-medium text-foreground">{gstHealth.matchScore}%</span>
              </div>
              <Progress value={gstHealth.matchScore} className="h-2" />
            </div>
          </div>

          {/* Issues */}
          {gstHealth.issues.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-sm font-medium text-foreground mb-3">Detected Issues</h4>
              <div className="space-y-2">
                {gstHealth.issues.map((issue, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="text-foreground">{issue.type}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-destructive font-medium tabular-nums">₹{issue.amount.toLocaleString()}</span>
                      <Button size="sm" variant="outline">Resolve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Filing Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Filing Calendar</h3>
              <p className="text-sm text-muted-foreground">Upcoming and recent filings</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Calendar
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Filing</th>
                  <th>Type</th>
                  <th>Period</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complianceItems.map((item) => {
                  const config = statusConfig[item.status];
                  const StatusIcon = config.icon;
                  return (
                    <tr key={item.id}>
                      <td>
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </td>
                      <td>
                        <span className="px-2 py-1 text-xs rounded-full bg-secondary">{item.type}</span>
                      </td>
                      <td className="text-muted-foreground">{item.filingPeriod}</td>
                      <td className="text-foreground tabular-nums">{item.dueDate}</td>
                      <td>
                        <span className={`flex items-center gap-1.5 ${config.color}`}>
                          <StatusIcon className="h-4 w-4" />
                          {config.label}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          {item.status !== "completed" ? (
                            <>
                              <Button size="sm" variant="outline">Prepare</Button>
                              <Button size="sm" variant="ghost">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="ghost">View</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Compliance;
