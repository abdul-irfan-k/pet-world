'use client';
import React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/ui/spinnner';
import { ProfileHeader, ProfileInfo, ProfileBookAdoption, ProfileWorkHistory } from '@/components/user/profile';
import { useGetPetAdopterPublicProfileQuery } from '@/lib/api/userApi';
import { PetAdopterProfile } from '@/types/PetAdopter';

const defaultInfo = {
  documents: {
    aadhaar: {
      name: 'Aadhaar Card',
      url: '',
    },
    certificate: {
      name: 'Animal Care Certification',
      url: '',
    },
  },
  certifications: ['Animal Welfare', 'Pet Grooming'],
  overview: {
    motivation: 'Ensuring every pet has a loving home.',
    specialization: 'Behavioral training for dogs.',
    preferredPets: ['Dogs', 'Birds'],
    location: {
      city: 'Uppinangady',
      state: 'Karnataka',
      country: 'India',
    },
    availability: {
      days: ['Saturday', 'Sunday'],
      time: '9am - 5pm',
    },
  },
};
const UserProfilePage = () => {
  const userId = useParams().userId as string;

  const { data, isLoading } = useGetPetAdopterPublicProfileQuery(userId);
  console.log('user profile', data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
        <span className="ml-4 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  //eslint-disable-next-line
  //@ts-ignore
  const adopterProfile = { ...defaultInfo, ...data?.data?.petAdopter } as PetAdopterProfile;

  if (!adopterProfile) {
    return <div className="py-10 text-center text-gray-500">No profile data found.</div>;
  }

  return (
    <div>
      <div className="px-15">
        <ProfileHeader
          name={'John Doe'}
          userName="johndoe"
          userId="12345"
          isVerified={true}
          location="New York, USA"
          profilePicture="/default-profile.png"
          //eslint-disable-next-line
          //@ts-ignore
          {...data?.data.petAdopter.user}
        />
        <div>
          <ProfileInfo
            adopter={adopterProfile}
            adoption={{
              totalPetsAdopted: 10,
              totalAdoptionDuration: '5 years',
              highlightSection: 'Expert in dog training and care.',
              adoptedPetTypesBreeds: 'Golden Retrievers, Beagles, Parrots',
            }}
          />
        </div>
        <div className="pl-98">
          <ProfileBookAdoption />
          <ProfileWorkHistory />
        </div>

        <div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Search for temporary homes</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search adopters"
                  className="w-full rounded-md border border-gray-300 px-4 py-2"
                />
                <SearchIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Browse available pets</h3>
              <ul>
                <li>
                  <Link href="/pets" className="text-green-600 hover:underline">
                    All Pets
                  </Link>
                </li>
                <li>
                  <Link href="/pets?type=dog" className="text-green-600 hover:underline">
                    Dogs
                  </Link>
                </li>
                <li>
                  <Link href="/pets?type=cat" className="text-green-600 hover:underline">
                    Cats
                  </Link>
                </li>
                <li>
                  <Link href="/pets?location=nearby" className="text-green-600 hover:underline">
                    Pets Near Me
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="mb-2 text-lg font-semibold">Browse available pets</h3>
              <ul>
                <li>
                  <Link href="/pets" className="text-green-600 hover:underline">
                    All Pets
                  </Link>
                </li>
                <li>
                  <Link href="/pets?type=dog" className="text-green-600 hover:underline">
                    Dogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold">Find a temporary pet</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Link href="/pets?type=dog" className="text-green-600 hover:underline">
                  Find a Temporary Dog Home
                </Link>
              </div>
              <div>
                <Link href="/pets?type=cat" className="text-green-600 hover:underline">
                  Find a Temporary Cat Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
