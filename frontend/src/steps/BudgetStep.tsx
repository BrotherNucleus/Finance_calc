import InputField from "../components/InputField";
import type { BudgetData } from "../types/financeTypes";

type BudgetStepProps = {
  contextType: "project" | "business" | null;
  data: BudgetData;
  errors: Record<string, string>;
  onChange: (data: BudgetData) => void;
};

function BudgetStep({
  contextType,
  data,
  errors,
  onChange,
}: BudgetStepProps) {
  const handleNumberChange = (value: string) => {
    return value === "" ? undefined : Number(value);
  };

  if (contextType === "project") {
    return (
      <div className="step-card">
        <p className="step-small-title">Step 3 of 7</p>

        <h2>Project Budget</h2>

        <p className="step-description">
          Enter basic budget information for your project or university activity.
        </p>

        <div className="form-grid">
          <div>
            <InputField
              label="Total Budget"
              type="number"
              placeholder="e.g. 15000"
              value={data.totalBudget}
              className={errors.totalBudget ? "input-error" : ""}
              onChange={(value) =>
                onChange({
                  ...data,
                  totalBudget: handleNumberChange(value),
                })
              }
            />

            {errors.totalBudget && (
              <p className="error-text">{errors.totalBudget}</p>
            )}
          </div>

          <div className="form-group">
            <label>Currency</label>

            <select
              className={errors.currency ? "input-error" : ""}
              value={data.currency}
              onChange={(event) =>
                onChange({
                  ...data,
                  currency: event.target.value,
                })
              }
            >
              <option value="">Select currency</option>
              <option value="eur">EUR (€)</option>
              <option value="usd">USD ($)</option>
              <option value="pln">PLN (zł)</option>
              <option value="gbp">GBP (£)</option>
            </select>

            {errors.currency && (
              <p className="error-text">{errors.currency}</p>
            )}
          </div>

          <div className="form-group">
            <label>Main Funding Source</label>

            <select
              className={errors.fundingSource ? "input-error" : ""}
              value={data.fundingSource}
              onChange={(event) =>
                onChange({
                  ...data,
                  fundingSource: event.target.value,
                })
              }
            >
              <option value="">Select funding source</option>
              <option value="university">University</option>
              <option value="grant">Grant</option>
              <option value="private">Private funding</option>
              <option value="sponsorship">Sponsorship</option>
              <option value="own-budget">Own budget</option>
              <option value="other">Other</option>
            </select>

            {errors.fundingSource && (
              <p className="error-text">{errors.fundingSource}</p>
            )}
          </div>

          <div>
            <InputField
              label="Project Duration (months)"
              type="number"
              placeholder="e.g. 6"
              value={data.duration}
              className={errors.duration ? "input-error" : ""}
              onChange={(value) =>
                onChange({
                  ...data,
                  duration: handleNumberChange(value),
                })
              }
            />

            {errors.duration && (
              <p className="error-text">{errors.duration}</p>
            )}
          </div>

          <div className="form-group">
            <label>Budget Period</label>

            <select
              className={errors.budgetPeriod ? "input-error" : ""}
              value={data.budgetPeriod}
              onChange={(event) =>
                onChange({
                  ...data,
                  budgetPeriod: event.target.value,
                })
              }
            >
              <option value="">Select period</option>
              <option value="one-time">One-time project</option>
              <option value="monthly">Monthly</option>
              <option value="semester">Semester</option>
              <option value="yearly">Yearly</option>
            </select>

            {errors.budgetPeriod && (
              <p className="error-text">{errors.budgetPeriod}</p>
            )}
          </div>

          <div className="form-group full-width">
            <label>Budget Notes (optional)</label>
            <textarea placeholder="Additional project budget information..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <p className="step-small-title">Step 3 of 7</p>

      <h2>Business Budget</h2>

      <p className="step-description">
        Enter general budget information for your company or business case.
      </p>

      <div className="form-grid">
        <div>
          <InputField
            label="Planned Budget"
            type="number"
            placeholder="e.g. 500000"
            value={data.plannedBudget}
            className={errors.plannedBudget ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                plannedBudget: handleNumberChange(value),
              })
            }
          />

          {errors.plannedBudget && (
            <p className="error-text">{errors.plannedBudget}</p>
          )}
        </div>

        <div className="form-group">
          <label>Currency</label>

          <select
            className={errors.currency ? "input-error" : ""}
            value={data.currency}
            onChange={(event) =>
              onChange({
                ...data,
                currency: event.target.value,
              })
            }
          >
            <option value="">Select currency</option>
            <option value="eur">EUR (€)</option>
            <option value="usd">USD ($)</option>
            <option value="pln">PLN (zł)</option>
            <option value="gbp">GBP (£)</option>
          </select>

          {errors.currency && (
            <p className="error-text">{errors.currency}</p>
          )}
        </div>

        <div className="form-group">
          <label>Budget Period</label>

          <select
            className={errors.budgetPeriod ? "input-error" : ""}
            value={data.budgetPeriod}
            onChange={(event) =>
              onChange({
                ...data,
                budgetPeriod: event.target.value,
              })
            }
          >
            <option value="">Select period</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>

          {errors.budgetPeriod && (
            <p className="error-text">{errors.budgetPeriod}</p>
          )}
        </div>

        <div>
          <InputField
            label="Planning Horizon (months)"
            type="number"
            placeholder="e.g. 12"
            value={data.planningHorizon}
            className={errors.planningHorizon ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                planningHorizon: handleNumberChange(value),
              })
            }
          />

          {errors.planningHorizon && (
            <p className="error-text">{errors.planningHorizon}</p>
          )}
        </div>

        <div className="form-group full-width">
          <label>Budget Notes (optional)</label>
          <textarea placeholder="Additional business budget information..." />
        </div>
      </div>
    </div>
  );
}

export default BudgetStep;