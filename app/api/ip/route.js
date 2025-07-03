// app/api/ip/route.js
import { NextResponse } from 'next/server'

export function GET(request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0].trim() || 'IP not found.'
  console.log("Returning IP...")
  return NextResponse.json({ ip })
}
