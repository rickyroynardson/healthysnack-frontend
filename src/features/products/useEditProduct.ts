import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditProduct = () => {
  return useMutation({
    mutationFn: async (body: {
      id: number;
      name: string;
      price: string;
      stock: string;
      productCategoryId: string;
    }) => {
      return axiosInstance.patch(`/products/${body.id}`, {
        ...body,
        price: parseInt(body.price),
        stock: parseInt(body.stock),
        productCategoryId: parseInt(body.productCategoryId),
      });
    },
  });
};
