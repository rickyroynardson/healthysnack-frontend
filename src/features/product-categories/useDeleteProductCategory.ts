import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteProductCategory = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return axiosInstance.delete(`/product-categories/${id}`);
    },
  });
};
