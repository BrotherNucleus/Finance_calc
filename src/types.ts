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

export type Event = {
    eventName: string;

    marketingCost: number;
    venueCost: number;
    staffCost: number;

    totalCost: number;

    expectedRevenue: number;
    expectedProfit: number;

    ROI: number;
};

export type Firm = {
  firmName: string;
  products: Product[];
  events: Event[];
}

export function createFirm(
  firmName: string,
  products: Product[],
  events: Event[]) : Firm {
    return {
      firmName,
      products,
      events,
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

export function calculateEventFinance(
    eventName: string,
    
    marketingCost: number,
    venueCost: number,
    staffCost: number,

    expectedRevenue: number) : Event {
        const totalCost = marketingCost + 
            venueCost + staffCost;
        const expectedProfit = expectedRevenue - totalCost;
        const ROI = (expectedProfit/totalCost)*100;

        return {
            eventName,

            marketingCost,
            venueCost,
            staffCost,
            totalCost,

            expectedRevenue,
            expectedProfit,

            ROI,
        }
    }