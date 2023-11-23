import { z } from "zod";

export const createProductCategoryFormSchema = z.object({
  name: z.string().min(3),
});

export type CreateProductCategoryFormSchema = z.infer<
  typeof createProductCategoryFormSchema
>;
