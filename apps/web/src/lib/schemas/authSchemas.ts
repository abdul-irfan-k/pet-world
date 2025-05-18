import { z } from 'zod';

export const signUpSchema = z.object({
  firstName: z.string().trim().min(2, 'First Name cannot be empty'),
  lastName: z.string().trim().min(2, 'Last Name cannot be empty'),
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email cannot be empty'),
  userName: z.string().trim().min(2, 'Username cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export type SignInInput = z.infer<typeof signInSchema>;
