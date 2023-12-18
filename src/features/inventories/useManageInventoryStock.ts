import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useManageInventoryStock = () => {
  return useMutation({
    mutationFn: async (body: {
      id: string;
      quantity: string;
      memo: string;
      action: string;
    }) => {
      return axiosInstance.post("/inventories/manage", {
        ...body,
        id: parseInt(body.id),
        quantity: parseInt(body.quantity),
      });
    },
  });
};
