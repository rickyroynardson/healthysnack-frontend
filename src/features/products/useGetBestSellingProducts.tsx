import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetBestSellingProducts = () => {
  return useQuery({
    queryKey: ["best-selling-products"],
    queryFn: () => {
      return axiosInstance.get("/products/best-selling");
    },
  });
};
