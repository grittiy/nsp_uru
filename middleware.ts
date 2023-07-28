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
export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/((?!register|forget-password|api|login).*)']
}