import { supabase } from "../supabase/client";
import { InvoiceFormData } from "@/utils/invoiceSchema";

export async function saveInvoiceToSupabase(invoice: InvoiceFormData & { invoice_no: string; total: number; status: string; recipientAddress: string }) {
  const { data, error } = await supabase
    .from("invoices")
    .insert([invoice]);

  if (error) {
    console.error("Error saving invoice:", error);
    throw error;
  }

  return data;
}
