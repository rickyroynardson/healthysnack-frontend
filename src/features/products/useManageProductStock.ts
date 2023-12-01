import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useManageProductStock = () => {
  return useMutation({
    mutationFn: async (body: {
      id: string;
      quantity: string;
      action: string;
    }) => {
      return axiosInstance.post("/products/manage", {
        ...body,
        id: parseInt(body.id),
        quantity: parseInt(body.quantity),
      });
    },
  });
};
