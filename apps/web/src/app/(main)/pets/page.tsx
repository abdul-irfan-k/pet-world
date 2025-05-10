import { PetFiltersSidebar } from '@/components/pets/PetFiltersSidebar';
import { PetListingHeader } from '@/components/pets/PetListingHeader';
import { PetResultGrid } from '@/components/pets/PetResultGrid';
import { dogs } from '@/lib/data/dummyDogs';
import React from 'react';

const PetsPage = () => {
  return (
    <div className="min-h-screen mx-auto px-10  ">
      <PetListingHeader
        title="Nike Vomero Running Shoes"
        count={10}
        breadCrumbItems={[{ label: 'Home', href: '/' }, { label: 'Pets' }]}
      />
      <div className="flex flex-col md:flex-row gap-8">
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
