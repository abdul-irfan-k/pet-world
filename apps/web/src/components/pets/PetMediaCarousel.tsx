import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

interface PetMediaCarouselProps {
  images: string[];
}

const PetMediaCarousel: React.FC<PetMediaCarouselProps> = ({ images }) => {
  return (
    <div className="flex gap-4">
      <ScrollArea className="h-[600px] max-h-[600px]">
        <div className="flex flex-col gap-2 p-2">
          {images.map((src, index) => (
            <div key={index} className="w-[60px] h-[60px]">
              <div className="relative w-full h-full rounded overflow-hidden">
                <Image
                  fill
                  src={src}
                  alt={`Pet thumbnail ${index + 1}`}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="w-[480px]">
        <Carousel>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="relative w-full aspect-[4.8/6] rounded overflow-hidden">
                    <Image
                      fill
                      src={src}
                      alt={`Pet image ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute bottom-3 w-full flex justify-end px-4 z-50">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export { PetMediaCarousel };
