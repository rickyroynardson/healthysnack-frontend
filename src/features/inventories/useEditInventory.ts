import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditInventory = () => {
  return useMutation({
    mutationFn: async (body: {
      id: number;
      name: string;
      stock: string;
      unit: string;
    }) => {
      return axiosInstance.patch(`/inventories/${body.id}`, {
        ...body,
        stock: parseInt(body.stock),
      });
    },
  });
};
