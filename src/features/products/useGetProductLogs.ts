import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetProductLogs = () => {
  return useQuery({
    queryKey: ["product-logs"],
    queryFn: () => {
      return axiosInstance.get("/products/log");
    },
  });
};
