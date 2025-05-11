import { Pet } from '@/types/pet';
import React, { FC } from 'react';
import { PetCard } from './PetCard';

interface PetResultGridProps {
  pets: Pet[];
}

const PetResultGrid: FC<PetResultGridProps> = ({ pets }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map(pet => {
        return <PetCard key={pet.id} {...pet} />;
      })}
    </div>
  );
};

export { PetResultGrid };
