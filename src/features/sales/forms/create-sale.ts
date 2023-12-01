import { z } from "zod";

export const createSaleFormSchema = z.object({
  products: z
    .array(
      z.object({
        productId: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number().min(1),
      })
    )
    .min(1),
});

export type CreateSaleFormSchema = z.infer<typeof createSaleFormSchema>;
