// TEMPORARY 

import type { FinanceFormData } from "../types/financeTypes";

export type FinanceResult = {
  totalBudget: number;
  totalCosts: number;
  totalIncome: number;
  finalBalance: number;
};

export function calculateFinanceMock(data: FinanceFormData): FinanceResult {
  const totalBudget =
    data.contextType === "project"
      ? data.budget.totalBudget || 0
      : data.budget.plannedBudget || 0;

  const totalCosts =
    (data.costs.estimatedExpenses || 0) +
    (data.costs.additionalCosts || 0) +
    (data.costs.reserveCosts || 0) +
    (data.costs.otherCosts || 0) +
    (data.costs.fixedCosts || 0) +
    (data.costs.variableCosts || 0) +
    (data.costs.operatingCosts || 0);

  const totalIncome =
    (data.income.additionalFunding || 0) +
    (data.income.ownContribution || 0) +
    (data.income.otherIncome || 0) +
    (data.income.expectedRevenue || 0);

  const finalBalance = totalBudget + totalIncome - totalCosts;

  return {
    totalBudget,
    totalCosts,
    totalIncome,
    finalBalance,
  };
}