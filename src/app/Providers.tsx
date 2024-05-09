'use client';

import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthUserProvider } from '@/lib/firebase/Provider';

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>{children}</AuthUserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
