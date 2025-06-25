import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'accessToken';
const ADMIN_COOKIE = 'adminAccessToken';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get(ADMIN_COOKIE);
    const isAdminSignIn = pathname === '/admin/sign-in';

    if (!adminToken && !isAdminSignIn) {
      const signInUrl = new URL('/admin/sign-in', request.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME);

  const publicPaths = new Set(['/', '/sign-in', '/sign-up']);
  const isPublicPath = publicPaths.has(request.nextUrl.pathname);
  if (isPublicPath) return NextResponse.next();

  if (!token) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/email-verification/:path*',
    '/dashboard/:path*',
    '/adopter-profile/:path*',
    '/favorites/:path*',
    '/settings/:path*',
    '/care-bookings/:path*',
    '/admin/:path*',
  ],
};
