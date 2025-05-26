export type Location = {
  id: string;
  userId: string;
  name: string;
  street: string;
  apt?: string | null;
  country: string;
  state: string;
  city: string;
  postcode: string;
  latitude: number;
  longitude: number;
  isDefault?: boolean;
  createdAt: Date;
  updatedAt: Date;
};
