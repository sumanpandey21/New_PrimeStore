"use client";
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle changes in the email input field
  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear any previous error messages for the email field
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  // Basic client-side validation for the email field
  const validateForm = () => {
    let newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Assume this is the API endpoint for password reset
        const response = await fetch('http://127.0.0.1:8000/auth/password/reset/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          // Success toast message
          toast.success(data.detail || 'If an account with that email exists, a password reset link has been sent.', {
            position: "bottom-right",
            autoClose: 8000,
          });
          // Note: useRouter is causing the compilation error, so we will use a simple window.location.href for a client-side navigation
          // The component will be reloaded and behave as expected for the user in this context.
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          // Error handling based on API response
          let errorMessage = 'Failed to send password reset email. Please try again.';
          if (data && data.detail) {
            errorMessage = data.detail;
          } else if (data && data.email) {
            errorMessage = data.email.join(', ');
          }
          toast.error(errorMessage, { position: "bottom-right" });
        }
      } catch (error) {
        console.error('Network error or unexpected issue during password reset:', error);
        toast.error('A network error occurred. Please try again later.', { position: "bottom-right" });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Please enter a valid email address.', { position: "bottom-right" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Forgot Password</h2>

        <p className="text-center text-gray-600 text-sm mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {/* Link back to login page */}
        <p className="text-center text-gray-600 text-sm mt-6">
          <a href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
