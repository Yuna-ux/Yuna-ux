import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const universeId = searchParams.get('universeId')
  const size = searchParams.get('size') || '768x432'
  const format = searchParams.get('format') || 'Png'

  // Redireciona para a API do Roblox diretamente
  if (universeId) {
    const robloxUrl = `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=${size}&format=${format}`
    return NextResponse.redirect(robloxUrl)
  }

  // Página de ajuda se acessado sem parâmetros
  return NextResponse.json({
    usage: {
      method: 'POST',
      endpoint: '/api/thumbnail-roblox',
      body: { universeId: 'number', size: 'string (optional)', format: 'Png|Jpeg (optional)' },
      example: '/api/thumbnail-roblox?universeId=12345'
    }
  })
}
