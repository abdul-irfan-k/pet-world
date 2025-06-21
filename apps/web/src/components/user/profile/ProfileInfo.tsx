import React, { FC, useState } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { ChevronRight, Briefcase } from 'lucide-react';

import { Button } from '@/components/ui/button/Button';
import { PetAdopterProfile } from '@/types/PetAdopter';

const Editor = dynamic(() => import('@/components/ui/editor').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

interface Adoption {
  totalAdoptionDuration?: string;
  highlightSection?: string;
  totalPetsAdopted?: number;
  petAdoptionDuration?: string;
  adoptedPetTypesBreeds?: string;
}

interface ProfileInfoProps {
  adopter: PetAdopterProfile;
  adoption: Adoption;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ adopter, adoption }) => {
  const { id: userId, overview } = adopter;
  const { totalPetsAdopted, totalAdoptionDuration, highlightSection, adoptedPetTypesBreeds } = adoption;

  //eslint-disable-next-line
  const [value, setValue] = useState<string>(overview?.bio ?? 'This user has not provided any information yet.');

  return (
    <div className="flex flex-col gap-6 border-gray-300 p-4 md:flex-row">
      <div className="flex w-full flex-col gap-6 border-r border-gray-300 pr-4 md:w-80">
        <div className="pb-4">
          <h3 className="mb-1 text-lg font-semibold text-gray-800">View profile</h3>
          <p className="mb-2 text-sm text-gray-600">Front-End Development</p>
          <Link href={`/user/${userId}/all-works`} className="flex items-center text-sm text-green-600 hover:underline">
            All work <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Ready to work with Manish S.?</h3>
          <Button variant="primary" fullWidth rounded className="mb-2">
            Sign up
          </Button>
          <Button variant="outline" fullWidth rounded>
            Log in
          </Button>
        </div>

        {(totalPetsAdopted !== undefined || totalAdoptionDuration) && (
          <div className="grid grid-cols-2 gap-4 border-t border-gray-300 pt-4 text-center">
            <div>
              <p className="text-xl font-semibold text-gray-800">{totalPetsAdopted ?? '-'}</p>
              <p className="text-sm text-gray-600">Total pets adopted</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">{totalAdoptionDuration ?? '-'}</p>
              <p className="text-sm text-gray-600">Total adoption duration</p>
            </div>
          </div>
        )}

        {highlightSection && (
          <div className="border-t border-gray-300 pt-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Highlights</h3>
            <p className="text-sm text-gray-600">{highlightSection}</p>
          </div>
        )}

        {adoptedPetTypesBreeds && (
          <div className="border-t border-gray-300 pt-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Adopted Pets</h3>
            <p className="text-sm text-gray-600">{adoptedPetTypesBreeds}</p>
          </div>
        )}

        <div className="border-t border-gray-300 pt-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">Hours per week</h3>
          <p className="text-sm text-gray-600">As Needed - Open to Offers</p>
          <p className="text-sm text-gray-600">&lt; 24 hrs response time</p>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <p className="text-sm text-gray-600">
            Open to contract to hire{' '}
            <span className="rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">New</span>
          </p>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">Associated with</h3>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Écron™ Inc.</span>
          </div>
          <p className="text-sm text-gray-600">5,939 hours</p>
        </div>
      </div>

      <div className="h-min-[80vh] h-full w-full p-10">
        <Editor readOnly value={value} modules={{ toolbar: false }} />
      </div>
    </div>
  );
};

export { ProfileInfo };
