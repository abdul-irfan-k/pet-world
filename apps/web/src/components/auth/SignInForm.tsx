'use client';
import React from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { GoogleAuth } from './GoogleAuth';

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

  const { isPending, mutate } = useSignInMutation({
    onSuccess: response => {
      const { data } = response;

      login(data.user);
      toast.success('Sign in successful', {
        description: 'Welcome back to our platform!',
        duration: 3000,
      });

      //eslint-disable-next-line
      //@ts-ignore
      const token = data.accessToken;
      document.cookie = `accessToken=${token}; path=/; Secure; SameSite=None`;

      const callbackUrl = searchParams.get('callbackUrl') || '/';
      router.push(callbackUrl);
    },
  });

  const onSubmit = (data: SignInInput) => {
    mutate(data);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-5">
        <EmailField label="Email*" {...register('email')} error={errors.email?.message} />
        <PasswordField label="Password*" {...register('password')} error={errors.password?.message} />
      </div>

      <div className="flex flex-col gap-4">
        <Button size={'lg'} onClick={handleSubmit(onSubmit)} isLoading={isPending}>
          Sign in
        </Button>
        <GoogleAuth />
      </div>

      <div className="flex justify-center">
        <span className="text-sm font-normal leading-tight text-[#535862]">
          Not have an account?{' '}
          <span>
            <Link href={'/sign-up'} className="text-sm font-semibold leading-tight text-[#6840c6]">
              Sign up
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
};

export { SignInForm };
