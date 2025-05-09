'use client';
import React from 'react';
import {
  SpeciesFilter,
  AgeFilter,
  AdoptionFeeFilter,
  DistanceFilter,
  SizeFilter,
  GenderFilter,
} from './filters';
import { Accordion } from '../ui/accordion';

const PetFiltersSidebar = () => {
  return (
    <div className="w-full md:w-64  ">
      <div className="pl-10 pr-5">
        <div className="flex flex-col gap-6 ">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['Species', 'Gender', 'Age']}
          >
            <SpeciesFilter />
            <GenderFilter />
            <AgeFilter />
            <SizeFilter />
            <DistanceFilter />
            <AdoptionFeeFilter />
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export { PetFiltersSidebar };
