import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    
    console.log("ip: ", ip);
    
    return NextResponse.json({
      ip: ip,
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      ip: '127.0.0.1',
      error: 'Error ip',
      timestamp: new Date().toISOString()
    }, {
      status: 500
    });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    }
  });
}
