'use client';
import { useEffect } from 'react';

import { useCurrentUserQuery } from '@/lib/api/authApi';
import { useAuthStore } from '@/stores/authStore';

const AuthInitializer = () => {
  const { setUser } = useAuthStore();
  const { data: result, error } = useCurrentUserQuery();

  useEffect(() => {
    if (result) {
      setUser(result.data.user);
    }
  }, [result, error]);

  return null;
};

export { AuthInitializer };
