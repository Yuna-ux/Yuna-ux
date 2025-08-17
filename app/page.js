'use client'
import { useState } from 'react'

export default function ThumbnailTester() {
  const [universeId, setUniverseId] = useState('6886240833')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testEndpoint = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ universeId })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Roblox Thumbnail API Tester</h1>
      
      <div style={{ margin: '2rem 0' }}>
        <input
          type="text"
          value={universeId}
          onChange={(e) => setUniverseId(e.target.value)}
          placeholder="Enter Universe ID"
          style={{ 
            padding: '0.5rem',
            marginRight: '1rem',
            width: '200px'
          }}
        />
        <button 
          onClick={testEndpoint}
          disabled={loading}
          style={{ 
            padding: '0.5rem 1rem',
            background: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Testing...' : 'Test API'}
        </button>
      </div>

      {result && (
        <div style={{ 
          background: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '4px',
          marginTop: '1rem',
          overflowX: 'auto'
        }}>
          <h3>API Response:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          
          {result.data?.thumbnailUrl && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Thumbnail Preview:</h4>
              <img 
                src={result.data.thumbnailUrl} 
                alt="Roblox Thumbnail" 
                style={{ 
                  maxWidth: '100%',
                  border: '1px solid #ddd',
                  marginTop: '0.5rem'
                }}
              />
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f8ff' }}>
        <h3>How to use from Roblox:</h3>
        <pre>{`
local HttpService = game:GetService("HttpService")

local function getThumbnail(universeId)
    local url = "https://your-domain.com/api/v1"
    local headers = {
        ["Content-Type"] = "application/json"
    }
    local body = HttpService:JSONEncode({
        universeId = universeId
    })

    local success, response = pcall(function()
        return HttpService:PostAsync(url, body, headers)
    end)

    if success then
        return HttpService:JSONDecode(response)
    else
        warn("Error:", response)
        return nil
    end
end

-- Usage:
local thumbnailData = getThumbnail(game.GameId)
        `}</pre>
      </div>
    </div>
  )
}
