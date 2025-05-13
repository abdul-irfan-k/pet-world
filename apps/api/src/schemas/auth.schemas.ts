import { z } from 'zod';

import type { ISignUpDTO } from '@/services/interfaces/IAuthService';

export const signUpSchema: z.ZodType<ISignUpDTO> = z.object({
  firstName: z.string().trim().min(2, 'First Name cannot be empty'),
  lastName: z.string().trim().min(2, 'Last Name cannot be empty'),
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email cannot be empty'),
  userId: z.string().trim().min(2, 'Username cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const signInSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
