'use client';

import React, { Suspense } from 'react';

import { useParams } from 'next/navigation';

import { AddPetCareProposalForm } from '@/components/pets';
import { useFetchPetCareRequestByIdQuery } from '@/lib/api/petCareApi';

const AddPetCareProposalPage = () => {
  const params = useParams();
  const requestId = params.id as string;

  const {
    data: petCareRequest,
    isLoading: isLoadingPetCareRequest,
    isError: isErrorPetCareRequest,
  } = useFetchPetCareRequestByIdQuery(requestId);

  if (isLoadingPetCareRequest) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading pet Care Details...</div>;
  }

  if (isErrorPetCareRequest) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-red-500">
        Error loading pet Care details:{' '}
        {
          //eslint-disable-next-line
          //@ts-ignore
          errorPetCareRequest?.message || 'Unknown error'
        }
      </div>
    );
  }
  return (
    <Suspense fallback={<div>Loading proposal form...</div>}>
      {petCareRequest && <AddPetCareProposalForm petCareRequest={petCareRequest.data.petCareRequest} />}
    </Suspense>
  );
};

export default AddPetCareProposalPage;
