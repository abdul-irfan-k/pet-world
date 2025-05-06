import React from 'react';
import Link from 'next/link';
import { Button, ButtonIcon } from '@/components/ui/Button';
import MailIcon from '@/assets/icons/mail-01.svg';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/form/input-otp';

const EnterVerificationCodePage = () => {
  return (
    <div className="h-screen pt-20 flex items-start justify-center">
      <div className="w-[360px] flex flex-col items-center gap-8">
        <ButtonIcon size={'lg'} variant={'outline'}>
          <MailIcon style={{ width: '24px', height: '24px' }} />
        </ButtonIcon>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[#181d27] text-[28px] font-semibold">
            Check your email
          </h1>
          <p className="text-[#535862] text-base">
            We sent a verification link to <br />
            <span className="font-medium">olivia@untitledui.com</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
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

export default EnterVerificationCodePage;
