"use client";
import React, { useState, useEffect } from 'react'; // Import useEffect
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const page = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isResending, setIsResending] = useState(false);
  const [lastLoginErrorMessage, setLastLoginErrorMessage] = useState('');
  // New state for cooldown: seconds remaining until resend is allowed
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  // useEffect to handle the cooldown timer
  useEffect(() => {
    let timer;
    if (cooldownSeconds > 0) {
      timer = setTimeout(() => {
        setCooldownSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }
    // Cleanup function to clear the timer if component unmounts or cooldown ends
    return () => clearTimeout(timer);
  }, [cooldownSeconds]);

  // Determines if the "Resend Verification Link" should be shown
  const shouldShowResendLink = (errorDetail) => {
    return errorDetail && (errorDetail.toLowerCase().includes('not active') || errorDetail.toLowerCase().includes('not verified'));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (lastLoginErrorMessage) {
      setLastLoginErrorMessage('');
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLastLoginErrorMessage('');

    if (validateForm()) {
      setErrors({});

      try {
        setIsLoggingIn(true);
        const response = await fetch('http://127.0.0.1:8000/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Login successful!', { position: "bottom-right" });
          console.log('Login successful! Received data:', data);

          if (data.access) {
            localStorage.setItem('authToken', data.access);
          }
          setFormData({ email: '', password: '' });
          router.push('/');

        } else {
          let errorMessage = 'Login failed. Please check your credentials.';

          if (data && data.detail) {
            errorMessage = data.detail;
          } else if (data && data.non_field_errors) {
            errorMessage = data.non_field_errors.join(', ');
          } else if (data && data.email) {
            errorMessage = `Email error: ${data.email.join(', ')}`;
          } else if (data && data.password) {
            errorMessage = `Password error: ${data.password.join(', ')}`;
          }

          if (shouldShowResendLink(errorMessage)) {
            setLastLoginErrorMessage(errorMessage);
            toast.warn(errorMessage + ' Please check your email to verify your account.', { position: "bottom-right" });
          } else {
            toast.error(errorMessage, { position: "bottom-right" });
          }
        }
      } catch (error) {
        console.error('Network error or unexpected issue during login:', error);
        toast.error('A network error occurred. Please try again later.', { position: "bottom-right" });
      } finally {
        setIsLoggingIn(false);
      }
    } else {
      toast.error('Please correct the errors in the form.', { position: "bottom-right" });
      setIsLoggingIn(false);
    }
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error('Please enter your email in the field above to resend the verification link.', { position: "bottom-right" });
      return;
    }

    if (cooldownSeconds > 0) {
      // This check is primarily for visual feedback, the button should already be disabled
      toast.info(`Please wait ${cooldownSeconds} seconds before resending again.`, { position: "bottom-right" });
      return;
    }

    setIsResending(true);
    // Start cooldown immediately after initiating resend
    setCooldownSeconds(60); // Set cooldown to 60 seconds

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/registration/resend-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(/*data.detail || */'New verification email sent! Please check your inbox.', { position: "bottom-right" });
      } else {
        let errorMessage = data.detail || 'Failed to resend verification email. Please try again.';
        if (errorMessage.toLowerCase().includes('no account found')) {
          errorMessage = 'No account found for this email. Please ensure it\'s correct or sign up.';
        }
        toast.error(errorMessage, { position: "bottom-right" });
        // Optionally, reset cooldown if the resend failed due to a server-side error
        // setCooldownSeconds(0); // Only if you want to allow immediate retry on certain failures
      }
    } catch (error) {
      console.error('Network error or unexpected issue during resend:', error);
      toast.error('A network error occurred while trying to resend the email.', { position: "bottom-right" });
      // setCooldownSeconds(0); // Only if you want to allow immediate retry on network errors
    } finally {
      setIsResending(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Continue with Google clicked for login!');
    toast.info('Google login integration coming soon!', { position: "bottom-right" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            {/* Links for Forgot Password and Resend Verification */}
            <p className={`text-right text-sm mt-2 flex items-center ${shouldShowResendLink(lastLoginErrorMessage) ? 'justify-between' : 'justify-end'}`}>
              {/* Only show resend link if the last login error indicated an unverified account */}
              {shouldShowResendLink(lastLoginErrorMessage) && (
                <a
                  href="#"
                  onClick={handleResendVerification}
                  // Disable if currently resending or if cooldown is active
                  className={`text-blue-600 hover:underline mr-4 ${isResending || cooldownSeconds > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isResending || cooldownSeconds > 0}
                >
                  {isResending ? 'Sending...' : cooldownSeconds > 0 ? `Resend in ${cooldownSeconds}s` : 'Resend Verification Link'}
                </a>
              )}
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </p>
          </div>

          {/* Login Button */}
          <button
            disabled={isLoggingIn}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            {isLoggingIn ? 'Logging In...' : 'Login'}
          </button>
        </form>

        {/* OR separator */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Continue with Google Button */}
        <a
          href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&prompt=consent&response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`}
          // onClick={handleGoogleSignup}
          className="w-full bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          {/* Ensure 'google-icon-logo.svg' is in your 'public' folder */}
          <Image src="/google.svg" alt="Google logo" width={16} height={16} className="mr-2" />
          Continue with Google
        </a>

        {/* Link to Sign Up page */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;