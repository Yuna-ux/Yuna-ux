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
      showNotification('Please enter valid Lua code', true);
      return;
    }

    try {
      // Normaliza o código (remove espaços extras e normaliza quebras de linha)
      const normalizedCode = code.trim().replace(/\s+/g, ' ');
      
      // Verifica se o código já existe
      const { data: existing, error: queryError } = await supabase
        .from('scripts')
        .select('id')
        .eq('lua_code', normalizedCode)
        .single();

      if (queryError && queryError.code !== 'PGRST116') { // Ignora erro "No rows found"
        throw queryError;
      }

      let scriptId = existing?.id || crypto.randomUUID();

      // Se não existir, insere no banco
      if (!existing) {
        const { error: insertError } = await supabase
          .from('scripts')
          .insert({ 
            id: scriptId, 
            lua_code: normalizedCode 
          });

        if (insertError) throw insertError;
      }

      // Copia o link para a área de transferência
      const link = `${window.location.origin}/api/scripts/${scriptId}`;
      await navigator.clipboard.writeText(link);
      
      showNotification(existing ? 
        'Link copied! (existing code)' : 
        'New code saved! Link copied.');

    } catch (error) {
      console.error('Save error:', error);
      showNotification(
        error.code === '42501' || error.message.includes('500') 
          ? 'Script limit reached (500 max)' 
          : 'Error saving code. Try again.',
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
