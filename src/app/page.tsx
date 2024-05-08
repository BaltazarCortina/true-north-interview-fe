import Link from 'next/link';

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to the Calculator App
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Get started now!</p>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-900"
            href="/calculator"
          >
            Log In
          </Link>
          <Link
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:bg-gray-950 dark:text-gray-100 dark:border-gray-800 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-900"
            href="#"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
