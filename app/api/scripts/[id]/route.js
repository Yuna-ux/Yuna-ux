import supabase from '@/libs/supabase';

const errorHTML = (id) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Script Not Found | Roblox Storage</title>
  <style>
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: #f8fafc;
      color: #1e293b;
      margin: 0;
      height: 100vh;
      display: grid;
      place-items: center;
    }
    .container {
      text-align: center;
      max-width: 480px;
      padding: 2rem;
    }
    .emoji {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #1e293b;
    }
    p {
      color: #64748b;
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }
    .code {
      font-family: 'Roboto Mono', monospace;
      background: #e2e8f0;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #3b82f6;
      color: white;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
      margin-top: 1rem;
    }
    .btn:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">🔍</div>
    <h1>Script Not Found</h1>
    <p>The requested resource doesn't exist or was deleted.</p>
    <p>Reference ID: <span class="code">${id}</span></p>
    <a href="/" class="btn">Back to Home</a>
    <p style="margin-top: 3rem; font-size: 0.875rem; color: #94a3b8;">
      Roblox Script Storage • ${new Date().getFullYear()}
    </p>
  </div>
</body>
</html>
`;

export async function GET(req, { params }) {
  const userAgent = req.headers.get('user-agent') || '';
  const scriptId = params.id;

  // Verifica se é uma requisição do Roblox
  const isRobloxRequest =
    userAgent.includes('Roblox/WinHttp') ||
    userAgent.toLowerCase().includes('roblox');
  
  try {
    // 1. Busca o script no banco de dados
    const { data: script, error } = await supabase
      .from('scripts')
      .select('lua_code, access_count')
      .eq('id', scriptId)
      .single();

    // 2. Se não encontrar ou erro, retorna página 404
    if (error || !script) {
      return new Response(errorHTML(scriptId), {
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // 3. Atualiza o contador de acessos (apenas se for do Roblox)
    if (isRobloxRequest) {
      await supabase
        .from('scripts')
        .update({ 
          access_count: (script.access_count || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', scriptId);
    }

    // 4. Retorna o conteúdo apropriado
    if (isRobloxRequest) {
      return new Response(script.lua_code, {
        headers: { 'Content-Type': 'text/plain' }
      });
    } else {
      return new Response(errorHTML(scriptId), {
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      });
    }

  } catch (error) {
    console.error('Error fetching script:', error);
    return new Response(errorHTML(scriptId), {
      status: 500,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}
