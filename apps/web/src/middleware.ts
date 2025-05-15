import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'accessToken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME);
  const publicPaths = new Set([
    '/',
    '/home',
    '/sign-in',
    '/sign-up',
    '/explore',
    '/stories',
    '/about-us',
    '/help',
  ]);
  const isPublicPath = publicPaths.has(request.nextUrl.pathname);

  if (isPublicPath) return NextResponse.next();

  if (!token) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set(
      'callbackUrl',
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/home',
    '/sign-in',
    '/sign-up',
    '/explore',
    '/stories',
    '/add-pet',
    '/my-pets',
    '/about-us',
    '/help',
    '/email-verification/:path*',
    '/settings/:path*',
  ],
};
