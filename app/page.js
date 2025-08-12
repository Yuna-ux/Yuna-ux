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

  const normalizeCode = (code) => {
    return code
      .trim()
      .replace(/\s+/g, ' ') // Remove espaços extras
      .replace(/\r\n/g, '\n'); // Normaliza quebras de linha
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const normalizedCode = normalizeCode(code);
    
    if (!normalizedCode) {
      showNotification('Digite um código Lua válido', true);
      return;
    }

    try {
      // Verifica se o código já existe (com comparação normalizada)
      const { data: existing } = await supabase
        .from('scripts')
        .select('id')
        .eq('lua_code', normalizedCode)
        .single();

      let scriptId = existing?.id || crypto.randomUUID();

      if (!existing) {
        const { error } = await supabase
          .from('scripts')
          .insert({ 
            id: scriptId, 
            lua_code: normalizedCode // Salva a versão normalizada
          });

        if (error) throw error;
      }

      const link = `${window.location.origin}/api/scripts/${scriptId}`;
      navigator.clipboard.writeText(link);
      
      showNotification(existing ? 
        'Link copiado (código existente)' : 
        'Novo código salvo! Link copiado.');

    } catch (error) {
      console.error('Erro ao salvar:', error);
      showNotification(
        error.message.includes('500') 
          ? 'Limite de 500 scripts atingido!' 
          : 'Erro ao salvar código. Tente novamente.',
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
