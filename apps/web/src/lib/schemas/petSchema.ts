import { z } from 'zod';

export const addPetSchema = z.object({
  name: z.string().trim().min(1, 'Name cannot be empty'),
  species: z.string().trim().min(1, 'Species cannot be empty'),
  breed: z.string().trim().min(1, 'Breed cannot be empty'),
  age: z.number().int().positive('Age must be a positive integer'),
  profile: z.record(z.unknown()),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  gender: z.string().optional(),
});
export type IAddPetInput = z.infer<typeof addPetSchema>;

export const updatePetSchema = z.object({
  name: z.string().trim().min(1, 'Name cannot be empty').optional(),
  species: z.string().trim().min(1, 'Species cannot be empty').optional(),
  breed: z.string().trim().min(1, 'Breed cannot be empty').optional(),
  age: z.number().int().positive('Age must be a positive integer').optional(),
  profile: z.record(z.unknown()).optional(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  gender: z.string().optional(),
});

export type IUpdatePetInput = z.infer<typeof updatePetSchema>;
