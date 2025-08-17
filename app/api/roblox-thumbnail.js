import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    if (data.data?.[0]?.thumbnails?.[0]?.imageUrl) {
      return res.json({ 
        thumbnailUrl: data.data[0].thumbnails[0].imageUrl 
      });
    }
    
    return res.status(404).json({ error: 'Thumbnail not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
