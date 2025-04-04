'use client';

import { useState } from 'react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const pacUrl = 'https://yuna-ux.vercel.app/proxy.pac';

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(pacUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Proxy PAC Configuration</h1>
      <p>To use our proxy, please copy the PAC URL below and paste it into your system proxy settings.</p>
      <input type="text" value={pacUrl} readOnly style={{ padding: '10px', width: '80%', marginBottom: '10px' }} />
      <button onClick={copyToClipboard} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        {copied ? 'Copied!' : 'Copy PAC URL'}
      </button>
    </main>
  );
}
