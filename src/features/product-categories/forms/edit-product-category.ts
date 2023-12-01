import { z } from "zod";

export const editProductCategoryFormSchema = z.object({
  name: z.string().min(3),
});

export type EditProductCategoryFormSchema = z.infer<
  typeof editProductCategoryFormSchema
>;
