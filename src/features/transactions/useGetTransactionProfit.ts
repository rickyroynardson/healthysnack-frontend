import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionProfit = () => {
  return useQuery({
    queryKey: ["transaction-profit"],
    queryFn: () => {
      return axiosInstance.get("/sales/profit");
    },
  });
};
