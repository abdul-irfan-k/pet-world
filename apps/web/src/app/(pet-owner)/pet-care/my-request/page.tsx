'use client';

import React from 'react';

import Link from 'next/link';

import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function MyPetCareRequestsPage() {
  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Pet Care Requests</h1>
        <Link href="/pet-care/request/add">
          <Button variant="black" size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Pet Care Request
          </Button>
        </Link>
      </div>

      <div className="mt-10 text-center text-gray-500">
        <p className="text-lg">Implementing soon</p>
      </div>
    </div>
  );
}
