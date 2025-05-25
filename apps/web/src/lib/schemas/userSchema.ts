import { z } from 'zod';

export const addAddressSchema = z.object({
  country: z.string().trim().min(1, 'Country cannot be empty'),
  city: z.string().trim().min(1, 'City cannot be empty'),
  latitude: z.number(),
  longitude: z.number(),
});
export type IAddAddressInput = z.infer<typeof addAddressSchema>;

export const updateAddressSchema = z.object({
  country: z.string().trim().min(1, 'Country cannot be empty').optional(),
  city: z.string().trim().min(1, 'City cannot be empty').optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type IUpdateAddressInput = z.infer<typeof updateAddressSchema>;
