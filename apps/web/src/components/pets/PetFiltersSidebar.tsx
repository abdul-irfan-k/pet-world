'use client';
import React from 'react';

import { Accordion } from '../ui/accordion';

import { SpeciesFilter, AgeFilter, AdoptionFeeFilter, DistanceFilter, SizeFilter, GenderFilter } from './filters';

import { PetFilters } from '@/app/(public)/pets/page';

interface PetFiltersSidebarProps {
  filters: PetFilters;
  setFilters: React.Dispatch<React.SetStateAction<PetFilters>>;
}

const PetFiltersSidebar = ({ setFilters }: PetFiltersSidebarProps) => {
  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div className="w-full md:w-64">
      <div className="pr-5">
        <div className="mb-10 flex flex-col gap-2 text-[16px] font-medium leading-[20px] text-gray-600">
          <span>Available Pets</span>
          <span>Reserved</span>
        </div>
        <div className="flex flex-col gap-6">
          <Accordion type="multiple" className="w-full" defaultValue={['Species', 'Gender', 'Age']}>
            <SpeciesFilter onChange={value => handleFilterChange('species', value)} />
            <GenderFilter onChange={value => handleFilterChange('gender', value)} />
            <AgeFilter onChange={value => handleFilterChange('age', value)} />
            <SizeFilter onChange={value => handleFilterChange('size', value)} />
            <DistanceFilter onChange={value => handleFilterChange('distance', value)} />
            <AdoptionFeeFilter onChange={value => handleFilterChange('adoptionFee', value)} />
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export { PetFiltersSidebar };
