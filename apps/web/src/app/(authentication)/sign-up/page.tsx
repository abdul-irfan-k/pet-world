import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/form/Inputs';
import { EmailField } from '@/components/ui/form/Inputs/EmailField';
import { PasswordField } from '@/components/ui/form/Inputs/PasswordField';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SignUpPage = () => {
  return (
    <div className="flex">
      <div className=" flex flex-col justify-between h-screen w-full">
        <div className="p-8">
          <div>
            <Image src={'/logo.png'} alt="Logo" width={100} height={100} />
          </div>
        </div>

        <div className="px-8 flex flex-col items-center">
          <div className="w-[360px] flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-[#181d27] text-3xl font-semibold leading-[38px]">
                Sign up
              </h1>
              <span className="text-[#535862] text-base font-normal  leading-normal">
                Create your account to get started
              </span>
            </div>

            <div className="w-full flex flex-col gap-6">
              <div className="w-full flex flex-col gap-5">
                <TextField
                  label="Name*"
                  placeholder="Enter your name"
                  type="text"
                />
                <EmailField label="Email*" placeholder="Enter your email" />
                <PasswordField
                  label="Password*"
                  placeholder="Enter your password"
                />
                <div className="flex flex-col gap-1.5"></div>
              </div>

              <div className="flex flex-col gap-4">
                <Button size={'lg'}>Sign up </Button>
                <div className="px-[18px] flex items-center justify-center py-2.5 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d5d6da]  ">
                  <span className="text-[#414651] text-base font-semibold leading-normal">
                    Sign up with Google
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <span className="text-[#535862] text-sm font-normal leading-tight">
                  Not have an account?{' '}
                  <span>
                    <Link
                      href={'/sign-up'}
                      className="text-[#6840c6] text-sm font-semibold  leading-tight"
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
          <span className="text-[#535862] text-sm font-normal leading-tight">
            © pet-world 2025
          </span>
          <span className="text-[#535862] text-sm font-normal leading-tight">
            help@pet-world.com
          </span>
        </div>
      </div>

      <div className="relative screen w-full h-screen rounded-tl-[56px] rounded-bl-[56px] overflow-hidden ">
        <Image
          src={'/authentication-background.jpg'}
          fill
          alt="image"
          className="object-cover "
        />
        <div
          className="absolute w-full h-full "
          style={{ background: 'rgba(0, 0, 0, 0.2)' }}
        ></div>

        <div className="bottom-0 p-14 absolute flex flex-col gap-6">
          <h1 className="text-white text-4xl font-medium leading-[44px]">
            Adopted Bella last month. She&apos;s the joy of our home now!
          </h1>
          <div className="flex flex-col gap-3">
            <h2 className="text-white text-3xl font-semibold leading-[38px]">
              Aarav M. Delhi
            </h2>
            <div className="flex flex-col gap-0.5">
              <span className="text-white text-base font-medium leading-normal">
                Pet Adopter
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
