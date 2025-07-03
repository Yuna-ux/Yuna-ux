// app/page.js
export default function Home() {
  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to my IP website</h1>
      <p>This site returns your public IP in the route <code>/v1</code> in JSON format.</p>
      <p>Example: <code>https://yuna-ux.vercel.app/v1</code></p>
    </main>
  )
}
