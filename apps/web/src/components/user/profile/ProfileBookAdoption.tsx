import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

const ProfileBookAdoption = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Book a temporary pet adoption</h2>
      <div className="flex items-center space-x-4 rounded-lg border border-gray-300 p-4">
        <div className="flex-shrink-0">
          <div className="relative h-24 w-24">
            <Image fill src="/pets/dog-1.jpeg" alt="Pet for adoption" className="rounded-md object-cover" />
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-medium">Temporary Pet Adoption</h3>
          <p className="mt-1 text-sm text-gray-600">Find a furry friend to temporarily care for.</p>
          <p className="mt-2 font-semibold text-gray-800">Duration: Flexible | Fees: May apply</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">Dog</span>
            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">Cat</span>
            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">Small Animals</span>
            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">Foster</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Button variant={'primary'} size={'lg'}>
            Book adoption
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ProfileBookAdoption };
