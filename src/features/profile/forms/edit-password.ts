import { z } from "zod";

export const editPasswordFormSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6),
  confirmPassword: z.string(),
});

export type EditPasswordFormSchema = z.infer<typeof editPasswordFormSchema>;
