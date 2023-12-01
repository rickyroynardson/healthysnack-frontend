import { useMutation } from "@tanstack/react-query";
import { CreateProductCategoryFormSchema } from "./forms/create-product-category";
import { axiosInstance } from "@/lib/axios";

export const useCreateProductCategory = () => {
  return useMutation({
    mutationFn: async (body: CreateProductCategoryFormSchema) => {
      return axiosInstance.post("/product-categories", body);
    },
  });
};
