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
      showNotification('Digite um código Lua válido', true);
      return;
    }

    try {
      const { data: existing } = await supabase
        .from('scripts')
        .select('id')
        .eq('lua_code', code)
        .single();

      let scriptId = existing?.id || crypto.randomUUID();

      if (!existing) {
        const { error } = await supabase
          .from('scripts')
          .insert({ id: scriptId, lua_code: code });

        if (error) throw error;
      }

      const link = `${window.location.origin}/api/scripts/${scriptId}`;
      navigator.clipboard.writeText(link);
      
      showNotification(existing ? 
        'Link copiado (código existente)' : 
        'Novo código salvo! Link copiado.');

    } catch (error) {
      showNotification(
        error.message.includes('500') 
          ? 'Limite de 500 scripts atingido!' 
          : 'Erro ao salvar código',
        true
      );
    }
  };

  return (
    <div className="container">
      {notification && (
        <div className={`notification ${notification.isError ? 'error' : ''}`}>
          {notification.message}
        </div>
      )}

      <div className="header">
        <h1 className="title">Roblox Script Storage</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="code-editor">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="-- Cole seu código Lua aqui\n\nprint('Olá Roblox!')"
            spellCheck="false"
            required
          />
        </div>
        
        <button type="submit" className="btn">
          Gerar e Copiar Link
        </button>
      </form>

      <div className="footer">
        <p>O mesmo código gera o mesmo link automaticamente</p>
      </div>
    </div>
  );
}
