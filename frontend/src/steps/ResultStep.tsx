import type { FinanceFormData } from "../types/financeTypes";
import { exportPDF, exportExcel } from "../utils/exportHelpers";
import { calculateFinanceMock } from "../utils/mockCalculations";

type ResultStepProps = {
  contextType: "project" | "business" | null;
  formData: FinanceFormData;
  onReset: () => void;
};

function ResultStep({ contextType, formData, onReset }: ResultStepProps) {
  const results = calculateFinanceMock(formData);

  const currencyMap: Record<string, string> = {
    EUR: "€",
    USD: "$",
    PLN: "zł",
    GBP: "£",
  };

  const currency =
    currencyMap[(formData.budget.currency || "EUR").toUpperCase()] || "€";

  const hasValue = (value: unknown) => {
    return value !== undefined && value !== null && value !== "";
  };

  const formatValue = (value: unknown) => {
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    return String(value);
  };

  const renderField = (label: string, value: unknown) => {
    if (!hasValue(value)) {
      return null;
    }

    return (
      <div className="summary-item">
        <span>{label}</span>
        <strong>{formatValue(value)}</strong>
      </div>
    );
  };

  return (
    <div className="step-card result-step">
      <h2>Results & Export</h2>

      <p className="step-description">
        Review your entered information first, then check the calculated financial summary.
      </p>

      <div className="summary-wrapper">
        <div className="summary-section">
          <h3>General information</h3>

          <div className="summary-grid">
            {renderField(
              contextType === "business"
                ? "Company / Business Name"
                : "Project Name",
              formData.generalInfo.name
            )}

            {renderField(
              contextType === "business" ? "Business Type" : "Project Type",
              formData.generalInfo.type
            )}

            {renderField(
              contextType === "business"
                ? "Number of Employees"
                : "Number of Participants",
              formData.generalInfo.participantsOrEmployees
            )}

            {renderField("Operating Country", formData.generalInfo.country)}
            {renderField("Description", formData.generalInfo.description)}
          </div>
        </div>

        <div className="summary-section">
          <h3>Budget information</h3>

          <div className="summary-grid">
            {renderField("Currency", formData.budget.currency?.toUpperCase())}
            {renderField("Total Budget", formData.budget.totalBudget)}
            {renderField("Planned Budget", formData.budget.plannedBudget)}
            {renderField("Main Funding Source", formData.budget.fundingSource)}
            {renderField("Project Duration (months)", formData.budget.duration)}
            {renderField("Planning Horizon (months)", formData.budget.planningHorizon)}
            {renderField("Budget Period", formData.budget.budgetPeriod)}
          </div>
        </div>

        <div className="summary-section">
          <h3>Costs information</h3>

          <div className="summary-grid">
            {renderField("Estimated Expenses", formData.costs.estimatedExpenses)}
            {renderField("Additional Costs", formData.costs.additionalCosts)}
            {renderField("Reserve / Emergency Costs", formData.costs.reserveCosts)}
            {renderField("Fixed Costs", formData.costs.fixedCosts)}
            {renderField("Variable Costs", formData.costs.variableCosts)}
            {renderField("Operating Costs", formData.costs.operatingCosts)}
            {renderField("Other Costs", formData.costs.otherCosts)}
          </div>
        </div>

        <div className="summary-section">
          <h3>
            {contextType === "business"
              ? "Income information"
              : "Funding information"}
          </h3>

          <div className="summary-grid">
            {renderField("Additional Funding", formData.income.additionalFunding)}
            {renderField("Own Contribution", formData.income.ownContribution)}
            {renderField("Other Income", formData.income.otherIncome)}
            {renderField("Expected Revenue", formData.income.expectedRevenue)}
            {renderField("Expected Profit", formData.income.expectedProfit)}
            {renderField("Investment Amount", formData.income.investmentAmount)}
          </div>
        </div>

        <div className="summary-section">
          <h3>Taxes, fees & adjustments</h3>

          <div className="summary-grid">
            {renderField("VAT Included", formData.taxes.vatIncluded)}
            {renderField("VAT Rate (%)", formData.taxes.vatRate)}
            {renderField("Income Tax Rate (%)", formData.taxes.incomeTaxRate)}
            {renderField("Additional Fees", formData.taxes.additionalFees)}
            {renderField("Percentage Fee (%)", formData.taxes.percentageFee)}
            {renderField(
              "Tax Deductions / Support Amount",
              formData.taxes.supportAmount
            )}
            {renderField("Safety Reserve", formData.taxes.safetyReserve)}
          </div>
        </div>
      </div>

      <div className="result-calculations">
        <h3>Calculated financial summary</h3>

        <div className="results-grid">
          <div className="result-card">
            <h3>
              {contextType === "business" ? "Planned Budget" : "Total Budget"}
            </h3>
            <p>
              {results.totalBudget} {currency}
            </p>
          </div>

          <div className="result-card">
            <h3>Total Costs</h3>
            <p>
              {results.totalCosts} {currency}
            </p>
          </div>

          <div className="result-card">
            <h3>
              {contextType === "business"
                ? "Total Income"
                : "Additional Funding"}
            </h3>
            <p>
              {results.totalIncome} {currency}
            </p>
          </div>

          <div className="result-card">
            <h3>
              {contextType === "business"
                ? "Expected Profit"
                : "Remaining Budget"}
            </h3>
            <p>
              {results.finalBalance} {currency}
            </p>
          </div>
        </div>

        <div className="final-result-box">
          <h3>
            {contextType === "business"
              ? "Estimated Annual Profit"
              : "Estimated Final Balance"}
          </h3>

          <p>
            {results.finalBalance} {currency}
          </p>
        </div>
      </div>

      <div className="export-buttons">
        <button className="export-pdf" onClick={() => exportPDF(formData)}>
          Export PDF
        </button>

        <button className="export-excel" onClick={() => exportExcel(formData)}>
          Export Excel
        </button>

        <button className="reset-button" onClick={onReset}>
          Calculate another budget
        </button>
      </div>
    </div>
  );
}

export default ResultStep;