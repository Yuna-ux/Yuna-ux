'use client';

import { useEffect, useState } from 'react';

export default function IPPage() {
  const [ip, setIp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('/api/ip');
        if (!response.ok) throw new Error('Erro ao buscar IP');
        const data = await response.json();
        setIp(data.ip);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIP();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Seu IP</h1>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse"></div>
              <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse delay-100"></div>
              <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse delay-200"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Seu endereço IP é:</p>
              <p className="text-2xl font-mono font-bold text-indigo-600 break-all">{ip}</p>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Esta informação é usada apenas para você saber o seu ip</p>
          <p className="mt-1">Atualize a página para ver novamente</p>
        </div>
      </div>
    </div>
  );
}
