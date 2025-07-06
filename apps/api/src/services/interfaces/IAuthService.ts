import { User } from '@/types/User';

export type ISignUpDTO = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
};
export interface ISignUpResponse {
  user: Omit<User, 'password' | 'isVerified' | 'isDisabled'>;
}

export type ISignInDTO = {
  email: string;
  password: string;
};

export type iSignInWithGoogleDTO = {
  idToken: string;
};
export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password' | 'isVerified' | 'isDisabled'>;
}

export interface IRefreshTokenDTO {
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export type IForgotPasswordDTO = {
  email: string;
};

export type IVerifyForgotPasswordDTO = {
  code: string;
  email: string;
  newPassword: string;
};

export interface IVerifyForgotPasswordResponse {
  success: boolean;
  message: string;
}

export type ILogoutDTO = {
  id: string;
};

export type IGetUserDetailsDTO = {
  id: string;
};

export interface IGetUserDetailsResponse {
  user: Omit<User, 'password' | 'isVerified' | 'isDisabled'>;
}

export interface IAuthService {
  signup(args: ISignUpDTO): Promise<ISignUpResponse>;
  signin(args: ISignInDTO): Promise<ISignInResponse>;
  signInWithGoogle(args: iSignInWithGoogleDTO): Promise<ISignInResponse>;
  refreshToken(args: IRefreshTokenDTO): Promise<IRefreshTokenResponse>;
  forgotPassword(args: IForgotPasswordDTO): Promise<void>;
  verifyForgotPassword(args: IVerifyForgotPasswordDTO): Promise<IVerifyForgotPasswordResponse>;
  logout(args: ILogoutDTO): Promise<void>;
  me(args: IGetUserDetailsDTO): Promise<IGetUserDetailsResponse>;
}
