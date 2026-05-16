import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
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
export async function saveAsPdf(data: any) {
  // Create PDF
  const pdfDoc = await PDFDocument.create();
  const financeResult = calculateFinanceResults(data);
  const dblue =rgb(16/255, 68/255, 147/255);

  // Add page
  const page = pdfDoc.addPage([595, 842]); // A4

  const { width, height } = page.getSize();

  // Load font
  const font = await pdfDoc.embedFont(
    StandardFonts.Helvetica
  );

  const bold = await pdfDoc.embedFont(
    StandardFonts.HelveticaBold
  );

  let y = height - 50;
  const tabStops : number[] = [50, 150, 350, 450];
  const tabStop1 : number = tabStops[0] ?? 50;
  const tabStop2 : number = tabStops[1] ?? 50;
  const tabStop3 : number = tabStops[2] ?? 50;
  const tabStop4 : number= tabStops[3] ?? 50;
  // Title
  page.drawText("Buisness Report", {
    x: tabStop1,
    y,
    size: 22,
    font: bold,
    color: dblue,
  });

  y -= 40;

  let projectType = data.contextType;

  let ownerName : string;

  if (projectType === "buisness") {
    ownerName = "Company \ Buisness Name:";
  } else {
    ownerName = "Project Name:";
  }

  // General Info
  page.drawText(
    `${ownerName}`,
    {
      x: tabStop1,
      y,
      size: 12,
      font: bold,
      color: dblue,
    }
  );

  // General Info
  page.drawText(
    `${data.generalInfo.name}`,
    {
      x: tabStop2,
      y,
      size: 12,
      font,
    }
  );

  y -= 20;

  page.drawText(
    `Type: `,
    {
      x: tabStop1,
      y,
      size: 12,
      font: bold,
      color: dblue,
    }
  );

  page.drawText(
    `${data.generalInfo.type}`,
    {
      x: tabStop2,
      y,
      size: 12,
      font,
    }
  );

  y -= 20;

  if (data.generalInfo.country) {
    page.drawText(
      `Country: `,
      {
        x: tabStop1,
        y,
        size: 12,
        font: bold,
        color: dblue,
      }
    );

    page.drawText(
      `${data.generalInfo.country}`,
      {
        x: tabStop2,
        y,
        size: 12,
        font,
      }
    );

    y -= 20;
  }

  const charMax = 80;

  const warpText = (str : string) => {
    let charList = str.split('');
    let newCharList : any[] = [];
    let newLineFlag : boolean = false; 
    let currNum = 0;
      for (let i = 0; i < charList.length; i++) {
        newCharList.push(charList[i]);
        if(currNum % (charMax) === 0 && currNum !== 0) {
          newLineFlag = true;
        }
        currNum++;
        if(newLineFlag && charList[i] === ' ') {
          newCharList.push('\n');
          newLineFlag = false;
          currNum = 0;
        }
      } 
    return newCharList.join('');
  }

  page.drawText(
    `Description:`,
    {
      x: tabStop1,
      y,
      size: 12,
      font: bold,
      color: dblue,
    }
  );

  y -= 20;

  page.drawText(
    `${warpText(data.generalInfo.description)}`,
    {
      x: tabStop1,
      y,
      size: 12,
      font,
    }
  );

  y -= 20;

  const page2 = pdfDoc.addPage([595, 842]);

  y = height - 50;
  // Budget section
  page2.drawText("Budget Information", {
    x: tabStop1,
    y,
    size: 16,
    font: bold,
    color: dblue,
  });

  y -= 20;

  const budgetFields = [
    ["Total Budget", data.budget.totalBudget],
    ["Currency", data.budget.currency],
    ["Planned Budget", data.budget.plannedBudget],
    ["Funding Source", data.budget.fundingSource],
    ["Duration", data.budget.duration],
    ["Planning Horizon", data.budget.planningHorizon],
    ["Budget Period", data.budget.budgetPeriod],
  ].filter(([_, value]) => value !== undefined);

  const listExistingOnPage = (fields : any[][]) => {for (const [label, value] of fields) {
    page2.drawText(`${label}: `, {
      x: tabStop1+10,
      y,
      size: 12,
      font: bold,
      color: dblue,
    });

    page2.drawText(`${value}`, {
      x: tabStop2+30,
      y,
      size: 12,
      font,
    });

    y -= 12;
  }
}


  listExistingOnPage(budgetFields);

  y -= 20;

  page2.drawText("Costs", {
    x: tabStop1,
    y,
    size: 16,
    font: bold,
    color: dblue,
  });

  y -= 20;

  const costsFields = [
    ["Estimated Expenses",data.costs.estimatedExpenses],
    ["Additional Costs",data.costs.additionalCosts],
    ["Reserve Costs",data.costs.reserveCosts],
    ["Other Costs",data.costs.otherCosts],
    ["Fixed Costs",data.costs.fixedCosts],
    ["Variable Costs",data.costs.variableCosts],
    ["Operating Costs",data.costs.operatingCosts],
  ].filter(([_, value]) => value !== undefined || 0);

  listExistingOnPage(costsFields);

    y -= 20;


  page2.drawText("Income", {
    x: tabStop1,
    y,
    size: 16,
    font: bold,
    color: dblue,
  });

  y -= 20;

  const incomeFields = [
    ["Additional Funding",data.income.additionalFunding],
    ["Own Contribution",data.income.ownContribution],
    ["Other Income",data.income.otherIncome],
    ["Expected Revenue",data.income.expectedRevenue],
    ["Expected Profit",data.income.expectedProfit],
    ["Investment Amount",data.income.investmentAmount],
  ].filter(([_, value]) => value !== undefined || 0);

  listExistingOnPage(incomeFields);

  y -= 20;

  page2.drawText("Taxes", {
    x: tabStop1,
    y,
    size: 16,
    font: bold,
    color: dblue,
  });

  y -= 20;

  const taxFields = [
    ["Is Vat included", data.taxes.vatIncluded],
    ["Vat Rate", data.taxes.vatRate],
    ["Income Tax Rate", data.taxes.incomeTaxRate],
    ["Additional Fees", data.taxes.additionalFees],
    ["Percentage Fee", data.taxes.percentageFee],
    ["Support Amount", data.taxes.supportAmount],
    ["Safety Reserve", data.taxes.safetyReserve],
  ].filter(([_, value]) => value !== undefined || value !== null);

  listExistingOnPage(taxFields);

  y -= 20;

  const totalFields = [
    ["Budget",financeResult.totalBudget],
    ["Costs",financeResult.totalCosts],
    ["Income",financeResult.totalIncome],
  ]

  page2.drawText("Total", {
    x: tabStop1,
    y,
    size: 16,
    font: bold,
    color: dblue,
  });

  y -= 14;

  listExistingOnPage(totalFields);

  y -= 20;

  page2.drawText(`Final Balance: `, {
    x: tabStop1,
    y,
    size: 16,
    font: bold,
    color: dblue,
    
  });

  page2.drawText(`${financeResult.finalBalance}`, {
    x: tabStop3,
    y,
    size: 16,
    font: bold,
    color: dblue,
    
  });
  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const pdfBuffer = new Uint8Array(pdfBytes);

  // Download in browser
  const blob = new Blob(
    [
      pdfBuffer
    ],
    { type: "application/pdf" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "report.pdf";

  a.click();

  URL.revokeObjectURL(url);
}