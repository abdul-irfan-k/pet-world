import React from 'react';

import Link from 'next/link';

import MailIcon from '@/assets/icons/mail-01.svg';
import { Button, ButtonIcon } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/form/input-otp';

const EnterVerificationCodePage = () => {
  return (
    <div className="flex h-screen items-start justify-center pt-20">
      <div className="flex w-[360px] flex-col items-center gap-8">
        <ButtonIcon size={'lg'} variant={'outline'}>
          <MailIcon style={{ width: '24px', height: '24px' }} />
        </ButtonIcon>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[28px] font-semibold text-[#181d27]">Check your email</h1>
          <p className="text-base text-[#535862]">
            We sent a verification link to <br />
            <span className="font-medium">olivia@untitledui.com</span>
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>

          <Button size={'lg'} fullWidth>
            Verify email
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

export default EnterVerificationCodePage;
