import { User } from '@/types/User';

export interface ISignUpDTO {
  firstName: string;
  lastName: string;
  userName: string;
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
  user: Omit<User, 'password' | 'isVerified' | 'isDisabled'>;
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

export interface IVerifyForgotPasswordDTO {
  code: string;
  email: string;
  newPassword: string;
}

export interface IVerifyForgotPasswordResponseDTO {
  success: boolean;
  message: string;
}

export interface ISignUpResponseDTO {
  user: Omit<User, 'password' | 'isVerified' | 'isDisabled'>;
}

export interface ILogoutDTO {
  id: string;
}

export interface IGetUserDetailsDTO {
  id: string;
}

export interface IGetUserDetailsResponseDTO {
  user: Omit<User, 'password' | 'isVerified' | 'isDisabled'>;
}

export interface IAuthService {
  signup(args: ISignUpDTO): Promise<ISignUpResponseDTO>;
  signin(args: ISignInDTO): Promise<ISignInResponseDTO>;
  refreshToken(args: IRefreshTokenDTO): Promise<IRefreshTokenResponseDTO>;
  forgotPassword(args: IForgotPasswordDTO): Promise<void>;
  verifyForgotPassword(
    args: IVerifyForgotPasswordDTO,
  ): Promise<IVerifyForgotPasswordResponseDTO>;
  logout(args: ILogoutDTO): Promise<void>;
  me(args: IGetUserDetailsDTO): Promise<IGetUserDetailsResponseDTO>;
}
