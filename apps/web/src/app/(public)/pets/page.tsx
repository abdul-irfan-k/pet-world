'use client';
import React, { useEffect, useState } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import { PetFiltersSidebar } from '@/components/pets/PetFiltersSidebar';
import { PetListingHeader } from '@/components/pets/PetListingHeader';
import { PetResultGrid } from '@/components/pets/PetResultGrid';
import { useGetAdoptionRequestedPetsQuery } from '@/lib/api/petsApi';

export interface PetFilters {
  species: string[];
  age: number[];
  adoptionFee: number[];
  distance: number[];
  size: string[];
  gender: string[];
}

const DEFAULT_FILTERS: PetFilters = {
  species: [],
  age: [],
  adoptionFee: [],
  distance: [0, 50],
  size: [],
  gender: [],
};

const PetsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<PetFilters>(DEFAULT_FILTERS);

  useEffect(() => {
    const getQueryArray = (key: string) => searchParams.get(key)?.split(',').filter(Boolean) || [];
    const getQueryNumberArray = (key: string) => {
      return (
        searchParams
          .get(key)
          ?.split(',')
          .map(Number)
          .filter(n => !isNaN(n)) || []
      );
    };

    const newFilters: PetFilters = {
      species: getQueryArray('species'),
      age: getQueryNumberArray('age'),
      adoptionFee: getQueryNumberArray('adoptionFee'),
      distance: getQueryNumberArray('distance'),
      size: getQueryArray('size'),
      gender: getQueryArray('gender'),
    };
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      }
    });

    router.replace(`?${params.toString()}`);
  }, [filters, router]);

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
