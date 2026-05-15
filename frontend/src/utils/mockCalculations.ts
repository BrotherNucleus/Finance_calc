import type {
  BudgetData,
  CostsData,
  FinanceFormData,
  IncomeData,
  TaxData,
} from "../types/financeTypes";

export type FinanceResult = {
  totalBudget: number;
  totalCosts: number;
  totalIncome: number;
  finalBalance: number;
};

function valueOrZero(value?: number): number {
  return value || 0;
}

function calculatePercentageAmount(baseAmount: number, percentage?: number): number {
  return baseAmount * (valueOrZero(percentage) / 100);
}

export function getBaseBudget(
  contextType: FinanceFormData["contextType"],
  budget: BudgetData
): number {
  return contextType === "project"
    ? valueOrZero(budget.totalBudget)
    : valueOrZero(budget.plannedBudget);
}

export function calculateProjectCosts(costs: CostsData): number {
  return (
    valueOrZero(costs.estimatedExpenses) +
    valueOrZero(costs.additionalCosts) +
    valueOrZero(costs.reserveCosts) +
    valueOrZero(costs.otherCosts)
  );
}

export function calculateBusinessCosts(costs: CostsData): number {
  return (
    valueOrZero(costs.fixedCosts) +
    valueOrZero(costs.variableCosts) +
    valueOrZero(costs.operatingCosts) +
    valueOrZero(costs.otherCosts)
  );
}

export function calculateProjectIncome(income: IncomeData): number {
  return (
    valueOrZero(income.additionalFunding) +
    valueOrZero(income.ownContribution) +
    valueOrZero(income.otherIncome)
  );
}

export function calculateBusinessIncome(income: IncomeData): number {
  return (
    valueOrZero(income.expectedRevenue) +
    valueOrZero(income.otherIncome)
  );
}

export function calculateAdditionalFees(taxes: TaxData, baseAmount: number): number {
  return (
    valueOrZero(taxes.additionalFees) +
    calculatePercentageAmount(baseAmount, taxes.percentageFee)
  );
}

export function calculateVatAmount(taxes: TaxData, baseAmount: number): number {
  if (taxes.vatIncluded === true) {
    return 0;
  }

  return calculatePercentageAmount(baseAmount, taxes.vatRate);
}

export function calculateSafetyReserve(taxes: TaxData): number {
  return valueOrZero(taxes.safetyReserve);
}

export function calculateSupportAmount(taxes: TaxData): number {
  return valueOrZero(taxes.supportAmount);
}

export function calculateIncomeTax(taxes: TaxData, profitBeforeTax: number): number {
  if (profitBeforeTax <= 0) {
    return 0;
  }

  return calculatePercentageAmount(profitBeforeTax, taxes.incomeTaxRate);
}

export function calculateFinalBalance(
  availableMoney: number,
  totalDeductions: number
): number {
  return availableMoney - totalDeductions;
}

export function calculateFinanceResults(data: FinanceFormData): FinanceResult {
  const baseBudget = getBaseBudget(data.contextType, data.budget);

  const baseCosts =
    data.contextType === "project"
      ? calculateProjectCosts(data.costs)
      : calculateBusinessCosts(data.costs);

  const baseIncome =
    data.contextType === "project"
      ? calculateProjectIncome(data.income)
      : calculateBusinessIncome(data.income);

  const supportAmount = calculateSupportAmount(data.taxes);
  const additionalFees = calculateAdditionalFees(data.taxes, baseCosts);
  const vatAmount = calculateVatAmount(data.taxes, baseCosts);
  const safetyReserve = calculateSafetyReserve(data.taxes);

  const availableMoney = baseBudget + baseIncome + supportAmount;
  const costsBeforeIncomeTax =
    baseCosts + additionalFees + vatAmount + safetyReserve;
  const profitBeforeTax = availableMoney - costsBeforeIncomeTax;
  const incomeTax =
    data.contextType === "business"
      ? calculateIncomeTax(data.taxes, profitBeforeTax)
      : 0;

  const totalCosts = costsBeforeIncomeTax + incomeTax;
  const totalIncome = baseIncome + supportAmount;
  const finalBalance = calculateFinalBalance(availableMoney, totalCosts);

  return {
    totalBudget: baseBudget,
    totalCosts,
    totalIncome,
    finalBalance,
  };
}

export function calculateFinanceMock(data: FinanceFormData): FinanceResult {
  return calculateFinanceResults(data);
}
