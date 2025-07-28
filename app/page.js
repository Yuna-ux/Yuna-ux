'use client';

import { useEffect, useState } from 'react';
import './IPPage.css'; // Crie este arquivo com o CSS acima

export default function IPPage() {
  const [ip, setIp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ip')
      .then(res => res.json())
      .then(data => {
        setIp(data.ip);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="ip-container">
      <h1>Seu Endereço IP</h1>
      
      {isLoading ? (
        <div className="loading">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : (
        <div className="ip-display">
          {ip}
        </div>
      )}
      
      <p className="footer">Esta informação é usada apenas para fins de demonstração</p>
    </div>
  );
}
