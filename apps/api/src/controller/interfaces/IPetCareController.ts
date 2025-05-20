import type { NextFunction, Request, Response } from 'express';

export interface IPetCareController {
  createPetCareRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  updatePetCareRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getPetCareRequestById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  deletePetCareRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  listPetCareRequests(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
