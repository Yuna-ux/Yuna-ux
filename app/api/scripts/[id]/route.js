import supabase from '@/libs/supabase';

const errorPage = (title, message, details = '') => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(135deg, #1e1b4b, #7e22ce);
      color: white;
      height: 100vh;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .container {
      max-width: 600px;
      padding: 2rem;
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    h1 {
      font-size: 3rem;
      margin: 0 0 1rem;
      color: #f87171;
    }
    p {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 1rem;
    }
    .code {
      font-family: 'Courier New', monospace;
      background: rgba(0, 0, 0, 0.5);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
    }
    .home-link {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.75rem 1.5rem;
      background: #8b5cf6;
      color: white;
      text-decoration: none;
      border-radius: 0.5rem;
      transition: all 0.2s;
    }
    .home-link:hover {
      background: #7c3aed;
      transform: translateY(-2px);
    }
    .warning {
      margin-top: 1.5rem;
      padding: 1rem;
      background: rgba(248, 113, 113, 0.2);
      border-left: 4px solid #f87171;
      text-align: left;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>${message}</p>
    ${details}
    <div class="warning">
      <small>Erro: <span class="code">ScriptNotFound</span></small>
    </div>
    <a href="/" class="home-link">Voltar à página inicial</a>
  </div>
</body>
</html>
`;

export async function GET(req, { params }) {
  const userAgent = req.headers.get('user-agent') || '';
  const isRobloxAgent =
    userAgent.includes('Roblox/WinHttp') ||
    userAgent.toLowerCase().includes('roblox');
  
  if (isRobloxAgent) {
    const html = errorPage(
      'Acesso Restrito',
      'O recurso solicitado não foi encontrado.',
      `<p>Tente verificar o ID <span class="code">${params.id}</span> novamente.</p>`
    );
    
    return new Response(html, {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  const { data } = await supabase
    .from('scripts')
    .select('lua_code')
    .eq('id', params.id)
    .single();
  
  if (!data) {
    const html = errorPage(
      'Script Não Encontrado',
      'O script solicitado não existe ou foi removido.',
      `<p>ID pesquisado: <span class="code">${params.id}</span></p>`
    );
    
    return new Response(html, {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  return new Response(data.lua_code, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
