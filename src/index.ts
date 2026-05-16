import {
  createFirm,
  calculateProductFinance,
  calculateEventFinance
} from "./types"

async function main() {

  const report = [

    calculateProductFinance(
      "Protein Bar",
      2.10,   // production
      0.40,   // packaging
      0.80,   // shipping
      0.70,   // marketing
      7.99,   // selling price
      3000    // monthly sales
    ),

    calculateProductFinance(
      "Coffee Mug",
      4.50,
      1.20,
      2.00,
      1.00,
      14.99,
      1200
    ),

    calculateProductFinance(
      "Phone Case",
      3.00,
      0.50,
      1.00,
      0.60,
      12.99,
      2500
    ),
  ];

  const events = [
    calculateEventFinance(
      "Something-con",

      30000,
      100000,
      12500,

      500000
    ),
  ]

  const firms = [
    createFirm("Something INC", report, events)
  ]

  //await saveAsExcel(firms);

  //await saveAsPdf(firms);

  console.log("Business finance reports generated.");
}

main().catch(console.error);