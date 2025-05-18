'use client';
import React, { useState } from 'react';

import { AddAddressForm } from '@/components/settings';
import { Button } from '@/components/ui/button';

const AddressesPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex w-[400px] flex-col gap-6">
        <div>
          <h1 className="text-2xl">Saved Addresses</h1>
        </div>

        <div>
          <span className="text-[16px] leading-[26px]">
            You have no saved adoption addresses yet. Add your preferred
            pick-up/drop-off locations now for quicker, secure, and hassle-free
            pet handovers.
          </span>
        </div>

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
          <AddAddressForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default AddressesPage;
