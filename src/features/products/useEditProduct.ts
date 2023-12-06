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
      materials: {
        materialId?: number;
        name: string;
        quantity: string;
        unit: string;
        price: string;
      }[];
    }) => {
      return axiosInstance.patch(`/products/${body.id}`, {
        ...body,
        price: parseInt(body.price),
        stock: parseInt(body.stock),
        productCategoryId: parseInt(body.productCategoryId),
        materials: body.materials.map((material) => ({
          materialId: material.materialId ? material.materialId : undefined,
          name: material.name,
          quantity: parseInt(material.quantity),
          unit: material.unit,
          price: parseInt(material.price),
        })),
      });
    },
  });
};
