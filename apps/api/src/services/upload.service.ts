import fs from 'fs';

import {
  IUploadService,
  IDeleteFileDTO,
  IUploadFileDTO,
  IUploadMultipleFilesDTO,
  UploadResult,
} from './interfaces/IUploadService';

import { cloudinary, CLOUDINARY_UPLOAD_PRESETS } from '@/config';
import { HttpStatusCode, ResponseMessages } from '@/constants';
import { HttpError } from '@/utils';
export class UploadService implements IUploadService {
  public async uploadFile({ file, resourceType, folder, tags }: IUploadFileDTO): Promise<UploadResult> {
    try {
      const uploadPreset = this.getUploadPreset(folder);
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: resourceType,
        folder,
        tags,
        upload_preset: uploadPreset,
      });

      fs.unlinkSync(file.path);
      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        format: result.format,
        resource_type: result.resource_type,
        created_at: result.created_at,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
        duration: result.duration,
      };
    } catch (error) {
      throw new HttpError({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: ResponseMessages.UPLOAD_FAILED,
      });
    }
  }

  public async uploadMultipleFiles({
    files,
    resourceType,
    folder,
    tags,
  }: IUploadMultipleFilesDTO): Promise<UploadResult[]> {
    try {
      const uploadPreset = this.getUploadPreset(folder);
      const uploadPromises = files.map(file =>
        cloudinary.uploader.upload(file.path, {
          resource_type: resourceType,
          folder,
          tags,
          upload_preset: uploadPreset,
        }),
      );
      const results = await Promise.all(uploadPromises);
      files.forEach(file => {
        fs.unlinkSync(file.path);
      });
      return results;
    } catch (error) {
      throw new HttpError({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: ResponseMessages.UPLOAD_FAILED,
      });
    }
  }

  public async deleteFile({ publicId }: IDeleteFileDTO): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new HttpError({
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: ResponseMessages.DELETE_FAILED,
      });
    }
  }

  private getUploadPreset(folder: string): string {
    if (folder.includes('profile_images')) {
      return CLOUDINARY_UPLOAD_PRESETS.USER_PROFILE;
    } else if (folder.includes('pet') && folder.includes('videos')) {
      return CLOUDINARY_UPLOAD_PRESETS.PET_VIDEOS;
    } else {
      return CLOUDINARY_UPLOAD_PRESETS.PET_IMAGES;
    }
  }
}
