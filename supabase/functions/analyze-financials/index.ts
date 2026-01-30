import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface FinancialData {
  revenue: number[];
  expenses: number[];
  cashFlow: number[];
  receivables: number;
  payables: number;
  inventory: number;
  debt: number;
  equity: number;
}

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
}

function calculateFinancialMetrics(data: FinancialData): AnalysisResult {
  const totalRevenue = data.revenue.reduce((a, b) => a + b, 0);
  const totalExpenses = data.expenses.reduce((a, b) => a + b, 0);
  const netProfit = totalRevenue - totalExpenses;
  
  // Calculate ratios
  const currentAssets = data.cashFlow.reduce((a, b) => Math.max(0, a + b), 0) + data.receivables + data.inventory;
  const currentLiabilities = data.payables;
  const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 2.0;
  
  const debtToEquity = data.equity > 0 ? data.debt / data.equity : 0;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  
  // Inventory turnover (Cost of Goods Sold / Average Inventory)
  const cogs = totalExpenses * 0.6; // Estimate COGS as 60% of expenses
  const inventoryTurnover = data.inventory > 0 ? cogs / data.inventory : 0;
  
  // Days Sales Outstanding
  const avgDailyRevenue = totalRevenue / 365;
  const dso = avgDailyRevenue > 0 ? data.receivables / avgDailyRevenue : 0;
  
  // Calculate sub-scores (0-100)
  const liquidity = Math.min(100, Math.max(0, currentRatio * 50));
  const profitability = Math.min(100, Math.max(0, profitMargin * 5 + 50));
  const solvency = Math.min(100, Math.max(0, 100 - debtToEquity * 50));
  const efficiency = Math.min(100, Math.max(0, inventoryTurnover * 10 + (60 - dso)));
  
  // Overall health score
  const healthScore = Math.round((liquidity * 0.25 + profitability * 0.3 + solvency * 0.25 + efficiency * 0.2));
  
  return {
    healthScore,
    subScores: {
      liquidity: Math.round(liquidity),
      profitability: Math.round(profitability),
      solvency: Math.round(solvency),
      efficiency: Math.round(efficiency),
    },
    metrics: {
      currentRatio: Math.round(currentRatio * 100) / 100,
      debtToEquity: Math.round(debtToEquity * 100) / 100,
      profitMargin: Math.round(profitMargin * 100) / 100,
      inventoryTurnover: Math.round(inventoryTurnover * 100) / 100,
      dso: Math.round(dso),
    },
    insights: [],
    risks: [],
    recommendations: [],
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { financialData, analysisType } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }
    
    // Step 1: Calculate financial metrics
    console.log("Calculating financial metrics...");
    const calculatedMetrics = calculateFinancialMetrics(financialData);
    
    // Step 2: Generate AI insights using Lovable AI
    console.log("Generating AI insights...");
    
    const systemPrompt = `You are an expert financial analyst for SMEs (Small and Medium Enterprises) in India. 
Analyze the following financial data and provide actionable insights.

Financial Health Score: ${calculatedMetrics.healthScore}/100
Sub-Scores:
- Liquidity: ${calculatedMetrics.subScores.liquidity}/100
- Profitability: ${calculatedMetrics.subScores.profitability}/100
- Solvency: ${calculatedMetrics.subScores.solvency}/100
- Efficiency: ${calculatedMetrics.subScores.efficiency}/100

Key Metrics:
- Current Ratio: ${calculatedMetrics.metrics.currentRatio}
- Debt to Equity: ${calculatedMetrics.metrics.debtToEquity}
- Profit Margin: ${calculatedMetrics.metrics.profitMargin}%
- Inventory Turnover: ${calculatedMetrics.metrics.inventoryTurnover}x
- Days Sales Outstanding: ${calculatedMetrics.metrics.dso} days

Provide your analysis in JSON format with the following structure:
{
  "insights": ["insight1", "insight2", "insight3"],
  "risks": ["risk1", "risk2"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
}

Keep each insight, risk, and recommendation concise (under 100 words).
Focus on actionable advice for Indian SME business owners.`;

    const userPrompt = `Analyze this business financial data:
- Monthly Revenue: ${JSON.stringify(financialData.revenue)}
- Monthly Expenses: ${JSON.stringify(financialData.expenses)}
- Cash Flow: ${JSON.stringify(financialData.cashFlow)}
- Receivables: ₹${financialData.receivables.toLocaleString('en-IN')}
- Payables: ₹${financialData.payables.toLocaleString('en-IN')}
- Inventory: ₹${financialData.inventory.toLocaleString('en-IN')}
- Total Debt: ₹${financialData.debt.toLocaleString('en-IN')}
- Equity: ₹${financialData.equity.toLocaleString('en-IN')}

Provide specific, actionable insights for improving financial health.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Rate limit exceeded. Please try again later.",
          calculatedMetrics 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "Payment required. Please add credits to continue.",
          calculatedMetrics 
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      // Return calculated metrics even if AI fails
      return new Response(JSON.stringify({ 
        ...calculatedMetrics,
        insights: ["Financial analysis complete. AI insights temporarily unavailable."],
        risks: ["Unable to generate AI risk assessment at this time."],
        recommendations: ["Please try again later for detailed AI recommendations."],
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResponse = await response.json();
    const aiContent = aiResponse.choices?.[0]?.message?.content || "";
    
    console.log("AI Response received:", aiContent.substring(0, 200));
    
    // Parse AI response
    let aiInsights: { insights: string[]; risks: string[]; recommendations: string[] } = { 
      insights: [], 
      risks: [], 
      recommendations: [] 
    };
    try {
      // Extract JSON from the response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiInsights = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      aiInsights = {
        insights: [aiContent.substring(0, 500)],
        risks: ["Review needed for potential financial risks"],
        recommendations: ["Consult with a financial advisor for detailed analysis"],
      };
    }

    // Combine calculated metrics with AI insights
    const finalResult = {
      ...calculatedMetrics,
      insights: aiInsights.insights || [],
      risks: aiInsights.risks || [],
      recommendations: aiInsights.recommendations || [],
      analysisTimestamp: new Date().toISOString(),
    };

    console.log("Analysis complete. Health Score:", finalResult.healthScore);

    return new Response(JSON.stringify(finalResult), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
