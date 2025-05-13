import jwt, {
  SignOptions,
  VerifyOptions,
  JwtPayload,
  Algorithm,
} from 'jsonwebtoken';

import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} from '../config/env.config';

interface IAccessTokenPayload {
  userId: string;
}

interface IRefreshTokenPayload {
  userId: string;
  jti?: string;
}

const JWT_ALGORITHM: Algorithm = 'HS256';

export const generateAccessToken = (
  payload: IAccessTokenPayload,
  options?: SignOptions,
): string => {
  return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
    algorithm: JWT_ALGORITHM,
    ...options,
  });
};

export const verifyAccessToken = (
  token: string,
  options?: VerifyOptions,
): IAccessTokenPayload & JwtPayload => {
  const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, {
    algorithms: [JWT_ALGORITHM],
    ...options,
  });
  return decoded as IAccessTokenPayload & JwtPayload;
};

export const generateRefreshToken = (
  payload: IRefreshTokenPayload,
  options?: SignOptions,
): string => {
  return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
    ...options,
  });
};

export const verifyRefreshToken = (
  token: string,
  options?: VerifyOptions,
): IRefreshTokenPayload & JwtPayload => {
  // Removed unnecessary try/catch
  const decoded = jwt.verify(token, JWT_REFRESH_TOKEN_SECRET, {
    algorithms: [JWT_ALGORITHM],
    ...options,
  });
  return decoded as IRefreshTokenPayload & JwtPayload;
};

export const decodeToken = (token: string): JwtPayload | string | null => {
  return jwt.decode(token, { complete: true });
};
