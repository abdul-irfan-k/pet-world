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
export interface ISignUpResponseDTO {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISignOutDTO {
  userId: string;
}
export interface IAuthService {
  signup(args: ISignUpDTO): Promise<ISignUpResponseDTO>;
  signin(args: ISignInDTO): Promise<ISignInResponseDTO>;
  signout(args: ISignOutDTO): Promise<void>;
}
