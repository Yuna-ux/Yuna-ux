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
    <h1>Script Not Found</h1> <!-- Título em inglês -->
    <p>The requested resource doesn't exist or was deleted.</p> <!-- Mensagem em inglês -->
    <p>Reference ID: <span class="code">${id}</span></p> <!-- ID visível -->
    
    <a href="/" class="btn">Back to Home</a> <!-- Botão em inglês -->
    
    <p style="margin-top: 3rem; font-size: 0.875rem; color: #94a3b8;">
      Roblox Script Storage • ${new Date().getFullYear()}
    </p>
  </div>
</body>
</html>
`;

export async function GET(req, { params }) {
  const userAgent = req.headers.get('user-agent') || '';
  
  // Retorna erro 404 para qualquer acesso não-Roblox
  if (!userAgent.includes('Roblox')) {
    return new Response(errorHTML(params.id), {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  try {
    const { data, error } = await supabase
      .from('scripts')
      .select('lua_code')
      .eq('id', params.id)
      .single();

    if (error || !data) {
      return new Response(errorHTML(params.id), {
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      });
    }

    return new Response(data.lua_code, {
      headers: { 'Content-Type': 'text/plain' }
    });

  } catch (error) {
    return new Response(errorHTML(params.id), {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}
