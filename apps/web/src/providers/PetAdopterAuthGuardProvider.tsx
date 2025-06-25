'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useGetPetAdopterProfileStatusQuery } from '@/lib/api/userApi';
import { useAuthStore } from '@/stores/authStore';

const PetAdopterAuthGuardProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { setIsPetAdopter } = useAuthStore();

  const { data, isLoading, isError } = useGetPetAdopterProfileStatusQuery();

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log('data', data);
      //eslint-disable-next-line
      //@ts-ignore
      if (!data?.data.exists) {
        router.replace('/adopter-profile/create');
      } else {
        setIsPetAdopter(true);
      }
    }
  }, [isLoading, isError, data, router, setIsPetAdopter]);

  return <>{children}</>;
};

export { PetAdopterAuthGuardProvider };
