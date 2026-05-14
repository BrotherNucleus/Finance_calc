import InputField from "../components/InputField";

import type {
  BudgetData,
} from "../types/financeTypes";

type BudgetStepProps = {
  contextType: "project" | "business" | null;

  data: BudgetData;

  onChange: (
    data: BudgetData
  ) => void;
};

function BudgetStep({
  contextType,
  data,
  onChange,
}: BudgetStepProps) {
  if (contextType === "project") {
    return (
      <div className="step-card">
        <p className="step-small-title">
          Step 3 of 7
        </p>

        <h2>Project Budget</h2>

        <p className="step-description">
          Enter basic budget information for your project or university activity.
        </p>

        <div className="form-grid">
          <InputField
            label="Total Budget"
            type="number"
            placeholder="e.g. 15000"
            value={data.totalBudget}
            onChange={(value) =>
              onChange({
                ...data,
                totalBudget:
                  Number(value),
              })
            }
          />
        <div className="form-group">
          <label>Currency</label>

          <select
            value={data.currency}
            onChange={(event) =>
              onChange({
                ...data,
                currency:
                  event.target.value,
              })
            }
          >
            <option value="">
              Select currency
            </option>

            <option value="eur">
              EUR (€)
            </option>

            <option value="usd">
              USD ($)
            </option>

            <option value="pln">
              PLN (zł)
            </option>

            <option value="gbp">
              GBP (£)
            </option>
          </select>
        </div>

          <div className="form-group">
            <label>
              Main Funding Source
            </label>

            <select
              value={data.fundingSource}
              onChange={(event) =>
                onChange({
                  ...data,
                  fundingSource:
                    event.target.value,
                })
              }
            >
              <option value="">
                Select funding source
              </option>

              <option value="university">
                University
              </option>

              <option value="grant">
                Grant
              </option>

              <option value="private">
                Private funding
              </option>

              <option value="sponsorship">
                Sponsorship
              </option>

              <option value="own-budget">
                Own budget
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>

          <InputField
            label="Project Duration (months)"
            type="number"
            placeholder="e.g. 6"
            value={data.duration}
            onChange={(value) =>
              onChange({
                ...data,
                duration:
                  Number(value),
              })
            }
          />

          <div className="form-group">
            <label>
              Budget Period
            </label>

            <select
              value={data.budgetPeriod}
              onChange={(event) =>
                onChange({
                  ...data,
                  budgetPeriod:
                    event.target.value,
                })
              }
            >
              <option value="">
                Select period
              </option>

              <option value="one-time">
                One-time project
              </option>

              <option value="monthly">
                Monthly
              </option>

              <option value="semester">
                Semester
              </option>

              <option value="yearly">
                Yearly
              </option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>
              Budget Notes (optional)
            </label>

            <textarea placeholder="Additional project budget information..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <p className="step-small-title">
        Step 3 of 7
      </p>

      <h2>Business Budget</h2>

      <p className="step-description">
        Enter general budget information for your company or business case.
      </p>

      <div className="form-grid">
        <InputField
          label="Planned Budget"
          type="number"
          placeholder="e.g. 500000"
          value={data.plannedBudget}
          onChange={(value) =>
            onChange({
              ...data,
              plannedBudget:
                Number(value),
            })
          }
        />

        <div className="form-group">
          <label>Currency</label>

          <select
            value={data.currency}
            onChange={(event) =>
              onChange({
                ...data,
                currency:
                  event.target.value,
              })
            }
          >
            <option value="">
              Select currency
            </option>

            <option value="eur">
              EUR (€)
            </option>

            <option value="usd">
              USD ($)
            </option>

            <option value="pln">
              PLN (zł)
            </option>

            <option value="gbp">
              GBP (£)
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Budget Period
          </label>

          <select
            value={data.budgetPeriod}
            onChange={(event) =>
              onChange({
                ...data,
                budgetPeriod:
                  event.target.value,
              })
            }
          >
            <option value="">
              Select period
            </option>

            <option value="monthly">
              Monthly
            </option>

            <option value="quarterly">
              Quarterly
            </option>

            <option value="yearly">
              Yearly
            </option>
          </select>
        </div>

        <InputField
          label="Planning Horizon (months)"
          type="number"
          placeholder="e.g. 12"
          value={data.planningHorizon}
          onChange={(value) =>
            onChange({
              ...data,
              planningHorizon:
                Number(value),
            })
          }
        />

        <div className="form-group full-width">
          <label>
            Budget Notes (optional)
          </label>

          <textarea placeholder="Additional business budget information..." />
        </div>
      </div>
    </div>
  );
}

export default BudgetStep;