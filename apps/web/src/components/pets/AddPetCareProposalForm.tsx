'use client';
import React, { useState } from 'react';

import { useRouter, useParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { TextAreaField, TextField } from '@/components/ui/form/inputs';
import { useCreatePetCareProposalMutation } from '@/lib/api/petCareApi';
import {
  addPetCareProposalSchema,
  IAddPetCareProposalInput,
} from '@/lib/schemas/petCareSchema';

const AddPetCareProposalForm = () => {
  const router = useRouter();
  const params = useParams();
  const petCareRequestId = params.id as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddPetCareProposalInput>({
    resolver: zodResolver(addPetCareProposalSchema),
    defaultValues: {
      petCareRequestId: petCareRequestId || '',
      message: '',
      proposedFee: 0,
    },
  });

  const { mutate: createPetCareProposal, isPending: isCreatingProposal } =
    useCreatePetCareProposalMutation({
      onSuccess: _response => {
        toast.success('Pet care proposal submitted successfully!');
        reset();
        router.push(`/pet-care/requests/${petCareRequestId}`);
      },
      onError: () => {
        toast.error('Failed to submit proposal. Please try again.');
      },
    });

  const onSubmit = (data: IAddPetCareProposalInput) => {
    if (!petCareRequestId) {
      toast.error('Pet Care Request ID is missing. Cannot submit proposal.');
      return;
    }
    createPetCareProposal({
      ...data,
      petCareRequestId,
    });
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-lg">💌</span>
          <h1 className="text-xl font-medium">Submit Pet Care Proposal</h1>
        </div>
        <Button
          size={'lg'}
          variant="black"
          rounded
          className="bg-green-500 hover:bg-green-600"
          onClick={handleSubmit(onSubmit)}
          isLoading={isCreatingProposal}
        >
          <span className="mr-2">✓</span>
          Submit Proposal
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">Proposal Details</h2>

              <input type="hidden" {...register('petCareRequestId')} />

              <div className="mb-4">
                <TextField
                  label="Proposed Fee*"
                  placeholder="e.g., 60"
                  type="number"
                  className="w-full"
                  {...register('proposedFee', { valueAsNumber: true })}
                  error={errors.proposedFee?.message}
                />
              </div>

              <div className="mb-4">
                <TextAreaField
                  label="Message to Owner*"
                  {...register('message')}
                  placeholder="Introduce yourself, explain your experience, and why you'd be a great fit to care for their pet."
                  rows={6}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 p-3"
                  error={errors.message?.message}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 md:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">Proposal Summary</h2>
              <p className="text-sm text-gray-600">
                You are submitting a proposal for a pet care request. Ensure
                your message is clear and your proposed fee is competitive.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">
                Tips for a Strong Proposal
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Clearly state your experience with similar pets.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Mention any relevant certifications or skills.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Be enthusiastic and professional.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>
                    Double-check your proposed fee and message before
                    submitting.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddPetCareProposalForm };
