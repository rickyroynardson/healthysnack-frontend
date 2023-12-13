import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetInventories = (query: {
  page: number;
  limit?: number;
  name: string;
}) => {
  return useQuery({
    queryKey: ["inventories", query],
    queryFn: () => {
      return axiosInstance.get("/inventories", {
        params: query,
      });
    },
  });
};
