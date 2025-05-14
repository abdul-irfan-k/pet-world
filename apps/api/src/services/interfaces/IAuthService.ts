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

export interface IAuthService {
  signup(args: ISignUpDTO): Promise<ISignUpResponseDTO>;
  signin(args: ISignInDTO): Promise<ISignInResponseDTO>;
  refreshToken(args: IRefreshTokenDTO): Promise<IRefreshTokenResponseDTO>;
  forgotPassword(args: IForgotPasswordDTO): Promise<void>;
  resetPassword(args: IResetPasswordDTO): Promise<void>;
  logout(args: ILogoutDTO): Promise<void>;
}
