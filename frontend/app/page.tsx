import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const googleLoginUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/auth/google`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <a
            href={googleLoginUrl}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12.0003 20.45c4.648 0 8.087-3.134 8.087-7.989 0-.671-.061-1.316-.174-1.927H12.0003v3.666h4.588c-.287 1.838-1.745 3.322-3.876 3.322-2.615 0-4.793-1.897-5.592-4.425l-.02-.128-4.698 3.636.14.135c2.31 4.542 7.025 7.71 12.458 7.71z"
                fill="#34A853"
              />
              <path
                d="M6.392 13.096c-.198-.59-.311-1.222-.311-1.871 0-.666.116-1.312.324-1.914l-4.57-3.551c-1.125 2.217-1.754 4.743-1.754 7.424 0 1.933.327 3.793.921 5.518l5.39-4.178v-.006z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.378c2.409 0 4.19.988 5.143 1.871l2.812-2.771C18.17 2.868 15.352 1.5 12 1.5 6.567 1.5 1.851 4.668-.46 9.21l5.407 3.719C5.751 10.435 8.653 7.878 12 7.878v-2.5z"
                fill="#EA4335"
              />
              <path
                d="M23.978 10.5h-1.603V10.5H12v3.666h5.817c-.496 2.378-2.673 4.167-5.32 4.167v.01l4.903 3.84c3.483-3.082 5.09-7.854 5.09-11.683z"
                fill="#4285F4"
              />
            </svg>
            <span className="text-sm font-semibold leading-6">Sign in with Google</span>
          </a>
        </div>
      </div>
    </div>
  );
}
