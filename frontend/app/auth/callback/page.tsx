'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('Processing login...');

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');

        if (accessToken && refreshToken) {
            // Store tokens
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            setStatus('Login successful! Redirecting...');

            // Redirect to home or dashboard after a short delay
            setTimeout(() => {
                router.push('/');
            }, 1500);
        } else {
            setStatus('Login failed. No tokens received.');
        }
    }, [searchParams, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Authentication
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        {status}
                    </p>
                </div>
            </div>
        </div>
    );
}
