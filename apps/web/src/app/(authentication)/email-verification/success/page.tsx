import React from 'react';
import Link from 'next/link';
import { Button, ButtonIcon } from '@/components/ui/button';
import CheckCircleIcon from '@/assets/icons/check-circle.svg';

const EmailVerificationSuccess = () => {
  return (
    <div className="h-screen pt-20 flex items-start justify-center">
      <div className="w-[360px] flex flex-col items-center gap-8">
        <ButtonIcon size={'lg'} variant={'outline'}>
          <CheckCircleIcon style={{ width: '24px', height: '24px' }} />
        </ButtonIcon>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[#181d27] text-[28px] font-semibold">
            Email Verified
          </h1>
          <p className="text-[#535862] text-base">
            {
              "You're password has been successfully reset. Click below to login"
            }
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <Button size={'lg'} fullWidth>
            Continue
          </Button>

          <p className="text-base text-[#535862] text-center">
            {"Didn't receive the email?"}
            <Link
              href="#"
              className="text-[#6840c6] font-semibold hover:underline"
            >
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
