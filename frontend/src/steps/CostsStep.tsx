import InputField from "../components/InputField";

import type {
  CostsData,
} from "../types/financeTypes";

type CostsStepProps = {
  contextType: "project" | "business" | null;

  data: CostsData;

  onChange: (
    data: CostsData
  ) => void;
};

function CostsStep({
  contextType,
  data,
  onChange,
}: CostsStepProps) {
  if (contextType === "project") {
    return (
      <div className="step-card">
        <p className="step-small-title">
          Step 4 of 7
        </p>

        <h2>Costs Information</h2>

        <p className="step-description">
          Enter estimated costs related to your project.
        </p>

        <div className="form-grid">
          <InputField
            label="Estimated Expenses"
            type="number"
            placeholder="e.g. 10000"
            value={data.estimatedExpenses}
            onChange={(value) =>
              onChange({
                ...data,
                estimatedExpenses:
                  Number(value),
              })
            }
          />

          <InputField
            label="Additional Costs"
            type="number"
            placeholder="e.g. 2000"
            value={data.additionalCosts}
            onChange={(value) =>
              onChange({
                ...data,
                additionalCosts:
                  Number(value),
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
                reserveCosts:
                  Number(value),
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
                otherCosts:
                  Number(value),
              })
            }
          />

          <div className="form-group full-width">
            <label>
              Cost Notes (optional)
            </label>

            <textarea placeholder="Additional cost information..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <p className="step-small-title">
        Step 4 of 7
      </p>

      <h2>Costs Information</h2>

      <p className="step-description">
        Enter business cost details.
      </p>

      <div className="form-grid">
        <InputField
          label="Fixed Costs"
          type="number"
          placeholder="e.g. 120000"
          value={data.fixedCosts}
          onChange={(value) =>
            onChange({
              ...data,
              fixedCosts:
                Number(value),
            })
          }
        />

        <InputField
          label="Variable Costs"
          type="number"
          placeholder="e.g. 200000"
          value={data.variableCosts}
          onChange={(value) =>
            onChange({
              ...data,
              variableCosts:
                Number(value),
            })
          }
        />

        <InputField
          label="Operating Costs"
          type="number"
          placeholder="e.g. 50000"
          value={data.operatingCosts}
          onChange={(value) =>
            onChange({
              ...data,
              operatingCosts:
                Number(value),
            })
          }
        />

        <InputField
          label="Other Costs"
          type="number"
          placeholder="e.g. 3000"
          value={data.otherCosts}
          onChange={(value) =>
            onChange({
              ...data,
              otherCosts:
                Number(value),
            })
          }
        />

        <div className="form-group full-width">
          <label>
            Cost Notes (optional)
          </label>

          <textarea placeholder="Additional business cost information..." />
        </div>
      </div>
    </div>
  );
}

export default CostsStep;