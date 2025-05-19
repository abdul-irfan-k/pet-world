import React, { useRef, useState } from 'react';

import Image from 'next/image';

import { Upload, X, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ImagePreviewModal } from '@/components/ui/image-preview-modal';
import { Spinner } from '@/components/ui/spinnner';
import { useUploadPetImagesMutation } from '@/lib/api/uploadApi';

interface UploadMediaSectionProps {
  placeholderImages: string[];
  setIsMediaUploading: React.Dispatch<React.SetStateAction<boolean>>;
  setMedia: React.Dispatch<
    React.SetStateAction<{
      images: string[];
      videos: string[];
    }>
  >;
}

const UploadMediaSection: React.FC<UploadMediaSectionProps> = ({
  setIsMediaUploading,
  setMedia,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [imageModalPreview, setImageModalPreviwe] = useState<string | null>(
    null,
  );
  const [imagePreviewSrc, setImagePreviewSrc] = useState<Array<string> | null>(
    null,
  );
  const [uploadedImages, setUploadedImages] = useState<Array<string>>([]);

  const { isPending, mutate: uploadPetImageMutate } =
    useUploadPetImagesMutation({
      onSuccess: (response: any) => {
        const newUrls = response?.data?.map((img: any) => img.secure_url);
        if (newUrls?.length) {
          setUploadedImages(prev => [...prev, ...newUrls]);
          setMedia(prev => ({
            ...prev,
            images: newUrls,
          }));
          setIsMediaUploading(false);
          setImagePreviewSrc(null);
        }
      },
      onError: (error: any) => {
        setIsMediaUploading(false);
        console.error('Image upload error:', error);
        toast.error('image upload failed. Please try again.');
      },
    });

  const handleImageClick = (src: string) => {
    setImageModalPreviwe(src);
  };

  const handleImageInputClick = () => {
    imageInputRef.current?.click();
  };

  const handleVideoInputClick = () => {
    videoInputRef.current?.click();
  };

  const onImagePreviewModalClose = () => {
    setImageModalPreviwe(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    if (!files) return;

    const previews = Array.from(files).map(file => URL.createObjectURL(file));
    setImagePreviewSrc(previews);
    //eslint-disable-next-line
    //@ts-ignore
    uploadPetImageMutate(files);

    setIsMediaUploading(true);
  };
  return (
    <div className="space-y-6 md:col-span-1">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium">Upload Media</h2>
        <div className="mb-6">
          <div
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6"
            onClick={handleImageInputClick}
          >
            <Upload className="mb-2 h-8 w-8 text-gray-400" />
            <p className="mb-1 text-sm text-gray-600">Drag & drop pet images</p>
            <p className="mb-3 text-xs text-gray-500">or</p>
            <Button
              size={'lg'}
              variant="outline"
              className="rounded-md px-4 py-2 text-sm"
              disabled={isPending}
            >
              {isPending ? 'Uploading...' : 'Browse Files'}
            </Button>
            <p className="mt-3 text-xs text-gray-500">Max 8 images</p>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              ref={imageInputRef}
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {uploadedImages.length > 0 &&
            uploadedImages.map((img, index) => (
              <div
                key={index}
                className="group relative h-20 w-20 overflow-hidden rounded-md border border-gray-200"
                onClick={() => handleImageClick(img)}
              >
                <Image
                  src={img}
                  alt={`Preview ${index}`}
                  className="h-20 w-full object-cover"
                  fill
                />
                <button
                  className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-0.5 opacity-0 group-hover:opacity-100"
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}
          {imagePreviewSrc &&
            imagePreviewSrc.map((img, index) => (
              <div
                key={index}
                className="group relative h-20 w-20 overflow-hidden rounded-md border border-gray-200"
                onClick={() => handleImageClick(img)}
              >
                <Image
                  src={img}
                  alt={`Preview ${index}`}
                  className="h-20 w-full object-cover"
                  fill
                />
                <button
                  className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-0.5 opacity-0 group-hover:opacity-100"
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  <X className="h-3 w-3 text-white" />
                </button>

                <div className="absolute left-[50%] top-[50%] block translate-x-[-50%] translate-y-[-50%]">
                  <Spinner className="h-8 w-8" />
                </div>
              </div>
            ))}
          <div
            className="flex h-20 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300"
            onClick={handleImageInputClick}
          >
            <Plus className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Upload Videos (optional)
          </label>
          <div
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6"
            onClick={handleVideoInputClick}
          >
            <Upload className="mb-2 h-8 w-8 text-gray-400" />
            <p className="mb-1 text-sm text-gray-600">Drag & drop pet videos</p>
            <p className="mb-3 text-xs text-gray-500">or</p>
            <Button
              size={'lg'}
              variant="outline"
              className="rounded-md px-4 py-2 text-sm"
            >
              Browse Files
            </Button>
            <input
              type="file"
              accept="video/*"
              multiple
              hidden
              ref={videoInputRef}
            />
          </div>
        </div>
      </div>
      {imageModalPreview && (
        <ImagePreviewModal
          src={imageModalPreview}
          alt="Image Preview"
          open={!!imageModalPreview}
          onClose={onImagePreviewModalClose}
        />
      )}
    </div>
  );
};

export { UploadMediaSection };
