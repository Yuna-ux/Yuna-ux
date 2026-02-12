import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { status: 'error', message: 'userId is required' },
      { status: 400 }
    )
  }

  try {
    const robloxUrl = `https://users.roblox.com/v1/users/${userId}`
    const response = await fetch(robloxUrl)
    
    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', message: 'User not found or Roblox API error' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const joinDate = new Date(data.created);
    
    return NextResponse.json({
      status: 'success',
      data: {
        userId: data.id,
        username: data.name,
        createdRaw: data.created, 
        timestamp: Math.floor(joinDate.getTime() / 1000), 
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      }
    });

  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
