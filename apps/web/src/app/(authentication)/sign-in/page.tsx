import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { EmailField, PasswordField } from '@/components/ui/form/inputs';

const SignInPage = () => {
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
              <h1 className="text-3xl font-semibold leading-[38px] text-[#181d27]">
                Sign in
              </h1>
              <span className="text-base font-normal leading-normal text-[#535862]">
                Sign in to get started
              </span>
            </div>

            <div className="flex w-full flex-col gap-6">
              <div className="flex w-full flex-col gap-5">
                <EmailField label="Email*" />
                <PasswordField label="Password*" />
                <div className="flex flex-col gap-1.5"></div>
              </div>

              <div className="flex flex-col gap-4">
                <Button size={'lg'}>Sign in </Button>
                <div className="flex items-center justify-center rounded-lg bg-white px-[18px] py-2.5 outline outline-1 outline-offset-[-1px] outline-[#d5d6da]">
                  <span className="text-base font-semibold leading-normal text-[#414651]">
                    Sign in with Google
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <span className="text-sm font-normal leading-tight text-[#535862]">
                  Not have an account?{' '}
                  <span>
                    <Link
                      href={'/sign-up'}
                      className="text-sm font-semibold leading-tight text-[#6840c6]"
                    >
                      Sign up
                    </Link>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-8">
          <span className="text-sm font-normal leading-tight text-[#535862]">
            © pet-world 2025
          </span>
          <span className="text-sm font-normal leading-tight text-[#535862]">
            help@pet-world.com
          </span>
        </div>
      </div>

      <div className="screen relative h-screen w-full overflow-hidden rounded-bl-[56px] rounded-tl-[56px]">
        <Image
          src={'/authentication-background.jpg'}
          fill
          alt="image"
          className="object-cover"
        />
        <div
          className="absolute h-full w-full"
          style={{ background: 'rgba(0, 0, 0, 0.2)' }}
        ></div>

        <div className="absolute bottom-0 flex flex-col gap-6 p-14">
          <h1 className="text-4xl font-medium leading-[44px] text-white">
            Adopted Bella last month. She&apos;s the joy of our home now!
          </h1>
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold leading-[38px] text-white">
              Aarav M. Delhi
            </h2>
            <div className="flex flex-col gap-0.5">
              <span className="text-base font-medium leading-normal text-white">
                Pet Adopter
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
