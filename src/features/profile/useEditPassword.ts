import { useMutation } from "@tanstack/react-query";
import { EditPasswordFormSchema } from "./forms/edit-password";
import { axiosInstance } from "@/lib/axios";

export const useEditPassword = () => {
  return useMutation({
    mutationFn: async (body: EditPasswordFormSchema) => {
      return axiosInstance.patch("/profile/password", body);
    },
  });
};
