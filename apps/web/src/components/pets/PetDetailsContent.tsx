import React from 'react';
import { PetDetails } from './pet-details';
import { Button } from '../ui/button';

const PetDetailsContent = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-[400px] flex flex-col space-y-6">
        <PetDetails />

        <div className="flex flex-col gap-3 ">
          <Button
            variant={'black'}
            size={'xl'}
            fullWidth
            className="rounded-full"
          >
            Request to adopt
          </Button>
          <Button
            variant={'outline'}
            size={'xl'}
            fullWidth
            className="rounded-full"
          >
            Add to wishlist
          </Button>
        </div>
      </div>
    </div>
  );
};

export { PetDetailsContent };
