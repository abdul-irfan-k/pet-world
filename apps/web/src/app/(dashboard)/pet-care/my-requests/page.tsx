'use client';

import React from 'react';

import Link from 'next/link';

import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useFetchMyPetCareRequestsQuery } from '@/lib/api/petCareApi';
import { PetCareRequest } from '@/types/PetCare';

export default function MyPetCareRequestsPage() {
  const {
    data: requestsResponse,
    isLoading,
    error,
    refetch: loadRequests,
  } = useFetchMyPetCareRequestsQuery({});

  if (isLoading) {
    return (
      <div className="p-6 text-center">Loading your pet care requests...</div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error fetching pet care requests: {error.message}
      </div>
    );
  }

  const petCareRequests: PetCareRequest[] =
    requestsResponse?.data?.petCareRequests || [];

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Pet Care Requests</h1>
        <div className="flex items-center space-x-3">
          <Button onClick={() => loadRequests()} variant="outline" size="sm">
            Refresh Requests
          </Button>
          <Link href="/pet-care/request/add">
            <Button variant="black" size="lg">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Pet Care Request
            </Button>
          </Link>
        </div>
      </div>

      {petCareRequests.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">
          <p className="text-lg">
            You have not created any pet care requests yet.
          </p>
          <Link href="/pet-care/request/add" className="mt-2 inline-block">
            <Button variant="outline">Create Your First Request</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {petCareRequests.map(request => (
            <div
              key={request.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {request.title || 'Pet Care Request'}
                </h2>
                <Link href={`/pet-care/my-requests/${request.id}/proposals`}>
                  <Button variant="link" size="sm">
                    View Proposals
                  </Button>
                </Link>
              </div>
              <p className="mt-1 text-sm text-gray-500"></p>
              <p className="mt-2 text-gray-600"></p>
              <p className="mt-1 text-gray-600">
                <span className="font-medium">Care Start Date:</span>{' '}
                {request.startDate
                  ? new Date(request.startDate).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p className="mt-1 text-gray-600">
                <span className="font-medium">Care End Date:</span>{' '}
                {request.endDate
                  ? new Date(request.endDate).toLocaleDateString()
                  : 'N/A'}
              </p>
              {request.description && (
                <p className="mt-2 whitespace-pre-wrap text-gray-600">
                  <span className="font-medium">Details:</span>{' '}
                  {request.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
