import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetProductCategories = () => {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: () => {
      return axiosInstance.get("/product-categories");
    },
  });
};
