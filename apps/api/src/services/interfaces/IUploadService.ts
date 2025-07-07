export type ResourceType = 'image' | 'video' | 'raw';

export type IUploadFileDTO = {
  file: Express.Multer.File;
  resourceType: ResourceType;
  folder: string;
  tags: string[];
};

export type IUploadMultipleFilesDTO = {
  files: Express.Multer.File[];
  resourceType: ResourceType;
  folder: string;
  tags: string[];
};

export type IDeleteFileDTO = {
  publicId: string;
  resourceType: string;
};

export interface IUploadFileResponse {
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
  uploadFile(data: IUploadFileDTO): Promise<IUploadFileResponse>;
  uploadMultipleFiles(data: IUploadMultipleFilesDTO): Promise<IUploadFileResponse[]>;
  deleteFile(data: IDeleteFileDTO): Promise<void>;
}
