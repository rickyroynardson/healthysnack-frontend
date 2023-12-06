import { z } from "zod";

export const createProductFormSchema = z.object({
  name: z.string().min(3),
  price: z.string().min(1, { message: "Please enter a price" }),
  productCategoryId: z.string().min(1, { message: "Please select a category" }),
  materials: z.array(
    z.object({
      name: z.string().min(1),
      quantity: z.string().min(1, { message: "Please enter quantity" }),
      unit: z.string().min(1),
      price: z.string().min(1, { message: "Please enter a price" }),
    })
  ),
});

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>;
