'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useOnboardStripeAccountMutation } from '@/lib/api/paymentApi';

interface PaymentMethod {
  id: string;
  type: string;
  last4?: string;
  expiry?: string;
  isDefault?: boolean;
}

const PaymentsPage = () => {
  //eslint-disable-next-line
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const isLoading = false;
  const isError = false;

  const { mutate } = useOnboardStripeAccountMutation();

  const handleAddPaymentMethod = () => {
    mutate({
      origin: window.location.origin,
    });
  };
  return (
    <div>
      <div className="flex w-[400px] flex-col gap-6">
        <div>
          <h1 className="text-2xl">Payment Methods</h1>
        </div>

        {isLoading && <p>Loading payment methods...</p>}
        {isError && <p>Error loading payment methods.</p>}
        {paymentMethods.length === 0 && (
          <div>
            <span className="text-[16px] leading-[26px]">
              You have no saved payment methods yet. Add a payment method to easily complete transactions.
            </span>
          </div>
        )}
        {paymentMethods.length > 0 && (
          <div className="flex flex-col gap-4">
            {paymentMethods.map(method => (
              <div key={method.id} className="rounded-md border p-4">
                <p className="font-semibold">{method.type}</p>
                {method.last4 && <p>Ending in: {method.last4}</p>}
                {method.expiry && <p>Expires: {method.expiry}</p>}
                {method.isDefault && <span className="text-xs text-green-600">Default</span>}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button variant={'black'} size={'lg'} className="rounded-full" onClick={handleAddPaymentMethod}>
            Add payment method
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
