import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  Share2,
  Plus,
  BarChart3,
  PieChart,
  TrendingUp,
  FileBarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  format: "PDF" | "Excel" | "CSV";
  category: "financial" | "compliance" | "investor";
}

const reports: Report[] = [
  { id: "1", name: "Monthly Financial Summary", type: "P&L Statement", date: "Jan 28, 2026", size: "2.4 MB", format: "PDF", category: "financial" },
  { id: "2", name: "Cash Flow Statement", type: "Cash Flow", date: "Jan 28, 2026", size: "1.8 MB", format: "PDF", category: "financial" },
  { id: "3", name: "Balance Sheet Q4", type: "Balance Sheet", date: "Jan 15, 2026", size: "3.1 MB", format: "PDF", category: "financial" },
  { id: "4", name: "GST Summary Report", type: "Tax Filing", date: "Jan 20, 2026", size: "1.2 MB", format: "Excel", category: "compliance" },
  { id: "5", name: "Investor Summary Q4", type: "Investor Report", date: "Jan 10, 2026", size: "4.5 MB", format: "PDF", category: "investor" },
  { id: "6", name: "Annual Financial Report", type: "Annual Report", date: "Dec 31, 2025", size: "8.2 MB", format: "PDF", category: "investor" },
];

const reportTemplates = [
  { icon: BarChart3, name: "P&L Statement", description: "Profit and loss summary" },
  { icon: PieChart, name: "Expense Report", description: "Detailed cost breakdown" },
  { icon: TrendingUp, name: "Cash Flow Report", description: "Cash movement analysis" },
  { icon: FileBarChart, name: "Investor Deck", description: "Investor-ready summary" },
];

const Reports = () => {
  return (
    <AppLayout title="Reports & Downloads" subtitle="Generate and manage financial reports">
      <div className="space-y-6">
        {/* Quick Generate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Quick Generate</h3>
              <p className="text-sm text-muted-foreground">Create investor-ready reports instantly</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reportTemplates.map((template, index) => (
              <motion.button
                key={template.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <template.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">{template.name}</p>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Reports Library */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Report Library</h3>
              <p className="text-sm text-muted-foreground">Access your generated reports</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="investor">Investor</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-0">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Report Name</th>
                      <th>Type</th>
                      <th>Date Generated</th>
                      <th>Format</th>
                      <th>Size</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{report.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="px-2 py-1 text-xs rounded-full bg-secondary">{report.type}</span>
                        </td>
                        <td className="text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {report.date}
                          </div>
                        </td>
                        <td>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            report.format === "PDF" ? "bg-destructive/10 text-destructive" :
                            report.format === "Excel" ? "bg-success/10 text-success" :
                            "bg-info/10 text-info"
                          }`}>
                            {report.format}
                          </span>
                        </td>
                        <td className="text-muted-foreground tabular-nums">{report.size}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="financial">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Report Name</th>
                      <th>Type</th>
                      <th>Date Generated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.filter(r => r.category === "financial").map((report) => (
                      <tr key={report.id}>
                        <td className="font-medium text-foreground">{report.name}</td>
                        <td className="text-muted-foreground">{report.type}</td>
                        <td className="text-muted-foreground">{report.date}</td>
                        <td>
                          <Button size="sm" variant="outline">Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="compliance">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Report Name</th>
                      <th>Type</th>
                      <th>Date Generated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.filter(r => r.category === "compliance").map((report) => (
                      <tr key={report.id}>
                        <td className="font-medium text-foreground">{report.name}</td>
                        <td className="text-muted-foreground">{report.type}</td>
                        <td className="text-muted-foreground">{report.date}</td>
                        <td>
                          <Button size="sm" variant="outline">Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="investor">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Report Name</th>
                      <th>Type</th>
                      <th>Date Generated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.filter(r => r.category === "investor").map((report) => (
                      <tr key={report.id}>
                        <td className="font-medium text-foreground">{report.name}</td>
                        <td className="text-muted-foreground">{report.type}</td>
                        <td className="text-muted-foreground">{report.date}</td>
                        <td>
                          <Button size="sm" variant="outline">Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Scheduled Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Scheduled Reports</h3>
              <p className="text-sm text-muted-foreground">Automated report generation</p>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Schedule New
            </Button>
          </div>

          <div className="space-y-3">
            {[
              { name: "Weekly Cash Flow Summary", freq: "Every Monday", next: "Feb 3, 2026" },
              { name: "Monthly P&L Statement", freq: "1st of month", next: "Mar 1, 2026" },
              { name: "Quarterly Investor Report", freq: "End of quarter", next: "Mar 31, 2026" },
            ].map((schedule, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{schedule.name}</p>
                    <p className="text-xs text-muted-foreground">{schedule.freq}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">Next: {schedule.next}</p>
                  <Button size="sm" variant="link" className="p-0 h-auto text-primary">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Reports;
