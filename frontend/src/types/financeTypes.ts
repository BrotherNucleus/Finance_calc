export type ContextType =
  | "project"
  | "business";

export type GeneralInfoData = {
  name: string;
  type: string;
  description: string;
  participantsOrEmployees: number | undefined;
  country?: string;
};

export type BudgetData = {
  totalBudget?: number | undefined;
  plannedBudget?: number | undefined;
  fundingSource?: string;
  currency?: string;
  duration?: number | undefined;
  planningHorizon?: number | undefined;
  budgetPeriod?: string;
};

export type CostsData = {
  estimatedExpenses?: number | undefined;
  additionalCosts?: number;
  reserveCosts?: number;
  otherCosts?: number;

  fixedCosts?: number | undefined;
  variableCosts?: number | undefined;
  operatingCosts?: number | undefined;
};

export type IncomeData = {
  additionalFunding?: number;
  ownContribution?: number | undefined;
  otherIncome?: number;

  expectedRevenue?: number | undefined;
  expectedProfit?: number | undefined;
  investmentAmount?: number | undefined;
};

export type TaxData = {
  vatIncluded?: boolean | null;

  vatRate?: number | undefined;
  incomeTaxRate?: number | undefined;

  additionalFees?: number;
  percentageFee?: number;
  supportAmount?: number | undefined;
  safetyReserve?: number;
};

export type FinanceFormData = {
  contextType: "project" | "business";
  currency: string ;
  generalInfo: GeneralInfoData;
  budget: BudgetData;
  costs: CostsData;
  income: IncomeData;
  taxes: TaxData;
};

