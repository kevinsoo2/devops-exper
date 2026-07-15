import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/login?error=github_auth_failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  try {
    // Exchange the code for access token with GitHub
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      console.error('GitHub token error:', tokens);
      return NextResponse.redirect(new URL('/login?error=token_exchange_failed', request.url));
    }

    // Get user info from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { 
        Authorization: `Bearer ${tokens.access_token}`,
        'Accept': 'application/json',
      },
    });

    const githubUser = await userResponse.json();

    // Get user email (might be private)
    let email = githubUser.email;
    if (!email) {
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: { 
          Authorization: `Bearer ${tokens.access_token}`,
          'Accept': 'application/json',
        },
      });
      const emails = await emailResponse.json();
      const primary = emails.find((e: any) => e.primary) || emails[0];
      email = primary?.email;
    }

    if (!email) {
      return NextResponse.redirect(new URL('/login?error=no_email', request.url));
    }

    // Send to backend to create/login user
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://devops-expers.onrender.com/api';
    const backendResponse = await fetch(`${apiUrl}/auth/oauth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'github',
        email,
        name: githubUser.name || githubUser.login,
        avatar_url: githubUser.avatar_url,
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
    console.error('GitHub OAuth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=server_error', request.url));
  }
}
