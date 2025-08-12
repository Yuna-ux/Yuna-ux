import supabase from '@/libs/supabase';

export async function GET(req, { params }) {
  const userAgent = req.headers.get('user-agent') || '';
  
  const errorHTML = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Não Encontrada</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background: #f8f9fa;
        color: #343a40;
        height: 100vh;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      .error-container {
        max-width: 500px;
        padding: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
      }
      h1 {
        color: #dc3545;
        font-size: 3rem;
        margin: 0 0 1rem;
      }
      p {
        font-size: 1.1rem;
        margin-bottom: 2rem;
      }
      .code {
        font-family: monospace;
        background: #f1f1f1;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
      }
      .home-link {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: all 0.2s;
      }
      .home-link:hover {
        background: #0069d9;
      }
    </style>
  </head>
  <body>
    <div class="error-container">
      <h1>404</h1>
      <p>O recurso solicitado não foi encontrado.</p>
      <p><small>ID: <span class="code">${params.id}</span></small></p>
      <a href="/" class="home-link">Voltar à página inicial</a>
    </div>
  </body>
  </html>
  `;

  if (!userAgent.includes('Roblox')) {
    return new Response(errorHTML, {
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
    return new Response(errorHTML, {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  return new Response(data.lua_code, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
