import { useMutation } from '@tanstack/react-query';

import { apiClient } from '../api-client';

export const uploadPetImages = async (files: FileList) => {
  const formData = new FormData();
  Array.from(files).forEach(file => {
    formData.append('petImages', file);
  });

  const { data } = await apiClient.post(
    '/upload/pets/pet123/images',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};
//eslint-disable-next-line
export const useUploadPetImagesMutation = (options?: any) => {
  return useMutation({
    mutationFn: uploadPetImages,
    ...options,
  });
};

const deletePetImage = async (imageId: string) => {
  const { data } = await apiClient.delete(`/upload/${imageId}`);
  return data;
};
//eslint-disable-next-line
export const useDeletePetImageMutation = (options?: any) => {
  return useMutation({
    mutationFn: deletePetImage,
    ...options,
  });
};

export const uploadPetVideo = async (file: File) => {
  const formData = new FormData();
  formData.append('video', file);

  const { data } = await apiClient.post('/upload/video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
//eslint-disable-next-line
export const useUploadPetVideoMutation = (options?: any) => {
  return useMutation({
    mutationFn: uploadPetVideo,
    ...options,
  });
};
export const deletePetVideo = async (videoId: string) => {
  const { data } = await apiClient.delete(`/upload/video/${videoId}`);
  return data;
};
//eslint-disable-next-line
export const useDeletePetVideoMutation = (options?: any) => {
  return useMutation({
    mutationFn: deletePetVideo,
    ...options,
  });
};
