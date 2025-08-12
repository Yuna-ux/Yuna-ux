import supabase from '@/libs/supabase';

const errorHTML = (id) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Script Not Found</title>
  <style>
    /* ... (seus estilos CSS existentes) ... */
  </style>
</head>
<body>
  <div class="error-container">
    <h1>404 - Script Not Found</h1>
    <p>The requested script does not exist or was deleted.</p>
    <p>Reference ID: <code>${id}</code></p>
    <a href="/">Return to Home</a>
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
