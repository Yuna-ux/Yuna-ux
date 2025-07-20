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
    url: 'https://ip-info-json.vercel.app/',
    siteName: 'ip-info-json',
    locale: 'en-US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ip-info-json.vercel.app/',
    languages: {
      'en-US': 'https://ip-info-json.vercel.app/en-US',
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
