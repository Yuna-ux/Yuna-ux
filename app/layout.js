import './style.css'

export const metadata = {
  title: 'Yuna-ux',
  description: 'Yuna-ux Page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
