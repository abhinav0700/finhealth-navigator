import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Clock, FileX, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  action?: string;
  icon: React.ElementType;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Cash crunch predicted in 15 days",
    description: "Based on current burn rate and receivables, cash reserves may run low. Consider accelerating collections.",
    action: "View cash flow",
    icon: TrendingDown,
  },
  {
    id: "2",
    type: "warning",
    title: "High receivables concentration",
    description: "65% of receivables from single customer. This poses a significant risk.",
    action: "View details",
    icon: AlertTriangle,
  },
  {
    id: "3",
    type: "warning",
    title: "GST filing due in 5 days",
    description: "GSTR-3B for January 2026 is pending. Avoid late filing penalties.",
    action: "Go to compliance",
    icon: Clock,
  },
  {
    id: "4",
    type: "info",
    title: "Missing expense categorization",
    description: "12 transactions need manual categorization for accurate reporting.",
    action: "Categorize now",
    icon: FileX,
  },
];

export function AlertsPanel() {
  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-destructive/10",
          border: "border-destructive/30",
          icon: "text-destructive",
          badge: "bg-destructive text-destructive-foreground",
        };
      case "warning":
        return {
          bg: "bg-warning/10",
          border: "border-warning/30",
          icon: "text-warning",
          badge: "bg-warning text-warning-foreground",
        };
      case "info":
        return {
          bg: "bg-info/10",
          border: "border-info/30",
          icon: "text-info",
          badge: "bg-info text-info-foreground",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Risk Alerts</h3>
          <p className="text-sm text-muted-foreground">Issues requiring attention</p>
        </div>
        <span className="text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-full">
          {alerts.filter(a => a.type === "critical").length} critical
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const styles = getAlertStyles(alert.type);
          const Icon = alert.icon;

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl border transition-colors hover:bg-secondary/50",
                styles.bg,
                styles.border
              )}
            >
              <div className={cn("p-2 rounded-lg bg-background", styles.icon)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-foreground">{alert.title}</h4>
                  <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                {alert.action && (
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-primary">
                    {alert.action}
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
