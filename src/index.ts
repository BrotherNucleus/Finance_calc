import {
  calculateProductFinance,
  saveAsExcel,
  saveAsPdf,
} from "./Serialization";

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

  await saveAsExcel(report);

  await saveAsPdf(report);

  console.log("Business finance reports generated.");
}

main().catch(console.error);