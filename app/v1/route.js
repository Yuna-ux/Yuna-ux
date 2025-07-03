// app/v1/route.js
import { NextResponse } from 'next/server'

export function GET(request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0].trim() || 'IP não encontrado'

  console.log('Returning IP:', ip)

  return NextResponse.json({ ip })
}
