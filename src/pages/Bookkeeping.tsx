import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  Search,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  FileText
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const transactions = [
  { id: 1, date: "2024-01-28", description: "Client Payment - ABC Corp", category: "Revenue", amount: 125000, type: "credit", status: "verified", account: "Bank Account" },
  { id: 2, date: "2024-01-27", description: "Office Rent Payment", category: "Operating Expenses", amount: 45000, type: "debit", status: "verified", account: "Bank Account" },
  { id: 3, date: "2024-01-26", description: "Supplier Payment - XYZ Ltd", category: "Cost of Goods", amount: 78000, type: "debit", status: "pending", account: "Bank Account" },
  { id: 4, date: "2024-01-25", description: "Interest Income", category: "Other Income", amount: 2500, type: "credit", status: "verified", account: "Savings Account" },
  { id: 5, date: "2024-01-24", description: "Employee Salaries", category: "Payroll", amount: 250000, type: "debit", status: "verified", account: "Bank Account" },
  { id: 6, date: "2024-01-23", description: "Unknown Transaction", category: "Uncategorized", amount: 15000, type: "debit", status: "flagged", account: "Bank Account" },
  { id: 7, date: "2024-01-22", description: "Client Payment - DEF Inc", category: "Revenue", amount: 85000, type: "credit", status: "verified", account: "Bank Account" },
  { id: 8, date: "2024-01-21", description: "Marketing Expenses", category: "Marketing", amount: 32000, type: "debit", status: "mismatch", account: "Credit Card" },
];

const bookkeepingIssues = [
  { id: 1, type: "Missing Entry", description: "Bank statement shows ₹15,000 deposit on Jan 20 not recorded", severity: "high", suggestion: "Add journal entry for client advance payment" },
  { id: 2, type: "Category Mismatch", description: "Marketing expense incorrectly categorized as Operating", severity: "medium", suggestion: "Reclassify to Marketing Expenses account" },
  { id: 3, type: "Duplicate Entry", description: "Payment to vendor XYZ recorded twice on Jan 18", severity: "high", suggestion: "Delete duplicate entry #1082" },
  { id: 4, type: "Unreconciled", description: "5 transactions from last week pending reconciliation", severity: "low", suggestion: "Complete bank reconciliation for Jan 15-22" },
];

const Bookkeeping = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "pending":
        return <RefreshCw className="h-4 w-4 text-warning" />;
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "mismatch":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive/20 text-destructive";
      case "medium":
        return "bg-warning/20 text-warning";
      case "low":
        return "bg-info/20 text-info";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AppLayout title="Automated Bookkeeping" subtitle="AI-assisted transaction management">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: CheckCircle2, label: "Verified", value: "156", subtext: "transactions", color: "text-success" },
            { icon: RefreshCw, label: "Pending", value: "12", subtext: "need review", color: "text-warning" },
            { icon: AlertTriangle, label: "Flagged", value: "4", subtext: "issues found", color: "text-destructive" },
            { icon: BookOpen, label: "This Month", value: "₹24.5L", subtext: "recorded", color: "text-primary" },
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
                  <p className="text-xs text-muted-foreground">{item.subtext}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Issues Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 border-l-4 border-warning"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold text-foreground">AI-Detected Bookkeeping Issues</h3>
          </div>
          <div className="space-y-3">
            {bookkeepingIssues.map((issue) => (
              <div key={issue.id} className="flex items-start justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getSeverityColor(issue.severity)}>{issue.severity}</Badge>
                    <span className="font-medium text-foreground">{issue.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.description}</p>
                  <p className="text-sm text-primary mt-1">💡 {issue.suggestion}</p>
                </div>
                <Button size="sm" variant="outline">Fix</Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transactions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold text-foreground">Transaction Ledger</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Revenue">Revenue</SelectItem>
                  <SelectItem value="Operating Expenses">Operating Expenses</SelectItem>
                  <SelectItem value="Cost of Goods">Cost of Goods</SelectItem>
                  <SelectItem value="Payroll">Payroll</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Account</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm text-muted-foreground">{transaction.date}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{transaction.description}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{transaction.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{transaction.account}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {transaction.type === "credit" ? (
                          <ArrowUpRight className="h-4 w-4 text-success" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-destructive" />
                        )}
                        <span className={transaction.type === "credit" ? "text-success" : "text-destructive"}>
                          ₹{transaction.amount.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(transaction.status)}
                        <span className="text-sm text-muted-foreground capitalize">{transaction.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <RefreshCw className="h-5 w-5 text-primary" />
              <h4 className="font-medium text-foreground">Auto-Categorize</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Let AI automatically categorize uncategorized transactions
            </p>
            <Button variant="outline" className="w-full">Run Auto-Categorization</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h4 className="font-medium text-foreground">Bank Reconciliation</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Match bank statements with recorded transactions
            </p>
            <Button variant="outline" className="w-full">Start Reconciliation</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h4 className="font-medium text-foreground">Generate Reports</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Create trial balance, P&L, and balance sheet
            </p>
            <Button variant="outline" className="w-full">Generate Reports</Button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Bookkeeping;
