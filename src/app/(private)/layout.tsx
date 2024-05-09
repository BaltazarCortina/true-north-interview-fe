'use client';

import { useEffect, PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

import { useAuth } from '@/lib/firebase/Provider';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  const { authUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && !authUser) redirect('/');
  }, [authUser, loading]);

  return <div>{children}</div>;
};

export default PrivateLayout;
