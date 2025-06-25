'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useFetchProposalsForRequestQuery, Proposal } from '@/lib/api/petCareApi';

export default function PetCareRequestProposalsPage() {
  const params = useParams();
  const requestId = params.requestId as string;

  const {
    data: proposalsData,
    isLoading: loading,
    error,
    refetch: loadProposals,
  } = useFetchProposalsForRequestQuery(requestId, {});

  //eslint-disable-next-line
  const handleProceed = async (proposalId: string) => {};

  //eslint-disable-next-line
  const handleReject = async (proposalId: string) => {};

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
              <h2 className="text-xl font-semibold text-gray-800">{proposal.proposerName || 'N/A'}</h2>
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
                  disabled={proposal.status === 'ACCEPTED_BY_OWNER' || proposal.status === 'REJECTED_BY_OWNER'}
                  className="w-full sm:w-auto"
                >
                  Proceed with this Proposal
                </Button>
                <Button variant="destructive" onClick={() => handleReject(proposal.id)} className="w-full sm:w-auto">
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
