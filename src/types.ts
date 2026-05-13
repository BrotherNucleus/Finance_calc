export type Product = {
  productName: string;

  productionCost: number;
  packagingCost: number;
  shippingCost: number;
  marketingCost: number;

  totalCostPerUnit: number;

  sellingPrice: number;

  profitPerUnit: number;
  profitMargin: number;

  expectedMonthlySales: number;

  expectedMonthlyRevenue: number;
  expectedMonthlyProfit: number;
};

export type Firm = {
  firmName: string;
  products: Product[];
}

export function createFirm(
  firmName: string,
  products: Product[]) : Firm {
    return {
      firmName,
      products,
    };
  }

  export function calculateProductFinance(
  productName: string,
  productionCost: number,
  packagingCost: number,
  shippingCost: number,
  marketingCost: number,
  sellingPrice: number,
  expectedMonthlySales: number
): Product {

  const totalCostPerUnit =
    productionCost +
    packagingCost +
    shippingCost +
    marketingCost;

  const profitPerUnit =
    sellingPrice - totalCostPerUnit;

  const profitMargin =
    (profitPerUnit / sellingPrice) * 100;

  const expectedMonthlyRevenue =
    sellingPrice * expectedMonthlySales;

  const expectedMonthlyProfit =
    profitPerUnit * expectedMonthlySales;

  return {
    productName,

    productionCost,
    packagingCost,
    shippingCost,
    marketingCost,

    totalCostPerUnit,

    sellingPrice,

    profitPerUnit,
    profitMargin,

    expectedMonthlySales,

    expectedMonthlyRevenue,
    expectedMonthlyProfit,
  };
}