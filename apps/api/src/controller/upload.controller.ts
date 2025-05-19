import { IUploadController } from './interfaces/IUploadService';

import type { IUploadService } from '@/services/interfaces/IUploadService';
import type { Request, Response, NextFunction } from 'express';

import { HttpStatusCode, ResponseMessages } from '@/constants';
import { UploadService } from '@/services';
import { HttpError } from '@/utils';

export class UploadController implements IUploadController {
  private readonly _uploadService: IUploadService;

  constructor(uploadService: IUploadService = new UploadService()) {
    this._uploadService = uploadService;
  }

  public async uploadProfileImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const file = req.file;

      if (!file) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: ResponseMessages.FILE_NOT_PROVIDED,
        });
      }

      const result = await this._uploadService.uploadFile({
        file,
        resourceType: 'image',
        folder: 'profile_images',
        tags: ['profile'],
      });

      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        data: result,
        message: 'Profile image uploaded successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  public async uploadPetImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const file = req.file;

      if (!file) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: ResponseMessages.FILE_NOT_PROVIDED,
        });
      }

      const result = await this._uploadService.uploadFile({
        file,
        resourceType: 'image',
        folder: 'pet_images',
        tags: ['pet'],
      });

      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        data: result,
        message: 'Pet image uploaded successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  public async uploadPetVideos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const file = req.file;

      if (!file) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: ResponseMessages.FILE_NOT_PROVIDED,
        });
      }

      const result = await this._uploadService.uploadFile({
        file,
        resourceType: 'video',
        folder: 'pet_videos',
        tags: ['pet'],
      });

      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        data: result,
        message: 'Pet video(s) uploaded successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteFile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { publicId, resourceType } = req.body;

      if (!publicId) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: ResponseMessages.PUBLIC_ID_NOT_PROVIDED,
        });
      }

      if (!resourceType) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: 'Resource type not provided.',
        });
      }

      await this._uploadService.deleteFile({ publicId, resourceType });

      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: ResponseMessages.DELETE_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deletePetVideos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { publicId } = req.body;

      if (!publicId) {
        throw new HttpError({
          statusCode: HttpStatusCode.BAD_REQUEST,
          message: ResponseMessages.PUBLIC_ID_NOT_PROVIDED,
        });
      }

      await this._uploadService.deleteFile({
        publicId,
        resourceType: 'video',
      });

      res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: 'Pet video(s) deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  }
}
