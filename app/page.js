'use client';

import './globals.css';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      bubble.style.left = Math.random() * 100 + 'vw';
      const size = Math.random() * 20 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      document.body.appendChild(bubble);
      setTimeout(() => bubble.remove(), 5000);
    };

    const interval = setInterval(createBubble, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="button-container">
        {Array.from({ length: 16 }, (_, i) => (
          <button key={i}>Botão {i + 1}</button>
        ))}
      </div>
    </div>
  );
}
