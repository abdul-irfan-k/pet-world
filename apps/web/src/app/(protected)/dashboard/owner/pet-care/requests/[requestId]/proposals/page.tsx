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

      {proposals.length === 0 && (
        <div className="mt-10 text-center text-gray-500">
          <p className="text-lg">No proposals have been received for this request yet.</p>
        </div>
      )}
      {proposals.length > 0 && (
        <div className="space-y-6">
          {proposals.map(proposal => (
            <div
              key={proposal.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex gap-4">
                <div
                  className="relative flex items-center gap-3"
                  onClick={
                    //eslint-disable-next-line
                    //@ts-ignore
                    () => router.push('/users/' + proposal?.adopter.id + '/profile')
                  }
                >
                  <Avatar className="relative h-16 w-16">
                    <Image src={'/user-profile.png'} alt={'User Profile'} fill className="object-cover" />
                  </Avatar>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-green-600">
                      {
                        //eslint-disable-next-line
                        //@ts-ignore
                        proposal.adopter.name || 'N/A'
                      }
                    </h2>
                    <span className="text-sm text-gray-700">Freelancer & Content Creator</span>
                    <span className="text-sm text-gray-500">United States</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    <span className="font-semibold">Cover letter -</span> {proposal.message}
                  </p>
                  {proposal.status && (
                    <p className="mt-1 text-sm text-gray-500">
                      Status:
                      <span
                        className={`font-medium ${proposal.status === 'ACCEPTED_BY_OWNER' ? 'text-green-600' : proposal.status === 'REJECTED_BY_OWNER' ? 'text-red-600' : 'text-yellow-600'}`}
                      >
                        {proposal.status.replace(/_/g, ' ')}
                      </span>
                    </p>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() => handleReject(proposal.id)}
                    disabled={isRejecting || isApproving}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    className="bg-green-600 text-white hover:bg-green-700"
                    onClick={() => handleProceed(proposal.id)}
                    disabled={
                      proposal.status === 'ACCEPTED_BY_OWNER' ||
                      proposal.status === 'REJECTED_BY_OWNER' ||
                      isApproving ||
                      isRejecting
                    }
                  >
                    Hire
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
