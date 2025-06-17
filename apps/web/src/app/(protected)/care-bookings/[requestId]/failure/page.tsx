'use client';
import React from 'react';

import Image from 'next/image';

import { AlertTriangle, ChevronLeft } from 'lucide-react';

const PaymentFailurePage = () => {
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
            <h2 className="mb-8 text-xl font-semibold">Adoption Details</h2>
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="mb-2">
                <strong>Pet:</strong> Buddy (Golden Retriever)
              </p>
              <p className="mb-2">
                <strong>Adopter:</strong> Jane Doe
              </p>
              <p className="mb-2">
                <strong>Duration:</strong> 1 week (June 24, 2025 - July 1, 2025)
              </p>
              <p className="text-sm text-gray-600">
                Payment covers temporary care and expenses for the specified period.
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="mb-8 text-xl font-semibold">{"Adopter's Rules"}</h2>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="mb-2">We ask every adopter to be responsible and caring.</p>
              <ul className="ml-4 list-inside list-disc">
                <li>{"Follow the owner's specific care instructions."}</li>
                <li>Ensure the pet receives adequate food, water, and exercise.</li>
                <li>Keep the pet safe and secure at all times.</li>
                <li>Report any health concerns immediately to the owner.</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-sm text-gray-700">
            By selecting the button below, I agree to the
            <a href="#" className="text-brand-700 hover:underline">
              Temporary Adoption Agreement
            </a>
            and the
            <a href="#" className="text-brand-700 hover:underline">
              Platform Terms of Service
            </a>
            .
          </div>
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

          <div className="mb-8 block w-full border border-[1px] border-gray-400"></div>
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
      <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center">
        <div className="relative z-10 mx-auto flex aspect-[4/3] w-[60%] items-center justify-center rounded-lg bg-white">
          <div className="z-20 flex flex-col items-center stroke-red-500">
            <AlertTriangle size={32} strokeWidth={2} />;
            <span className="mt-[-10] text-xl font-medium text-red-500">Payment failure</span>
          </div>
        </div>

        <div className="fixed left-0 top-0 h-screen w-screen" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
