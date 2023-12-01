import { z } from "zod";

export const editProductFormSchema = z.object({
  name: z.string().min(3),
  price: z.string().min(1, { message: "Please enter a price" }),
  stock: z.string().min(1, { message: "Please enter a stock amount" }),
  productCategoryId: z.string().min(1, { message: "Please select a category" }),
});

export type EditProductFormSchema = z.infer<typeof editProductFormSchema>;
