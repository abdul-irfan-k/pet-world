import React from 'react';

import { WishlistGrid } from '@/components/wishlist';
import { dogs } from '@/lib/data/dummyDogs';

const WishlistPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-10 text-2xl font-medium leading-9">Wish List</h1>
      <WishlistGrid pets={dogs} />
    </div>
  );
};

export default WishlistPage;
