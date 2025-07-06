import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name is required').optional(),
  userName: z.string().min(2, 'Username is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional(),
  profileImage: z.string().optional(),
  dateOfBirth: z.string().optional(),
});
export type IUpdateUserInput = z.infer<typeof updateUserSchema>;

export const addAddressSchema = z.object({
  name: z.string().trim().min(1, 'Name cannot be empty'),
  street: z.string().trim().min(1, 'Street cannot be empty'),
  apt: z.string().trim().optional(),
  country: z.string().trim().min(1, 'Country cannot be empty'),
  state: z.string().trim().min(1, 'State cannot be empty'),
  city: z.string().trim().min(1, 'City cannot be empty'),
  postcode: z.string().trim().min(1, 'Postcode cannot be empty'),
  latitude: z.number({ invalid_type_error: 'Latitude must be a number' }),
  longitude: z.number({ invalid_type_error: 'Longitude must be a number' }),
  isDefault: z.boolean().optional().default(false),
});
export type IAddAddressInput = z.infer<typeof addAddressSchema>;

export const updateAddressSchema = z.object({
  name: z.string().trim().min(1, 'Name cannot be empty').optional(),
  street: z.string().trim().min(1, 'Street cannot be empty').optional(),
  apt: z.string().trim().optional(),
  country: z.string().trim().min(1, 'Country cannot be empty').optional(),
  state: z.string().trim().min(1, 'State cannot be empty').optional(),
  city: z.string().trim().min(1, 'City cannot be empty').optional(),
  postcode: z.string().trim().min(1, 'Postcode cannot be empty').optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isDefault: z.boolean().optional(),
});

export type IUpdateAddressInput = z.infer<typeof updateAddressSchema>;
