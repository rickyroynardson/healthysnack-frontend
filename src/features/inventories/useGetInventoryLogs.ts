import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetInventoryLogs = () => {
  return useQuery({
    queryKey: ["inventory-logs"],
    queryFn: () => {
      return axiosInstance.get("/inventories/log");
    },
  });
};
