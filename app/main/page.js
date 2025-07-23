// app/main/pages.js
import Link from 'next/link';
import '../styles/home-style.css';

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1 className="title">Yuna-UX Roblox Scripts</h1>
        <p className="subtitle">Your premium source for Roblox scripts and executors</p>
      </header>

      <section className="featured-scripts">
        <h2>Featured Scripts</h2>
        <div className="script-grid">
          <div className="script-card">
            <h3>Blox Fruits</h3>
            <p>Auto farm, teleports and more</p>
            <Link href="/scripts/blox-fruits" className="script-button">Get Script</Link>
          </div>
          <div className="script-card">
            <h3>Pet Simulator X</h3>
            <p>Auto hatch, auto farm</p>
            <Link href="/scripts/pet-simulator" className="script-button">Get Script</Link>
          </div>
          <div className="script-card">
            <h3>Murder Mystery 2</h3>
            <p>ESP, auto-win features</p>
            <Link href="/scripts/mm2" className="script-button">Get Script</Link>
          </div>
        </div>
      </section>

      <section className="executors-section">
        <h2>Recommended Executors</h2>
        <div className="executor-list">
          <div className="executor-card">
            <h3>Synapse X</h3>
            <p>Premium Windows executor</p>
            <a href="#" className="download-button">Download</a>
          </div>
          <div className="executor-card">
            <h3>Script-Ware</h3>
            <p>Multi-platform executor</p>
            <a href="#" className="download-button">Download</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2023 Yuna-UX Scripts. All rights reserved.</p>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </main>
  );
}
