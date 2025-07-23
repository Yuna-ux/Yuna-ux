import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure this route is dynamic

export function GET(request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0].trim() || request.ip || 'IP not found';
    
    console.log('IP detected:', ip);
    
    return NextResponse.json({
      ip,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting IP:', error);
    return NextResponse.json(
      { error: 'Failed to get IP' },
      { status: 500 }
    );
  }
}
