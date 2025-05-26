import { z } from 'zod';

import type {
  ICreateAddressDTO,
  IUpdateAddressDTO,
} from '@/services/interfaces/IUserService';

export const createAddressSchema: z.ZodType<Omit<ICreateAddressDTO, 'userId'>> =
  z.object({
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
    latitude: z
      .number()
      .min(-90)
      .max(90, 'Latitude must be between -90 and 90'),
    longitude: z
      .number()
      .min(-180)
      .max(180, 'Longitude must be between -180 and 180'),
  });

export const updateAddressSchema: z.ZodType<
  Omit<IUpdateAddressDTO, 'userId' | 'id'>
> = z.object({
  country: z.string().min(1, 'Country is required').optional(),
  city: z.string().min(1, 'City is required').optional(),
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
});
