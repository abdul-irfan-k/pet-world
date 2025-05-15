import { User } from '@/types/User';

export interface ISignUpDTO {
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  password: string;
}

export interface ISignInDTO {
  email: string;
  password: string;
}

export interface ISignInResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export interface IRefreshTokenDTO {
  refreshToken: string;
}

export interface IRefreshTokenResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface IForgotPasswordDTO {
  email: string;
}

export interface IResetPasswordDTO {
  resetToken: string;
  newPassword: string;
}

export interface ISignUpResponseDTO {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ILogoutDTO {
  id: string;
}

export interface IGetUserDetailsDTO {
  id: string;
}

export interface IGetUserDetailsResponseDTO {
  id: string;
  userId: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthService {
  signup(args: ISignUpDTO): Promise<ISignUpResponseDTO>;
  signin(args: ISignInDTO): Promise<ISignInResponseDTO>;
  refreshToken(args: IRefreshTokenDTO): Promise<IRefreshTokenResponseDTO>;
  forgotPassword(args: IForgotPasswordDTO): Promise<void>;
  resetPassword(args: IResetPasswordDTO): Promise<void>;
  logout(args: ILogoutDTO): Promise<void>;
  me(args: IGetUserDetailsDTO): Promise<IGetUserDetailsResponseDTO>;
}
