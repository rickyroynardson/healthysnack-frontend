import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: () => {
      return axiosInstance.get("/sales");
    },
  });
};
