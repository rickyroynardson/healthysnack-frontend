import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return axiosInstance.get("/users");
    },
  });
};
