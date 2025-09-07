"use client";
import { useState, useEffect } from 'react';

// This is a self-contained React page component that handles password reset.
// It has been modified to use standard browser APIs to resolve compilation errors.

export default function page() {
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect to get uid and token from the URL search parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setUid(params.get('uid'));
      setToken(params.get('token'));
    }
  }, []);
  
  // useEffect to clear messages and errors when the user starts typing
  useEffect(() => {
    setMessage('');
    setError('');
  }, [newPassword1, newPassword2]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setMessage('');
    setError('');

    // Basic client-side validation
    if (newPassword1 !== newPassword2) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (!uid || !token) {
      setError('Missing UID or token. Please use the link from your email.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/password/reset/confirm/', { // IMPORTANT: Replace with your actual API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          token,
          new_password1: newPassword1,
          new_password2: newPassword2,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Your password has been reset successfully!');
      } else {
        // Display errors from the API
        const errorMessages = Object.values(data).flat().join(' ');
        setError(errorMessages || 'Failed to reset password. The link may have expired or is invalid.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Reset Password</h1>
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Display loading state while waiting for the API response */}
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-500">Resetting password...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="new_password1" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                id="new_password1"
                type="password"
                value={newPassword1}
                onChange={(e) => setNewPassword1(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="new_password2" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                id="new_password2"
                type="password"
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
