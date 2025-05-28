'use client';

import React, { Suspense } from 'react';

import { AddPetCareProposalForm } from '@/components/pets/AddPetCareProposalForm';

const AddPetCareProposalPage = () => {
  return (
    <Suspense fallback={<div>Loading proposal form...</div>}>
      <AddPetCareProposalForm />
    </Suspense>
  );
};

export default AddPetCareProposalPage;
