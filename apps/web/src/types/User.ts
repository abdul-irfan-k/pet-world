export interface User {
  id: string;
  name: string;
  userName: string;
  dateOfBirth?: Date | null;
  email: string;
  phone?: string | null;
  age?: number | null;
  address?: Record<string, unknown> | null;
  gender?: string | null;
  password: string;
  profileImage?: string; // Added profileImage
  createdAt: Date;
  updatedAt: Date;
}

export interface PetAdopter {
  id: string;
  userId: string;
  adharNumber?: string | null;
  documents?: Record<string, unknown> | null;
  yearOfExperience?: number | null;
  certifications: string[];
  overview?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}
