'use client';
import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { EmailField, PasswordField } from '@/components/ui/form/inputs';
import { useAdminLoginMutation } from '@/lib/api/adminApi';
import { useAdminAuthStore } from '@/stores';

const adminSignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
type AdminSignInInput = z.infer<typeof adminSignInSchema>;

const AdminSignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login } = useAdminAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminSignInInput>({
    resolver: zodResolver(adminSignInSchema),
  });

  const { isPending, mutate } = useAdminLoginMutation({
    onSuccess: response => {
      login(response.data.admin);
      toast.success('Admin sign in successful', {
        description: 'Welcome back, admin!',
        duration: 3000,
      });
      //eslint-disable-next-line
      //@ts-ignore
      const token = response.data.accessToken;
      document.cookie = `adminAccessToken=${token}; path=/; Secure; SameSite=None`;
      const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';
      router.push(callbackUrl);
    },
    onError: err => {
      const message =
        err?.response?.data && typeof err.response.data === 'object' && 'message' in err.response.data
          ? //eslint-disable-next-line
            (err.response.data as any).message
          : 'Invalid credentials';
      toast.error('Sign in failed', {
        description: message,
        duration: 3000,
      });
    },
  });

  const onSubmit = (data: AdminSignInInput) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center px-8">
      <div className="flex w-[360px] flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-semibold leading-[38px] text-[#181d27]">Admin Sign in</h1>
          <span className="text-base font-normal leading-normal text-[#535862]">Sign in to manage Pet World</span>
        </div>
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-5">
            <EmailField label="Email*" {...register('email')} error={errors.email?.message} />
            <PasswordField label="Password*" {...register('password')} error={errors.password?.message} />
          </div>
          <div className="flex flex-col gap-4">
            <Button size={'lg'} onClick={handleSubmit(onSubmit)} isLoading={isPending}>
              Sign in as Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminSignInForm };
