import React from 'react';

const PetDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold">Bella – Golden Retriever</h1>
        <p className="text-muted-foreground text-lg mt-1">
          Dog | Breed ID: PET-GR-0093
        </p>
      </div>

      <div className="text-2xl font-semibold">
        ₹2,000{' '}
        <span className="text-sm text-muted-foreground">
          (includes ₹60 platform fee)
        </span>
      </div>
    </div>
  );
};

export { PetDetails };
