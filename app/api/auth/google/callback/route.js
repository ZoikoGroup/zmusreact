import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  // const state = url.searchParams.get("state");

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_OAUTH_REDIRECT ||
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`;

  const origin = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) return NextResponse.redirect(`${origin}/login`);

    // Get user profile
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await profileRes.json();

    // Prepare user info & token to store in localStorage
    const userData = {
      token: tokenData.id_token || tokenData.access_token,
      user: { email: profile.email, name: profile.name },
    };

    // Return HTML that stores data in localStorage and redirects
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Logging in...</title>
          <script>
            const data = ${JSON.stringify(userData)};
            localStorage.setItem('zoiko_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/dashboard';
          </script>
        </head>
        <body>
          <p>Logging you in...</p>
        </body>
      </html>
    `;

    return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
  } catch (err) {
    console.error("OAuth error:", err);
    return NextResponse.redirect(`${origin}/login`);
  }
}
