import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow CMS admin and API routes to pass through
  if (pathname.startsWith('/cms-admin') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Redirect old locale routes to root
  if (pathname === '/es' || pathname === '/en') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
