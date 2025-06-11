import React from 'react';

import Image from 'next/image';

import { SignUpForm } from '@/components/auth/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="flex">
      <div className="flex h-screen w-full flex-col justify-between">
        <div className="p-8">
          <div>
            <Image src={'/logo.png'} alt="Logo" width={100} height={100} />
          </div>
        </div>

        <div className="flex flex-col items-center px-8">
          <div className="flex w-[360px] flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-3xl font-semibold leading-[38px] text-[#181d27]">Sign up</h1>
              <span className="text-base font-normal leading-normal text-[#535862]">
                Create your account to get started
              </span>
            </div>

            <SignUpForm />
          </div>
        </div>

        <div className="flex justify-between p-8">
          <span className="text-sm font-normal leading-tight text-[#535862]">© pet-world 2025</span>
          <span className="text-sm font-normal leading-tight text-[#535862]">help@pet-world.com</span>
        </div>
      </div>

      <div className="screen relative h-screen w-full overflow-hidden rounded-bl-[56px] rounded-tl-[56px]">
        <Image src={'/authentication-background.jpg'} fill alt="image" className="object-cover" />
        <div className="absolute h-full w-full" style={{ background: 'rgba(0, 0, 0, 0.2)' }}></div>

        <div className="absolute bottom-0 flex flex-col gap-6 p-14">
          <h1 className="text-4xl font-medium leading-[44px] text-white">
            Adopted Bella last month. She&apos;s the joy of our home now!
          </h1>
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold leading-[38px] text-white">Aarav M. Delhi</h2>
            <div className="flex flex-col gap-0.5">
              <span className="text-base font-medium leading-normal text-white">Pet Adopter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
