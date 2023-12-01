import { z } from "zod";

export const createUserFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
});

export type CreateUserFormSchema = z.infer<typeof createUserFormSchema>;
