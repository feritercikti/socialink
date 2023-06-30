import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

export default withAuth(async function middleware(request) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  if (request.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/user/${request.nextauth.token?.id}`, request.url)
    );
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
