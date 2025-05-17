import { z } from 'zod';

import type {
  ICreatePetDTO,
  IUpdatePetDTO,
  IGetPetsQueryDTO,
} from '@/services/interfaces/IPetService';

//eslint-disable-next-line
//@ts-ignore
export const createPetSchema: z.ZodType<ICreatePetDTO> = z.object({
  name: z.string().trim().min(1, 'Name cannot be empty'),
  species: z.string().trim().min(1, 'Species cannot be empty'),
  breed: z.string().trim().min(1, 'Breed cannot be empty'),
  age: z.number().int().positive('Age must be a positive integer'),
  profile: z.record(z.unknown()),
});

export const updatePetSchema: z.ZodType<Omit<IUpdatePetDTO, 'id'>> = z.object({
  name: z.string().trim().min(1, 'Name cannot be empty').optional(),
  species: z.string().trim().min(1, 'Species cannot be empty').optional(),
  breed: z.string().trim().min(1, 'Breed cannot be empty').optional(),
  age: z.number().int().positive('Age must be a positive integer').optional(),
  profile: z.record(z.unknown()).optional(),
});

export const listPetsSchema: z.ZodType<IGetPetsQueryDTO> = z.object({
  species: z.string().trim().min(1).optional(),
  breed: z.string().trim().min(1).optional(),
  ageRange: z
    .tuple([z.number().int().positive(), z.number().int().positive()])
    .optional(),
});
