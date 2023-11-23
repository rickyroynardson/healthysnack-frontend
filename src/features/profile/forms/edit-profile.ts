import { z } from "zod";

export const editProfileFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;
