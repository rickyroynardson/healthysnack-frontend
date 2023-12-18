import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllInventories = () => {
  return useQuery({
    queryKey: ["all-inventories"],
    queryFn: () => {
      return axiosInstance.get("/inventories/all");
    },
  });
};
