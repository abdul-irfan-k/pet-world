'use client';
import React from 'react';

import { Elements } from '@stripe/react-stripe-js';

import getStripe from '@/utils/get-stripejs';

const stripePromise = getStripe();

interface StripeProviderProps {
  clientSecret: string;
  children: React.ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ clientSecret, children }) => {
  const appearance = { theme: 'stripe' } as const;
  const loader = 'auto';

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance, loader }}>
      {children}
    </Elements>
  );
};

export { StripeProvider };
