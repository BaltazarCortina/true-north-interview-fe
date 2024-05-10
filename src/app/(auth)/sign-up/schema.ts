import { z } from 'zod';

export const SignUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
  })
  .refine((values) => values.password === values.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'],
  });

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
