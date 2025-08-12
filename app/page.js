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

    const normalizedCode = code.trim().replace(/\s+/g, ' ');
    
    // Verifica o limite de scripts
    const { count, error: countError } = await supabase
      .from('scripts')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      showNotification('Error checking script limit', true);
      return;
    }

    if (count >= 500) {
      showNotification('Script limit reached (500 max)', true);
      return;
    }

    // Verifica se o código já existe
    const { data: existing, error: queryError } = await supabase
      .from('scripts')
      .select('id')
      .ilike('lua_code', normalizedCode)
      .single();

    if (queryError && queryError.code !== 'PGRST116') {
      showNotification('Error checking existing code', true);
      return;
    }

    const scriptId = existing?.id || crypto.randomUUID();

    if (!existing) {
      const { error: insertError } = await supabase
        .from('scripts')
        .insert({ id: scriptId, lua_code: normalizedCode });

      if (insertError) {
        showNotification('Error saving new script', true);
        return;
      }
    }

    // Copia o link
    const link = `${window.location.origin}/api/scripts/${scriptId}`;
    await navigator.clipboard.writeText(link);
    
    showNotification(
      existing 
        ? 'Link copied! (existing code)' 
        : 'New code saved! Link copied.'
    );
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
            placeholder="-- Paste your Lua code here\n\nprint('Hello Roblox!')"
            spellCheck="false"
            required
          />
        </div>
        
        <button type="submit" className="btn">
          Generate & Copy Link
        </button>
      </form>

      <div className="footer">
        <p>Same code generates same link automatically</p>
      </div>
    </div>
  );
}
