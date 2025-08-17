export default async function handler(req, res) {
  // Configuração CORS para permitir requisições do Roblox
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Restringe para POST apenas
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      docs: 'https://seusite.com/docs/v1'
    });
  }

  try {
    const { universeId, size = '768x432', format = 'Png' } = req.body;

    if (!universeId) {
      return res.status(400).json({
        error: 'Missing universeId',
        required: { universeId: 'number' },
        optional: { size: 'string', format: 'Png|Jpeg' }
      });
    }

    const robloxUrl = `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=${size}&format=${format}`;
    const response = await fetch(robloxUrl);
    const data = await response.json();

    if (data.data?.[0]?.thumbnails?.[0]?.imageUrl) {
      return res.json({
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
      });
    }

    return res.status(404).json({
      status: 'error',
      code: 'THUMBNAIL_NOT_FOUND',
      message: 'No thumbnail available for this universe'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      status: 'error',
      code: 'INTERNAL_ERROR',
      message: 'Failed to process request'
    });
  }
}
