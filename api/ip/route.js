// api/ip/route.js
import { NextResponse } from 'next/server'

function debugmsg() {
  console.log("Returning IP...")
}

export function GET(request) {
  debugmsg()
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0].trim() || 'IP not found.'

  return NextResponse.json({ ip })
}
