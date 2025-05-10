import React from 'react';
import { PetMediaCarousel, PetDetailsContent } from '@/components/pets';

const PetDetailsPage = () => {
  const pet = {
    name: 'Lucy',
    species: 'Dog',
    breed: 'Cockapoo',
    color: 'Brown / Chocolate',
    sex: 'Female',
    size: 'Small',
    age: '3 years',
    microchipped: true,
    neutered: true,
    timeAtCurrentHome: '3 - 4 years',
    rehomingReason: 'Change in Family Circumstances',
    keepDuration: '2 months',
    location: 'Manchester, UK',
    adoptionFee: 150,
    images: [
      '/pets/dog-1.jpeg',
      '/pets/dog-2.jpeg',
      '/pets/dog-3.jpeg',
      '/pets/dog-4.jpeg',
      '/pets/dog-5.jpeg',
      '/pets/dog-6.jpeg',
      '/pets/dog-7.jpeg',
      '/pets/dog-8.jpeg',
    ],
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
    personality:
      "Lucy is a very energetic, affectionate girl. She wants to jump up and kiss everyone she meets. She loves a cuddle in the evening (only after she's been tired out in the day) she lets you pick her up and even cradle her like a baby! She's not able to be with very young children as she growls and is very unsure.",
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
  return (
    <div className="container mx-auto px-4">
      <div className="flex w-full gap-8 py-12">
        <div className="flex">
          <PetMediaCarousel images={pet.images} />
        </div>
        <div className="flex-1">
          <PetDetailsContent />
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;
