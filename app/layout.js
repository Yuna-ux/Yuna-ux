import '../styles/Home.module.css';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Lua Obfuscator</title>
        <meta name="description" content="Ferramenta para ofuscar código Lua" />
      </head>
      <body>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-600 text-white p-4 shadow-md">
            <h1 className="text-2xl font-bold">Lua Obfuscator</h1>
            <p className="text-sm">Transforme seu código Lua em versão ofuscada</p>
          </header>
          <main className="container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-800 text-white p-4 text-center text-sm">
            © {new Date().getFullYear()} Lua Obfuscator
          </footer>
        </div>
      </body>
    </html>
  );
}
