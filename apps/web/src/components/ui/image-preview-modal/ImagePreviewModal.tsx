import React, { FC } from 'react';

import Image from 'next/image';

import { X } from 'lucide-react';

import { Button } from '../button';
import { Dialog, DialogContent } from '../dialog';

interface ImagePreviewModalProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
  aspectRatio?: string;
}

const ImagePreviewModal: FC<ImagePreviewModalProps> = ({
  alt,
  onClose,
  open,
  src,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex h-full w-full items-center justify-center bg-transparent">
        <Button
          variant="ghost"
          size="icon"
          className="fixed right-4 top-4 z-50 rounded-full bg-white/80 text-black hover:bg-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="relative h-[80vh] w-full max-w-6xl">
          <Image
            alt={alt}
            src={src}
            fill
            className="rounded-md object-contain"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ImagePreviewModal };
