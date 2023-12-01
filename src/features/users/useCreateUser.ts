import { useMutation } from "@tanstack/react-query";
import { CreateUserFormSchema } from "./forms/create-user";
import { axiosInstance } from "@/lib/axios";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (body: CreateUserFormSchema) => {
      return axiosInstance.post("/users", body);
    },
  });
};
