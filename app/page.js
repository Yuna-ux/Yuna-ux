'use client';

import { useState } from 'react';
import luaparse from 'luaparse';

export default function Home() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [isObfuscated, setIsObfuscated] = useState(false);

  const obfuscateCode = () => {
    try {
      const ast = luaparse.parse(inputCode);
      const obfuscated = obfuscateAST(ast);
      setOutputCode(obfuscated);
      setIsObfuscated(true);
    } catch (error) {
      alert(`Erro ao obfuscar: ${error.message}`);
    }
  };

  const obfuscateAST = (ast) => {
    // Técnica de ofuscação: substituição de nomes
    const nameMap = {};
    let counter = 0;
    
    function generateName() {
      return `_${(counter++).toString(36)}`;
    }

    function processNode(node) {
      if (!node) return;
      
      if (node.type === 'Identifier') {
        if (!nameMap[node.name]) {
          nameMap[node.name] = generateName();
        }
        node.name = nameMap[node.name];
      }
      
      for (const key in node) {
        if (typeof node[key] === 'object') {
          processNode(node[key]);
        }
      }
    }
    
    processNode(ast);
    return JSON.stringify(ast, null, 2);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode);
    alert('Código copiado!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="editor-container">
          <h2 className="editor-title">Código Lua Original</h2>
          <textarea
            className="editor-textarea"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Cole seu código Lua aqui..."
          />
          <button
            onClick={obfuscateCode}
            className="obfuscate-button"
          >
            Obfuscar Código
          </button>
        </div>

        <div className="result-container">
          <div className="result-header">
            <h2 className="result-title">Código Obfuscado</h2>
            {isObfuscated && (
              <button
                onClick={copyToClipboard}
                className="copy-button"
              >
                Copiar
              </button>
            )}
          </div>
          <pre className="result-output">
            {outputCode || 'O resultado obfuscado aparecerá aqui...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
