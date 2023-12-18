import { useMutation } from "@tanstack/react-query";
import { CreateInventoryFormSchema } from "./forms/create-inventory";
import { axiosInstance } from "@/lib/axios";

export const useCreateInventory = () => {
  return useMutation({
    mutationFn: async (body: CreateInventoryFormSchema) => {
      return axiosInstance.post("/inventories", {
        name: body.name,
        unit: body.unit,
      });
    },
  });
};
