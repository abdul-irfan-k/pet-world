import { Router } from 'express';

import { AdminController } from '@/controller';
import { adminAuthMiddleware } from '@/middleware';

export class AdminRoutes {
  private readonly _adminController: AdminController;

  constructor() {
    this._adminController = new AdminController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.post(
      '/login',
      this._adminController.login.bind(this._adminController),
    );

    router.post(
      '/logout',
      adminAuthMiddleware,
      this._adminController.logout.bind(this._adminController),
    );

    router.get(
      '/me',
      adminAuthMiddleware,
      this._adminController.getAdminProfile.bind(this._adminController),
    );

    router.get(
      '/users',
      adminAuthMiddleware,
      this._adminController.getAllAdopters.bind(this._adminController),
    );

    router.get(
      '/users/:id',
      adminAuthMiddleware,
      this._adminController.getAdopterById.bind(this._adminController),
    );

    router.patch(
      '/users/:id/verify',
      adminAuthMiddleware,
      this._adminController.verifyAdopterDocuments.bind(this._adminController),
    );

    router.put(
      '/users/:id',
      adminAuthMiddleware,
      this._adminController.updateAdopterDetails.bind(this._adminController),
    );

    router.delete(
      '/users/:id',
      adminAuthMiddleware,
      this._adminController.deleteAdopter.bind(this._adminController),
    );

    // Pet management routes
    router.get(
      '/pets',
      adminAuthMiddleware,
      this._adminController.getAllPets.bind(this._adminController),
    );

    router.get(
      '/pets/:petId',
      adminAuthMiddleware,
      this._adminController.getPetById.bind(this._adminController),
    );

    router.delete(
      '/pets/:petId',
      adminAuthMiddleware,
      this._adminController.deletePet.bind(this._adminController),
    );

    router.patch(
      '/pets/:petId/status',
      adminAuthMiddleware,
      this._adminController.updatePetStatus.bind(this._adminController),
    );

    // Adoption request management routes
    router.get(
      '/adoptions',
      adminAuthMiddleware,
      this._adminController.getAllAdoptionRequests.bind(this._adminController),
    );

    router.get(
      '/adoptions/:requestId',
      adminAuthMiddleware,
      this._adminController.getAdoptionRequestById.bind(this._adminController),
    );

    router.delete(
      '/adoptions/:requestId',
      adminAuthMiddleware,
      this._adminController.deleteAdoptionRequest.bind(this._adminController),
    );

    return router;
  }
}
