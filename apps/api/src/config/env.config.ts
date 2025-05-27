import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).default(3000),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_TOKEN_SECRET: z.string().min(1),
  JWT_REFRESH_TOKEN_SECRET: z.string().min(1),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z.string().default('1h'),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),
  SALT_ROUNDS: z.coerce.number().int().min(1).default(10),
  CORS_ORIGINS: z.string().default('*'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  GMAIL_USER: z.string().email(),
  GMAIL_APP_PASSWORD: z.string().min(1),
});

export const env = envSchema.parse(process.env);

export const {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  SALT_ROUNDS,
  CORS_ORIGINS,
  LOG_LEVEL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
} = env;
