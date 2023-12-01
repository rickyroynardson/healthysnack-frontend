import { useMutation } from "@tanstack/react-query";
import { CreateSaleFormSchema } from "./forms/create-sale";
import { axiosInstance } from "@/lib/axios";

export const useCreateSale = () => {
  return useMutation({
    mutationFn: async (body: CreateSaleFormSchema) => {
      return axiosInstance.post("/sales", body);
    },
  });
};
