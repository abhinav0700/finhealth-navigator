import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Lightbulb, TrendingUp, PiggyBank, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  {
    icon: PiggyBank,
    title: "Reduce inventory holding costs",
    description: "Your inventory turnover is 30% below industry average. Consider just-in-time ordering to free up ₹2.5L in working capital.",
    impact: "Save ₹30,000/month",
    type: "savings",
  },
  {
    icon: TrendingUp,
    title: "Accelerate receivables collection",
    description: "Average collection period is 45 days. Offering 2% early payment discount could reduce it to 25 days.",
    impact: "Improve cash flow by ₹1.8L",
    type: "growth",
  },
  {
    icon: Target,
    title: "Working capital loan recommended",
    description: "Based on your cash flow patterns, a ₹5L working capital facility at 12% APR would optimize operations.",
    impact: "Eligibility: 92%",
    type: "product",
  },
];

export function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
            <p className="text-sm text-muted-foreground">Personalized recommendations</p>
          </div>
        </div>

        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-foreground">{insight.title}</h4>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0">
                        {insight.impact}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <Button className="w-full mt-4" variant="outline">
          <Lightbulb className="h-4 w-4 mr-2" />
          View All AI Recommendations
        </Button>
      </div>
    </motion.div>
  );
}
