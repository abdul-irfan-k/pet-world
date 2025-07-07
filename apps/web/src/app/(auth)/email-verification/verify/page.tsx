'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

import MailIcon from '@/assets/icons/mail-01.svg';
import { Button, ButtonIcon } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/form/input-otp';
import { useResendVerificationEmailMutation, useVerifyEmailMutation } from '@/lib/api/authApi';

const DEFAULT_EMAIL = 'olivia@untitledui.com';

const EmailVerificationPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get('email') || DEFAULT_EMAIL;
  const code = searchParams.get('code') || '';

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const { mutate: verifyEmailMutate, isPending: isVerifyEmailPending } = useVerifyEmailMutation({
    onSuccess() {
      toast.success('Email verification successfull', { description: 'successfully verified email', duration: 3000 });
      router.push('/sign-in');
    },
    onError() {
      toast.error('Email Verification failed', { description: 'email verification failed', duration: 3000 });
    },
  });

  const { mutate: resendVerificationEmailMutate, isPending: isResendEmailPending } = useResendVerificationEmailMutation(
    {
      onSuccess() {
        toast.success('Verification email resended', { duration: 3000 });
      },
      onError() {
        toast.error('Resend verification email request failed', { duration: 3000 });
      },
    },
  );
  const handleVerify = () => {
    if (!email || otpCode.length < 4) return;
    verifyEmailMutate({
      email,
      code: otpCode,
    });
  };

  const handleResendEmail = () => {
    if (!email || isResendEmailPending) return;
    resendVerificationEmailMutate({ email });
  };

  useEffect(() => {
    if (code) {
      setShowOtpInput(true);
      setOtpCode(code);
    }
  }, [code]);

  return (
    <div className="flex flex-col items-center px-8">
      <div className="flex w-[360px] flex-col items-center gap-8">
        <ButtonIcon size={'lg'} variant={'outline'}>
          <MailIcon style={{ width: '24px', height: '24px' }} />
        </ButtonIcon>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[28px] font-semibold text-[#181d27]">Check your email</h1>
          <p className="text-base text-[#535862]">
            We sent a verification link to <br />
            <span className="font-medium">{email}</span>
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          {showOtpInput ? (
            <>
              <InputOTP maxLength={4} onChange={setOtpCode} value={otpCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>

              <Button
                size={'lg'}
                fullWidth
                isLoading={isVerifyEmailPending}
                onClick={handleVerify}
                disabled={otpCode.length < 4}
              >
                Verify email
              </Button>
            </>
          ) : (
            <Button size="lg" fullWidth onClick={() => setShowOtpInput(true)}>
              Enter code manually
            </Button>
          )}

          <p className="text-center text-base text-[#535862]">
            {"Didn't receive the email?"}
            <Button variant={'link'} onClick={handleResendEmail} disabled={isResendEmailPending}>
              Click to resend
            </Button>
          </p>

          <Link href="/sign-in">
            <Button variant="ghost" className="text-base text-[#181d27]">
              <ArrowLeft className="h-4 w-4" /> Back to log in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
