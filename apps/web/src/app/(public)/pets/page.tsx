'use client';
import React, { useState } from 'react';

import { PetFiltersSidebar } from '@/components/pets/PetFiltersSidebar';
import { PetListingHeader } from '@/components/pets/PetListingHeader';
import { PetResultGrid } from '@/components/pets/PetResultGrid';
import { useGetAdoptionRequestedPetsQuery } from '@/lib/api/petsApi';
import { dogs } from '@/lib/data/dummyDogs';

export interface PetFilters {
  species: string[];
  age: number[];
  adoptionFee: number[];
  distance: number[];
  size: string[];
  gender: string[];
}
const PetsPage = () => {
  const [filters, setFilters] = useState<PetFilters>({
    species: [],
    age: [],
    adoptionFee: [],
    distance: [0, 50],
    size: [],
    gender: [],
  });

  const { data, isLoading, isError } = useGetAdoptionRequestedPetsQuery(filters);

  return (
    <div className="mx-auto min-h-screen px-10">
      <PetListingHeader
        title="Nike Vomero Running Shoes"
        count={10}
        breadCrumbItems={[{ label: 'Home', href: '/' }, { label: 'Pets' }]}
      />
      <div className="flex flex-col gap-8 md:flex-row">
        <div>
          <PetFiltersSidebar filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex-1">
          {isLoading ? (
            <p>Loading pets...</p>
          ) : isError ? (
            <p>Failed to fetch pets. Please try again.</p>
          ) : (
            <PetResultGrid pets={data?.data.pets || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PetsPage;
