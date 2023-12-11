import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (query: { page: number; name: string }) => {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => {
      return axiosInstance.get("/products", {
        params: query,
      });
    },
  });
};
