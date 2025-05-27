import type { NextFunction, Request, Response } from 'express';

export interface IAdminController {
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAdminProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getAllAdopters(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getAdopterById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  verifyAdopterDocuments(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  updateAdopterDetails(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  deleteAdopter(req: Request, res: Response, next: NextFunction): Promise<void>;
}
