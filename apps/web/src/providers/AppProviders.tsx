'use client';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthInitializer } from '@/components/shared';

const queryClient = new QueryClient({});

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
