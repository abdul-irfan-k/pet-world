'use client';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useCurrentUserQuery } from '@/lib/api/authApi';
import { useAuthStore } from '@/stores/authStore';

const AuthInitializer = () => {
  const { setUser } = useAuthStore();
  const { data: result, error } = useCurrentUserQuery();

  useEffect(() => {
    if (result) {
      setUser(result.data);
    }
  }, [result, error]);

  return null;
};

export { AuthInitializer };
