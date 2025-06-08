import { z } from 'zod';

import type {
  ISignUpDTO,
  ISignInDTO,
  IRefreshTokenDTO,
  IForgotPasswordDTO,
  IVerifyForgotPasswordDTO,
  ILogoutDTO,
} from '@/services/interfaces/IAuthService';

export const signUpSchema: z.ZodType<ISignUpDTO> = z.object({
  firstName: z.string().trim().min(2, 'First Name cannot be empty'),
  lastName: z.string().trim().min(2, 'Last Name cannot be empty'),
  email: z.string().email('Invalid email address').min(1, 'Email cannot be empty'),
  userName: z.string().trim().min(2, 'Username cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const signInSchema: z.ZodType<ISignInDTO> = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const refreshTokenSchema: z.ZodType<IRefreshTokenDTO> = z.object({
  refreshToken: z.string().min(1, 'Refresh token cannot be empty'),
});

export const forgotPasswordSchema: z.ZodType<IForgotPasswordDTO> = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email cannot be empty'),
});

export const verifyForgotPasswordSchema: z.ZodType<IVerifyForgotPasswordDTO> = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email cannot be empty'),
  code: z.string().length(6, 'Code must be 6 characters long'), // Assuming OTP code length is 6, adjust if necessary
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
});

export const logoutSchema: z.ZodType<ILogoutDTO> = z.object({
  id: z.string().min(1, 'User ID cannot be empty'),
});
