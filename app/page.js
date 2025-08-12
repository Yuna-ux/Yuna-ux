"use client";
import { useState } from 'react';
import supabase from '@/libs/supabase';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast.error('Digite um código Lua válido');
      return;
    }

    // Verifica se o código já existe
    const { data: existing } = await supabase
      .from('scripts')
      .select('id')
      .eq('lua_code', code)
      .single();

    let scriptId;
    
    if (existing) {
      scriptId = existing.id;
      toast.success('Código já existente! Link copiado.');
    } else {
      scriptId = crypto.randomUUID();
      const { error } = await supabase
        .from('scripts')
        .insert({ id: scriptId, lua_code: code });

      if (error) {
        toast.error(error.message.includes('500') 
          ? 'Limite de 500 scripts atingido!' 
          : 'Erro ao salvar código');
        return;
      }
      toast.success('Novo código salvo! Link copiado.');
    }

    // Copia o link automaticamente
    const link = `${window.location.origin}/api/scripts/${scriptId}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 p-6">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e1b4b',
            color: '#fff',
            border: '1px solid #7e22ce'
          },
        }}
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Roblox Script Storage
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-1">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="-- Cole seu código Lua aqui\n\nprint('Olá Roblox!')"
              className="w-full h-96 bg-white/5 text-white placeholder-white/50 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              spellCheck="false"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
          >
            Gerar e Copiar Link
          </button>
        </form>

        <div className="mt-8 text-center text-white/80 text-sm">
          <p>O mesmo código gera o mesmo link automaticamente</p>
          <p className="mt-2">Links são copiados para sua área de transferência</p>
        </div>
      </div>
    </main>
  );
}
