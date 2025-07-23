// app/v1/route.js
import { NextResponse } from 'next/server'

export function GET(request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0].trim() || 'IP not found.'

  if (ip == 'IP not found.') {
    console.log(ip)
    return
  }
  console.log('Returning IP:', ip)

  return NextResponse.json({
    ip,
  })
}
