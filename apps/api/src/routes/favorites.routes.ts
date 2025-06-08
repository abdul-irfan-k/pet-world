// favorites.routes.ts
import { Router } from 'express';

import { PetController } from '@/controller';
import { authMiddleware } from '@/middleware';

export class FavoriteRoutes {
  private readonly _petController: PetController;

  constructor() {
    this._petController = new PetController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.post('/', authMiddleware, this._petController.addPetToFavorites.bind(this._petController));

    router.delete('/:petId', authMiddleware, this._petController.removePetFromFavorites.bind(this._petController));

    router.get('/', authMiddleware, this._petController.getFavoritePetsByUserId.bind(this._petController));

    router.get('/:petId/status', authMiddleware, this._petController.isPetFavoritedByUser.bind(this._petController));

    return router;
  }
}
