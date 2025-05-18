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

  public async createPet(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this._petService.createPet({
        ...req.body,
        ownerId: req.user!.id,
      });
      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        data: result,
        message: ResponseMessages.CREATED, // Using generic CREATED message
      });
    } catch (error) {
      next(error);
    }
  }

  public async updatePet(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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
        message: ResponseMessages.UPDATED, // Using generic UPDATED message
      });
    } catch (error) {
      next(error);
    }
  }

  public async getPetById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this._petService.getPetById({ id });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS, // Using generic SUCCESS message for fetched
      });
    } catch (error) {
      next(error);
    }
  }

  public async deletePet(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      await this._petService.deletePet({ id, ownerId: req.user!.id });
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: ResponseMessages.DELETED, // Using generic DELETED message
      });
    } catch (error) {
      next(error);
    }
  }

  public async listPets(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this._petService.listPets(req.query);
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        data: result,
        message: ResponseMessages.SUCCESS, // Using generic SUCCESS message for fetched list
      });
    } catch (error) {
      next(error);
    }
  }
}
