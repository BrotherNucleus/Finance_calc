type ChooseContextStepProps = {
  onChoose: (type: "project" | "business") => void;
};

function ChooseContextStep({ onChoose }: ChooseContextStepProps) {
  return (
    <div className="step-card">
      <div className="step-header">
        <h2>Choose calculation context</h2>
        <p className="step-description">
          Select whether you want to calculate a budget for a project or for a company.
        </p>
      </div>

      <div className="choice-grid">
        <button className="choice-card" onClick={() => onChoose("project")}>
          <div className="choice-icon">🎓</div>
          <h3>Project / University Budget</h3>
          <p>
            Best for students, university projects, classes, events or educational budgets.
          </p>
          <span>Choose project →</span>
        </button>

        <button className="choice-card" onClick={() => onChoose("business")}>
          <div className="choice-icon">🏢</div>
          <h3>Company / Business Budget</h3>
          <p>
            Best for fake or real company case studies, business exercises or financial analysis.
          </p>
          <span>Choose business →</span>
        </button>
      </div>
    </div>
  );
}

export default ChooseContextStep;