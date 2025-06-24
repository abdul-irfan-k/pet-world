import type { NextFunction, Request, Response } from 'express';

export interface IPetController {
  createPet(req: Request, res: Response, next: NextFunction): Promise<void>;
  updatePet(req: Request, res: Response, next: NextFunction): Promise<void>;
  getPetById(req: Request, res: Response, next: NextFunction): Promise<void>;
  deletePet(req: Request, res: Response, next: NextFunction): Promise<void>;
  listPets(req: Request, res: Response, next: NextFunction): Promise<void>;
  getMyPets(req: Request, res: Response, next: NextFunction): Promise<void>;
  addPetToFavorites(req: Request, res: Response, next: NextFunction): Promise<void>;
  removePetFromFavorites(req: Request, res: Response, next: NextFunction): Promise<void>;
  getFavoritePetsByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
  isPetFavoritedByUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAdoptionRequestedPets(req: Request, res: Response, next: NextFunction): Promise<void>;
}
