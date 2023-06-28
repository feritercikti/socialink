import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware(request) {
  if (request.nextUrl.pathname === '/login' && request.nextauth.token) {
    const userPageUrl = new URL(
      `/user/${request.nextauth.token.id}`,
      request.url
    );
    return NextResponse.rewrite(userPageUrl);
  }

  if (request.nextUrl.pathname.startsWith('/user/') && request.nextauth.token) {
    const userId = request.nextUrl.pathname.split('/')[2];
    if (userId !== request.nextauth.token.id) {
      const ownPageUrl = new URL(
        `/user/${request.nextauth.token.id}`,
        request.url
      );

      return NextResponse.rewrite(ownPageUrl.href);
    }
  }

  return NextResponse.next();
});

export const config = { matcher: ['/user/:path*'] };
