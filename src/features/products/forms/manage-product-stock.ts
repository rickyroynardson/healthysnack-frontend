import { z } from "zod";

export const manageProductStockFormSchema = z.object({
  id: z.string().min(1, { message: "Please select a product" }),
  quantity: z.string().min(1, { message: "Please enter a quantity" }),
});

export type ManageProductStockFormSchema = z.infer<
  typeof manageProductStockFormSchema
>;
