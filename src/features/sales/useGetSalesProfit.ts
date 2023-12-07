import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetSalesProfit = () => {
  return useQuery({
    queryKey: ["sales-profit"],
    queryFn: () => {
      return axiosInstance.get("/sales/profit");
    },
  });
};
