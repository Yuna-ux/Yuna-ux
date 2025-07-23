import Link from 'next/link';
import IPDisplay from '../components/IPDisplay';
import '../../styles/home-style.css';

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <div className="logo-container">
          <img src="/images/logo.svg" alt="Yuna-UX Logo" className="logo" />
          <div>
            <h1 className="title">Yuna-UX Roblox Scripts</h1>
            <p className="subtitle">Your premium source for Roblox scripts and executors</p>
          </div>
        </div>
        
        {/* Exibição do IP */}
        <div className="ip-section">
          <IPDisplay />
        </div>
      </header>

      {/* Seção de Scripts */}
      <section className="featured-scripts">
        <h2>Featured Scripts</h2>
        <div className="script-grid">
          {scriptsData.map((script) => (
            <div key={script.id} className="script-card">
              <h3>{script.name}</h3>
              <p>{script.description}</p>
              <Link href={`/scripts/${script.slug}`} className="script-button">
                Get Script
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Executores */}
      <section className="executors-section">
        <h2>Recommended Executors</h2>
        <div className="executor-list">
          {executorsData.map((executor) => (
            <div key={executor.id} className="executor-card">
              <img 
                src={`/images/executors/${executor.image}`} 
                alt={executor.name} 
                className="executor-image"
              />
              <h3>{executor.name}</h3>
              <p>{executor.description}</p>
              <a href={executor.downloadLink} className="download-button" target="_blank" rel="noopener noreferrer">
                Download
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Yuna-UX Scripts. All rights reserved.</p>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </main>
  );
}

const scriptsData = [
  {
    id: 1,
    name: 'Blox Fruits',
    description: 'Auto farm, teleports and more',
    slug: 'blox-fruits'
  },
  {
    id: 2,
    name: 'Steal a brainrot',
    description: 'Speed boost, auto collect and more',
    slug: 'steal-a-brainrot'
  },
  {
    id: 3,
    name: 'Slap battles',
    description: 'Slap aura script bypass anticheat',
    slug: 'sb'
  }
];

const executorsData = [
  {
    id: 1,
    name: 'Synapse X',
    description: 'Premium Windows executor',
    image: 'synapse.png',
    downloadLink: '#'
  },
  {
    id: 2,
    name: 'Script-Ware',
    description: 'Multi-platform executor',
    image: 'scriptware.png',
    downloadLink: '#'
  }
];
