import React, { FC } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { CheckCircle2, MapPin, Crown, Award, Share } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores';

interface ProfileHeaderProps {
  name: string;
  userName: string;
  location?: string;
  isVerified?: boolean;
  userId: string;
  profilePicture?: string;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ name, isVerified, location, profilePicture, userId }) => {
  const router = useRouter();
  const { user } = useAuthStore();

  const jobSuccessPercentage = 100;
  const isTopRatedPlus = true;
  const isCurrentUser = user?.id == userId;

  return (
    <div className="flex items-center justify-between rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-5">
        <div className="h-25 w-25 relative overflow-hidden rounded-full">
          <Image
            src={profilePicture || '/images/default-profile.png'}
            alt={`${name}'s profile picture`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <CheckCircle2 className={`h-5 w-5 ${isVerified ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} />
          </div>
          {location && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          <div className="mt-1 flex items-center gap-3">
            {jobSuccessPercentage !== undefined && (
              <div className="flex items-center gap-1 rounded-full border border-blue-400 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                <Crown className="h-3 w-3 fill-blue-600" />
                <span>{jobSuccessPercentage}% Job Success</span>
              </div>
            )}
            {isTopRatedPlus && (
              <div className="flex items-center gap-1 rounded-full border border-pink-400 bg-pink-50 px-2 py-1 text-xs font-medium text-pink-600">
                <Award className="h-3 w-3 fill-pink-600" />
                <span>Top Rated Plus</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {isCurrentUser && (
          <Button onClick={() => router.push(`/adopter-profile/edit`)} variant={'outline'}>
            Edit Profile
          </Button>
        )}

        <Button variant={'outline'} className="flex items-center gap-1">
          <span className="text-sm font-medium">Share</span>
          <Share className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export { ProfileHeader };
