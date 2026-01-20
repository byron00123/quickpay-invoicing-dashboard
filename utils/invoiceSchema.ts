import { z } from "zod";

// Define a single item in the invoice
export const invoiceItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  qty: z
    .string()
    .regex(/^\d+$/, "Quantity must be a number")
    .transform(Number),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number")
    .transform(Number),
});

// Full invoice schema
export const invoiceSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  description: z.string().min(1, "Description is required"),
  issuedOn: z.string().min(1, "Issue date is required"),
  dueOn: z.string().min(1, "Due date is required"),
  recurring: z.boolean(),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  notes: z.string().optional(),
});

// Type inferred from schema
export type InvoiceFormData = z.infer<typeof invoiceSchema>;
