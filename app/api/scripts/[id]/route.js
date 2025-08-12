import supabase from '@/libs/supabase';

export async function GET(req, { params }) {
  const userAgent = req.headers.get('user-agent') || '';
  
  const errorHTML = (id) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | Script Service</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f9fafb;
      color: #111827;
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1.5;
    }
    .error-container {
      max-width: 480px;
      padding: 2rem;
      text-align: center;
    }
    .error-icon {
      font-size: 3.5rem;
      color: #ef4444;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 1.875rem;
      font-weight: 600;
      margin: 0 0 1rem;
      color: #111827;
    }
    p {
      color: #6b7280;
      margin-bottom: 2rem;
      font-size: 1.125rem;
    }
    .code {
      font-family: 'Menlo', 'Consolas', monospace;
      background: #f3f4f6;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #374151;
    }
    .action-buttons {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      margin-top: 2rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.15s ease;
    }
    .btn-primary {
      background: #2563eb;
      color: white;
    }
    .btn-primary:hover {
      background: #1d4ed8;
    }
    .btn-secondary {
      border: 1px solid #d1d5db;
      color: #374151;
    }
    .btn-secondary:hover {
      background: #f3f4f6;
    }
    .footer {
      margin-top: 3rem;
      font-size: 0.875rem;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="error-container">
    <div class="error-icon">⚠️</div>
    <h1>Page Not Found</h1>
    <p>The requested script was not found on our servers.</p>
    <p>Reference ID: <span class="code">${id}</span></p>
    
    <div class="action-buttons">
      <a href="/" class="btn btn-primary">Return Home</a>
      <a href="mailto:support@example.com" class="btn btn-secondary">Contact Support</a>
    </div>
    
    <div class="footer">
      <p>Script Service · © ${new Date().getFullYear()}</p>
    </div>
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

  try {
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

  } catch (error) {
    console.error('Erro ao buscar script:', error);
    return new Response(errorHTML, {
      status: 404,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}
