"use client";
import supabase from '@/libs/supabase';
import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptId = crypto.randomUUID(); // Gera ID aleatório

    const { error } = await supabase
      .from('scripts')
      .insert({ id: scriptId, lua_code: code });

    if (error) {
      alert(error.message.includes('500') 
        ? 'Limite de 500 scripts atingido!' 
        : 'Erro ao salvar!');
    } else {
      alert(`Script criado! Link: /api/scripts/${scriptId}`);
      setCode('');
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Cole seu código Lua aqui..."
          rows={15}
          required
        />
        <button type="submit">Gerar Link</button>
      </form>
    </main>
  );
} // ← Apenas UMA chave de fechamento aqui      </form>
    </main>
  );
}}
