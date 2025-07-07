'use client';
import React, { useState } from 'react';

import { AddressForm } from '@/components/settings';
import { Button } from '@/components/ui/button';
import { useGetUserAddressesQuery } from '@/lib/api/userApi';
import { Location } from '@/types/Location';

const AddressesPage = () => {
  const { data: addressesResponse, isLoading, isError } = useGetUserAddressesQuery();

  const [addressPopUpForm, setAddressPopUpForm] = useState<'create' | 'edit' | undefined>(undefined);
  const [addressFormInitialData, setAddressFormInitialData] = useState<Location | undefined>(undefined);

  const onEditAddress = (address: Location) => {
    setAddressPopUpForm('edit');
    setAddressFormInitialData(address);
  };

  return (
    <div>
      <div className="flex w-[400px] flex-col gap-6">
        <div>
          <h1 className="text-2xl">Saved Addresses</h1>
        </div>

        {isLoading && <p>Loading addresses...</p>}
        {isError && <p>Error loading addresses.</p>}
        {addressesResponse && addressesResponse.data.locations.length === 0 && !addressPopUpForm && (
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
              <div key={address.id} className="flex justify-between rounded-md p-4">
                <div>
                  <p>{address.name}</p>
                  <p>{address.street}</p>
                  {address.apt && <p>{address.apt}</p>}
                  <p>
                    {address.city}, {address.state} {address.postcode}
                  </p>
                  <p>{address.country}</p>
                </div>
                <Button variant={'ghost'} onClick={() => onEditAddress(address)}>
                  Edit
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button variant={'black'} size={'lg'} className="rounded-full" onClick={() => setAddressPopUpForm('create')}>
            Add address
          </Button>
        </div>
      </div>
      {addressPopUpForm && (
        <div className="mt-6 w-[400px]">
          <AddressForm
            onClose={() => setAddressPopUpForm(undefined)}
            mode={addressPopUpForm}
            initialData={addressPopUpForm === 'edit' ? addressFormInitialData : undefined}
          />
        </div>
      )}
    </div>
  );
};

export default AddressesPage;
