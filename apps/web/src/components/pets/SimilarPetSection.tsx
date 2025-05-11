import React from 'react';
import { PetCarousel } from './PetCarousel';
import { Pet } from '@/types/pet';

interface SimilarPetSectionProps {
  similarPets: Pet[];
}

const SimilarPetSection: React.FC<SimilarPetSectionProps> = ({
  similarPets,
}) => (
  <section className="w-full">
    <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Similar Pets</h2>
    <PetCarousel pets={similarPets} />
  </section>
);

export { SimilarPetSection };
