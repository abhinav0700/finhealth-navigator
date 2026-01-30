
export interface FinancialData {
    revenue: number[];
    expenses: number[];
    cashFlow: number[];
    receivables: number;
    inventory: number;
    debt: number; // Total outstanding
    emi: number; // Monthly repayment
    gstPayable: number;
    gstPaid: number;
}

export interface ScoringResult {
    score: number;
    subScores: {
        profitability: number;
        liquidity: number;
        efficiency: number;
        solvency: number;
        compliance: number;
    };
    metrics: {
        netMargin: number;
        cashFlowVolatility: number;
        arToRevenue: number;
        inventoryToRevenue: number;
        emiToRevenue: number;
        gstPaymentRatio: number;
    };
    risks: string[];
    insights: string[];
}

export function calculateHealthScore(data: FinancialData): ScoringResult {
    const risks: string[] = [];
    const insights: string[] = [];

    // Helper: Average of array
    const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
    // Helper: Count occurrences
    const count = (arr: number[], predicate: (val: number, idx: number) => boolean) =>
        arr.reduce((acc, val, idx) => acc + (predicate(val, idx) ? 1 : 0), 0);

    const avgRevenue = average(data.revenue);
    const totalRevenue = data.revenue.reduce((a, b) => a + b, 0);
    const totalExpenses = data.expenses.reduce((a, b) => a + b, 0);
    const months = data.revenue.length;

    // --- 1. Profitability (Max 25) ---
    let profitScore = 0;
    const unprofitableMonths = count(data.revenue, (rev, i) => data.expenses[i] > rev);
    const unprofitableRatio = unprofitableMonths / months;
    const netMargin = totalRevenue > 0 ? (totalRevenue - totalExpenses) / totalRevenue : 0;

    if (unprofitableRatio > 0.4) {
        profitScore = 10;
        risks.push(`Profitability capped at 10: Expenses exceeded revenue in ${(unprofitableRatio * 100).toFixed(0)}% of months.`);
    } else if (netMargin < 0.05) {
        profitScore = 12;
        risks.push(`Profitability capped at 12: Net margin is ${(netMargin * 100).toFixed(1)}% (below 5%).`);
    } else {
        // Scale up to 25. Base 15.
        // Bonus for higher margin. Max 10 bonus for margin >= 20%.
        profitScore = 15;
        const marginBonus = Math.min(10, (netMargin - 0.05) * 66.6); // approx 1.5% margin = 1 point
        profitScore += marginBonus;

        // Penalize for inconsistent profitability even if overall healthy
        if (unprofitableRatio > 0) {
            profitScore -= unprofitableRatio * 20;
        }

        // Cap at 25
        profitScore = Math.min(25, profitScore);

        if (profitScore >= 24) {
            insights.push("Excellent profitability and consistency.");
        }
    }

    // --- 2. Liquidity (Max 20) ---
    let liquidityScore = 20;
    const negativeCashFlowMonths = count(data.cashFlow, (cf) => cf < 0);
    const negativeCashFlowRatio = negativeCashFlowMonths / months;

    // Calculate Volatility (StdDev / Mean)
    const avgCashFlow = average(data.cashFlow);
    const variance = data.cashFlow.reduce((acc, val) => acc + Math.pow(val - avgCashFlow, 2), 0) / months;
    const stdDev = Math.sqrt(variance);
    const volatility = avgCashFlow !== 0 ? stdDev / Math.abs(avgCashFlow) : 0;

    if (negativeCashFlowRatio > 0.5) {
        liquidityScore = Math.min(liquidityScore, 5);
        risks.push(`Liquidity capped at 5: Negative operating cash flow in ${(negativeCashFlowRatio * 100).toFixed(0)}% of months.`);
    }

    if (volatility > 0.3) {
        const penalty = Math.min(10, (volatility - 0.3) * 20); // Scale penalty
        liquidityScore -= penalty;
        risks.push(`Liquidity penalized: Cash flow volatility is ${(volatility * 100).toFixed(0)}% (>30%).`);
    }

    liquidityScore = Math.max(0, liquidityScore);

    // --- 3. Efficiency / Working Capital (Max 20) ---
    let efficiencyScore = 20;
    const arToRevenue = avgRevenue > 0 ? data.receivables / avgRevenue : 0;
    const inventoryToRevenue = avgRevenue > 0 ? data.inventory / avgRevenue : 0;

    if (arToRevenue > 3) {
        efficiencyScore = Math.min(efficiencyScore, 6);
        risks.push(`Efficiency capped at 6: Accounts Receivable is ${arToRevenue.toFixed(1)}x monthly revenue (>3x).`);
    } else if (arToRevenue > 1.0) {
        // Stricter penalty: start at 1.0x
        efficiencyScore -= (arToRevenue - 1.0) * 8;
        insights.push(`Warning: Receivable cycle is slowing down (${arToRevenue.toFixed(1)}x revenue).`);
    }

    if (inventoryToRevenue > 2) {
        const penalty = (inventoryToRevenue - 2) * 5;
        efficiencyScore -= penalty;
        risks.push(`Efficiency penalized: Inventory is ${inventoryToRevenue.toFixed(1)}x monthly revenue (>2x).`);
    }

    efficiencyScore = Math.max(0, efficiencyScore);


    // --- 4. Solvency / Debt (Max 20) ---
    let solvencyScore = 20;
    // If EMI is not provided, estimate it? No, requirement says 'Calculate EMI / revenue'. 
    // We assume EMI is passed in data. If 0, we can't score debt risk properly unless we assume interest only. 
    // Let's assume data.emi is annualized or monthly? "Calculate EMI / revenue" usually means Monthly EMI / Monthly Revenue.
    // We'll use monthly average revenue.
    const emiToRevenue = avgRevenue > 0 ? data.emi / avgRevenue : 0;

    if (emiToRevenue > 0.5) {
        solvencyScore = Math.min(solvencyScore, 4);
        risks.push(`Solvency critical (capped at 4): EMI is ${(emiToRevenue * 100).toFixed(0)}% of revenue (>50%).`);
    } else if (emiToRevenue >= 0.3) {
        solvencyScore = Math.min(solvencyScore, 8);
        risks.push(`Solvency high risk (capped at 8): EMI is ${(emiToRevenue * 100).toFixed(0)}% of revenue (≥30%).`);
    } else if (emiToRevenue > 0.15) {
        solvencyScore -= (emiToRevenue - 0.15) * 40; // Stricter penalty
    }

    // "Loan outstanding rising with weak cash flow" -> penalty
    // We need loan history or just current loan + cash flow check.
    // Simple proxy: High Debt (> 6x revenue) AND Negative Cash Flow Ratio > 20%
    const debtToRevenue = avgRevenue > 0 ? data.debt / avgRevenue : 0;
    if (debtToRevenue > 6 && negativeCashFlowRatio > 0.2) {
        solvencyScore -= 5;
        risks.push(`Solvency penalty: High debt (${debtToRevenue.toFixed(1)}x) combined with weak cash flow.`);
    }

    solvencyScore = Math.max(0, solvencyScore);

    // --- 5. Compliance (Max 15) ---
    let complianceScore = 15;
    const gstPaymentRatio = data.gstPayable > 0 ? data.gstPaid / data.gstPayable : 1;

    if (gstPaymentRatio < 0.5) {
        complianceScore = Math.min(complianceScore, 3);
        risks.push(`Compliance critical (capped at 3): GST Paid is ${(gstPaymentRatio * 100).toFixed(0)}% of payable (<50%).`);
    } else if (gstPaymentRatio < 0.8) {
        complianceScore = Math.min(complianceScore, 6);
        risks.push(`Compliance high risk (capped at 6): GST Paid is ${(gstPaymentRatio * 100).toFixed(0)}% of payable (<80%).`);
    }

    // --- Global Risk Overrides ---
    let totalScore = profitScore + liquidityScore + efficiencyScore + solvencyScore + complianceScore;

    let criticalCategories = 0;
    if (profitScore <= 12) criticalCategories++;
    if (liquidityScore <= 5) criticalCategories++;
    if (efficiencyScore <= 6) criticalCategories++;
    if (solvencyScore <= 8) criticalCategories++;
    if (complianceScore <= 6) criticalCategories++;

    if (criticalCategories >= 2) {
        totalScore = Math.min(totalScore, 25);
        risks.push(`GLOBAL CRITIAL OVERRIDE: 2 or more categories are critical. Total score capped at 25.`);
    }

    // "If cash flow negative AND expenses > revenue, total score must not exceed 20"
    // Assuming "expense > revenue" refers to the overall period or majority of months? 
    // Prompt: "If expenses > revenue in more than 40% of months" was the profit criteria.
    // Prompt: "If cash flow negative AND expenses > revenue" - probably checking aggregates or high frequency.
    // Implementation: If Profit Score is hit by >40% rule AND Liquidity Score is hit by >50% rule.
    if (unprofitableRatio > 0.4 && negativeCashFlowRatio > 0.5) {
        totalScore = Math.min(totalScore, 20);
        risks.push(`GLOBAL RISK OVERRIDE: Significant losses and negative cash flow. Score capped at 20.`);
    }

    // Round scores
    return {
        score: Math.round(totalScore),
        subScores: {
            profitability: Math.round(profitScore),
            liquidity: Math.round(liquidityScore),
            efficiency: Math.round(efficiencyScore),
            solvency: Math.round(solvencyScore),
            compliance: Math.round(complianceScore)
        },
        metrics: {
            netMargin,
            cashFlowVolatility: volatility,
            arToRevenue,
            inventoryToRevenue,
            emiToRevenue,
            gstPaymentRatio
        },
        risks: [...new Set(risks)], // Dedupe
        insights: insights.length > 0 ? insights : ["Financial health appears stable across major categories."]
    };
}
