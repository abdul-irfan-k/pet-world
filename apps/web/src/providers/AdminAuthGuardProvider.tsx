'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAdminProfileQuery } from '@/lib/api/adminApi';
import { useAdminAuthStore } from '@/stores';

const AdminAuthGuardProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { setAdmin } = useAdminAuthStore();

  const { data, isLoading, isError } = useAdminProfileQuery();

  useEffect(() => {
    if (!isLoading && !isError) {
      //eslint-disable-next-line
      //@ts-ignore
      if (!data?.data.admin) {
        router.replace('/admin/sign-in');
      } else {
        setAdmin(data.data.admin);
      }
    }
  }, [isLoading, isError, data, router, setAdmin]);

  return <>{children}</>;
};

export { AdminAuthGuardProvider };
