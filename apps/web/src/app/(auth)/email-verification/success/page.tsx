import React from 'react';

import Link from 'next/link';

import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import { Button, ButtonIcon } from '@/components/ui/button';

const EmailVerificationSuccess = () => {
  return (
    <div className="flex flex-col items-center px-8">
      <div className="flex w-[360px] flex-col items-center gap-8">
        <ButtonIcon size={'lg'} variant={'outline'}>
          <CheckCircleIcon style={{ width: '24px', height: '24px' }} />
        </ButtonIcon>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[28px] font-semibold text-[#181d27]">Email Verified</h1>
          <p className="text-base text-[#535862]">
            {"You're password has been successfully reset. Click below to login"}
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          <Button size={'lg'} fullWidth>
            Continue
          </Button>

          <p className="text-center text-base text-[#535862]">
            {"Didn't receive the email?"}
            <Link href="#" className="font-semibold text-[#6840c6] hover:underline">
              Click to resend
            </Link>
          </p>

          <Link href="/sign-in">
            <Button variant="ghost" className="text-base text-[#181d27]">
              ← Back to log in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
