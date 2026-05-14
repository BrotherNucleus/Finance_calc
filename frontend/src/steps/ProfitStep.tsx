import InputField from "../components/InputField";

import type {
  IncomeData,
} from "../types/financeTypes";

type ProfitStepProps = {
  contextType: "project" | "business" | null;

  data: IncomeData;

  onChange: (
    data: IncomeData
  ) => void;
};

function ProfitStep({
  contextType,
  data,
  onChange,
}: ProfitStepProps) {
  if (contextType === "project") {
    return (
      <div className="step-card">
        <p className="step-small-title">
          Step 5 of 7
        </p>

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
                additionalFunding:
                  Number(value),
              })
            }
          />

          <div className="form-group">
            <label>
              Funding Type
            </label>

            <select>
              <option value="">
                Select funding type
              </option>

              <option value="grant">
                Grant
              </option>

              <option value="sponsorship">
                Sponsorship
              </option>

              <option value="private">
                Private support
              </option>

              <option value="university">
                University support
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>

          <InputField
            label="Own Contribution"
            type="number"
            placeholder="e.g. 1000"
            value={data.ownContribution}
            onChange={(value) =>
              onChange({
                ...data,
                ownContribution:
                  Number(value),
              })
            }
          />

          <InputField
            label="Other Income"
            type="number"
            placeholder="e.g. 2000"
            value={data.otherIncome}
            onChange={(value) =>
              onChange({
                ...data,
                otherIncome:
                  Number(value),
              })
            }
          />

          <div className="form-group full-width">
            <label>
              Funding Notes (optional)
            </label>

            <textarea placeholder="Additional funding information..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <p className="step-small-title">
        Step 5 of 7
      </p>

      <h2>Income Information</h2>

      <p className="step-description">
        Enter expected business income and profit information.
      </p>

      <div className="form-grid">
        <InputField
          label="Expected Revenue"
          type="number"
          placeholder="e.g. 800000"
          value={data.expectedRevenue}
          onChange={(value) =>
            onChange({
              ...data,
              expectedRevenue:
                Number(value),
            })
          }
        />

        <InputField
          label="Expected Profit"
          type="number"
          placeholder="e.g. 150000"
          value={data.expectedProfit}
          onChange={(value) =>
            onChange({
              ...data,
              expectedProfit:
                Number(value),
            })
          }
        />

        <InputField
          label="Investment Amount"
          type="number"
          placeholder="e.g. 50000"
          value={data.investmentAmount}
          onChange={(value) =>
            onChange({
              ...data,
              investmentAmount:
                Number(value),
            })
          }
        />

        <InputField
          label="Other Income"
          type="number"
          placeholder="e.g. 20000"
          value={data.otherIncome}
          onChange={(value) =>
            onChange({
              ...data,
              otherIncome:
                Number(value),
            })
          }
        />

        <div className="form-group full-width">
          <label>
            Income Notes (optional)
          </label>

          <textarea placeholder="Additional income information..." />
        </div>
      </div>
    </div>
  );
}

export default ProfitStep;