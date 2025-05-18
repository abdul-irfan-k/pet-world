'use client';
import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  TextField,
  EmailField,
  PasswordField,
} from '@/components/ui/form/inputs';

const SignUpForm = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-5">
        <TextField label="Name*" placeholder="Enter your name" type="text" />
        <EmailField label="Email*" placeholder="Enter your email" />
        <PasswordField label="Password*" placeholder="Enter your password" />
        <div className="flex flex-col gap-1.5"></div>
      </div>

      <div className="flex flex-col gap-4">
        <Button size={'lg'}>Sign up </Button>
        <div className="flex items-center justify-center rounded-lg bg-white px-[18px] py-2.5 outline outline-1 outline-offset-[-1px] outline-[#d5d6da]">
          <span className="text-base font-semibold leading-normal text-[#414651]">
            Sign up with Google
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <span className="text-sm font-normal leading-tight text-[#535862]">
          Already have an account?
          <span>
            <Link
              href={'/sign-in'}
              className="text-sm font-semibold leading-tight text-[#6840c6]"
            >
              Sign in
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
};

export { SignUpForm };
