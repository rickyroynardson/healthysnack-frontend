import { z } from "zod";

export const createPurchaseFormSchema = z.object({
  invoiceNumber: z.string().min(1),
  vendor: z.string().min(3),
  orderDate: z.date(),
  memo: z.string(),
  inventories: z.array(
    z.object({
      inventoryId: z.number(),
      inventoryDetail: z.object({
        name: z.string(),
        stock: z.number(),
        unit: z.string(),
      }),
      price: z.string().min(1, { message: "Please enter a price" }),
      quantity: z.string().min(1, { message: "Please enter quantity" }),
    })
  ),
});

export type CreatePurchaseFormSchema = z.infer<typeof createPurchaseFormSchema>;
