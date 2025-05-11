import React from 'react';
import { Pet } from '@/types/pet';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../ui/carousel';
import { PetCard } from './PetCard';

interface PetCarouselProps {
  pets: Pet[];
}

const PetCarousel: React.FC<PetCarouselProps> = ({ pets }) => {
  return (
    <Carousel>
      <CarouselContent>
        {pets.map(pet => (
          <CarouselItem
            key={pet.id}
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <PetCard {...pet} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export { PetCarousel };
