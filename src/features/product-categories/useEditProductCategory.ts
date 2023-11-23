import { useMutation } from "@tanstack/react-query";
import { EditProductCategoryFormSchema } from "./forms/edit-product-category";
import { axiosInstance } from "@/lib/axios";

export const useEditProductCategory = () => {
  return useMutation({
    mutationFn: async (body: { id: number; name: string }) => {
      return axiosInstance.patch(`/product-categories/${body.id}`, body);
    },
  });
};
