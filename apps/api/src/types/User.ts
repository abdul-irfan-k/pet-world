export type User = {
  id: string;
  name: string;
  userName: string;
  email: string;
  phone?: string | null;
  age?: number | null;
  address?: Record<string, unknown> | null;
  gender?: string | null;
  password?: string;
  isDisabled: boolean;
  isVerified: boolean;
  lastLogin?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PetAdopter = {
  id: string;
  userId: string;
  adharNumber?: string | null;
  documents?: Record<string, unknown> | null;
  yearOfExperience?: number | null;
  certifications: string[];
  overview?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
};
