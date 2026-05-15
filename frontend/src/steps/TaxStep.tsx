import InputField from "../components/InputField";
import type { TaxData } from "../types/financeTypes";

type TaxStepProps = {
  contextType: "project" | "business" | null;
  data: TaxData;
  errors: Record<string, string>;
  onChange: (data: TaxData) => void;
};

function TaxStep({ contextType, data, errors, onChange }: TaxStepProps) {
  const handleNumberChange = (value: string) => {
    return value === "" ? undefined : Number(value);
  };

  if (contextType === "project") {
    return (
      <div className="step-card">
        <p className="step-small-title">Step 6 of 7</p>

        <h2>Optional Taxes, Fees & Adjustments</h2>

        <p className="step-description">
          Add optional VAT information, fees, reserves or adjustments for your project.
        </p>

        <div className="form-grid">
          <div className="form-group full-width">
            <label>VAT Included?</label>

            <div className={errors.vatIncluded ? "radio-group input-error" : "radio-group"}>
              <label>
                <input
                  type="radio"
                  name="vatIncluded"
                  checked={data.vatIncluded === true}
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
                  checked={data.vatIncluded === false}
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

            {errors.vatIncluded && (
              <p className="error-text">{errors.vatIncluded}</p>
            )}
          </div>

          <InputField
            label="Additional Fees"
            type="number"
            placeholder="e.g. 300"
            value={data.additionalFees}
            onChange={(value) =>
              onChange({
                ...data,
                additionalFees: handleNumberChange(value),
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
                percentageFee: handleNumberChange(value),
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
                supportAmount: handleNumberChange(value),
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
                safetyReserve: handleNumberChange(value),
              })
            }
          />

          <div className="form-group full-width">
            <label>Additional Notes (optional)</label>
            <textarea placeholder="Additional fee or adjustment information..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <p className="step-small-title">Step 6 of 7</p>

      <h2>Tax Information</h2>

      <p className="step-description">
        Enter tax and financial obligation information for your business.
      </p>

      <div className="form-grid">
        <div>
          <InputField
            label="VAT Rate (%)"
            type="number"
            placeholder="e.g. 23"
            value={data.vatRate}
            className={errors.vatRate ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                vatRate: handleNumberChange(value),
              })
            }
          />

          {errors.vatRate && (
            <p className="error-text">{errors.vatRate}</p>
          )}
        </div>

        <div>
          <InputField
            label="Income Tax Rate (%)"
            type="number"
            placeholder="e.g. 19"
            value={data.incomeTaxRate}
            className={errors.incomeTaxRate ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                incomeTaxRate: handleNumberChange(value),
              })
            }
          />

          {errors.incomeTaxRate && (
            <p className="error-text">{errors.incomeTaxRate}</p>
          )}
        </div>

        <InputField
          label="Other Taxes / Fees"
          type="number"
          placeholder="e.g. 5000"
          value={data.additionalFees}
          onChange={(value) =>
            onChange({
              ...data,
              additionalFees: handleNumberChange(value),
            })
          }
        />

        <div>
          <InputField
            label="Tax Deductions"
            type="number"
            placeholder="e.g. 2000"
            value={data.supportAmount}
            className={errors.supportAmount ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                supportAmount: handleNumberChange(value),
              })
            }
          />

          {errors.supportAmount && (
            <p className="error-text">{errors.supportAmount}</p>
          )}
        </div>

        <div className="form-group full-width">
          <label>Tax Notes (optional)</label>
          <textarea placeholder="Additional tax information..." />
        </div>
      </div>
    </div>
  );
}

export default TaxStep;