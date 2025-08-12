export function middleware(request) {
  const path = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  
  const isRoblox = 
    userAgent.includes('Roblox/WinHttp') || 
    userAgent.toLowerCase().includes('roblox');

  if (path.startsWith('/api/scripts') && !isRoblox) {
    return new Response('Acesso negado: Só Roblox pode acessar!', { 
      status: 403 
    });
  }
}
