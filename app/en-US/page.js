import { NextResponse } from 'next/server'

export function Home(request) {
  const { pathname } = request.nextUrl

  if (pathname === '/en-US') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}
