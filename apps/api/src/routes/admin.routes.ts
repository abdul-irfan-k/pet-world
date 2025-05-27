import { Router } from 'express';

import { AdminController } from '@/controller';
import { authMiddleware } from '@/middleware';

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
      authMiddleware,
      this._adminController.logout.bind(this._adminController),
    );

    router.get(
      '/me',
      authMiddleware,
      this._adminController.getAdminProfile.bind(this._adminController),
    );

    router.get(
      '/users',
      authMiddleware,
      this._adminController.getAllAdopters.bind(this._adminController),
    );

    router.get(
      '/users/:id',
      authMiddleware,
      this._adminController.getAdopterById.bind(this._adminController),
    );

    router.patch(
      '/users/:id/verify',
      authMiddleware,
      this._adminController.verifyAdopterDocuments.bind(this._adminController),
    );

    router.put(
      '/users/:id',
      authMiddleware,
      this._adminController.updateAdopterDetails.bind(this._adminController),
    );

    router.delete(
      '/users/:id',
      authMiddleware,
      this._adminController.deleteAdopter.bind(this._adminController),
    );

    return router;
  }
}
