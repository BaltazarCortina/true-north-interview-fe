import Link from 'next/link';

import { getButtonStyles } from '@/components/CustomButton';

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-100">Welcome to the Calculator App</h1>
          <p className="mt-2 text-gray-400">Get started now!</p>
        </div>
        <div className="flex flex-col gap-4">
          <Link className={getButtonStyles('primary')} href="/sign-in">
            Log In
          </Link>
          <Link className={getButtonStyles('secondary')} href="#">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
