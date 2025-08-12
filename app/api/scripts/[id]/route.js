import supabase from '@/libs/supabase';

export async function GET(req, { params }) {
  const userAgent = req.headers.get('user-agent') || '';
  
  if (!userAgent.includes('Roblox')) {
    return new Response('Acesso negado', { status: 403 });
  }

  const { data } = await supabase
    .from('scripts')
    .select('lua_code')
    .eq('id', params.id)
    .single();

  if (!data) return new Response('Script não encontrado', { status: 404 });

  return new Response(data.lua_code, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
