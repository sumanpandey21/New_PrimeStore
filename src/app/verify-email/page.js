"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const key = searchParams.get("key");

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!key) {
            setError("No key provided in query.");
            setLoading(false);
            return;
        }

        const csrftoken = '8CkMWjWGOMZw7eX7cdngjpesqfNiYQTv4gfdyOpMcTUY9L56WAHBFD1CApAtkyWN';

        async function verifyEmail() {
            const data = JSON.stringify({ key })
            console.log(data);
            try {
                const res = await fetch('http://127.0.0.1:8000/auth/dj-rest-auth/registration/verify-email/verify-email/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({ key }),
                });

                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.detail || "Email verification failed");
                }

                const data = await res.json();
                setResponse(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        verifyEmail();
    }, [key]);

    if (loading) return (
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <p class="text-xl font-semibold text-gray-700">Verifying your email...</p>
        </div>)

    if (error) return (
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <p class="text-xl font-semibold text-red-500">Error: {error}</p>
        </div>)

    return (
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
                <h1 class="text-3xl font-bold text-green-600 mb-4">Email Verification Successful!</h1>
                <p class="text-gray-700 mb-6">Your email has been successfully verified. You can now proceed to log in.</p>
            </div>
        </div>
    );
}
