import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { 
  Wallet, 
  CreditCard, 
  FileText, 
  Shield, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Percent,
  Clock,
  IndianRupee,
  Star
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const loanProducts = [
  {
    id: 1,
    name: "Working Capital Loan",
    provider: "HDFC Bank",
    amount: "₹5L - ₹50L",
    interestRate: "12.5%",
    tenure: "12-36 months",
    eligibilityScore: 92,
    features: ["Quick disbursal", "Minimal documentation", "Flexible repayment"],
    recommended: true,
  },
  {
    id: 2,
    name: "Business Term Loan",
    provider: "ICICI Bank",
    amount: "₹10L - ₹2Cr",
    interestRate: "11.8%",
    tenure: "24-60 months",
    eligibilityScore: 85,
    features: ["Low interest rates", "Long tenure", "Collateral free up to ₹50L"],
    recommended: false,
  },
  {
    id: 3,
    name: "Invoice Financing",
    provider: "Kotak Mahindra",
    amount: "Up to 80% of invoice",
    interestRate: "14%",
    tenure: "30-90 days",
    eligibilityScore: 88,
    features: ["Immediate liquidity", "No collateral", "Pay as you get paid"],
    recommended: true,
  },
];

const creditLines = [
  {
    id: 1,
    name: "Business Line of Credit",
    provider: "Axis Bank",
    limit: "₹25L",
    interestRate: "15.5%",
    eligibilityScore: 78,
    features: ["Draw as needed", "Pay interest only on utilized amount", "Renewable annually"],
  },
  {
    id: 2,
    name: "Overdraft Facility",
    provider: "SBI",
    limit: "₹15L",
    interestRate: "13.5%",
    eligibilityScore: 82,
    features: ["Linked to current account", "Instant access", "Flexible limits"],
  },
];

const insuranceProducts = [
  {
    id: 1,
    name: "Business Insurance",
    provider: "ICICI Lombard",
    coverage: "₹1Cr",
    premium: "₹24,000/year",
    features: ["Property coverage", "Business interruption", "Liability protection"],
  },
  {
    id: 2,
    name: "Trade Credit Insurance",
    provider: "HDFC ERGO",
    coverage: "Up to ₹50L",
    premium: "₹18,000/year",
    features: ["Protects receivables", "Bad debt coverage", "Buyer insolvency protection"],
  },
];

const Products = () => {
  const [activeTab, setActiveTab] = useState("loans");

  return (
    <AppLayout title="Financial Products" subtitle="AI-recommended products for your business">
      <div className="space-y-6">
        {/* Eligibility Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Your Financial Profile</h3>
              <p className="text-sm text-muted-foreground">Based on your financial health score and business metrics</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-success">92%</p>
                <p className="text-xs text-muted-foreground">Credit Readiness</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">₹75L</p>
                <p className="text-xs text-muted-foreground">Max Eligibility</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-info">4</p>
                <p className="text-xs text-muted-foreground">Pre-Approved Offers</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="loans">
              <Wallet className="h-4 w-4 mr-2" />
              Loans
            </TabsTrigger>
            <TabsTrigger value="credit">
              <CreditCard className="h-4 w-4 mr-2" />
              Credit Lines
            </TabsTrigger>
            <TabsTrigger value="insurance">
              <Shield className="h-4 w-4 mr-2" />
              Insurance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="loans" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {loanProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass-card rounded-2xl p-6 relative ${product.recommended ? "border-2 border-primary" : ""}`}
                >
                  {product.recommended && (
                    <Badge className="absolute -top-2 -right-2 bg-primary">
                      <Star className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.provider}</p>
                    </div>
                    <Wallet className="h-8 w-8 text-primary opacity-50" />
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{product.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{product.interestRate} p.a.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{product.tenure}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Eligibility</span>
                      <span className="text-sm font-medium text-success">{product.eligibilityScore}%</span>
                    </div>
                    <Progress value={product.eligibilityScore} className="h-2" />
                  </div>

                  <div className="space-y-2 mb-4">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full">
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="credit" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {creditLines.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.provider}</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-primary opacity-50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Credit Limit</p>
                      <p className="text-lg font-semibold text-foreground">{product.limit}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Interest Rate</p>
                      <p className="text-lg font-semibold text-foreground">{product.interestRate}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Eligibility</span>
                      <span className="text-sm font-medium text-success">{product.eligibilityScore}%</span>
                    </div>
                    <Progress value={product.eligibilityScore} className="h-2" />
                  </div>

                  <div className="space-y-2 mb-4">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full">
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insurance" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insuranceProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.provider}</p>
                    </div>
                    <Shield className="h-8 w-8 text-primary opacity-50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Coverage</p>
                      <p className="text-lg font-semibold text-foreground">{product.coverage}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Premium</p>
                      <p className="text-lg font-semibold text-foreground">{product.premium}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full">
                    Get Quote
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Why These Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Why These Recommendations?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-secondary/50">
              <TrendingUp className="h-8 w-8 text-success mb-3" />
              <h4 className="font-medium text-foreground mb-1">Strong Revenue Growth</h4>
              <p className="text-sm text-muted-foreground">
                Your 18.5% revenue growth makes you eligible for higher loan amounts and better rates.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50">
              <Wallet className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-medium text-foreground mb-1">Healthy Cash Flow</h4>
              <p className="text-sm text-muted-foreground">
                Consistent positive cash flow indicates strong repayment capacity for credit products.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50">
              <Shield className="h-8 w-8 text-info mb-3" />
              <h4 className="font-medium text-foreground mb-1">Low Risk Profile</h4>
              <p className="text-sm text-muted-foreground">
                Your debt-to-equity ratio of 0.6 qualifies you for unsecured lending options.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Products;
