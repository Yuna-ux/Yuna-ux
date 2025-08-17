export default async function handler(req, res) {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { universeId } = req.body;

  if (!universeId) {
    return res.status(400).json({ error: 'universeId is required' });
  }

  try {
    const robloxUrl = `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeId}&size=768x432&format=Png`;
    const response = await fetch(robloxUrl);
    const data = await response.json();

    if (data.data && data.data[0] && data.data[0].thumbnails && data.data[0].thumbnails[0] && data.data[0].thumbnails[0].imageUrl) {
      return res.json({ 
        thumbnailUrl: data.data[0].thumbnails[0].imageUrl 
      });
    }
    
    return res.status(404).json({ error: 'Thumbnail not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
