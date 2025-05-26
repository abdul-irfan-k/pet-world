'use client';
import { useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCurrentUserQuery } from '@/lib/api/authApi';
import { useAuthStore } from '@/stores/authStore';

const AuthInitializer = () => {
  const { setUser } = useAuthStore();
  const { data: result, error } = useCurrentUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (result?.data?.user) {
      setUser(result.data.user);
      if (pathname === '/sign-in' || pathname === '/sign-up') {
        const callbackUrl = searchParams.get('callbackUrl');
        if (callbackUrl) router.replace(callbackUrl);
        else router.replace('/');
      }
    }
  }, [result, error, setUser, pathname, searchParams]);

  return null;
};

export { AuthInitializer };
