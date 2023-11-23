import { useMutation } from "@tanstack/react-query";
import { EditProfileFormSchema } from "./forms/edit-profile";
import { axiosInstance } from "@/lib/axios";

export const useEditProfile = () => {
  return useMutation({
    mutationFn: async (body: EditProfileFormSchema) => {
      return axiosInstance.patch("/profile", body);
    },
  });
};
