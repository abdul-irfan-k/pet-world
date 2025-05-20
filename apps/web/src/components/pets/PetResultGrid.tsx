import React, { FC } from 'react';

import { PetCard } from './PetCard';

import { Pet } from '@/types/pet';

interface PetResultGridProps {
  pets: Pet[];
}

const PetResultGrid: FC<PetResultGridProps> = ({ pets }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pets.map(pet => {
        //eslint-disable-next-line
        // @ts-ignore
        const imageUrl =
          typeof pet.images === 'string' ? pet.images : pet.images?.[0];
        //eslint-disable-next-line
        // @ts-ignore
        return <PetCard key={pet.id} image={imageUrl} {...pet} />;
      })}
    </div>
  );
};

export { PetResultGrid };
