import { z } from "zod";

export const createProductFormSchema = z.object({
  name: z.string().min(3),
  price: z.string().min(1, { message: "Please enter a price" }),
  productCategoryId: z.string().min(1, { message: "Please select a category" }),
});

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>;
