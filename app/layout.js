export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/style.css" />
        <title>Proxy PAC Access</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
