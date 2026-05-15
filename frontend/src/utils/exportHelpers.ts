import type { FinanceFormData } from "../types/financeTypes";
import {saveAsExcel, saveAsPdf} from "../../../src/Serialization"

export function exportPDF(data: FinanceFormData) {
  console.log("PDF export data:", data);
  saveAsPdf(data);
  //alert("PDF export will be connected here.");
}

export function exportExcel(data: FinanceFormData) {
  console.log("Excel export data:", data);
  saveAsExcel(data);
  //alert("Excel export will be connected here.");
}