import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/signin', '/signup', '/menu']

function hasUsableToken(rawToken?: string) {
  if (!rawToken) return false
  const normalized = rawToken.trim().toLowerCase()
  return normalized !== 'null' && normalized !== 'undefined' && normalized.length > 0
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // allow all public menu routes
  if (pathname.startsWith('/menu/')) return NextResponse.next()

  const token = request.cookies.get('access_token')?.value
  const isPublic = PUBLIC_ROUTES.some(r => pathname === r || pathname.startsWith(`${r}/`))

  // redirect unauthenticated users to signin for protected pages
  if (!hasUsableToken(token) && !isPublic) {
    const url = new URL('/signin', request.url)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}

 
