'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { Check } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useGetMyPetsQuery } from '@/lib/api/petsApi';
import { Pet } from '@/types/pet';

interface PetSelectorProps {
  onPetSelected: (pet: Pet | null) => void;
}

export const PetSelector: React.FC<PetSelectorProps> = ({ onPetSelected }) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const { data: petsData, isLoading } = useGetMyPetsQuery();
  const [isOpen, setIsOpen] = useState(false);

  const handlePetSelect = (pet: Pet) => {
    setSelectedPet(pet);
    onPetSelected(pet);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-auto min-h-[100px] items-center justify-center rounded-lg bg-gray-50 p-4">
        <p className="text-gray-500">Loading your pets...</p>
      </div>
    );
  }

  if (!petsData?.data?.pets || petsData.data.pets.length === 0) {
    return (
      <div className="flex h-auto min-h-[100px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
        <p className="mb-3 text-sm text-gray-500">
          {"You don't have any pets added yet."}
        </p>
        <a
          href="/pets/add"
          className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
        >
          + Add a Pet
        </a>
      </div>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? 'item-1' : ''}
      onValueChange={value => setIsOpen(value === 'item-1')}
      className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm"
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="w-full p-4 transition-colors hover:bg-gray-50 data-[state=open]:border-b data-[state=open]:border-gray-200 data-[state=open]:bg-green-50 data-[state=open]:hover:bg-green-100">
          {selectedPet ? (
            <div className="flex w-full items-center space-x-4">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 shadow-inner">
                {selectedPet.images?.[0] ? (
                  <Image
                    src={selectedPet.images[0]}
                    alt={selectedPet.name}
                    className="h-full w-full object-cover"
                    width={56}
                    height={56}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-2xl text-gray-400">
                    {selectedPet.species === 'Dog'
                      ? '🐶'
                      : selectedPet.species === 'Cat'
                        ? '🐱'
                        : '🐾'}
                  </div>
                )}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-800">
                  {selectedPet.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {selectedPet.breed} • {selectedPet.age} years
                </p>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              {' '}
              Choose which pet needs care
            </div>
          )}
        </AccordionTrigger>
        <AccordionContent className="bg-white p-0">
          <div className="grid max-h-[300px] grid-cols-1 gap-3 overflow-y-auto p-4 sm:grid-cols-2 md:grid-cols-3">
            {petsData.data.pets.map((pet: Pet) => (
              <div
                key={pet.id}
                className={`relative cursor-pointer overflow-hidden rounded-lg border p-3 transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:border-green-400 hover:shadow-md ${
                  selectedPet?.id === pet.id
                    ? 'border-2 border-green-500 bg-green-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                onClick={() => handlePetSelect(pet)}
                onKeyDown={e => e.key === 'Enter' && handlePetSelect(pet)}
                tabIndex={0}
                role="button"
                aria-pressed={selectedPet?.id === pet.id}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 shadow-inner">
                    {pet.images?.[0] ? (
                      <Image
                        src={pet.images[0]}
                        alt={pet.name}
                        className="h-full w-full object-cover"
                        width={48}
                        height={48}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xl text-gray-400">
                        {pet.species === 'Dog'
                          ? '🐶'
                          : pet.species === 'Cat'
                            ? '🐱'
                            : '🐾'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-700">
                      {pet.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {pet.breed} • {pet.age} years
                    </p>
                  </div>
                </div>
                {selectedPet?.id === pet.id && (
                  <div className="absolute right-2 top-2 rounded-full bg-green-500 p-1 shadow">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
