export const metadata = {
  title: 'Yuna UX',
  description: 'Yuna-ux Page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  )
}
