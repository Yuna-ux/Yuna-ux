import supabase from '@/libs/supabase';

export async function GET(req, { params }) {
  const { data, error } = await supabase
    .from('scripts')
    .select('lua_code')
    .eq('id', params.id)
    .single();

  if (error) return new Response('Script não existe!', { status: 404 });

  return new Response(data.lua_code, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
