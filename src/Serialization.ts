import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import { PDFDocument, StandardFonts } from "pdf-lib";
import {Firm, Product, Event} from "./types"


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
export async function saveAsExcel(
  data: Firm[]
) {

  const workbook = new ExcelJS.Workbook();

  const worksheet_product =
    workbook.addWorksheet("Product_Finance");

  const worksheet_event = 
    workbook.addWorksheet("Event_Finance");

  worksheet_product.columns = [
    {
      header: "Firm",
      key: "firmName",
      width: 25,
    },
    {
      header: "Product",
      key: "productName",
      width: 25,
    },
    {
      header: "Production Cost",
      key: "productionCost",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Packaging Cost",
      key: "packagingCost",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Shipping Cost",
      key: "shippingCost",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Marketing Cost",
      key: "marketingCost",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Total Cost / Unit",
      key: "totalCostPerUnit",
      width: 20,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Selling Price",
      key: "sellingPrice",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Profit / Unit",
      key: "profitPerUnit",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Profit Margin %",
      key: "profitMargin",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Monthly Sales",
      key: "expectedMonthlySales",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Monthly Revenue",
      key: "expectedMonthlyRevenue",
      width: 20,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Monthly Profit",
      key: "expectedMonthlyProfit",
      width: 20,
      style: {
        numFmt: '0.00'
      }
    },
  ];

  worksheet_event.columns = [
    {
      header: "Organizer",
      key: "firmName",
      width: 25,
    },
    {
      header: "Event",
      key: "eventName",
      width: 25,
    },
    {
      header: "Marketing Cost",
      key: "marketingCost",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Venue Cost",
      key: "venueCost",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Staff Cost",
      key: "staffCost",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Total Cost",
      key: "totalCost",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Expected Revenue",
      key: "expectedRevenue",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Expected Profit",
      key: "expectedProfit",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
    {
      header: "Return on Investment",
      key: "ROI",
      width: 18,
      style: {
        numFmt: '0.00'
      }
    },
  ];


  data.forEach((firm: Firm) => {
    firm.products.forEach((product: Product) => {
      const r = worksheet_product.rowCount + 1;

      worksheet_product.addRow({
        firmName: firm.firmName, //A

        productName: product.productName, //B

        productionCost:
          product.productionCost, //C

        packagingCost:
          product.packagingCost, //D

        shippingCost:
          product.shippingCost, //E

        marketingCost:
          product.marketingCost, //F

        totalCostPerUnit: {
          formula: `C${r}+D${r}+E${r}+F${r}`, //G
        },
          

        sellingPrice:
          product.sellingPrice, //H

        profitPerUnit:{
          formula: `H${r}-G${r}`, //I
        },

        profitMargin: {
          formula: `I${r}/H${r}*100`, //J
        },

        expectedMonthlySales:
          product.expectedMonthlySales, //K

        expectedMonthlyRevenue: {
          formula: `H${r}*K${r}`, //L
        },
        expectedMonthlyProfit: {
          formula: `I${r}*K${r}`, //M
        },
     });
    });
    firm.events.forEach((event: Event) => {
      const e = worksheet_event.rowCount + 1;

      worksheet_event.addRow({
        firmName: firm.firmName,

        eventName: event.eventName,

        marketingCost: event.marketingCost, //C
        venueCost: event.venueCost, //D
        staffCost: event.staffCost, //E

        totalCost: {
          formula: `C${e}+D${e}+E${e}`, //F
        },

        expectedRevenue: event.expectedRevenue, //G

        expectedProfit: {
          formula: `G${e}-F${e}`, //H
        },

        ROI: {
          formula: `H${e}/F${e}*100`, //I
        },
      })
    });
  });

  const outputDir = ensureOutputDir();

  const filePath =
    path.join(outputDir, "business-report.xlsx");

  await workbook.xlsx.writeFile(filePath);

  console.log(`Excel saved: ${filePath}`);
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