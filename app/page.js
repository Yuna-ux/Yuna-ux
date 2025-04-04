export default function Page() {
  return (
    <html lang="en">
      <head>
        <title>Yuna Proxy Setup</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <main>
          <h1>Enable Proxy Access</h1>
          <p>To use this proxy, you must configure your network settings with the PAC file provided below.</p>
          <p>Set your automatic proxy configuration (PAC) URL to:</p>
          <code>https://yuna-ux.vercel.app/proxy.pac</code>
        </main>
      </body>
    </html>
  );
}
