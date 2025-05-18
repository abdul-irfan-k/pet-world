'use client';
import React from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { EmailField, PasswordField } from '@/components/ui/form/inputs';
import { useSignInMutation } from '@/lib/api/authApi';
import { SignInInput, signInSchema } from '@/lib/schemas';
import { useAuthStore } from '@/stores/authStore';

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { isPending, mutate, error } = useSignInMutation({
    onSuccess: response => {
      const { data } = response;

      login(data.user);
      toast.success('Sign in successful', {
        description: 'Welcome back to our platform!',
        duration: 3000,
      });

      const callbackUrl = searchParams.get('callbackUrl') || '/';
      router.push(callbackUrl);
    },
    onError: error => {
      const message = error?.response?.data?.message || 'An error occurred';
      toast.error(message, {
        description: 'Please try again later.',
        duration: 3000,
      });
    },
  });

  const onSubmit = (data: SignInInput) => {
    mutate(data);
  };

  return (
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
            <EmailField
              label="Email*"
              {...register('email')}
              error={errors.email?.message}
            />
            <PasswordField
              label="Password*"
              {...register('password')}
              error={errors.password?.message}
            />
            {error?.response && (
              <span className="text-sm font-normal leading-tight text-red-500">
                {error.response?.data.message || 'An error occurred'}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button
              size={'lg'}
              onClick={handleSubmit(onSubmit)}
              isLoading={isPending}
            >
              Sign in{' '}
            </Button>
            <div className="flex items-center justify-center rounded-lg bg-white px-[18px] py-2.5 outline-1 outline-offset-[-1px] outline-[#d5d6da]">
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
  );
};

export { SignInForm };
