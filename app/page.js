'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function IPPage() {
  useEffect(() => {
    window.handleIPResponse = (data) => {
      const display = document.getElementById('ip-display');
      if (display) display.textContent = `Seu IP: ${data.ip}`;
    };
  }, []);

  return (
    <div>
      <h1>IP</h1>
      <p id="ip-display">Carregando IP...</p>
      <Script src="/client/ip-fetch/script.js" strategy="afterInteractive" />
    </div>
  );
}
