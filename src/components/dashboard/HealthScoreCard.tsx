import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthScoreCardProps {
  score: number;
  previousScore: number;
  subScores: {
    liquidity: number;
    profitability: number;
    solvency: number;
    efficiency: number;
    compliance: number;
  };
}

export function HealthScoreCard({ score, previousScore, subScores }: HealthScoreCardProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return "text-health-excellent";
    if (value >= 60) return "text-health-good";
    if (value >= 40) return "text-health-moderate";
    if (value >= 20) return "text-health-poor";
    return "text-health-critical";
  };

  const getScoreGradient = (value: number) => {
    if (value >= 80) return "from-health-excellent to-health-good";
    if (value >= 60) return "from-health-good to-accent";
    if (value >= 40) return "from-health-moderate to-health-poor";
    return "from-health-poor to-health-critical";
  };

  const getScoreLabel = (value: number) => {
    if (value >= 80) return "Excellent";
    if (value >= 60) return "Good";
    if (value >= 40) return "Moderate";
    if (value >= 20) return "Needs Attention";
    return "Critical";
  };

  const scoreDiff = score - previousScore;
  const TrendIcon = scoreDiff > 0 ? TrendingUp : scoreDiff < 0 ? TrendingDown : Minus;

  const subScoreItems = [
    { label: "Profitability", value: subScores.profitability, max: 25, tooltip: "Revenue generation efficiency" },
    { label: "Liquidity", value: subScores.liquidity, max: 20, tooltip: "Ability to meet short-term obligations" },
    { label: "Efficiency", value: subScores.efficiency, max: 20, tooltip: "Operational performance" },
    { label: "Solvency", value: subScores.solvency, max: 20, tooltip: "Long-term financial stability" },
    { label: "Compliance", value: subScores.compliance, max: 15, tooltip: "Tax and regulatory adherence" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 opacity-10 bg-gradient-to-br",
        getScoreGradient(score)
      )} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Financial Health Score</h3>
            <p className="text-sm text-muted-foreground">Overall business health assessment</p>
          </div>
          <div className={cn(
            "flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium",
            scoreDiff > 0 ? "bg-success/20 text-success" :
              scoreDiff < 0 ? "bg-destructive/20 text-destructive" :
                "bg-muted text-muted-foreground"
          )}>
            <TrendIcon className="h-4 w-4" />
            <span>{scoreDiff > 0 ? "+" : ""}{scoreDiff.toFixed(1)}</span>
          </div>
        </div>

        {/* Main Score */}
        <div className="flex items-center gap-8 mb-8">
          {/* Circular Progress */}
          <div className="relative w-36 h-36">
            <svg className="w-36 h-36 -rotate-90">
              {/* Background circle */}
              <circle
                cx="72"
                cy="72"
                r="64"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted"
              />
              {/* Progress circle */}
              <motion.circle
                cx="72"
                cy="72"
                r="64"
                stroke="url(#scoreGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 402" }}
                animate={{ strokeDasharray: `${(score / 100) * 402} 402` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("text-4xl font-bold tabular-nums", getScoreColor(score))}
              >
                {score}
              </motion.span>
              <span className="text-xs text-muted-foreground">out of 100</span>
            </div>
          </div>

          {/* Score Label */}
          <div>
            <p className={cn("text-2xl font-bold", getScoreColor(score))}>
              {getScoreLabel(score)}
            </p>
            <p className="text-muted-foreground mt-1">
              Your business is financially healthy with room for improvement in working capital management.
            </p>
          </div>
        </div>

        {/* Sub Scores */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {subScoreItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-secondary/50 rounded-xl p-4"
            >
              <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
              <div className="flex items-end gap-2">
                <span className={cn("text-2xl font-bold tabular-nums", getScoreColor((item.value / item.max) * 100))}>
                  {item.value}
                </span>
                <span className="text-xs text-muted-foreground mb-1">/{item.max}</span>
              </div>
              {/* Mini progress bar */}
              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / item.max) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 * index }}
                  className={cn("h-full rounded-full bg-gradient-to-r", getScoreGradient((item.value / item.max) * 100))}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
