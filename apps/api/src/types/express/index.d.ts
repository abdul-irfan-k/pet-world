declare namespace Express {
  export interface User {
    id: string;
    email: string;
    role?: string;
  }

  export interface Request {
    user?: User;
  }
}
