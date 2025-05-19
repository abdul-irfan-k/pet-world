import React, { useRef, useState } from 'react';

import Image from 'next/image';

import { Upload, X, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ImagePreviewModal } from '@/components/ui/image-preview-modal';

interface UploadMediaSectionProps {
  placeholderImages: string[];
}

const UploadMediaSection: React.FC<UploadMediaSectionProps> = ({
  placeholderImages,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [imagePreviewSrc, setImagePreviewSrc] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setImagePreviewSrc(src);
  };

  const handleImageInputClick = () => {
    imageInputRef.current?.click();
  };

  const handleVideoInputClick = () => {
    videoInputRef.current?.click();
  };

  const onImagePreviewModalClose = () => {
    setImagePreviewSrc(null);
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
            >
              Browse Files
            </Button>
            <p className="mt-3 text-xs text-gray-500">Max 8 images</p>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              ref={imageInputRef}
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {placeholderImages.map((img, index) => (
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
      {imagePreviewSrc && (
        <ImagePreviewModal
          src={imagePreviewSrc}
          alt="Image Preview"
          open={!!imagePreviewSrc}
          onClose={onImagePreviewModalClose}
        />
      )}
    </div>
  );
};

export { UploadMediaSection };
