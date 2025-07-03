// import '../styles/home-style.css'
// app/layout.js
export const metadata = {
  title: 'Ip info',
  description: 'Returns the IP in a Json table',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
