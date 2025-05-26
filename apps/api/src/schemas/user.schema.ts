import { z } from 'zod';

import type {
  ICreateAddressDTO,
  IUpdateAddressDTO,
} from '@/services/interfaces/IUserService';

export const createAddressSchema: z.ZodType<Omit<ICreateAddressDTO, 'userId'>> =
  z.object({
    name: z.string().min(1, 'Name is required'),
    street: z.string().min(1, 'Street is required'),
    apt: z.string().optional(),
    country: z.string().min(1, 'Country is required'),
    state: z.string().min(1, 'State is required'),
    city: z.string().min(1, 'City is required'),
    postcode: z.string().min(1, 'Postcode is required'),
    latitude: z
      .number()
      .min(-90)
      .max(90, 'Latitude must be between -90 and 90'),
    longitude: z
      .number()
      .min(-180)
      .max(180, 'Longitude must be between -180 and 180'),
    isDefault: z.boolean().optional().default(false),
  });

export const updateAddressSchema: z.ZodType<
  Omit<IUpdateAddressDTO, 'userId' | 'id'>
> = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  street: z.string().min(1, 'Street is required').optional(),
  apt: z.string().optional(),
  country: z.string().min(1, 'Country is required').optional(),
  state: z.string().min(1, 'State is required').optional(),
  city: z.string().min(1, 'City is required').optional(),
  postcode: z.string().min(1, 'Postcode is required').optional(),
  latitude: z
    .number()
    .min(-90)
    .max(90, 'Latitude must be between -90 and 90')
    .optional(),
  longitude: z
    .number()
    .min(-180)
    .max(180, 'Longitude must be between -180 and 180')
    .optional(),
  isDefault: z.boolean().optional(),
});
