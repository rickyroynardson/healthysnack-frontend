import { z } from "zod";

export const createPurchaseFormSchema = z.object({
  invoiceNumber: z.string().min(1),
  vendor: z.string().min(3),
  orderDate: z.date(),
  memo: z.string(),
  inventories: z
    .array(
      z.object({
        inventoryId: z.number(),
        price: z.number(),
        quantity: z.number().min(1),
      })
    )
    .min(1),
});

export type CreatePurchaseFormSchema = z.infer<typeof createPurchaseFormSchema>;
