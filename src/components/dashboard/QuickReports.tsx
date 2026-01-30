import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const recentReports = [
  {
    id: "1",
    name: "Monthly Financial Report",
    type: "PDF",
    date: "Jan 28, 2026",
    status: "ready",
  },
  {
    id: "2",
    name: "Cash Flow Statement",
    type: "PDF",
    date: "Jan 25, 2026",
    status: "ready",
  },
  {
    id: "3",
    name: "Investor Summary Q4",
    type: "PDF",
    date: "Jan 15, 2026",
    status: "ready",
  },
];

export function QuickReports() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Reports</h3>
          <p className="text-sm text-muted-foreground">Download investor-ready reports</p>
        </div>
        <Button size="sm" variant="outline">
          Generate New
        </Button>
      </div>

      <div className="space-y-3">
        {recentReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{report.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {report.date}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
