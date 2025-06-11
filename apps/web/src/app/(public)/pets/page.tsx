import React from 'react';

import { PetFiltersSidebar } from '@/components/pets/PetFiltersSidebar';
import { PetListingHeader } from '@/components/pets/PetListingHeader';
import { PetResultGrid } from '@/components/pets/PetResultGrid';
import { dogs } from '@/lib/data/dummyDogs';

const PetsPage = () => {
  return (
    <div className="mx-auto min-h-screen px-10">
      <PetListingHeader
        title="Nike Vomero Running Shoes"
        count={10}
        breadCrumbItems={[{ label: 'Home', href: '/' }, { label: 'Pets' }]}
      />
      <div className="flex flex-col gap-8 md:flex-row">
        <div>
          <PetFiltersSidebar />
        </div>
        <div className="flex-1">
          <PetResultGrid pets={dogs} />
        </div>
      </div>
    </div>
  );
};

export default PetsPage;
