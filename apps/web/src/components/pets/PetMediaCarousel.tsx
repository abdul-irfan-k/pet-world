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
    <div className="flex w-full flex-col-reverse gap-4 lg:flex-row">
      <ScrollArea className="h-auto max-h-[300px] w-full lg:h-[600px] lg:max-h-[600px] lg:w-auto">
        <div className="flex flex-row gap-2 p-2 lg:flex-col">
          {images.map((src, index) => (
            <div key={index} className="h-[60px] w-[60px] flex-shrink-0">
              <div className="relative h-full w-full overflow-hidden rounded">
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

      <div className="w-full lg:min-w-[480px] lg:flex-1">
        <Carousel>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="relative aspect-[4.8/6] w-full overflow-hidden rounded">
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

          <div className="absolute bottom-0 z-50 flex w-full justify-end px-4 py-3">
            <div className="ml-auto flex gap-2">
              <CarouselPrevious className="relative left-0 top-0" />
              <CarouselNext className="relative right-0 top-0" />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export { PetMediaCarousel };
