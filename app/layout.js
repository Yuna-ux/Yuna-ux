export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/style.css" />
        <title>Proxy Access</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
