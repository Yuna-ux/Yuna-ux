export default function Home() {
  return (
    <main className="home">
      <h1>Welcome to the Local Proxy Service</h1>
      <p>To use this proxy, configure your browser or system with the PAC URL below:</p>
      <code>http://localhost:3000/proxy.pac</code>
      <p>Only traffic to *.local will go through the proxy.</p>
    </main>
  );
}
