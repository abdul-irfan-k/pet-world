import { Request, Response, NextFunction } from 'express';

export interface IAuthController {
  signup(req: Request, res: Response, next: NextFunction): Promise<void>;
  signin(req: Request, res: Response, next: NextFunction): Promise<void>;
  refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyForgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
  me(req: Request, res: Response, next: NextFunction): Promise<void>;
}
