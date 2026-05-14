import type { FinanceFormData } from "../types/financeTypes";

export function exportPDF(data: FinanceFormData) {
  console.log("PDF export data:", data);
  alert("PDF export will be connected here.");
}

export function exportExcel(data: FinanceFormData) {
  console.log("Excel export data:", data);
  alert("Excel export will be connected here.");
}