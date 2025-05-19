export type ResourceType = 'image' | 'video' | 'raw';

export interface IUploadFileDTO {
  file: Express.Multer.File;
  resourceType: ResourceType;
  folder: string;
  tags: string[];
}

export interface IUploadMultipleFilesDTO {
  files: Express.Multer.File[];
  resourceType: ResourceType;
  folder: string;
  tags: string[];
}

export interface IDeleteFileDTO {
  publicId: string;
  resourceType: string;
}

export interface UploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
}

export interface IUploadService {
  uploadFile(data: IUploadFileDTO): Promise<UploadResult>;
  uploadMultipleFiles(data: IUploadMultipleFilesDTO): Promise<UploadResult[]>;
  deleteFile(data: IDeleteFileDTO): Promise<void>;
}
