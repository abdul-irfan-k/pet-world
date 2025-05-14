export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  age?: number | null;
  address?: Record<string, unknown> | null;
  gender?: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
