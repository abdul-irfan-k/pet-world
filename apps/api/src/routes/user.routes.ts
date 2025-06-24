import { Router } from 'express';

import { UserController } from '@/controller';
import { authMiddleware, schemaValidator } from '@/middleware';
import { createAddressSchema, updateAddressSchema } from '@/schemas';

export class UserRoutes {
  private readonly _userController: UserController;

  constructor() {
    this._userController = new UserController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.post(
      '/addresses',
      authMiddleware,
      schemaValidator(createAddressSchema),
      this._userController.addAddress.bind(this._userController),
    );

    router.get('/addresses', authMiddleware, this._userController.getAddresses.bind(this._userController));

    router.get('/addresses/:id', authMiddleware, this._userController.getAddressById.bind(this._userController));

    router.patch(
      '/addresses/:id',
      authMiddleware,
      schemaValidator(updateAddressSchema),
      this._userController.updateAddress.bind(this._userController),
    );

    router.delete('/addresses/:id', authMiddleware, this._userController.deleteAddress.bind(this._userController));

    router.get('/pet-adopter-profile/:id', this._userController.getPetAdopterPublicProfile.bind(this._userController));

    router.post(
      '/pet-adopter-profile',
      authMiddleware,
      this._userController.createPetAdopterProfile.bind(this._userController),
    );

    router.patch(
      '/pet-adopter-profile',
      authMiddleware,
      this._userController.updatePetAdopterProfile.bind(this._userController),
    );

    router.get(
      '/pet-adopter-profile/status',
      authMiddleware,
      this._userController.getPetAdopterProfileStatus.bind(this._userController),
    );

    return router;
  }
}
