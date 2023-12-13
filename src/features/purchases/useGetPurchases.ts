import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetPurchases = (query: { page: number }) => {
  return useQuery({
    queryKey: ["purchases", query],
    queryFn: () => {
      return axiosInstance.get("/purchases", {
        params: query,
      });
    },
  });
};
