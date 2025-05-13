export interface signUpArgs {
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  password: string;
}

export interface signInArgs {
  email: string;
  password: string;
}

export interface signInResponse {
  accessToken: string;
  refreshToken: string;
}
export interface signUpResponse {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface signOutArgs {
  userId: string;
}
export interface IAuthService {
  signup(args: signUpArgs): Promise<signUpResponse>;
  signin(args: signInArgs): Promise<signInResponse>;
  signout(args: signOutArgs): Promise<void>;
}
