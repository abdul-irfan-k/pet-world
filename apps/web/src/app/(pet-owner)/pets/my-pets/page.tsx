'use client';

import React from 'react';

import Link from 'next/link';

import { PlusCircle } from 'lucide-react';

import { PetResultGrid } from '@/components/pets';
import { Button } from '@/components/ui/button';
import { useGetMyPetsQuery } from '@/lib/api/petsApi';

export default function MyPetsPage() {
  const { data: petsResponse, isLoading, error } = useGetMyPetsQuery();

  const pets = petsResponse?.data.pets;

  if (isLoading) {
    return <div className="p-6">Loading your pets...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error fetching pets: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Pets</h1>
        <Link href="/pets/add">
          <Button variant="black" size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Pet
          </Button>
        </Link>
      </div>

      {pets && pets.length > 0 ? (
        <PetResultGrid pets={pets} />
      ) : (
        <div className="text-center text-gray-500">
          <p className="mb-4 text-lg">{"You haven't added any pets yet."}</p>
          <Link href="/pets/add">
            <Button variant="outline" size="lg">
              Add Your First Pet
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
