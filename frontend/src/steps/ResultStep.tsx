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

  if (contextType === "project") {
    return (
      <div className="step-card">
        <h2>Results & Export</h2>

        <p className="step-description">
          Summary of your project budget and financial balance.
        </p>

        <div className="results-grid">
          <div className="result-card">
            <h3>Total Budget</h3>
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
            <h3>Additional Funding</h3>
            <p>
              {results.totalIncome} {currency}
            </p>
          </div>

          <div className="result-card">
            <h3>Remaining Budget</h3>
            <p>
              {results.finalBalance} {currency}
            </p>
          </div>
        </div>

        <div className="final-result-box">
          <h3>Estimated Final Balance</h3>
          <p>
            {results.finalBalance} {currency}
          </p>
        </div>

        <div className="chart-placeholder">
          Financial charts will appear here.
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

  return (
    <div className="step-card">
      <h2>Results & Export</h2>

      <p className="step-description">
        Summary of your business financial calculations.
      </p>

      <div className="results-grid">
        <div className="result-card">
          <h3>Planned Budget</h3>
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
          <h3>Total Income</h3>
          <p>
            {results.totalIncome} {currency}
          </p>
        </div>

        <div className="result-card">
          <h3>Expected Profit</h3>
          <p>
            {results.finalBalance} {currency}
          </p>
        </div>
      </div>

      <div className="final-result-box">
        <h3>Estimated Annual Profit</h3>
        <p>
          {results.finalBalance} {currency}
        </p>
      </div>

      <div className="chart-placeholder">
        Financial charts will appear here.
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