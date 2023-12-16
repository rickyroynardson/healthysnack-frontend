import { z } from "zod";

export const manageInventoryStockFormSchema = z.object({
  id: z.string().min(1, { message: "Please select a inventory" }),
  quantity: z.string().min(1, { message: "Please enter a quantity" }),
  memo: z.string(),
});

export type ManageInventoryStockFormSchema = z.infer<
  typeof manageInventoryStockFormSchema
>;
