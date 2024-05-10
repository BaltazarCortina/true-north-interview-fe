'use client';

import Link from 'next/link';

import CustomButton from '@/components/CustomButton';
import { useAuth } from '@/lib/firebase/Provider';

const Header = () => {
  const { authUser, signOut } = useAuth();

  const linkStyle =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 text-gray-100 rounded-md hover:bg-gray-800 hover:underline';

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <Link href="/" className="text-lg font-extrabold">
        Calculator App
      </Link>
      <div className="flex gap-8 items-center">
        <div className="flex gap-2">
          <Link href="/calculator" className={linkStyle}>
            Calculator
          </Link>
          <Link href="/records" className={linkStyle}>
            Records
          </Link>
        </div>
        <span>|</span>
        <div className="flex flex-col text-sm">
          <span className="text-xs font-light">Welcome</span>
          <span className="text-sm">{authUser?.email || ''}</span>
        </div>
        <span>|</span>
        <CustomButton onClick={signOut} variant="secondary">
          Sign out
        </CustomButton>
      </div>
    </header>
  );
};

export default Header;
