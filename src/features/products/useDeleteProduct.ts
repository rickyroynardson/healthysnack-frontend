import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return axiosInstance.delete(`/products/${id}`);
    },
  });
};
