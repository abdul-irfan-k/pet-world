import type {
  IAuthService,
  ISignInDTO,
  ISignInResponseDTO,
  ISignUpDTO,
  ISignUpResponseDTO,
  IRefreshTokenDTO,
  IRefreshTokenResponseDTO,
  IForgotPasswordDTO,
  IResetPasswordDTO,
  ILogoutDTO,
} from './interfaces/IAuthService';

import { prisma } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import {
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  HttpError,
  checkEmailExists,
} from '@/utils';

export class AuthService implements IAuthService {
  public async signup(args: ISignUpDTO): Promise<ISignUpResponseDTO> {
    const { email, password, firstName, lastName, userId } = args;

    const isEmailValid = await checkEmailExists(email);
    if (!isEmailValid) {
      throw new HttpError({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: ResponseMessages.INVALID_EMAIL,
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new HttpError({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: ResponseMessages.EMAIL_ALREADY_EXISTS,
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        userId: userId,
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      },
    });

    return {
      id: newUser.id,
      userId: newUser.userId,
      email: newUser.email,
      firstName: newUser.name.split(' ')[0],
      lastName: newUser.name.split(' ').slice(1).join(' '),
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  public async signin(args: ISignInDTO): Promise<ISignInResponseDTO> {
    const { email, password } = args;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpError({
        statusCode: HttpStatusCode.UNAUTHORIZED,
        message: ResponseMessages.INVALID_CREDENTIALS,
      });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError({
        statusCode: HttpStatusCode.UNAUTHORIZED,
        message: ResponseMessages.INVALID_CREDENTIALS,
      });
    }

    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async refreshToken(
    args: IRefreshTokenDTO,
  ): Promise<IRefreshTokenResponseDTO> {
    const { refreshToken } = args;
    const newAccessToken = generateAccessToken({ userId: 'someUserId' });
    const newRefreshToken = generateRefreshToken({ userId: 'someUserId' });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  public async forgotPassword(args: IForgotPasswordDTO): Promise<void> {
    const { email } = args;
    return Promise.resolve();
  }

  public async resetPassword(args: IResetPasswordDTO): Promise<void> {
    const { resetToken, newPassword } = args;
    return Promise.resolve();
  }

  public async logout(args: ILogoutDTO): Promise<void> {
    const { userId } = args;
    return Promise.resolve();
  }
}
