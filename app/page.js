"use client";
import { useState } from 'react';
import supabase from '@/libs/supabase';

export default function Home() {
  const [code, setCode] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      showNotification('Por favor, insira um código Lua válido', true);
      return;
    }

    try {
      const normalizedCode = code.trim().replace(/\s+/g, ' ');

      // Verificação explícita do limite antes de tentar inserir
      const { count } = await supabase
        .from('scripts')
        .select('*', { count: 'exact', head: true });

      if (count >= 500) {
        throw new Error('LIMITE_ATINGIDO');
      }

      // Verifica se o código já existe
      const { data: existing } = await supabase
        .from('scripts')
        .select('id')
        .textSearch('lua_code', normalizedCode, {
          type: 'phrase',
          config: 'portuguese'
        })
        .single();

      const scriptId = existing?.id || crypto.randomUUID();

      if (!existing) {
        const { error } = await supabase
          .from('scripts')
          .insert({ 
            id: scriptId, 
            lua_code: normalizedCode 
          });

        if (error) throw error;
      }

      const link = `${window.location.origin}/api/scripts/${scriptId}`;
      await navigator.clipboard.writeText(link);
      
      showNotification(existing ? 
        'Link copiado (código existente)' : 
        'Novo código salvo! Link copiado.');

    } catch (error) {
      console.error('Erro detalhado:', error);
      showNotification(
        error.message === 'LIMITE_ATINGIDO' || error.code === '42501'
          ? 'Limite de 500 scripts atingido! Delete alguns para continuar.'
          : 'Erro ao processar seu código. Tente novamente.',
        true
      );
    }
  };

  // ... (seu JSX existente)
}
