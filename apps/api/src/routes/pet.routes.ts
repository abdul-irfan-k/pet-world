import { Router } from 'express';

import { PetController } from '@/controller';
import { authMiddleware, schemaValidator } from '@/middleware';
import { createPetSchema, updatePetSchema, listPetsSchema } from '@/schemas';

export class PetRoutes {
  private readonly _petController: PetController;

  constructor() {
    this._petController = new PetController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.get(
      '/',
      schemaValidator(listPetsSchema),
      this._petController.listPets.bind(this._petController),
    );

    router.get(
      '/my-pets',
      authMiddleware,
      this._petController.getMyPets.bind(this._petController),
    );

    router.post(
      '/',
      authMiddleware,
      schemaValidator(createPetSchema),
      this._petController.createPet.bind(this._petController),
    );

    router.put(
      '/:id',
      authMiddleware,
      schemaValidator(updatePetSchema),
      this._petController.updatePet.bind(this._petController),
    );

    router.get(
      '/:id',
      this._petController.getPetById.bind(this._petController),
    );

    router.delete(
      '/:id',
      authMiddleware,
      this._petController.deletePet.bind(this._petController),
    );

    return router;
  }
}
