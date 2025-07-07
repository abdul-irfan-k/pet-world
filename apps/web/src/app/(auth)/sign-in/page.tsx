import React, { Suspense } from 'react';

import Image from 'next/image';

import { SignInForm } from '@/components/auth';

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center px-8">
      <div className="flex w-[360px] flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-semibold leading-[38px] text-[#181d27]">Sign in</h1>
          <span className="text-base font-normal leading-normal text-[#535862]">Sign in to get started</span>
        </div>

        <Suspense>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
};

export default SignInPage;
