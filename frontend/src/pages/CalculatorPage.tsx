import { useState } from "react";
import type { FinanceFormData } from "../types/financeTypes";

import ChooseContextStep from "../steps/ChooseContextStep";
import GeneralInfoStep from "../steps/GeneralInfoStep";
import BudgetStep from "../steps/BudgetStep";
import CostsStep from "../steps/CostsStep";
import ProfitStep from "../steps/ProfitStep";
import TaxStep from "../steps/TaxStep";
import ResultStep from "../steps/ResultStep";

const CalculatorPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [contextType, setContextType] = useState<"project" | "business" | null>(null);
  const [formData, setFormData] = useState<FinanceFormData>({
  contextType: "project",currency: "EUR",

  generalInfo: {
    name: "",
    type: "",
    description: "",
    participantsOrEmployees: 0,
    country: "",
  },

  budget: {
    totalBudget: 0,
    fundingSource: "",
    currency: "",
    duration: 0,
    budgetPeriod: "",
  },

  costs: {
    estimatedExpenses: 0,
    additionalCosts: 0,
    reserveCosts: 0,
    otherCosts: 0,

    fixedCosts: 0,
    variableCosts: 0,
    operatingCosts: 0,
  },

  income: {
    additionalFunding: 0,
    ownContribution: 0,
    otherIncome: 0,

    expectedRevenue: 0,
    expectedProfit: 0,
    investmentAmount: 0,
  },

  taxes: {
    vatIncluded: false,

    vatRate: 0,
    incomeTaxRate: 0,

    additionalFees: 0,
    percentageFee: 0,
    supportAmount: 0,
    safetyReserve: 0,
  },
});

  console.log(contextType);
  console.log(formData);
  console.log(setFormData);

  const nextStep = () => {
  if (currentStep === 1 && contextType === null) {
    alert("Please choose calculation context first.");
    return;
  }

  if (currentStep < 7) {
    setCurrentStep(currentStep + 1);
  }
};

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="calculator-page">
        <p className="step-small-title">Step {currentStep} of 7</p>
        <div className="steps-progress">
            {Array.from({ length: 7 }, (_, index) => (
                <div
                key={index}
                className={
                    index + 1 <= currentStep
                    ? "progress-segment active"
                    : "progress-segment"
                }
                />
            ))}
        </div>

        {currentStep === 1 && (
        <ChooseContextStep
            onChoose={(type) => {
            setContextType(type);

            setFormData({
              ...formData,
              contextType: type,
            });

            setCurrentStep(2);
          }}
        />
        )}

        {currentStep === 2 && <GeneralInfoStep
                                contextType={contextType}
                                data={formData.generalInfo}
                                onChange={(updatedGeneralInfo) => {
                                    setFormData({
                                    ...formData,
                                    generalInfo: updatedGeneralInfo,
                                    });
                                }}
                                />}
        {currentStep === 3 && (<BudgetStep
                                  contextType={contextType}
                                  data={formData.budget}
                                  onChange={(updatedBudget) =>
                                  setFormData({
                                      ...formData,
                                      budget: updatedBudget,
                                  })
                                  }
                              />
                              )}
        {currentStep === 4 && (<CostsStep
                                contextType={contextType}
                                data={formData.costs}
                                onChange={(updatedCosts) =>
                                setFormData({
                                    ...formData,
                                    costs: updatedCosts,
                                })
                                }
                            />
                            )}
        {currentStep === 5 && (<ProfitStep
                              contextType={contextType}
                              data={formData.income}
                              onChange={(updatedIncome) =>
                                setFormData({
                                  ...formData,
                                  income: updatedIncome,
                                })
                              }
                            />
                          )}
        {currentStep === 6 && (<TaxStep
                              contextType={contextType}
                              data={formData.taxes}
                              onChange={(updatedTaxes) =>
                                setFormData({
                                  ...formData,
                                  taxes: updatedTaxes,
                                })
                              }
                            />
                          )}
        {currentStep === 7 && <ResultStep
                            contextType={contextType}
                            formData={formData}
                          />}

        <div className="step-buttons">
        {currentStep > 1 && currentStep < 7 && (
            <button className="back-button" onClick={previousStep}>Back</button>
        )}

        {currentStep > 1 && currentStep < 7 && (
            <button className="next-button" onClick={nextStep}>Next</button>
        )}
        </div>
    </main>
    );
};

export default CalculatorPage;