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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FinanceFormData>({
  contextType: "project",currency: "EUR",

  generalInfo: {
    name: "",
    type: "",
    description: "",
    participantsOrEmployees: undefined,
    country: "",
  },

  budget: {
    totalBudget: undefined,
    plannedBudget: undefined,
    fundingSource: "",
    currency: "",
    duration: undefined,
    planningHorizon: undefined,
    budgetPeriod: "",
  },

  costs: {
    estimatedExpenses: undefined,
    additionalCosts: 0,
    reserveCosts: 0,
    otherCosts: 0,

    fixedCosts: undefined,
    variableCosts: undefined,
    operatingCosts: undefined,
  },

  income: {
    additionalFunding: 0,
    ownContribution: undefined,
    otherIncome: 0,

    expectedRevenue: undefined,
    expectedProfit: undefined,
    investmentAmount: undefined,
  },

  taxes: {
    vatIncluded: null,

    vatRate: undefined,
    incomeTaxRate: undefined,

    additionalFees: 0,
    percentageFee: 0,
    supportAmount: undefined,
    safetyReserve: 0,
  },
});

  console.log(contextType);
  console.log(formData);
  console.log(setFormData);

  const isEmptyNumber = (value: number | undefined) => {
    return value === undefined || Number.isNaN(value);
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 2) {
      if (formData.generalInfo.name.trim() === "") {
        newErrors.name = "This field is required.";
      }

      if (formData.generalInfo.type.trim() === "") {
        newErrors.type = "This field is required.";
      }

      if (isEmptyNumber(formData.generalInfo.participantsOrEmployees)) {
        newErrors.participantsOrEmployees = "This field is required.";
      }

      if (  contextType === "business" && (!formData.generalInfo.country || formData.generalInfo.country.trim() === "")) {
        newErrors.country = "This field is required.";
      }
    }

    if (currentStep === 3) {
      if (!formData.budget.currency) {
        newErrors.currency = "Please select currency.";
      }

      if (!formData.budget.budgetPeriod) {
        newErrors.budgetPeriod = "Please select budget period.";
      }

      if (contextType === "project") {
        if (isEmptyNumber(formData.budget.totalBudget)) {
          newErrors.totalBudget = "This field is required.";
        }

        if (!formData.budget.fundingSource) {
          newErrors.fundingSource = "Please select funding source.";
        }

        if (isEmptyNumber(formData.budget.duration)) {
          newErrors.duration = "This field is required.";
        }
      }

      if (contextType === "business") {
        if (isEmptyNumber(formData.budget.plannedBudget)) {
          newErrors.plannedBudget = "This field is required.";
        }

        if (isEmptyNumber(formData.budget.planningHorizon)) {
          newErrors.planningHorizon = "This field is required.";
        }
      }
    }

    if (currentStep === 4) {
      if (contextType === "project") {
        if (isEmptyNumber(formData.costs.estimatedExpenses)) {
          newErrors.estimatedExpenses = "This field is required.";
        }
      }

      if (contextType === "business") {
        if (isEmptyNumber(formData.costs.fixedCosts)) {
          newErrors.fixedCosts = "This field is required.";
        }

        if (isEmptyNumber(formData.costs.variableCosts)) {
          newErrors.variableCosts = "This field is required.";
        }

        if (isEmptyNumber(formData.costs.operatingCosts)) {
          newErrors.operatingCosts = "This field is required.";
        }
      }
    }

    if (currentStep === 5) {
      if (contextType === "project") {
        if (isEmptyNumber(formData.income.ownContribution)) {
          newErrors.ownContribution = "This field is required.";
        }
      }

      if (contextType === "business") {
        if (isEmptyNumber(formData.income.expectedRevenue)) {
          newErrors.expectedRevenue = "This field is required.";
        }

        if (isEmptyNumber(formData.income.expectedProfit)) {
          newErrors.expectedProfit = "This field is required.";
        }

        if (isEmptyNumber(formData.income.investmentAmount)) {
          newErrors.investmentAmount = "This field is required.";
        }
      }
    }

    if (currentStep === 6) {
      if (contextType === "project") {
        if (formData.taxes.vatIncluded === null) {
          newErrors.vatIncluded = "Please select VAT option.";
        }
      }

      if (contextType === "business") {
        if (isEmptyNumber(formData.taxes.vatRate)) {
          newErrors.vatRate = "This field is required.";
        }

        if (isEmptyNumber(formData.taxes.incomeTaxRate)) {
          newErrors.incomeTaxRate = "This field is required.";
        }

        if (isEmptyNumber(formData.taxes.supportAmount)) {
          newErrors.supportAmount = "This field is required.";
        }
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const nextStep = () => {
    if (!validateCurrentStep()) {
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

  const resetCalculator = () => {
    setCurrentStep(1);
    setContextType(null);

    setFormData({
      contextType: "project",
      currency:"EUR",

      generalInfo: {
        name: "",
        type: "",
        description: "",
        participantsOrEmployees: undefined,
        country: "",
      },

      budget: {
        totalBudget: undefined,
        plannedBudget: undefined,
        fundingSource: "",
        currency: "",
        duration: undefined,
        planningHorizon: undefined,
        budgetPeriod: "",
      },

      costs: {
        estimatedExpenses: undefined,
        additionalCosts: 0,
        reserveCosts: 0,
        otherCosts: 0,
        fixedCosts: undefined,
        variableCosts: undefined,
        operatingCosts: undefined,
      },

      income: {
        additionalFunding: 0,
        ownContribution: undefined,
        otherIncome: 0,
        expectedRevenue: undefined,
        expectedProfit: undefined,
        investmentAmount: undefined,
      },

      taxes: {
        vatIncluded: null,
        vatRate: undefined,
        incomeTaxRate: undefined,
        additionalFees: 0,
        percentageFee: 0,
        supportAmount: undefined,
        safetyReserve: 0,
      },
    });
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
                                errors={errors}
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
                                  errors={errors}
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
                                errors={errors}
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
                              errors={errors}
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
                              errors={errors}
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
                              onReset={resetCalculator}
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