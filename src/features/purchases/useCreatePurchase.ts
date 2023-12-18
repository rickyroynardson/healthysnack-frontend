import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { CreatePurchaseFormSchema } from "./forms/create-purchase";

export const useCreatePurchase = () => {
  return useMutation({
    mutationFn: async (body: CreatePurchaseFormSchema) => {
      return axiosInstance.post("/purchases", {
        ...body,
        inventories: body.inventories.map((inventory) => ({
          ...inventory,
          quantity: parseInt(inventory.quantity),
          price: parseInt(inventory.price),
        })),
      });
    },
  });
};
