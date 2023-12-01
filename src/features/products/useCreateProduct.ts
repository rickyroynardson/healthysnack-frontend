import { useMutation } from "@tanstack/react-query";
import { CreateProductFormSchema } from "./forms/create-product";
import { axiosInstance } from "@/lib/axios";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (body: CreateProductFormSchema) => {
      return axiosInstance.post("/products", {
        name: body.name,
        price: parseInt(body.price),
        productCategoryId: parseInt(body.productCategoryId),
      });
    },
  });
};
