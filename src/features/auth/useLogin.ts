import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { LoginFormSchema } from "./forms/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (body: LoginFormSchema) => {
      const response = await axiosInstance.post("/auth/login", body);

      return response;
    },
  });
};
