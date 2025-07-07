'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';

import { ChevronLeft } from 'lucide-react';

import { CheckoutForm } from '@/components/payment';
import { Button } from '@/components/ui/button/Button';
import { useInitiatePetCarePaymentMutation } from '@/lib/api/petCareApi';
import { StripeProvider } from '@/providers/StripeProvider';

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const requestId = useParams().requestId as string;
  const searchParams = useSearchParams();
  const proposalId = searchParams.get('proposalId');

  const { mutate: initiatePayment } = useInitiatePetCarePaymentMutation({
    onSuccess({ data }) {
      const { paymentIntentClientSecret } = data;
      setClientSecret(paymentIntentClientSecret);
    },
  });

  useEffect(() => {
    if (requestId && proposalId) {
      initiatePayment({ requestId, proposalId });
    }
  }, [requestId, proposalId, initiatePayment]);

  return (
    <div className="px-25 container mx-auto py-8">
      <div className="mb-6 flex items-center">
        <span className="mr-4 cursor-pointer">
          <ChevronLeft />
        </span>
        <h1 className="text-2xl font-semibold">Confirm and pay</h1>
      </div>

      <div className="gap-25 flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="mb-8 text-xl font-semibold">Adoption Request</h2>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="font-medium">Dates</p>
                <p>22-24 Sept</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pet Type</p>
                <p>Labrador Retriever</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-8 text-xl font-semibold">Choose how to pay</h2>
            <div className="mb-8 rounded-md border p-4">
              <label className="flex cursor-pointer items-center justify-between">
                <div>
                  <p className="font-medium">Pay in full</p>
                  <p className="text-sm text-gray-600">{"Pay the total ($380.06) now and you're all set."}</p>
                </div>
                <input type="radio" name="paymentOption" className="form-radio" defaultChecked />
              </label>
            </div>
            <div className="rounded-md border p-4">
              <label className="flex cursor-pointer items-center justify-between">
                <div>
                  <p className="font-medium">Pay part now, part later</p>
                  <p className="text-sm text-gray-600">$76.02 due today, $304.04 on 13 Sept 2023. No extra fees.</p>
                  <p className="text-brand-700 mt-1 text-sm">More info</p>
                </div>
                <input type="radio" name="paymentOption" className="form-radio" />
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-8 text-xl font-semibold">Pay with</h2>
            <div className="flex gap-2">
              <span className="text-gray-500">VISA</span>
              <span className="text-gray-500">AMEX</span>
              <span className="text-gray-500">Mastercard</span>
              <span className="text-gray-500">PayPal</span>
              <span className="text-gray-500">GPay</span>
            </div>
            {clientSecret && (
              <StripeProvider clientSecret={clientSecret}>
                <CheckoutForm />
              </StripeProvider>
            )}
          </div>

          <Button fullWidth size={'lg'}>
            Confirm and pay
          </Button>
        </div>

        <div className="h-fit rounded-xl border border-gray-400 p-6 md:w-[40%] md:flex-none">
          <div className="mb-8 flex items-center gap-3">
            <div className="relative mt-4 h-20 w-24 overflow-hidden rounded-md">
              <Image src="/pets/dog-1.jpeg" alt="Accommodation" className="mr-4" fill />
            </div>
            <div>
              <p className="font-medium">Pet: Bruno (Labrador Retriever)</p>
              <p className="text-lg font-semibold">Age: 2 years</p>
              <p className="text-sm text-gray-600">Location: London, UK</p>
            </div>
          </div>

          <div className="border-1 mb-8 block w-full border-gray-400"></div>
          <h2 className="mb-8 text-xl font-semibold">Price details</h2>

          <div className="mb-2 flex items-center justify-between">
            <p>Adoption Fee </p>
            <p>$250.00</p>
          </div>
          <div className="mb-8 flex items-center justify-between">
            <p>Platform Service Fee (3%)</p>
            <p>$55.06</p>
          </div>
          <div className="mb-8 flex items-center justify-between">
            <p>Platform Verification Fee (3%)</p>
            <p>$0</p>
          </div>
          <div className="flex items-center justify-between border-t pt-4 font-semibold">
            <p>Total Fee </p>
            <p>$380.06</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
