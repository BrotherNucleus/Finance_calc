import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import { PDFDocument, StandardFonts } from "pdf-lib";
import {Firm, Product, Event} from "./types"
import {FinanceFormData} from "../frontend/src/types/financeTypes"
import {FinanceResult, calculateFinanceResults} from "../frontend/src/utils/mockCalculations"


// --------------------
// ENSURE OUTPUT FOLDER
// --------------------
function ensureOutputDir(): string {
  const outputDir = path.join(__dirname, "../dist");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  return outputDir;
}

// --------------------
// EXCEL EXPORT
// --------------------
function getColumnLetter(col: number): string {
  let temp = 0;
  let letter = "";

  while (col > 0) {
    temp = (col - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    col = (col - temp - 1) / 26;
  }

  return letter;
}


export async function saveAsExcel(
  data: FinanceFormData
) {
  const financeResult = calculateFinanceResults(data);
  const workbook = new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet("Product_Finance");

  const currency : string = data.currency; 



  const isProj = (str: string) => str === "project";
  let PoBName : string;
  let PoEName : string;
  const country = data.generalInfo.country;
  console.log(typeof(country));
  if (isProj(data.contextType)) {
    PoBName = "Project Name";
    PoEName = "Number of Participants"
  } else {
    PoBName = "Firm Name";
    PoEName = "Number of Employees";
  }

  let Row2 = [
    PoBName,
    "Type",
    PoEName,
    ...(country ? ["Country"] : []),
    "Currency",
  ]

  worksheet.addRow(["General Information"]) //Row 1 (merged)

  worksheet.addRow(Row2) //Row 2
  worksheet.addRow([data.generalInfo.name, //A3
    data.generalInfo.type, //B3
    data.generalInfo.participantsOrEmployees, //C3 
    ...(country ? [country] : []),
    data.currency, // D3

    ]) //Row 3 [E3]

  worksheet.addRow([]); //Row 4 - blank space
  
  const VarTitle = (str : string | number | boolean | undefined |null, str2 : string) => str ? [str2] : [];
  const VarVal = (str : string | number | boolean | undefined | null) => str ? [str] : [];
  const VarSum = (val : number | undefined) => val ? val : 0;
  const doesExist = (val : number | undefined) => val ? true : false;

  const budget = data.budget;
  let Row6 = [
    ...(VarTitle(budget.fundingSource, "Funding Source")),
    ...(VarTitle(budget.duration, "Duration")),
    ...(VarTitle(budget.planningHorizon, "Planning Horizon")),
    ...(VarTitle(budget.budgetPeriod, "Budget Period")),
    ...(VarTitle(budget.totalBudget, "Total Budget")),
    ...(VarTitle(budget.plannedBudget, "Planned Budget")),

  ]

  worksheet.addRow(["Budget Information"]); //Row 5 (merged)
  worksheet.addRow(Row6); //Row 6
  worksheet.addRow([
    ...(VarVal(budget.fundingSource)),
    ...(VarVal(budget.duration)),
    ...(VarVal(budget.planningHorizon)),
    ...(VarVal(budget.budgetPeriod)),
    ...(VarVal(budget.totalBudget)),
    ...(VarVal(budget.plannedBudget)),
  ]); //Row 7
  
  
  const cost = data.costs;
  let values_cost = [
  doesExist(cost.estimatedExpenses),
  doesExist(cost.additionalCosts),
  doesExist(cost.reserveCosts),
  doesExist(cost.otherCosts),
  doesExist(cost.fixedCosts),
  doesExist(cost.variableCosts),
  doesExist(cost.operatingCosts)
]
  let valLen = 0;
  values_cost.forEach(b => {
    if(b) {
      valLen += 1;
    }
  })



  let Row10 = [
    ...(VarTitle(cost.estimatedExpenses, "Estimated Expenses")),
    ...(VarTitle(cost.additionalCosts, "Additional Costs")),
    ...(VarTitle(cost.reserveCosts, "Reserve Costs")),
    ...(VarTitle(cost.otherCosts, "Other Costs")),
    ...(VarTitle(cost.fixedCosts, "Fixed Costs")),
    ...(VarTitle(cost.variableCosts, "Variable Costs")),
    ...(VarTitle(cost.operatingCosts, "Operating Costs")),
    "Base Cost",
  ];

  worksheet.addRow([]); //Row 8
  worksheet.addRow(["Costs"]); //Row 9 (merged)
  worksheet.addRow(Row10); //Row 10
  let r = worksheet.rowCount + 1;
  worksheet.addRow([
    ...(VarVal(cost.estimatedExpenses)),
    ...(VarVal(cost.additionalCosts)),
    ...(VarVal(cost.reserveCosts)),
    ...(VarVal(cost.otherCosts)),
    ...(VarVal(cost.fixedCosts)),
    ...(VarVal(cost.variableCosts)),
    ...(VarVal(cost.operatingCosts)),
    {
      formula: `SUM(A${r}:${getColumnLetter(valLen)}${r})`,
    }
  ]); //Row 11

  const income = data.income;
  let Row14 = [
    ...(VarTitle(income.additionalFunding, "Additional funding")),
    ...(VarTitle(income.ownContribution, "Own Contribution")),
    ...(VarTitle(income.otherIncome, "Other Income")),
    ...(VarTitle(income.expectedRevenue, "Expected Revenue")),
    ...(VarTitle(income.expectedProfit, "Expected Profit")),
    ...(VarTitle(income.investmentAmount, "Investment Amount")),
  ];

  worksheet.addRow([]); //Row 12
  worksheet.addRow(["Income"]); //Row 13
  worksheet.addRow(Row14); //Row 14
  r = worksheet.rowCount + 1;
  worksheet.addRow([
    ...(VarVal(income.additionalFunding)),
    ...(VarVal(income.ownContribution)),
    ...(VarVal(income.otherIncome)),
    ...(VarVal(income.expectedRevenue)),
    ...(VarVal(income.expectedProfit)),
    ...(VarVal(income.investmentAmount)),
  ]); //Row 15


  const tax = data.taxes;
  let Row18 = [
    ...(VarTitle(tax.vatIncluded, "Is vat Included")),
    ...(VarTitle(tax.vatRate, "Vat Rate")),
    ...(VarTitle(tax.incomeTaxRate, "Income Tax Rate")),
    ...(VarTitle(tax.additionalFees, "Additional Fees")),
    ...(VarTitle(tax.percentageFee, "Percentage Fee")),
    ...(VarTitle(tax.supportAmount, "Support Amount")),
    ...(VarTitle(tax.safetyReserve, "Safety Reserve")),
  ];
  worksheet.addRow([]); //Row 16
  worksheet.addRow(["Taxes"]); //Row 17
  worksheet.addRow(Row18); //Row 18
  worksheet.addRow([
    ...(VarVal(tax.vatIncluded)),
    ...(VarVal(tax.vatRate)),
    ...(VarVal(tax.incomeTaxRate)),
    ...(VarVal(tax.additionalFees)),
    ...(VarVal(tax.percentageFee)),
    ...(VarVal(tax.supportAmount)),
    ...(VarVal(tax.safetyReserve)),
  ]); //Row 19

  worksheet.addRow([]); //Row 20
  worksheet.addRow(["Total"]);
  worksheet.addRow([
    ...(VarTitle(financeResult.totalBudget, "Budget")),
    ...(VarTitle(financeResult.totalCosts, "Costs")),
    ...(VarTitle(financeResult.totalIncome, "Income")),
    ...(VarTitle(financeResult.totalBudget, "Final Balance")),
  ]);
  worksheet.addRow([
    ...(VarVal(financeResult.totalBudget)),
    ...(VarVal(financeResult.totalCosts)),
    ...(VarVal(financeResult.totalIncome)),
    ...(VarVal(financeResult.finalBalance)),
  ]);

  const endColID = worksheet.columnCount;
  worksheet.mergeCells(1, 1, 1, endColID);
  worksheet.mergeCells(4, 1, 4, endColID);
  worksheet.mergeCells(5, 1, 5, endColID);
  worksheet.mergeCells(8, 1, 8, endColID);
  worksheet.mergeCells(9, 1, 9, endColID);
  worksheet.mergeCells(12, 1, 12, endColID);
  worksheet.mergeCells(13, 1, 13, endColID);
  worksheet.mergeCells(16, 1, 16, endColID);
  worksheet.mergeCells(17, 1, 17, endColID);
  worksheet.mergeCells(20, 1, 20, endColID);
  worksheet.mergeCells(21, 1, 21, endColID);

  worksheet.columns.forEach((column) => {
    let minLen = 10;
    column.eachCell?.({ includeEmpty: true }, (cell) => {
    const value = cell.value ? cell.value.toString() : "";
    minLen = Math.max(minLen, value.length);
  });

  column.width = minLen + 2;
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob(
    [buffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }
  );

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "report.xlsx";

  a.click();

  window.URL.revokeObjectURL(url);
}

// --------------------
// PDF EXPORT
// --------------------
export async function saveAsPdf(
  data: Firm[]
) {

  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([750, 850]);

  const font =
    await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 800;

  // TITLE
  page.drawText("Business Finance Report", {
    x: 50,
    y,
    size: 22,
    font,
  });

  y -= 40;
  data.forEach((firm: Firm) => {
    page.drawText(
      `${firm.firmName}:`,
      {
        x: 50,
        y,
        size: 32,
        font,
      }
    );

    y -= 30;
  firm.products.forEach((product : Product, index) => {

    page.drawText(
      `${product.productName}`,
      {
        x: 50,
        y,
        size: 16,
        font,
      }
    );

    y -= 22;

    page.drawText(
      `Production Cost: $${product.productionCost.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Packaging Cost: $${product.packagingCost.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Shipping Cost: $${product.shippingCost.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Marketing Cost: $${product.marketingCost.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Total Cost / Unit: $${product.totalCostPerUnit.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Selling Price: $${product.sellingPrice.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Profit / Unit: $${product.profitPerUnit.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Profit Margin: ${product.profitMargin.toFixed(2)}%`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Expected Monthly Sales: ${product.expectedMonthlySales}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Monthly Revenue: $${product.expectedMonthlyRevenue.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Monthly Profit: $${product.expectedMonthlyProfit.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );
    

    y -= 35;
    });
  firm.events.forEach((event: Event) => {
    page.drawText(
      `${event.eventName}`,
      {
        x: 50,
        y,
        size: 16,
        font,
      }
    );

    y -= 22;

    page.drawText(
      `Marketing Cost: $${event.marketingCost.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Venue Cost: $${event.venueCost.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Staff Cost: $${event.staffCost.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Total Cost: $${event.totalCost.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Expected Revenue: $${event.expectedRevenue.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;

    page.drawText(
      `Expected Profit: $${event.expectedProfit.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;
    
    page.drawText(
      `Return on Investment: $${event.ROI.toFixed(2)}`,
      {
        x: 70,
        y,
        size: 12,
        font,
      }
    );

    y -= 18;
    
    });
  });

  const pdfBytes = await pdfDoc.save();

  const outputDir = ensureOutputDir();

  const filePath =
    path.join(outputDir, "business-report.pdf");

  fs.writeFileSync(filePath, pdfBytes);

  console.log(`PDF saved: ${filePath}`);
}