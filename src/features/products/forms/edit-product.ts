import { z } from "zod";

export const editProductFormSchema = z.object({
  name: z.string().min(3),
  price: z.string().min(1, { message: "Please enter a price" }),
  stock: z.string().min(1, { message: "Please enter a stock amount" }),
  productCategoryId: z.string().min(1, { message: "Please select a category" }),
  materials: z.array(
    z.object({
      materialId: z.number().optional(),
      name: z.string().min(1),
      quantity: z.string().min(1, { message: "Please enter quantity" }),
      unit: z.string().min(1),
      price: z.string().min(1, { message: "Please enter a price" }),
    })
  ),
});

export type EditProductFormSchema = z.infer<typeof editProductFormSchema>;
