import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = Math.min(parseInt(searchParams.get('count')) || 1, 1000);
    
    const uuids = [];
    
    for (let i = 0; i < count; i++) {
      uuids.push(crypto.randomUUID());
    }
    
    return NextResponse.json({
      uuids: uuids,
      count: count,
      timestamp: new Date().toISOString(),
      version: "v4"
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      error: 'Error UUID',
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
