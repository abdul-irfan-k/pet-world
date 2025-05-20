import { Router } from 'express';

import { PetCareController } from '@/controller';
import { authMiddleware } from '@/middleware';

export class PetCareRoutes {
  private readonly _petCareController: PetCareController;

  constructor() {
    this._petCareController = new PetCareController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.post(
      '/requests/',
      authMiddleware,
      this._petCareController.createPetCareRequest.bind(
        this._petCareController,
      ),
    );

    router.get(
      '/requests/',
      this._petCareController.listPetCareRequests.bind(this._petCareController),
    );

    router.get(
      '/requests/:requestId',
      this._petCareController.getPetCareRequestById.bind(
        this._petCareController,
      ),
    );

    router.put(
      '/requests/:requestId',
      authMiddleware,
      this._petCareController.updatePetCareRequest.bind(
        this._petCareController,
      ),
    );

    router.delete(
      '/requests/:requestId',
      authMiddleware,
      this._petCareController.deletePetCareRequest.bind(
        this._petCareController,
      ),
    );

    return router;
  }
}
