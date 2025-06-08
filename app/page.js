export default function Home() {
  return (
    <main style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Server-side Endpoint</h1>
      <p>Endpoint require Lua:</p>
      
      <div style={{
        backgroundColor: '#1e1e1e',
        padding: '15px',
        borderRadius: '5px',
        color: '#d4d4d4',
        margin: '20px 0'
      }}>
        <code>
          {`local response = game:HttpGet("\\104\\116\\116\\112\\115\\58\\47\\47\\121\\117\\110\\97\\45\\117\\120\\46\\118\\101\\114\\99\\101\\108\\46\\97\\112\\112")`}
          <br />
          {`local data = game:GetService("HttpService"):JSONDecode(response)`}
          <br />
          {`print(data.data)`}
        </code>
      </div>

      <p style={{ color: '#666' }}>
        <small>Obs: CODE URL: "https://yuna-ux.vercel.app"</small>
      </p>
    </main>
  );
}
