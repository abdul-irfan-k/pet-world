'use client';
import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  TextField,
  EmailField,
  PasswordField,
} from '@/components/ui/form/inputs';
import { useSignUpMutation } from '@/lib/api/authApi';
import { SignUpInput, signUpSchema } from '@/lib/schemas';

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, isPending } = useSignUpMutation({
    onSuccess: () => {
      toast.success('Sign up successful', {
        description: 'Please sign in to continue.',
        duration: 3000,
      });
      router.push('/sign-in');
    },
    //eslint-disable-next-line
    onError: (error: AxiosError<any>) => {
      const message = error.response?.data?.message || 'An error occurred';
      toast.error(message, {
        description: 'Please try again later.',
        duration: 3000,
      });
    },
  });

  const onSubmit = (data: SignUpInput) => {
    mutate(data);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-5">
        <TextField
          label="First Name*"
          placeholder="Enter your first name"
          type="text"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <TextField
          label="Last Name*"
          placeholder="Enter your last name"
          type="text"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
        <EmailField
          label="Email*"
          placeholder="Enter your email"
          {...register('email')}
          error={errors.email?.message}
        />
        <TextField
          label="Username*"
          placeholder="Enter your username"
          type="text"
          {...register('userName')}
          error={errors.userName?.message}
        />
        <PasswordField
          label="Password*"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
        />
        <div className="flex flex-col gap-1.5"></div>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          size={'lg'}
          onClick={handleSubmit(onSubmit)}
          isLoading={isPending}
        >
          Sign up{' '}
        </Button>
        <div className="flex items-center justify-center rounded-lg bg-white px-[18px] py-2.5 outline outline-offset-[-1px] outline-[#d5d6da]">
          <span className="text-base font-semibold leading-normal text-[#414651]">
            Sign up with Google
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <span className="text-sm font-normal leading-tight text-[#535862]">
          Already have an account?
          <span>
            <Link
              href={'/sign-in'}
              className="text-sm font-semibold leading-tight text-[#6840c6]"
            >
              Sign in
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
};

export { SignUpForm };
