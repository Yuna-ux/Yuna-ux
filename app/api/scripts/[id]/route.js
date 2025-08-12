import supabase from '@/libs/supabase';

export async function GET(req, { params }) {
  const userAgent = req.headers.get('user-agent') || '';
  
  const errorHTML = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <!-- ... (mantenha o mesmo HTML de erro que você já tem) ... -->
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
