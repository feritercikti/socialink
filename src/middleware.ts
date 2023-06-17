import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware(request) {
  if (request.nextUrl.pathname === '/login' && request.nextauth.token) {
    // User is signed in and trying to access the login page, redirect to the user page
    const userPageUrl = new URL(
      `/user/${request.nextauth.token.id}`,
      request.url
    );
    return NextResponse.rewrite(userPageUrl);
  }

  if (request.nextUrl.pathname.startsWith('/user/') && request.nextauth.token) {
    const userId = request.nextUrl.pathname.split('/')[2]; // Extract the user ID from the URL
    if (userId !== request.nextauth.token.id) {
      const ownPageUrl = new URL(
        `/user/${request.nextauth.token.id}`,
        request.url
      );

      return NextResponse.rewrite(ownPageUrl.href);
    }
  }

  // Continue with the regular flow if not accessing the login page or a user page
  return NextResponse.next();
});

export const config = { matcher: ['/user/:path*'] };

// import { NextResponse } from 'next/server';
// import { withAuth } from 'next-auth/middleware';

// export default withAuth(function middleware(request) {
//   if (request.nextUrl.pathname.startsWith('/user/') && request.nextauth.token) {
//     const userId = request.nextUrl.pathname.split('/')[2]; // Extract the user ID from the URL
//     if (userId !== request.nextauth.token.id) {
//       const { protocol, host, port } = request.nextUrl;
//       // User ID does not match token ID, redirect to a different page or return an error
//       const errorPageUrl = new URL('/error-page', request.url);
//       return NextResponse.rewrite(errorPageUrl.href);
//     }
//   }

//   // Continue with the regular flow if user ID and token ID match or if not accessing a user page
//   return NextResponse.next();
// });

// export const config = { matcher: ['/user/:path*'] };
