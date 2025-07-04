import { z } from 'zod';

export const addPetCareRequestSchema = z.object({
  // petId: z.string().min(1, 'Pet ID cannot be empty'),
  // locationId: z.string().min(1, 'Location cannot be empty'),
  title: z.string().trim().min(3, 'Title is too short'),
  amount: z.number().positive('Amount must be positive'),
  description: z.string().min(10, 'Description is too short'),
  // startDate: z.coerce.date({ required_error: 'Start date is required' }),
  // endDate: z.coerce.date({ required_error: 'End date is required' }),
  questions: z.record(z.any()).optional(),
});
export type IAddPetCareRequestInput = z.infer<typeof addPetCareRequestSchema>;

export const addPetCareProposalSchema = z.object({
  petCareRequestId: z.string().min(1, 'Pet Care Request ID cannot be empty'),
  message: z.string().trim().min(10, 'Message is too short (minimum 10 characters)'),
  proposedFee: z.number().positive('Proposed fee must be a positive number'),
  answers: z.record(z.string()).optional(),
});

export type IAddPetCareProposalInput = z.infer<typeof addPetCareProposalSchema>;
