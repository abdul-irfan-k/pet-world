import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import { TokenExpiredError } from 'jsonwebtoken';

import type {
  IAuthService,
  ISignInDTO,
  ISignInResponse,
  ISignUpDTO,
  ISignUpResponse,
  IRefreshTokenDTO,
  IRefreshTokenResponse,
  IForgotPasswordDTO,
  IVerifyForgotPasswordDTO,
  IVerifyForgotPasswordResponse,
  ILogoutDTO,
  IGetUserDetailsDTO,
  IGetUserDetailsResponse,
  iSignInWithGoogleDTO,
} from './interfaces/IAuthService';

import { GOOGLE_CLIENT_ID, logger, prisma } from '@/config';
import { HttpStatusCode, ResponseMessages, OtpAction } from '@/constants';
import {
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  HttpError,
  checkEmailExists,
  generateOTP,
  getPasswordChangeTemplate,
  sendEmail,
  verifyRefreshToken,
} from '@/utils';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

export class AuthService implements IAuthService {
  public async signup(args: ISignUpDTO): Promise<ISignUpResponse> {
    const { email, password, firstName, lastName, userName } = args;

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
        userName: userName,
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      },
    });

    return {
      user: {
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    };
  }

  public async signin(args: ISignInDTO): Promise<ISignInResponse> {
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

    const accessToken = await generateAccessToken({
      email: user.email,
      id: user.id,
    });
    const refreshToken = await generateRefreshToken({
      email: user.email,
      id: user.id,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  public async signInWithGoogle(args: iSignInWithGoogleDTO): Promise<ISignInResponse> {
    try {
      const { idToken } = args;
      if (idToken === undefined) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: 'INVALID_GOOGLE_SIGNIN_REQUEST',
        });
      }
      const ticket = await googleClient.verifyIdToken({
        idToken: idToken,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: 'GOOGLE_PAYLOAD_NOT_FOUND',
        });
      }
      const email = payload.email;

      if (email === undefined) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: 'GOOGLE_EMAIL_NOT_FOUND',
        });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: ResponseMessages.INVALID_CREDENTIALS,
        });
      }

      const accessToken = await generateAccessToken({
        email: user.email,
        id: user.id,
      });
      const refreshToken = await generateRefreshToken({
        email: user.email,
        id: user.id,
      });

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public async refreshToken(args: IRefreshTokenDTO): Promise<IRefreshTokenResponse> {
    try {
      //eslint-disable-next-line
      //@ts-ignore
      const { refreshToken } = args;

      const payload = await verifyRefreshToken(refreshToken);
      if (!payload) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: 'INVALID_REFRESH_TOKEN',
        });
      }

      const { email, id } = payload;
      const newAccessToken = generateAccessToken({
        email,
        id,
      });
      const newRefreshToken = generateRefreshToken({
        email,
        id,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpError({
          statusCode: HttpStatusCode.UNAUTHORIZED,
          message: 'REFRESH_TOKEN_EXPIRED',
        });
      }

      if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public async forgotPassword(args: IForgotPasswordDTO): Promise<void> {
    const { email } = args;

    const user = await prisma.user.findUnique({
      where: { email, isDeleted: false },
    });

    if (!user) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.USER_NOT_FOUND,
      });
    }

    await prisma.otp.deleteMany({
      where: {
        userId: user.id,
        action: OtpAction.RESET_PASSWORD,
      },
    });

    const otp = generateOTP(6);

    const OTP_EXPIRY_MINUTES = 15;
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await prisma.otp.create({
      data: {
        userId: user.id,
        code: otp,
        expiresAt: expiresAt,
        action: OtpAction.RESET_PASSWORD,
      },
    });
    const emailHtml = getPasswordChangeTemplate(otp);

    try {
      await sendEmail(email, 'Password Reset OTP', emailHtml);
      logger.info('password reset email sent successfully');
    } catch (error) {
      logger.error('Error sending password reset email:', error);
      throw new HttpError({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: ResponseMessages.EMAIL_SEND_FAILED,
      });
    }
  }

  public async verifyForgotPassword(args: IVerifyForgotPasswordDTO): Promise<IVerifyForgotPasswordResponse> {
    try {
      const { email, code, newPassword } = args;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new HttpError({
          statusCode: HttpStatusCode.NOT_FOUND,
          message: ResponseMessages.USER_NOT_FOUND,
        });
      }

      const otpRecord = await prisma.otp.findFirst({
        where: {
          userId: user.id,
          action: OtpAction.RESET_PASSWORD,
        },
      });

      if (!otpRecord) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: ResponseMessages.OTP_EXPIRED,
        });
      }

      if (otpRecord.code !== code) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: ResponseMessages.INVALID_OTP,
        });
      }

      if (new Date() > otpRecord.expiresAt) {
        await prisma.otp.update({
          where: { id: otpRecord.id },
          data: { isDeleted: true },
        });
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: ResponseMessages.OTP_EXPIRED,
        });
      }

      const hashedPassword = await hashPassword(newPassword);

      await prisma.$transaction([
        prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword },
        }),
        prisma.otp.update({
          where: { id: otpRecord.id },
          data: { isDeleted: true },
        }),
      ]);
      return { success: true, message: ResponseMessages.SUCCESS };
    } catch (error) {
      logger.error('Error verifying forgot password (resetting password):', error);
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public async logout(args: ILogoutDTO): Promise<void> {
    // const { userId } = args;
    return Promise.resolve();
  }

  public async me(args: IGetUserDetailsDTO): Promise<IGetUserDetailsResponse> {
    const { id } = args;

    const user = await prisma.user.findUnique({
      where: { id, isDeleted: false },
    });

    if (!user) {
      throw new HttpError({
        statusCode: HttpStatusCode.NOT_FOUND,
        message: ResponseMessages.USER_NOT_FOUND,
      });
    }

    return {
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
