import InputField from "../components/InputField";
import type { GeneralInfoData } from "../types/financeTypes";

type GeneralInfoStepProps = {
  contextType: "project" | "business" | null;
  data: GeneralInfoData;
  errors: Record<string, string>;
  onChange: (data: GeneralInfoData) => void;
};

function GeneralInfoStep({
  contextType,
  data,
  errors,
  onChange,
}: GeneralInfoStepProps) {
  const handleNumberChange = (value: string) => {
    return value === "" ? undefined : Number(value);
  };

  if (contextType === "project") {
    return (
      <div className="step-card">
        <p className="step-small-title">Step 2 of 7</p>
        <h2>General Information</h2>

        <p className="step-description">
          Provide basic information about your project or university budget.
        </p>

        <div className="form-grid">
          <div>
            <InputField
              label="Project Name"
              type="text"
              placeholder="e.g. University Open Day"
              value={data.name}
              className={errors.name ? "input-error" : ""}
              onChange={(value) =>
                onChange({ ...data, name: value })
              }
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Project Type</label>
            <select
              className={errors.type ? "input-error" : ""}
              value={data.type}
              onChange={(event) =>
                onChange({ ...data, type: event.target.value })
              }
            >
              <option value="">Select project type</option>
              <option value="student-project">Student project</option>
              <option value="university-event">University event</option>
              <option value="course-assignment">Course assignment</option>
              <option value="research-project">Research project</option>
              <option value="other">Other</option>
            </select>
            {errors.type && <p className="error-text">{errors.type}</p>}
          </div>

          <div className="form-group full-width">
            <label>Description (optional)</label>
            <textarea
              placeholder="Brief description of your project"
              value={data.description}
              onChange={(event) =>
                onChange({ ...data, description: event.target.value })
              }
            />
          </div>

          <div>
            <InputField
              label="Number of Participants"
              type="number"
              placeholder="e.g. 25"
              value={data.participantsOrEmployees}
              className={errors.participantsOrEmployees ? "input-error" : ""}
              onChange={(value) =>
                onChange({
                  ...data,
                  participantsOrEmployees: handleNumberChange(value),
                })
              }
            />
            {errors.participantsOrEmployees && (
              <p className="error-text">{errors.participantsOrEmployees}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <p className="step-small-title">Step 2 of 7</p>
      <h2>General Information</h2>

      <p className="step-description">
        Provide basic information about your company or business case.
      </p>

      <div className="form-grid">
        <div>
          <InputField
            label="Company / Business Name"
            type="text"
            placeholder="e.g. SkyLine Logistics"
            value={data.name}
            className={errors.name ? "input-error" : ""}
            onChange={(value) =>
              onChange({ ...data, name: value })
            }
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Business Type</label>
          <select
            className={errors.type ? "input-error" : ""}
            value={data.type}
            onChange={(event) =>
              onChange({ ...data, type: event.target.value })
            }
          >
            <option value="">Select business type</option>
            <option value="service">Service</option>
            <option value="retail">Retail</option>
            <option value="education">Education</option>
            <option value="transport">Transport</option>
            <option value="technology">Technology</option>
            <option value="other">Other</option>
          </select>
          {errors.type && <p className="error-text">{errors.type}</p>}
        </div>

        <div className="form-group full-width">
          <label>Description (optional)</label>
          <textarea
            placeholder="Brief description of your business"
            value={data.description}
            onChange={(event) =>
              onChange({ ...data, description: event.target.value })
            }
          />
        </div>

        <div>
          <InputField
            label="Number of Employees"
            type="number"
            placeholder="e.g. 25"
            value={data.participantsOrEmployees}
            className={errors.participantsOrEmployees ? "input-error" : ""}
            onChange={(value) =>
              onChange({
                ...data,
                participantsOrEmployees: handleNumberChange(value),
              })
            }
          />
          {errors.participantsOrEmployees && (
            <p className="error-text">{errors.participantsOrEmployees}</p>
          )}
        </div>

        <div className="form-group">
          <label>Operating Country</label>
          <select
            className={errors.country ? "input-error" : ""}
            value={data.country}
            onChange={(event) =>
              onChange({ ...data, country: event.target.value })
            }
          >
            <option value="">Select country</option>
            <option value="poland">Poland</option>
            <option value="portugal">Portugal</option>
            <option value="france">France</option>
            <option value="germany">Germany</option>
            <option value="other">Other</option>
          </select>
          {errors.country && <p className="error-text">{errors.country}</p>}
        </div>
      </div>
    </div>
  );
}

export default GeneralInfoStep;