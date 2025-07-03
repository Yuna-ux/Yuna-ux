// import '../styles/home-style.css'
// app/layout.js
export const metadata = {
  title: 'IP Info',
  description: 'Returns the IP in a JSON table',
  keywords: ['IP', 'Next.js', 'API'],
  authors: [{ name: 'Yuna-ux' }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: 'IP Info',
    description: 'Returns the IP in a JSON table',
    url: 'https://yuna-ux.vercel.app',
    siteName: 'Yuna UX',
    locale: 'en-US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yuna-ux.vercel.app',
    languages: {
      'pt-BR': 'https://yuna-ux.vercel.app/pt-BR',
      'en-US': 'https://yuna-ux.vercel.app/en-US',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  )
}
