'use client';

import Link from 'next/link';
import IPDisplay from '../components/IPDisplay';
import '../../styles/home-style.css';

export default function Home() {
  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="container">
      <header className="header">
        <div className="logo-container">
          <img src="/images/logo.svg" alt="Yuna-ux Logo" className="logo" />
          <div>
            <h1 className="title">Yuna-ux Roblox Scripts</h1>
            <p className="subtitle">Your premium source for Roblox scripts and executors</p>
          </div>
        </div>
        <div className="ip-section">
          <IPDisplay />
        </div>
      </header>

      <section className="featured-scripts">
        <h2>Featured Scripts</h2>
        <div className="script-grid">
          {scriptsData.map((script) => (
            <div key={script.id} className="script-card">
              <img
                src={`/images/scripts/${script.image}`}
                alt={script.name}
                className="script-image"
              />
              <h3>{script.name}</h3>
              <p>{script.description}</p>
              <button 
                onClick={() => handleDownload(script.downloadLink, `${script.slug}.lua`)}
                className="script-button"
              >
                Download Script
              </button>
            </div>
          ))}
        </div>
      </section>

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
              <button
                onClick={() => handleDownload(executor.downloadLink, executor.filename)}
                className="download-button"
              >
                Download {executor.version || ''}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Yuna-ux Scripts. All rights reserved.</p>
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
    slug: 'blox-fruits',
    image: 'blox-fruits.png',
    downloadLink: '/downloads/scripts/blox-fruits.lua'
  },
  {
    id: 2,
    name: 'Steal a brainrot',
    description: 'Speed boost, auto collect and more',
    slug: 'steal-a-brainrot',
    image: 'steal-a-brainrot.png',
    downloadLink: '/downloads/scripts/steal-a-brainrot.lua'
  },
  {
    id: 3,
    name: 'Slap battles',
    description: 'Slap aura script bypass anticheat',
    slug: 'sb',
    image: 'slap-battles.png',
    downloadLink: '/downloads/scripts/slap-battles.lua'
  }
];

const executorsData = [
  {
    id: 1,
    name: 'Synapse X',
    description: 'Premium Windows executor',
    image: 'synapse.png',
    downloadLink: '/downloads/executors/SynapseX-v3.7.1.exe',
    filename: 'SynapseX-v3.7.1.exe',
    version: 'v3.7.1'
  },
  {
    id: 2,
    name: 'Script-Ware',
    description: 'Multi-platform executor',
    image: 'scriptware.png',
    downloadLink: '/downloads/executors/ScriptWare-Mac.dmg',
    filename: 'ScriptWare-Mac.dmg',
    version: 'for Mac'
  },
  {
    id: 3,
    name: 'KRNL',
    description: 'Free Windows executor',
    image: 'krnl.png',
    downloadLink: '/downloads/executors/KRNL-Bootstrapper.exe',
    filename: 'KRNL-Bootstrapper.exe'
  }
];
