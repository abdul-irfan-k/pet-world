import { Router } from 'express';

import { upload } from '@/config/multer.config';
import { UploadController } from '@/controller';
import { authMiddleware } from '@/middleware';

export class UploadRoutes {
  private readonly _uploadController: UploadController;

  constructor() {
    this._uploadController = new UploadController();
  }

  public getRoutes(): Router {
    const router = Router();

    router.post(
      '/profile-image',
      authMiddleware,
      upload.single('profile'),
      this._uploadController.uploadProfileImage.bind(this._uploadController),
    );

    router.post(
      '/pets/:petId/images',
      authMiddleware,
      upload.array('petImages'),
      this._uploadController.uploadPetImage.bind(this._uploadController),
    );

    router.post(
      '/pets/:petId/videos',
      authMiddleware,
      upload.array('petVideos'),
      this._uploadController.uploadPetVideos.bind(this._uploadController),
    );

    router.delete(
      '/pets/:petId/videos',
      authMiddleware,
      this._uploadController.deletePetVideos.bind(this._uploadController),
    );

    return router;
  }
}
