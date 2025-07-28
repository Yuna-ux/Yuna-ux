'use client';

export default function Home() {
  return (
    <div>
      <h1>IP</h1>
      <p id="ip-display">Carregando IP...</p>
      <script src="client/ip-fetch.js" async />
    </div>
  );
}
