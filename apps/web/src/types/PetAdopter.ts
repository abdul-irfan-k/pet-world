export type PetAdopterProfile = {
  id: string;
  userId: string;
  adharNumber?: string;
  documents?: {
    aadhaar?: {
      name: string;
      url: string;
    };
    certificate?: {
      name: string;
      url: string;
    };
  };
  yearOfExperience?: number;
  certifications: string[];
  overview: {
    bio?: string;
    motivation?: string;
    specialization?: string;
    preferredPets?: string[];
    location?: {
      city?: string;
      state?: string;
      country?: string;
    };
    availability?: {
      days?: string[];
      time?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};
