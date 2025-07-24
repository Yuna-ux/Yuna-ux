// app/layout.js
import '../styles/home-style.css';

export const metadata = {
  title: 'Yuna-ux site',
  description: 'html site',
  keywords: ['Html'],
  authors: [{ name: 'Yuna-ux', url: 'https://yuna-ux.vercel.app' }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: 'Yuna-ux site',
    description: 'html site',
    url: 'https://yuna-ux.vercel.app/',
    siteName: 'Yuna-ux site',
    images: [
      {
        url: 'https://yuna-ux.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yuna-ux site',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://yuna-ux.vercel.app/',
  },
}

export const viewport = {
  themeColor: '#6d28d9',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        //<link rel="icon" href="/favicon.ico" sizes="any" />
        //<link rel="icon" href="/icon.svg" type="image/svg+xml" />
        //<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        //<link rel="manifest" href="/manifest.webmanifest" />
        //<meta name="theme-color" content="#6d28d9" />
        <link
          rel="preload"
          href="fonts/LilitaOne-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-gray-900 text-white antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
