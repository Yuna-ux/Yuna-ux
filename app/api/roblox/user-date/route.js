import { NextResponse } from 'next/server'

export async function GET(request) {
  // (?userId=12345)
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
    
    return NextResponse.json({
    status: 'success',
    data: {
      userId: data.id,
      username: data.name,
      createdRaw: data.created, // ISO 8601 (Ex: 2015-06-12T10:22:30Z)
      timestamp: Math.floor(joinDate.getTime() / 1000), // Unix Timestamp (Universal)
    }
  });

  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
