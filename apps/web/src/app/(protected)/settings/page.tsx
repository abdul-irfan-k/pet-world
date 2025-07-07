'use client';
import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { TextField, PasswordField, EmailField } from '@/components/ui/form/inputs';
import { Spinner } from '@/components/ui/spinnner';
import { useDebounce } from '@/hooks/useDebounce';
import { useCheckUserNameAvailabilityQuery, useUpdateUserMutation } from '@/lib/api/userApi';
import { IUpdateUserInput, updateUserSchema } from '@/lib/schemas';
import { useAuthStore } from '@/stores';

const AccountSettingPage = () => {
  const { user, setUser } = useAuthStore();

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    getValues,
  } = useForm<IUpdateUserInput>({
    defaultValues: {},
    resolver: zodResolver(updateUserSchema),
  });

  const userName = watch('userName');
  const debouncedUserName = useDebounce(userName);

  //eslint-disable-next-line
  //@ts-ignore
  const { data: isUserNameAvailable } = useCheckUserNameAvailabilityQuery(debouncedUserName, {
    skip: !debouncedUserName || debouncedUserName.length < 3 || !isDirty || userName === user?.userName,
  });

  useEffect(() => {
    if (isUserNameAvailable && isUserNameAvailable.data.exists && isDirty) {
      setError('userName', {
        type: 'manual',
        message: 'Username is already taken',
      });
    } else {
      clearErrors('userName');
    }
  }, [isUserNameAvailable, setError]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        userName: user.userName || '',
        dateOfBirth: user.dateOfBirth ?? undefined,
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user, reset]);

  const { mutate: updateUserMutate } = useUpdateUserMutation({
    onSuccess: data => {
      if (data.data.user) {
        toast.success('Sign in successful', { description: 'Welcome back to our platform!', duration: 3000 });
        reset({
          ...data.data.user,
          phone: data.data.user.phone || '',
          dateOfBirth: data.data.user.dateOfBirth || undefined,
        });
        setUser(data.data.user);
      }
    },
    onError: error => {
      console.error('Error updating user:', error);
    },
  });

  const onSubmit = () => {
    const formData = getValues();
    updateUserMutate(formData);
  };

  return (
    <div className="">
      <div className="flex w-[400px] flex-col gap-6">
        <div>
          <h1 className="text-2xl">Account Details</h1>
        </div>

        {!user && (
          <div>
            <Spinner className="h-10 w-10" />
          </div>
        )}
        {user && (
          <div className="flex flex-col gap-6">
            <TextField label="Name" type="text" {...register('name')} error={errors.name?.message} />
            <TextField label="Username" type="text" {...register('userName')} error={errors.userName?.message} />
            <TextField
              label="Date of Birth"
              type="date"
              {...register('dateOfBirth')}
              error={errors.dateOfBirth?.message}
            />
            <EmailField label="Email" {...register('email')} error={errors.email?.message} />
            <PasswordField label="Password" />
            <TextField label="Phone Number" type="text" {...register('phone')} error={errors.phone?.message} />
            <Button variant={'primary'} size={'lg'} disabled={!isDirty} onClick={handleSubmit(onSubmit)}>
              Save
            </Button>

            <div className="flex items-center justify-between">
              <span>Delete Account</span>
              <Button variant={'destructive'} size={'lg'}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettingPage;
