// app/api/auth/google/callback/route.js (for App Router)
// or pages/api/auth/google/callback.js (for Pages Router - then access req.query directly)

import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    console.error('Google OAuth Error:', error);
    return NextResponse.redirect(new URL(`/signup?error=${encodeURIComponent(error)}`, request.url));
  }

  if (code) {
    try {
      // Send the code to your backend's dedicated exchange endpoint
      const backendResponse = await fetch('http://127.0.0.1:8000/auth/google-code-exchange/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          // IMPORTANT: Send the same redirect_uri that was used to get the code
          redirect_uri: process.env.GOOGLE_REDIRECT_URI, // This should be http://localhost:3000/api/auth/google/callback/
        }),
      });

      const data = await backendResponse.json();

      if (backendResponse.ok) {
        // Backend should return tokens (access, refresh) and user info
        console.log('Backend login success:', data);
        // Example: Store tokens in cookies or local storage
        // If using cookies, you might want to set them from the backend
        // Or if you want to set them on the client, parse them from 'data'
        // For simplicity, let's redirect to a dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } else {
        console.error('Backend exchange failed:', data);
        let errorMessage = 'Failed to log in with Google.';
        if (data && data.detail) {
          errorMessage = data.detail;
        } else if (data && data.non_field_errors) {
          errorMessage = data.non_field_errors.join(', ');
        }
        return NextResponse.redirect(new URL(`/signup?error=${encodeURIComponent(errorMessage)}`, request.url));
      }
    } catch (err) {
      console.error('Error exchanging code with backend:', err);
      return NextResponse.redirect(new URL(`/signup?error=${encodeURIComponent('Network error during Google login.')}`, request.url));
    }
  } else {
    return NextResponse.redirect(new URL(`/signup?error=${encodeURIComponent('Invalid Google callback.')}`, request.url));
  }
}