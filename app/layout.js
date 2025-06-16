import './globals.css'

export const metadata = {
  title: 'Lua Remote Executor',
  description: 'Execute Lua code in Roblox clients via WebSocket',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-900 text-gray-100 font-sans">
        <main className="min-h-screen p-4 max-w-7xl mx-auto">
          <header className="mb-8 border-b border-gray-700 pb-4">
            <h1 className="text-3xl font-bold text-blue-400">Lua Web Executor</h1>
            <p className="text-gray-400">Controle remoto via WebSocket</p>
          </header>
          
          {children}

          <footer className="mt-12 border-t border-gray-800 pt-4 text-sm text-gray-500">
            <p>Sistema seguro - Conexões criptografadas</p>
            <p className="mt-1">Senha de proteção ativada</p>
          </footer>
        </main>
      </body>
    </html>
  )
}
