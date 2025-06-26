'use client';
import React from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  useFetchProposalsForRequestQuery,
  Proposal,
  useApprovePetCareProposalMutation,
  useRejectPetCareProposalMutation,
} from '@/lib/api/petCareApi';

export default function PetCareRequestProposalsPage() {
  const params = useParams();
  const router = useRouter();

  const requestId = params.requestId as string;

  const {
    data: proposalsData,
    isLoading: loading,
    error,
    refetch: loadProposals,
  } = useFetchProposalsForRequestQuery(requestId, {});

  const { mutate: approvePetCareProposalMutate, isPending: isApproving } = useApprovePetCareProposalMutation({
    onSuccess(data) {
      //eslint-disable-next-line
      //@ts-ignore
      const proposalId = data.data.petCareProposal.id;
      toast.success('Proposal accessed successfully!');
      router.push('/care-bookings/' + requestId + '/pay?proposalId=' + proposalId);
    },
    onError(error) {
      toast.error(`Failed to access proposal: ${error.message}`);
    },
    mutationKey: ['accessPetCareProposal', requestId],
  });

  const { mutate: rejectPetCareProposalMutate, isPending: isRejecting } = useRejectPetCareProposalMutation({
    onSuccess() {
      toast.success('Proposal rejected successfully!');
      loadProposals();
    },
    onError(error) {
      toast.error(`Failed to reject proposal: ${error.message}`);
    },
    mutationKey: ['rejectPetCareProposal', requestId],
  });

  const handleProceed = async (proposalId: string) => {
    approvePetCareProposalMutate(proposalId);
  };

  const handleReject = async (proposalId: string) => {
    rejectPetCareProposalMutate(proposalId);
  };

  if (!requestId) {
    return <div className="p-6 text-center">Request ID not found in URL.</div>;
  }

  if (loading) {
    return <div className="p-6 text-center">Loading proposals...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error loading proposals: {error.message}</div>;
  }

  const proposals: Proposal[] = proposalsData?.data?.petCareProposals || [];

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Proposals for Your Pet Care Request</h1>
        <Button onClick={() => loadProposals()} variant="outline" size="sm">
          Refresh Proposals
        </Button>
      </div>

      {proposals.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">
          <p className="text-lg">No proposals have been received for this request yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {proposals.map(proposal => (
            <div
              key={proposal.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className="flex items-center gap-3"
                onClick={
                  //eslint-disable-next-line
                  //@ts-ignore
                  () => router.push('/users/' + proposal?.adopter.id + '/profile')
                }
              >
                <Avatar className="h-10 w-10">
                  <Image src={'/user-profile.png'} alt={'User Profile'} fill className="object-cover" />
                </Avatar>
                <h2 className="text-xl font-semibold text-gray-800">
                  {
                    //eslint-disable-next-line
                    //@ts-ignore
                    proposal.adopter.name || 'N/A'
                  }
                </h2>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-gray-600">{proposal.message}</p>
              {proposal.status && (
                <p className="mt-1 text-sm text-gray-500">
                  Status:{' '}
                  <span
                    className={`font-medium ${proposal.status === 'ACCEPTED_BY_OWNER' ? 'text-green-600' : proposal.status === 'REJECTED_BY_OWNER' ? 'text-red-600' : 'text-yellow-600'}`}
                  >
                    {proposal.status.replace(/_/g, ' ')}
                  </span>
                </p>
              )}
              <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
                <Button
                  variant="primary"
                  onClick={() => handleProceed(proposal.id)}
                  disabled={
                    proposal.status === 'ACCEPTED_BY_OWNER' ||
                    proposal.status === 'REJECTED_BY_OWNER' ||
                    isApproving ||
                    isRejecting
                  }
                  className="w-full sm:w-auto"
                >
                  Proceed with this Proposal
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleReject(proposal.id)}
                  className="w-full sm:w-auto"
                  disabled={isRejecting || isApproving}
                >
                  Reject this Proposal
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
