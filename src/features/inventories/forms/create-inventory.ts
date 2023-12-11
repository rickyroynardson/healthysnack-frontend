import { z } from "zod";

export const createInventoryFormSchema = z.object({
  name: z.string().min(3),
  unit: z.string().min(1),
});

export type CreateInventoryFormSchema = z.infer<
  typeof createInventoryFormSchema
>;
