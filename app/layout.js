// import '../styles/home-style.css'
// app/layout.js
export const metadata = {
  title: 'IP JSON',
  description: 'Retorna o IP como JSON',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
