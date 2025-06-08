export default function Home() {
  return (
    <main style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Server-side Endpoint</h1>
      
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <h3>Working Lua Example:</h3>
        <pre>
          {`local url = "https://yuna-ux.vercel.com"
local response = game:HttpGet(url, true)
          
local success, result = pcall(function()
  return game:GetService("HttpService"):JSONDecode(response)
end)
          
if success then
  print("Data received:", result.data)
else
  warn("JSON decode failed:", result)
  print("Raw response:", response)
end`}
        </pre>
      </div>

      <h3>ASCII-Encoded Version:</h3>
      <pre>
        {`local response = game:HttpGet("\\104\\116\\116\\112\\115\\58\\47\\47\\121\\111\\117\\114\\100\\111\\109\\97\\105\\110\\46\\99\\111\\109\\47\\97\\112\\105\\47\\100\\97\\116\\97")`}
      </pre>
    </main>
  );
}
