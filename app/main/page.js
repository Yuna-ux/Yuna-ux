'use client';

import Link from 'next/link';
import IPDisplay from '../components/IPDisplay';
import '../../styles/home-style.css';

export default function Home() {
  // Função para baixar arquivos
  const handleDownload = (filePath, fileName) => {
    // Cria um link temporário
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="container">
      {/* Seção de Scripts Atualizada */}
      <section className="featured-scripts">
        <h2>Featured Scripts</h2>
        <div className="script-grid">
          {scriptsData.map((script) => (
            <div key={script.id} className="script-card">
              <img
                src={`/images/scripts/${script.image}`}
                alt={script.name}
                className="script-image"
                onError={(e) => {
                  e.target.src = '/images/default-script.webp'; // Imagem de fallback
                }}
              />
              <h3>{script.name}</h3>
              <p>{script.description}</p>
              <button 
                onClick={() => handleDownload(
                  `/downloads/scripts/${script.file}`,
                  `${script.name.replace(/\s+/g, '-')}.lua`
                )}
                className="script-button"
              >
                Download Script
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Executores Atualizada */}
      <section className="executors-section">
        <h2>Recommended Executors</h2>
        <div className="executor-list">
          {executorsData.map((executor) => (
            <div key={executor.id} className="executor-card">
              <img 
                src={`/images/executors/${executor.image}`} 
                alt={executor.name}
                className="executor-image"
                onError={(e) => {
                  e.target.src = '/images/default-executor.webp'; // Imagem de fallback
                }}
              />
              <h3>{executor.name}</h3>
              <p>{executor.description}</p>
              <button
                onClick={() => handleDownload(
                  `/downloads/executors/${executor.file}`,
                  executor.file
                )}
                className="download-button"
              >
                Download {executor.version || ''}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// Dados atualizados
const scriptsData = [
  {
    id: 1,
    name: 'Blox Fruits',
    description: 'Auto farm, teleports and more',
    image: 'blox-fruits.jpg',
    file: 'blox-fruits.lua'
  },
  {
    id: 2,
    name: 'Steal a brainrot',
    description: 'Speed boost, auto collect and more',
    image: 'steal-a-brainrot.jpg',
    file: 'steal-a-brainrot.lua'
  },
  {
    id: 3,
    name: 'Slap battles',
    description: 'Slap aura script bypass anticheat',
    image: 'slap-battles.jpg',
    file: 'slap-battles.lua'
  }
];

const executorsData = [
  {
    id: 1,
    name: 'Synapse X',
    description: 'Premium Windows executor',
    image: 'synapse.png',
    file: 'SynapseX.exe',
    version: 'v3.7.1'
  },
  {
    id: 2,
    name: 'Script-Ware',
    description: 'Multi-platform executor',
    image: 'scriptware.png',
    file: 'ScriptWare.exe',
    version: 'for Mac'
  },
  {
    id: 3,
    name: 'KRNL',
    description: 'Free Windows executor',
    image: 'krnl.png',
    file: 'Krnl.exe'
  }
];
