import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/login?error=google_auth_failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  try {
    // Exchange the code for tokens with Google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://devops-exper.vercel.app'}/api/auth/callback/google`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      console.error('Google token error:', tokens);
      return NextResponse.redirect(new URL('/login?error=token_exchange_failed', request.url));
    }

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const googleUser = await userResponse.json();

    // Send to backend to create/login user
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://devops-expers.onrender.com/api';
    const backendResponse = await fetch(`${apiUrl}/auth/oauth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'google',
        email: googleUser.email,
        name: googleUser.name,
        avatar_url: googleUser.picture,
        access_token: tokens.access_token,
      }),
    });

    const data = await backendResponse.json();

    if (!data.token) {
      return NextResponse.redirect(new URL('/login?error=backend_auth_failed', request.url));
    }

    // Redirect to frontend with token
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('token', data.token);
    redirectUrl.searchParams.set('user', JSON.stringify(data.user));
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=server_error', request.url));
  }
}
