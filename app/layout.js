// app/layout.js
import '../styles/home-style.css';

export const metadata = {
  title: 'Yuna-UX Roblox Scripts',
  description: 'Premium Roblox scripts and executors collection',
  keywords: ['Roblox', 'Scripts', 'Executors', 'Game Hacks', 'Lua Scripts'],
  authors: [{ name: 'Yuna-UX', url: 'https://yuna-ux.vercel.app' }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: 'Yuna-UX Roblox Scripts',
    description: 'Premium Roblox scripts and executors collection',
    url: 'https://yuna-ux.vercel.app/',
    siteName: 'Yuna-UX Scripts',
    images: [
      {
        url: 'https://yuna-ux.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yuna-UX Scripts',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yuna-ux.vercel.app/',
  },
  themeColor: '#6d28d9',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}
