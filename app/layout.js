// app/layout.js
// import '../styles/home-style.css';

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
      </head>
      <body>
          {children}
      </body>
    </html>
  );
}
