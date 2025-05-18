'use client';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AuthInitializer } from '@/components/shared';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      //eslint-disable-next-line
      onSuccess(data: any, _variables, context: any) {
        if (context.meta.notify) {
          toast.success(data.message, {
            description: 'Your changes have been saved.',
            duration: 3000,
          });
        }
      },
      //eslint-disable-next-line
      onError(error: any, _variables, context: any) {
        if (context.meta.notify) {
          toast.error(error.response?.data?.message || 'An error occurred', {
            description: 'Please try again later.',
            duration: 3000,
          });
        }
      },
    },
  },
});

const AppProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />

      {children}
    </QueryClientProvider>
  );
};

export { AppProviders };
