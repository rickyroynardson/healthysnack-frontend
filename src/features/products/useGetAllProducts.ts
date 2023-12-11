import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: () => {
      return axiosInstance.get("/products/all");
    },
  });
};
