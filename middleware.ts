import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/signin', '/signup', '/menu']
const AUTH_ROUTES = ['/signin', '/signup']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // allow all public menu routes
  if (pathname.startsWith('/menu/')) return NextResponse.next()

  // check for token in cookies (set by the app after sign in)
  const token = request.cookies.get('access_token')?.value

  const isPublic = PUBLIC_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'))
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r))

  // redirect logged-in users away from auth pages
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // redirect unauthenticated users to signin
  if (!token && !isPublic) {
    const url = new URL('/signin', request.url)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
