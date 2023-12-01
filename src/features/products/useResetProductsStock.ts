import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useResetProductsStock = () => {
  return useMutation({
    mutationFn: async () => {
      return axiosInstance.post("/products/reset");
    },
  });
};
