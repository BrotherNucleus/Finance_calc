import InputField from "../components/InputField";
import type { IncomeData } from "../types/financeTypes";

type ProfitStepProps = {
  contextType: "project" | "business" | null;
  data: IncomeData;
  errors: Record<string, string>;
  onChange: (data: IncomeData) => void;
};

function ProfitStep({contextType,data,errors,onChange,}: ProfitStepProps) {
  const handleNumberChange = (value: string) => {
    return value === "" ? undefined : Number(value);
  };

  if (contextType === "project") {
    return (
      <div className="step-card">
        <p className="step-small-title">Step 5 of 7</p>

        <h2>Funding Information</h2>

        <p className="step-description">
          Enter additional funding and financial support information.
        </p>

        <div className="form-grid">
          <InputField
            label="Additional Funding"
            type="number"
            placeholder="e.g. 5000"
            value={data.additionalFunding}
            onChange={(value) =>
              onChange({
                ...data,
                additionalFunding: handleNumberChange(value),
              })
            }
          />

          <div className="form-group">
            <label>Funding Type</label>
            <select>
              <option value="">Select funding type</option>
              <option value="grant">Grant</option>
              <option value="sponsorship">Sponsorship</option>
              <option value="private">Private support</option>
              <option value="university">University support</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <InputField
              label="Own Contribution"
              type="number"
              placeholder="e.g. 1000"
              value={data.ownContribution}
              className={errors.ownContribution ? "input-error" : ""}
              onChange={(value) =>
                onChange({
                  ...data,
                  ownContribution: handleNumberChange(value),
                })
              }
            />

            {errors.ownContribution && (
              <p className="error-text">{errors.ownContribution}</p>
            )}
          </div>

          <InputField
            label="Other Income"
            type="number"
            placeholder="e.g. 2000"
            value={data.otherIncome}
            onChange={(value) =>
              onChange({
                ...data,
                otherIncome: handleNumberChange(value),
              })
            }
          />

          <div className="form-group full-width">
            <label>Funding Notes (optional)</label>
            <textarea placeholder="Additional funding information..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <p className="step-small-title">Step 5 of 7</p>

      <h2>Income Information</h2>

      <p className="step-description">
        Enter expected business income and profit information.
      </p>

      <div className="form-grid">
        <div>
          <InputField
            label="Expected Revenue"
            type="number"
            placeholder="e.g. 800000"
            value={data.expectedRevenue}
            className={errors.expectedRevenue ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                expectedRevenue: handleNumberChange(value),
              })
            }
          />

          {errors.expectedRevenue && (
            <p className="error-text">{errors.expectedRevenue}</p>
          )}
        </div>

        <div>
          <InputField
            label="Expected Profit"
            type="number"
            placeholder="e.g. 150000"
            value={data.expectedProfit}
            className={errors.expectedProfit ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                expectedProfit: handleNumberChange(value),
              })
            }
          />

          {errors.expectedProfit && (
            <p className="error-text">{errors.expectedProfit}</p>
          )}
        </div>

        <div>
          <InputField
            label="Investment Amount"
            type="number"
            placeholder="e.g. 50000"
            value={data.investmentAmount}
            className={errors.investmentAmount ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                investmentAmount: handleNumberChange(value),
              })
            }
          />

          {errors.investmentAmount && (
            <p className="error-text">{errors.investmentAmount}</p>
          )}
        </div>

        <InputField
          label="Other Income"
          type="number"
          placeholder="e.g. 20000"
          value={data.otherIncome}
          onChange={(value) =>
            onChange({
              ...data,
              otherIncome: handleNumberChange(value),
            })
          }
        />

        <div className="form-group full-width">
          <label>Income Notes (optional)</label>
          <textarea placeholder="Additional income information..." />
        </div>
      </div>
    </div>
  );
}

export default ProfitStep;