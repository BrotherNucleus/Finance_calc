import InputField from "../components/InputField";

import type {
  TaxData,
} from "../types/financeTypes";

type TaxStepProps = {
  contextType: "project" | "business" | null;

  data: TaxData;

  onChange: (
    data: TaxData
  ) => void;
};

function TaxStep({
  contextType,
  data,
  onChange,
}: TaxStepProps) {
  if (contextType === "project") {
    return (
      <div className="step-card">
        <p className="step-small-title">
          Step 6 of 7
        </p>

        <h2>
          Optional Taxes, Fees & Adjustments
        </h2>

        <p className="step-description">
          Add optional VAT information, fees, reserves or adjustments for your project.
        </p>

        <div className="form-grid">
          <div className="form-group full-width">
            <label>
              VAT Included?
            </label>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="vatIncluded"
                  checked={
                    data.vatIncluded === true
                  }
                  onChange={() =>
                    onChange({
                      ...data,
                      vatIncluded: true,
                    })
                  }
                />

                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name="vatIncluded"
                  checked={
                    data.vatIncluded === false
                  }
                  onChange={() =>
                    onChange({
                      ...data,
                      vatIncluded: false,
                    })
                  }
                />

                No
              </label>
            </div>
          </div>

          <InputField
            label="Additional Fees"
            type="number"
            placeholder="e.g. 300"
            value={data.additionalFees}
            onChange={(value) =>
              onChange({
                ...data,
                additionalFees:
                  Number(value),
              })
            }
          />

          <InputField
            label="Optional Percentage Fee (%)"
            type="number"
            placeholder="e.g. 5"
            value={data.percentageFee}
            onChange={(value) =>
              onChange({
                ...data,
                percentageFee:
                  Number(value),
              })
            }
          />

          <InputField
            label="Discount / Support Amount"
            type="number"
            placeholder="e.g. 500"
            value={data.supportAmount}
            onChange={(value) =>
              onChange({
                ...data,
                supportAmount:
                  Number(value),
              })
            }
          />

          <InputField
            label="Safety Reserve"
            type="number"
            placeholder="e.g. 1000"
            value={data.safetyReserve}
            onChange={(value) =>
              onChange({
                ...data,
                safetyReserve:
                  Number(value),
              })
            }
          />

          <div className="form-group full-width">
            <label>
              Additional Notes (optional)
            </label>

            <textarea placeholder="Additional fee or adjustment information..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <p className="step-small-title">
        Step 6 of 7
      </p>

      <h2>Tax Information</h2>

      <p className="step-description">
        Enter tax and financial obligation information for your business.
      </p>

      <div className="form-grid">
        <InputField
          label="VAT Rate (%)"
          type="number"
          placeholder="e.g. 23"
          value={data.vatRate}
          onChange={(value) =>
            onChange({
              ...data,
              vatRate:
                Number(value),
            })
          }
        />

        <InputField
          label="Income Tax Rate (%)"
          type="number"
          placeholder="e.g. 19"
          value={data.incomeTaxRate}
          onChange={(value) =>
            onChange({
              ...data,
              incomeTaxRate:
                Number(value),
            })
          }
        />

        <InputField
          label="Other Taxes / Fees"
          type="number"
          placeholder="e.g. 5000"
          value={data.additionalFees}
          onChange={(value) =>
            onChange({
              ...data,
              additionalFees:
                Number(value),
            })
          }
        />

        <InputField
          label="Tax Deductions"
          type="number"
          placeholder="e.g. 2000"
          value={data.supportAmount}
          onChange={(value) =>
            onChange({
              ...data,
              supportAmount:
                Number(value),
            })
          }
        />

        <div className="form-group full-width">
          <label>
            Tax Notes (optional)
          </label>

          <textarea placeholder="Additional tax information..." />
        </div>
      </div>
    </div>
  );
}

export default TaxStep;