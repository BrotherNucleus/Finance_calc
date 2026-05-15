import InputField from "../components/InputField";
import type { CostsData } from "../types/financeTypes";

type CostsStepProps = {
  contextType: "project" | "business" | null;
  data: CostsData;
  errors: Record<string, string>;
  onChange: (data: CostsData) => void;
};

function CostsStep({
  contextType,
  data,
  errors,
  onChange,
}: CostsStepProps) {
  const handleNumberChange = (value: string) => {
    return value === "" ? undefined : Number(value);
  };

  if (contextType === "project") {
    return (
      <div className="step-card">
        <p className="step-small-title">Step 4 of 7</p>

        <h2>Costs Information</h2>

        <p className="step-description">
          Enter estimated costs related to your project.
        </p>

        <div className="form-grid">
          <div>
            <InputField
              label="Estimated Expenses"
              type="number"
              placeholder="e.g. 10000"
              value={data.estimatedExpenses}
              className={errors.estimatedExpenses ? "input-error" : ""}
              onChange={(value) =>
                onChange({
                  ...data,
                  estimatedExpenses: handleNumberChange(value),
                })
              }
            />

            {errors.estimatedExpenses && (
              <p className="error-text">{errors.estimatedExpenses}</p>
            )}
          </div>

          <InputField
            label="Additional Costs"
            type="number"
            placeholder="e.g. 2000"
            value={data.additionalCosts}
            onChange={(value) =>
              onChange({
                ...data,
                additionalCosts: handleNumberChange(value),
              })
            }
          />

          <InputField
            label="Reserve / Emergency Costs"
            type="number"
            placeholder="e.g. 1000"
            value={data.reserveCosts}
            onChange={(value) =>
              onChange({
                ...data,
                reserveCosts: handleNumberChange(value),
              })
            }
          />

          <InputField
            label="Other Costs"
            type="number"
            placeholder="e.g. 500"
            value={data.otherCosts}
            onChange={(value) =>
              onChange({
                ...data,
                otherCosts: handleNumberChange(value),
              })
            }
          />

          <div className="form-group full-width">
            <label>Cost Notes (optional)</label>
            <textarea placeholder="Additional cost information..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <p className="step-small-title">Step 4 of 7</p>

      <h2>Costs Information</h2>

      <p className="step-description">
        Enter business cost details.
      </p>

      <div className="form-grid">
        <div>
          <InputField
            label="Fixed Costs"
            type="number"
            placeholder="e.g. 120000"
            value={data.fixedCosts}
            className={errors.fixedCosts ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                fixedCosts: handleNumberChange(value),
              })
            }
          />

          {errors.fixedCosts && (
            <p className="error-text">{errors.fixedCosts}</p>
          )}
        </div>

        <div>
          <InputField
            label="Variable Costs"
            type="number"
            placeholder="e.g. 200000"
            value={data.variableCosts}
            className={errors.variableCosts ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                variableCosts: handleNumberChange(value),
              })
            }
          />

          {errors.variableCosts && (
            <p className="error-text">{errors.variableCosts}</p>
          )}
        </div>

        <div>
          <InputField
            label="Operating Costs"
            type="number"
            placeholder="e.g. 50000"
            value={data.operatingCosts}
            className={errors.operatingCosts ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                operatingCosts: handleNumberChange(value),
              })
            }
          />

          {errors.operatingCosts && (
            <p className="error-text">{errors.operatingCosts}</p>
          )}
        </div>

        <InputField
          label="Other Costs"
          type="number"
          placeholder="e.g. 3000"
          value={data.otherCosts}
          onChange={(value) =>
            onChange({
              ...data,
              otherCosts: handleNumberChange(value),
            })
          }
        />

        <div className="form-group full-width">
          <label>Cost Notes (optional)</label>
          <textarea placeholder="Additional business cost information..." />
        </div>
      </div>
    </div>
  );
}

export default CostsStep;