import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteInventory = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return axiosInstance.delete(`/inventories/${id}`);
    },
  });
};
