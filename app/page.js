'use client';

function copyText(text) {
  navigator.clipboard.writeText(text);
}

export default function Home() {
  const buttons = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    label: `Proxy ${i + 1}`,
    value: `http://proxy${i + 1}.com`
  }));

  return (
    <main>
      <h1>Welcome to Proxy Access</h1>
      <div className="buttons">
        {buttons.map(btn => (
          <button key={btn.id} onClick={() => copyText(btn.value)}>{btn.label}</button>
        ))}
      </div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div className="bubble" key={i} style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          width: `${10 + Math.random() * 20}px`,
          height: `${10 + Math.random() * 20}px`
        }} />
      ))}
    </main>
  )
}
