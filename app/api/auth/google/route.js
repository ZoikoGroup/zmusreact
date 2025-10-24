import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const redirect = params.get('redirect') || '/dashboard';

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT || `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`;
  const scope = encodeURIComponent('openid email profile');

  // Generate a nonce and store it server-side in a cookie, include it in state to protect against CSRF
  const nonce = crypto.randomBytes(16).toString('hex');
  const stateObj = { redirect, nonce };
  const state = encodeURIComponent(Buffer.from(JSON.stringify(stateObj)).toString('base64'));

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&access_type=offline&prompt=select_account`;

  const response = NextResponse.redirect(url);
  const secureCookie = process.env.NODE_ENV === 'production';
  // short-lived nonce cookie (5 minutes)
  // Use SameSite=None in production so the cookie is sent on the cross-site redirect from Google.
  // Browsers require Secure when SameSite=None, so only set None when secureCookie=true.
  const sameSiteVal = secureCookie ? 'none' : 'lax';
  const cookieDomain = process.env.COOKIE_DOMAIN || undefined;
  const oauthOpts = { httpOnly: true, secure: secureCookie, path: '/', maxAge: 60 * 5, sameSite: sameSiteVal };
  if (cookieDomain) oauthOpts.domain = cookieDomain;
  response.cookies.set('oauth_state', nonce, oauthOpts);
  return response;
}
