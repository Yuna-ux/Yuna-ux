// app/en-US/route.js
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en-US', request.url))
  }

  return NextResponse.next()
}
