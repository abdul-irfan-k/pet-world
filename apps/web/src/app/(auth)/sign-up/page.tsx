import React from 'react';

import { SignUpForm } from '@/components/auth/SignUpForm';

const SignUpPage = () => {
  return (
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
  );
};

export default SignUpPage;
