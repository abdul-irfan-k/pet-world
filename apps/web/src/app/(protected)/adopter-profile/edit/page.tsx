import React from 'react';

import { useRouter } from 'next/navigation';

import { PetAdopterForm } from '@/components/user';
import { useGetMyPetAdopterProfileQuery } from '@/lib/api/userApi';

const AdopterProfileUpdatePage = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetMyPetAdopterProfileQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading profile data.</div>;
  }

  const adopterProfile = data?.data?.petAdopter;
  if (!adopterProfile) {
    router.push('/adopter-profile/create');
  }

  return <div>{data?.data.petAdopter && <PetAdopterForm mode="edit" initialData={data?.data.petAdopter} />}</div>;
};

export default AdopterProfileUpdatePage;
