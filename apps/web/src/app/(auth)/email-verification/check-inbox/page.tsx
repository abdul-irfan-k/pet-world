'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ChevronLeft } from 'lucide-react';

import MailIcon from '@/assets/icons/mail-01.svg';
import { Button, ButtonIcon } from '@/components/ui/button';

const DEFAULT_EMAIL = 'olivia@untitledui.com';

const CheckInboxPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || DEFAULT_EMAIL;

  return (
    <div className="flex flex-col items-center px-8">
      <div className="flex w-[360px] flex-col items-center gap-8">
        <ButtonIcon size={'lg'} variant={'outline'}>
          <MailIcon style={{ width: '24px', height: '24px' }} />
        </ButtonIcon>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[28px] font-semibold text-[#181d27]">Check your email</h1>
          <p className="text-base text-[#535862]">
            We sent a verification link to <br></br>
            <span className="font-medium">{email}</span>
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          <Button size={'lg'} fullWidth>
            Enter code manually
          </Button>

          <Link href="/sign-in">
            <Button variant="ghost" className="text-base text-[#181d27]">
              <ChevronLeft className="h-4 w-4" /> Back to log in (Skip Verification)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckInboxPage;
