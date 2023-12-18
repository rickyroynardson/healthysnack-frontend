import { z } from "zod";

export const editInventoryFormSchema = z.object({
  name: z.string().min(3),
  stock: z.string().min(1, { message: "Please enter a stock amount" }),
  unit: z.string().min(1, { message: "Please enter a unit" }),
});

export type EditInventoryFormSchema = z.infer<typeof editInventoryFormSchema>;
