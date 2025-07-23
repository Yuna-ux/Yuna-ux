'use client';

import { useEffect, useState } from 'react';

export default function IPDisplay() {
  const [ip, setIp] = useState('Loading...');

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('/api/ip');
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        setIp('Unable to fetch IP');
      }
    };

    fetchIP();
  }, []);

  return (
    <div className="ip-display">
      <span className="ip-label">Your IP:</span>
      <span className="ip-address">{ip}</span>
    </div>
  );
}
