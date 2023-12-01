import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return axiosInstance.get("/products");
    },
  });
};
