import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetSalesTotal = () => {
  return useQuery({
    queryKey: ["sales-total"],
    queryFn: () => {
      return axiosInstance.get("/sales/total");
    },
  });
};
