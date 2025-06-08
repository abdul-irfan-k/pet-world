import type { IPetController } from './interfaces/IPetController';
import type { IPetService } from '@/services/interfaces/IPetService';
import type { NextFunction, Request, Response } from 'express';

import { HttpStatusCode, ResponseMessages } from '@/constants';
import { PetService } from '@/services';

export class PetController implements IPetController {
  private readonly _petService: IPetService;

  constructor(petService: IPetService = new PetService()) {
    this._petService = petService;
  }

  public async createPet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._petService.createPet({
        ...req.body,
        ownerId: req.user!.id,
      });
      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        data: result,
        message: ResponseMessages.CREATED,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updatePet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._petService.updatePet({
        id,
        ownerId: req.user!.id,
        ...req.body,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.UPDATED,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getPetById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._petService.getPetById({ id });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deletePet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this._petService.deletePet({ id, ownerId: req.user!.id });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: ResponseMessages.DELETED,
      });
    } catch (error) {
      next(error);
    }
  }

  public async listPets(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._petService.listPets({
        ...req.query,
        userId: req.user?.id,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getMyPets(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._petService.getMyPets(req.user!.id);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async addPetToFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { petId } = req.body;
      const userId = req.user!.id;
      const result = await this._petService.addPetToFavorites({
        userId,
        petId,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.FAVORITE_PET_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async removePetFromFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { petId } = req.params;
      const userId = req.user!.id;
      await this._petService.removePetFromFavorites({ userId, petId });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: ResponseMessages.UNFAVORITE_PET_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getFavoritePetsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const result = await this._petService.getFavoritePetsByUserId({ userId });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async isPetFavoritedByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { petId } = req.params;
      const userId = req.user!.id;
      const result = await this._petService.isPetFavoritedByUser({
        userId,
        petId,
      });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }
}
