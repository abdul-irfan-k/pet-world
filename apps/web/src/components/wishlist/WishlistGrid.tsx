// WishlistGrid.tsx
import React from 'react';

import { PetCard } from '../pets';

import { Pet } from '@/types/pet';

interface WishlistGridProps {
  pets: Pet[];
}

const WishlistGrid: React.FC<WishlistGridProps> = ({ pets }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {pets.map(pet => (
        //eslint-disable-next-line
        //@ts-ignore
        <PetCard key={pet.id} {...pet} image={pet.images[0]} />
      ))}
    </div>
  );
};

export { WishlistGrid };
