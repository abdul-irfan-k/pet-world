import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// const AUTH_COOKIE_NAME = 'accessToken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');

  console.log('Middleware accessToken:', token?.value);

  const publicPaths = new Set(['/', '/sign-in', '/sign-up']);
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
    '/sign-in',
    '/sign-up',
    '/my-pets',
    '/email-verification/:path*',
    '/settings/:path*',
    '/pets/add',
    '/pets/:petId/edit',
  ],
};
