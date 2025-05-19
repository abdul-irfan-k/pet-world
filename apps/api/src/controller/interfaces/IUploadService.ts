import { Request, Response, NextFunction } from 'express';

export interface IUploadController {
  uploadProfileImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  uploadPetImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  uploadPetVideos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  deletePetVideos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
