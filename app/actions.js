'use server';
import supabase from '@/libs/supabase';
import { redirect } from 'next/navigation';

export async function submitScript(formData) {
  const scriptContent = formData.get('luaScript');
  const userId = 'user-id-placeholder'; // Você deve implementar autenticação

  const { count } = await supabase
    .from('scripts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  if (count >= 700) {
    throw new Error('Limite diário excedido. Tente novamente amanhã.');
  }

  const { data, error } = await supabase
    .from('scripts')
    .insert([{ 
      user_id: userId, 
      content: scriptContent 
    }])
    .select()
    .single();

  if (error) {
    throw new Error('Falha ao enviar script.');
  }

  redirect(`/api/scripts/${data.id}`);
}
