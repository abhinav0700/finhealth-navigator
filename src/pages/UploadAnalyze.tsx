import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { FileUploadAnalyzer } from "@/components/dashboard/FileUploadAnalyzer";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { 
  Upload, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  ArrowRight,
  FileText,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface AnalysisResult {
  healthScore: number;
  subScores: {
    liquidity: number;
    profitability: number;
    solvency: number;
    efficiency: number;
  };
  metrics: {
    currentRatio: number;
    debtToEquity: number;
    profitMargin: number;
    inventoryTurnover: number;
    dso: number;
  };
  insights: string[];
  risks: string[];
  recommendations: string[];
  analysisTimestamp?: string;
}

const UploadAnalyze = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const navigate = useNavigate();

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  return (
    <AppLayout title="Upload & Analyze" subtitle="Upload your financial statements for AI analysis">
      <div className="space-y-6">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Upload className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Upload Financial Documents</h3>
          </div>
          <FileUploadAnalyzer onAnalysisComplete={handleAnalysisComplete} />
        </motion.div>

        {/* Analysis Results */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Health Score */}
            <HealthScoreCard
              score={analysisResult.healthScore}
              previousScore={analysisResult.healthScore - 5}
              subScores={analysisResult.subScores}
            />

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { label: "Current Ratio", value: analysisResult.metrics.currentRatio.toFixed(2), status: analysisResult.metrics.currentRatio >= 1.5 ? "good" : "warning" },
                { label: "Debt/Equity", value: analysisResult.metrics.debtToEquity.toFixed(2), status: analysisResult.metrics.debtToEquity <= 1 ? "good" : "warning" },
                { label: "Profit Margin", value: `${analysisResult.metrics.profitMargin.toFixed(1)}%`, status: analysisResult.metrics.profitMargin >= 10 ? "good" : "warning" },
                { label: "Inventory Turn", value: `${analysisResult.metrics.inventoryTurnover.toFixed(1)}x`, status: analysisResult.metrics.inventoryTurnover >= 4 ? "good" : "warning" },
                { label: "DSO", value: `${analysisResult.metrics.dso} days`, status: analysisResult.metrics.dso <= 45 ? "good" : "warning" },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.status === "good" ? "text-success" : "text-warning"}`}>
                    {metric.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Insights, Risks, Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">AI Insights</h3>
                </div>
                <div className="space-y-3">
                  {analysisResult.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <p className="text-sm text-foreground">{insight}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Risks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <h3 className="font-semibold text-foreground">Risk Alerts</h3>
                </div>
                <div className="space-y-3">
                  {analysisResult.risks.map((risk, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-warning/10">
                      <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                      <p className="text-sm text-foreground">{risk}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <h3 className="font-semibold text-foreground">Recommendations</h3>
                </div>
                <div className="space-y-3">
                  {analysisResult.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-success/10">
                      <ArrowRight className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <p className="text-sm text-foreground">{rec}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button onClick={() => navigate("/reports")}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" onClick={() => navigate("/forecasting")}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Forecasts
              </Button>
              <Button variant="outline" onClick={() => navigate("/risks")}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Risk Analysis
              </Button>
            </motion.div>

            {/* Timestamp */}
            {analysisResult.analysisTimestamp && (
              <p className="text-sm text-muted-foreground text-center">
                Analysis completed at: {new Date(analysisResult.analysisTimestamp).toLocaleString()}
              </p>
            )}
          </motion.div>
        )}

        {/* Sample Files Info */}
        {!analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="font-semibold text-foreground mb-4">Supported File Formats</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <Badge className="mb-2">CSV</Badge>
                <p className="text-sm text-muted-foreground">
                  Export from Excel or accounting software with columns: revenue, expenses, date
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Badge className="mb-2">Excel (.xlsx)</Badge>
                <p className="text-sm text-muted-foreground">
                  Monthly P&L statements, balance sheets, or cash flow data
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Badge className="mb-2">PDF</Badge>
                <p className="text-sm text-muted-foreground">
                  Bank statements, financial reports (text-based PDFs only)
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Badge className="mb-2">JSON</Badge>
                <p className="text-sm text-muted-foreground">
                  API exports or structured data from other platforms
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default UploadAnalyze;
