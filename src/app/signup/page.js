"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { useRouter } from 'next/navigation';


const page = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  // Removed 'message' state as toasts will handle general messages

  // Handles changes to input fields and updates form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // No need to clear messages here as toasts are transient
  };

  // Validates frontend form fields
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S/.test(formData.email)) { // Fixed regex: /\S+@\S+\.\S+/
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handles form submission, including the fetch API call to the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default browser form submission

    if (validateForm()) {
      setErrors({}); // Clear any previous field-specific errors

      try {
        setIsSigningUp(true);
        const response = await fetch('http://127.0.0.1:8000/auth/registration/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password1: formData.password, // Changed to 'password' based on common DRF simple JWT registration
            password2: formData.confirmPassword, // Often 'password2' for confirmation
          }),
        });

        const data = await response.json(); // Parse the JSON response from the backend

        if (response.ok) { // Check if the response status is 2xx (success)
          // Display a success toast
          toast.success(/*data.detail || */'Account created successfully! Please check your email for verification.', { position: "bottom-right" });

          // Redirect the user to the login page after successful registration
          setTimeout(() => {
            router.push('/login');
          }, 3000);

          // Clear the form fields after successful registration
          setFormData({
            email: '',
            password: '',
            confirmPassword: '',
          });
        } else {
          // Handle backend errors (e.g., 400 Bad Request due to validation failures)
          let errorMessage = 'Registration failed. Please try again.';

          // Attempt to parse specific error messages from the backend response
          if (data && data.email) {
            errorMessage = `${data.email.join(', ')}`;
            setErrors(prevErrors => ({ ...prevErrors, email: data.email.join(', ') }));
          } else if (data && data.password) {
            errorMessage = `${data.password.join(', ')}`;
            setErrors(prevErrors => ({ ...prevErrors, password: data.password.join(', ') }));
          } else if (data && data.non_field_errors) { // For errors not tied to a specific field
            errorMessage = data.non_field_errors.join(', ');
          } else if (data && typeof data === 'object') {
            // Catch-all for other object-based error responses
            errorMessage = Object.values(data).flat().join(', ') || errorMessage;
          }
          toast.error(errorMessage, { position: "bottom-right" }); // Display the specific error message as a toast
        }
      } catch (error) {
        console.error('Network error or unexpected issue:', error);
        // This catches errors that prevent the request from completing (e.g., CORS, server down)
        toast.error('A network error occurred. Please try again later.', { position: "bottom-right" });
      }
    } else {
      toast.error('Please correct the errors in the form.', { position: "bottom-right" }); // Message for frontend validation errors
    }

    setIsSigningUp(false);
  };

  // // Placeholder for Google signup logic
  // const handleGoogleSignup = () => {
  //   console.log('Continue with Google clicked for signup!');
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>

        {/* Removed the manual message div, toasts will handle this */}

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
          <div className="mb-5">
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
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Sign Up Button */}
          <button
            disabled={isSigningUp}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            {isSigningUp ? 'Signing Up...' : 'Sign Up'}
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

        {/* Link to Login page */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default page;