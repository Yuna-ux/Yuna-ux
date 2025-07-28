'use client';

export default function Home() {
  return (
    <div class="Main">
      <h1>Meu Site Simples</h1>
      <p id="ip-display">Carregando IP...</p>
      <script src="client/ip-fetch.js" />
    </div>
  );
}
