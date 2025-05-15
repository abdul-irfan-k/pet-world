import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useCurrentUserQuery } from '@/lib/api/authApi';
import { useAuthStore } from '@/stores/authStore';

const AuthInitializer = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { data: result, isLoading, error } = useCurrentUserQuery({});

  useEffect(() => {
    if (error) {
      router.push('/sign-in');
    }
    if (result) {
      setUser(result.data);
    }
  }, [result, error]);

  return null;
};

export { AuthInitializer };
