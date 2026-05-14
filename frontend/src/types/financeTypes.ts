export type ContextType =
  | "project"
  | "business";

export type GeneralInfoData = {
  name: string;
  type: string;
  description: string;
  participantsOrEmployees: number;
  country?: string;
};

export type BudgetData = {
  totalBudget?: number;
  plannedBudget?: number;
  fundingSource?: string;
  currency?: string;
  duration?: number;
  planningHorizon?: number;
  budgetPeriod?: string;
};

export type CostsData = {
  estimatedExpenses?: number;
  additionalCosts?: number;
  reserveCosts?: number;
  otherCosts?: number;

  fixedCosts?: number;
  variableCosts?: number;
  operatingCosts?: number;
};

export type IncomeData = {
  additionalFunding?: number;
  ownContribution?: number;
  otherIncome?: number;

  expectedRevenue?: number;
  expectedProfit?: number;
  investmentAmount?: number;
};

export type TaxData = {
  vatIncluded?: boolean;

  vatRate?: number;
  incomeTaxRate?: number;

  additionalFees?: number;
  percentageFee?: number;
  supportAmount?: number;
  safetyReserve?: number;
};

export type FinanceFormData = {
  contextType: "project" | "business";
  currency: string;
  generalInfo: GeneralInfoData;
  budget: BudgetData;
  costs: CostsData;
  income: IncomeData;
  taxes: TaxData;
};

