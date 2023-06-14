import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/login') && request.nextauth.token) {
    return NextResponse.rewrite(
      new URL(`/user/${request.nextauth.token.id}`, request.url)
    );
  }
});

export const config = { matcher: ['/user/:path*'] };
