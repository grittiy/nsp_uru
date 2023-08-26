// import { getToken } from 'next-auth/jwt';
// import { NextRequest, NextResponse } from 'next/server';

// export default async function middleware(req: NextRequest) {
//   // Get the pathname of the request (e.g. /, /protected)
//   const path = req.nextUrl.pathname;

//   // If it's the root path, just render it
//   if (path === '/') {
//     return NextResponse.next();
//   }

//   const session = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   const isProtected = path.includes('/dashboard');

//   if (!session && isProtected) {
//     return NextResponse.redirect(new URL('/api/auth/signin', req.url));
//   } else if (session && (path === '/api/auth/signin' || path === '/api/auth/signin')) {
//     return NextResponse.redirect(new URL('/dashboard', req.url));
//   }
//   return NextResponse.next();
//   }

// export { default } from 'next-auth/middleware'

// export const config = {
//   matcher: ['/((?!register|forget-password|api|login).*)']
// }

import { JWT } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
      return NextResponse.rewrite(
        new URL("/login", req.url)
      );
    }
    if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "USER") {
      return NextResponse.rewrite(
        new URL("/login", req.url)
      );
    }
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "ADMIN" ||token?.role === "USER",
    }
  },

)

export const config = { matcher: ["/user/:path*", "/admin/:path*"] };