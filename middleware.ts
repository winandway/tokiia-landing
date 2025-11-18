import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const response = NextResponse.next()

  // Allow CMS admin and API routes to pass through
  if (pathname.startsWith('/cms-admin') || pathname.startsWith('/api')) {
    return response
  }

  // Redirect old locale routes to root
  if (pathname === '/es' || pathname === '/en') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Security: Prevenir acceso a archivos sensibles
  const sensitiveFiles = [
    '.env',
    '.env.local',
    '.env.production',
    '.git',
    'package.json',
    'package-lock.json',
  ]

  if (sensitiveFiles.some(file => pathname.includes(file))) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // Agregar headers de seguridad adicionales al response
  response.headers.set('X-Robots-Tag', 'index, follow')

  // Cache control para assets estáticos
  if (pathname.startsWith('/_next/static/') || pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
