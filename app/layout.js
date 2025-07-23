// import '../styles/home-style.css'
// app/layout.js
export const metadata = {
  title: 'Yuna-ux Scripts',
  description: 'site was made for roblox scripts and executors',
  keywords: ['Scripts', 'Next.js', 'Roblox'],
  authors: [{ name: 'Yuna-ux' }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: 'Yuna-ux Scripts',
    description: 'Returns the IP in a JSON table',
    url: 'https://yuna-ux.vercel.app/',
    siteName: 'yuna-ux.vercel.app',
    locale: 'en-US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yuna-ux.vercel.app/',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  )
}
