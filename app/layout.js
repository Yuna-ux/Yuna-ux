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
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="app-body">
        <div className="app-container">
          <header className="app-header">
            <div className="header-content">
              <h1 className="app-title">Lua Web Executor</h1>
              <p className="app-subtitle">Controle remoto via WebSocket</p>
            </div>
          </header>
          
          <main className="app-main">
            {children}
          </main>

          <footer className="app-footer">
            <div className="footer-content">
              <p className="security-info">
                <span className="security-icon">🔒</span> Sistema seguro - Conexões criptografadas
              </p>
              <p className="password-info">Senha de proteção ativada</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
