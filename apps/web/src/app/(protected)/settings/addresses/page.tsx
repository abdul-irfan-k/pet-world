'use client';
import React, { useState } from 'react';

import { AddressForm } from '@/components/settings';
import { Button } from '@/components/ui/button';
import { useGetUserAddressesQuery } from '@/lib/api/userApi';

const AddressesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: addressesResponse, isLoading, isError } = useGetUserAddressesQuery();

  return (
    <div>
      <div className="flex w-[400px] flex-col gap-6">
        <div>
          <h1 className="text-2xl">Saved Addresses</h1>
        </div>

        {isLoading && <p>Loading addresses...</p>}
        {isError && <p>Error loading addresses.</p>}
        {addressesResponse && addressesResponse.data.locations.length === 0 && !showForm && (
          <div>
            <span className="text-[16px] leading-[26px]">
              You have no saved adoption addresses yet. Add your preferred pick-up/drop-off locations now for quicker,
              secure, and hassle-free pet handovers.
            </span>
          </div>
        )}
        {addressesResponse && addressesResponse.data.locations.length > 0 && (
          <div className="flex flex-col gap-4">
            {addressesResponse.data.locations.map(address => (
              <div key={address.id} className="rounded-md border p-4">
                <p>{address.name}</p>
                <p>{address.street}</p>
                {address.apt && <p>{address.apt}</p>}
                <p>
                  {address.city}, {address.state} {address.postcode}
                </p>
                <p>{address.country}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            variant={'black'}
            size={'lg'}
            className="rounded-full"
            onClick={() => setShowForm(true)}
            disabled={showForm}
          >
            Add address
          </Button>
        </div>
      </div>
      {showForm && (
        <div className="mt-6 w-[400px]">
          <AddressForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default AddressesPage;
