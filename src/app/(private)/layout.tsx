'use client';

import { useEffect, PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

import { useAuth } from '@/lib/firebase/Provider';
import Header from '@/components/Header';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  const { authUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && !authUser) redirect('/');
  }, [authUser, loading]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default PrivateLayout;
