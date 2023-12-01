import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return axiosInstance.delete(`/users/${id}`);
    },
  });
};
