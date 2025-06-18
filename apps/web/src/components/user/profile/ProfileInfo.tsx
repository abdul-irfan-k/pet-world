import React, { FC } from 'react';

import Link from 'next/link';

import { ChevronRight, Link as LinkIcon, Briefcase, Clock, CheckCircle2, MapPin, Crown } from 'lucide-react';

interface ProfileInfoProps {
  userId: string;
  info: {
    works: {
      totalJobs?: number;
      totalHours?: number;
    };

    about: string;
    socialLinks: {
      twitter?: string;
      facebook?: string;
      linkedin?: string;
      instagram?: string;
      github?: string;
    };

    totalPetsAdopted?: number;
    totalAdoptionDuration?: number;
    highlightSection?: string;
    adoptedPetTypesBreeds?: string[];
  };
}
const ProfileInfo: FC<ProfileInfoProps> = ({ userId, info }) => {
  const { totalAdoptionDuration, totalPetsAdopted, about, highlightSection, adoptedPetTypesBreeds } = info;

  return (
    <div className="flex flex-col gap-6 p-4 md:flex-row">
      <div className="flex w-full flex-col gap-6 md:w-80">
        <div className="border-b pb-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">View profile</h3>

          <Link href={`/user/${userId}/all-works`} className="flex items-center text-sm text-green-600 hover:underline">
            All work <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {(totalPetsAdopted !== undefined || totalAdoptionDuration) && (
          <div className="grid grid-cols-2 gap-4 border-b pb-4 text-center">
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {totalPetsAdopted !== undefined ? totalPetsAdopted : '-'}
              </p>
              <p className="text-sm text-gray-600">Total pets adopted</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">{totalAdoptionDuration || '-'}</p>
              <p className="text-sm text-gray-600">Total adoption duration</p>
            </div>
          </div>
        )}

        {highlightSection && (
          <div className="border-b pb-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Highlights</h3>
            <p className="text-sm text-gray-600">{highlightSection}</p>
          </div>
        )}

        {adoptedPetTypesBreeds && (
          <div className="border-b pb-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Adopted Pets</h3>
            <p className="text-sm text-gray-600">{adoptedPetTypesBreeds}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { ProfileInfo };
