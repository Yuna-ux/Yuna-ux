// app/actions.js
'use server';
import supabase from '@/libs/supabase';
import { redirect } from 'next/navigation';

export async function submitScript(prevState, formData) {
  try {
    const scriptContent = formData.get('luaScript');
    const userId = 'user-id-placeholder'; // Implemente autenticação aqui

    // Verificação de limite
    const { count, error: countError } = await supabase
      .from('scripts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', new Date(Date.now() - 86400000).toISOString());

    if (countError) throw countError;
    if (count >= 700) {
      return { error: 'Limite diário excedido. Tente novamente amanhã.' };
    }

    // Inserção no banco de dados
    const { data, error } = await supabase
      .from('scripts')
      .insert([{ user_id: userId, content: scriptContent }])
      .select()
      .single();

    if (error) throw error;

    redirect(`/api/scripts/${data.id}`);
  } catch (error) {
    console.error('Error in submitScript:', error);
    return { error: error.message || 'Falha ao processar o script' };
  }
}
