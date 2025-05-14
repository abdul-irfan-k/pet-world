import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} from '../config/env.config';

import type {
  SignOptions,
  VerifyOptions,
  JwtPayload,
  Algorithm,
} from 'jsonwebtoken';

interface IAccessTokenPayload {
  id: string;
  email: string;
}

interface IRefreshTokenPayload {
  id: string;
  email: string;
  jti?: string;
}

const JWT_ALGORITHM: Algorithm = 'HS256';

const accessSecret: jwt.Secret = JWT_ACCESS_TOKEN_SECRET!;
const refreshSecret: jwt.Secret = JWT_REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (
  payload: IAccessTokenPayload,
  overrides?: SignOptions,
): string => {
  const options: SignOptions = {
    algorithm: JWT_ALGORITHM,
    // eslint-disable-next-line
    //@ts-ignore
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
    ...overrides,
  };

  return jwt.sign(payload, accessSecret, options);
};

export const verifyAccessToken = (
  token: string,
  overrides?: VerifyOptions,
): IAccessTokenPayload & JwtPayload => {
  const options: VerifyOptions = {
    algorithms: [JWT_ALGORITHM],
    ...overrides,
  };

  const decoded = jwt.verify(token, accessSecret, options);
  return decoded as IAccessTokenPayload & JwtPayload;
};

export const generateRefreshToken = (
  payload: IRefreshTokenPayload,
  overrides?: SignOptions,
): string => {
  const jti = payload.jti ?? uuidv4();

  const options: SignOptions = {
    // eslint-disable-next-line
    //@ts-ignore
    expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
    algorithm: JWT_ALGORITHM,
    ...overrides,
  };

  return jwt.sign({ ...payload, jti }, refreshSecret, options);
};

export const verifyRefreshToken = (
  token: string,
  overrides?: VerifyOptions,
): IRefreshTokenPayload & JwtPayload => {
  const options: VerifyOptions = {
    algorithms: [JWT_ALGORITHM],
    ...overrides,
  };

  const decoded = jwt.verify(token, refreshSecret, options);
  return decoded as IRefreshTokenPayload & JwtPayload;
};

export const decodeToken = (token: string): JwtPayload | string | null => {
  return jwt.decode(token, { complete: true });
};
