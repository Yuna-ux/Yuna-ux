import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { universeId, size = '768x432', format = 'Png' } = await request.json()

    // Validação do universeId
    if (!universeId) {
      return NextResponse.json(
        {
          status: 'error',
          code: 'MISSING_PARAMETER',
          message: 'universeId is required'
        },
        { status: 400 }
      )
    }

    // Requisição para a API do Roblox
    const robloxUrl = `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=${size}&format=${format}`
    const response = await fetch(robloxUrl)
    const data = await response.json()

    // Verifica se a thumbnail existe
    if (data.data?.[0]?.thumbnails?.[0]?.imageUrl) {
      return NextResponse.json({
        status: 'success',
        data: {
          thumbnailUrl: data.data[0].thumbnails[0].imageUrl,
          universeId: parseInt(universeId),
          metadata: {
            size,
            format,
            expiresAt: new Date(Date.now() + 86400000).toISOString() // 24h
          }
        }
      })
    }

    return NextResponse.json(
      {
        status: 'error',
        code: 'THUMBNAIL_NOT_FOUND',
        message: 'No thumbnail available for this universe'
      },
      { status: 404 }
    )

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: 'Failed to process request'
      },
      { status: 500 }
    )
  }
}

// Configuração CORS para métodos OPTIONS
export async function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
