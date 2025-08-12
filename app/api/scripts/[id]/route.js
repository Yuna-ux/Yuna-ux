import supabase from '@/libs/supabase';

// HTML de erro em inglês (para usuários)
const errorHTML = (id) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Script Not Found</title>
  <style>
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: #f8fafc;
      color: #1e293b;
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .error-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    h1 {
      color: #dc2626;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .code {
      font-family: monospace;
      background: #f1f5f9;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.9rem;
    }
    .btn {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.75rem 1.5rem;
      background: #3b82f6;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      transition: all 0.2s;
    }
    .btn:hover {
      background: #2563eb;
    }
  </style>
</head>
<body>
  <div class="error-card">
    <h1>404 - Script Not Found</h1>
    <p>The requested script was not found in our database.</p>
    <p>Reference ID: <span class="code">${id}</span></p>
    <a href="/" class="btn">Return to Homepage</a>
  </div>
</body>
</html>
`;

export async function GET(req, { params }) {
  const userAgent = req.headers.get('user-agent') || '';
  
  // Para qualquer acesso que não seja do Roblox
  if (!userAgent.includes('Roblox')) {
    return new Response(errorHTML(params.id), {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  try {
    // Busca o script no banco de dados
    const { data } = await supabase
      .from('scripts')
      .select('lua_code')
      .eq('id', params.id)
      .single();

    // Se não encontrar, retorna erro 404
    if (!data) {
      return new Response(errorHTML(params.id), {
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // Retorna o código Lua para o Roblox
    return new Response(data.lua_code, {
      headers: { 'Content-Type': 'text/plain' }
    });

  } catch (error) {
    console.error('Database error:', error);
    return new Response(errorHTML(params.id), {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}
