'use client';
import React from 'react';

import { useParams } from 'next/navigation';

import { PetMediaCarousel, PetDetailsContent, SimilarPetSection } from '@/components/pets';
import { useGetPetByIdQuery, useGetAllPetsQuery } from '@/lib/api/petsApi';

const PetDetailsPage = () => {
  const params = useParams();
  const petId = params.petId as string;

  const {
    data: petByIdData,
    isLoading: isLoadingPetById,
    isError: isErrorPetById,
    error: errorPetById,
  } = useGetPetByIdQuery(petId);

  const {
    data: allPetsData,
    isLoading: isLoadingSimilarPets,
    isError: isErrorAllPets,
    error: errorAllPets,
  } = useGetAllPetsQuery();

  if (isLoadingPetById) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading pet details...</div>;
  }

  if (isErrorPetById) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-red-500">
        Error loading pet details: {errorPetById?.message || 'Unknown error'}
      </div>
    );
  }

  if (!petByIdData?.data?.pet) {
    return <div className="container mx-auto px-4 py-12 text-center">Pet not found.</div>;
  }

  const pet = petByIdData.data.pet;

  const defaultPetDetails = {
    color: 'Brown / Chocolate',
    size: 'Small',
    microchipped: true,
    neutered: true,
    timeAtCurrentHome: '3 - 4 years',
    rehomingReason: 'Change in Family Circumstances',
    keepDuration: '2 months',
    location: 'Manchester, UK',
    adoptionFee: 150,
    ownerDescription: [
      { positive: true, text: 'Good with adults' },
      { positive: false, text: "Has lived with cats - it didn't go well" },
      { positive: true, text: 'Good with other dogs' },
      { positive: true, text: 'Has lived with dogs - it was fine' },
      { positive: true, text: 'Is active and lively' },
      { positive: true, text: 'Can be left alone for short to medium periods' },
      {
        positive: false,
        text: 'Jumps up or lunges (to the point of being problematic)',
      },
      { positive: false, text: 'Can demonstrate resource guarding at times' },
    ],
    activity:
      'Lucy LOVES to play. She likes to be chased around (she will playfully bark) loves to play tug of war, chase balls, and destroy stuffed animals! She also enjoys stealing socks and hairbrushes.',
    diet: "Lucy has wet food twice a day. She also loves a wimpies toothbrush (she usually buries them in a blanket or outside to dig up later!) she also loves cocktail sausages and puppy treats. She's partial to a nice steak on special occasion.",
    homeLife: {
      activity: 'Busy / Noisy',
      environment: 'Town',
      otherPets: 'Yes, my pet lives with cats',
    },
    medicalInfo: {
      fleaTreatment: true,
      dentalChecks: true,
      medication: false,
      medicationDetails: '',
    },
    owner: {
      name: 'Sarah',
      memberSince: '2022',
      petsRehomed: 2,
      rating: 4.9,
      responseTime: 'Within 24 hours',
    },
  };

  const displayPet = {
    ...defaultPetDetails,
    ...pet,
    images:
      pet.images && pet.images.length > 0
        ? pet.images
        : [
            '/pets/dog-1.jpeg',
            '/pets/dog-2.jpeg',
            '/pets/dog-3.jpeg',
            '/pets/dog-4.jpeg',
            '/pets/dog-5.jpeg',
            '/pets/dog-6.jpeg',
            '/pets/dog-7.jpeg',
            '/pets/dog-8.jpeg',
          ],
    personality:
      (pet.profile as { description?: string })?.description ||
      "Lucy is a very energetic, affectionate girl. She wants to jump up and kiss everyone she meets. She loves a cuddle in the evening (only after she's been tired out in the day) she lets you pick her up and even cradle her like a baby! She's not able to be with very young children as she growls and is very unsure.",
    microchipped: !!pet.petBiometricId,
    ageString: `${pet.age} years`,
    gender: pet.gender || 'Female',
    breed: pet.breed || 'Cockapoo',
    species: pet.species || 'Dog',
  };

  const similarPets = allPetsData?.data?.pets?.filter(p => p.id !== pet.id && p.species === pet.species) || [];

  return (
    <div className="container mx-auto px-4">
      <div className="flex w-full flex-col gap-8 py-12 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <PetMediaCarousel images={displayPet.images} />
        </div>
        <div className="w-full lg:flex-1">
          <PetDetailsContent pet={displayPet} />
        </div>
      </div>
      {isLoadingSimilarPets ? (
        <div className="py-12 text-center">Loading similar pets...</div>
      ) : isErrorAllPets ? (
        <div className="py-12 text-center text-red-500">
          Error loading similar pets: {errorAllPets?.message || 'Unknown error'}
        </div>
      ) : (
        //eslint-disable-next-line
        //@ts-ignore
        <SimilarPetSection similarPets={similarPets} />
      )}
    </div>
  );
};

export default PetDetailsPage;
