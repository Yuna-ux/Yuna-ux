// middleware.js
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  
  const isRobloxAgent = 
    userAgent.includes('Roblox/WinHttp') || 
    userAgent.toLowerCase().includes('roblox');

  if (path.startsWith('/api/scripts') && !isRobloxAgent) {
    return new Response('Acesso permitido apenas para Roblox', { 
      status: 403,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
