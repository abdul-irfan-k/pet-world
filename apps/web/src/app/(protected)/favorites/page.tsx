'use client';
import React from 'react';

import { WishlistGrid } from '@/components/wishlist';
import { useGetFavoritePetsQuery } from '@/lib/api/petsApi';

const FavoritePage = () => {
  const { data: favoritePetsData, isLoading, isError } = useGetFavoritePetsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !favoritePetsData?.data?.pets) {
    return <div>Error fetching favorite pets.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-10 text-2xl font-medium leading-9">Wish List</h1>
      <WishlistGrid pets={favoritePetsData.data.pets} />
    </div>
  );
};

export default FavoritePage;
