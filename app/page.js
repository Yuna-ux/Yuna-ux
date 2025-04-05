import { useState } from 'react';
import styles from '../styles/Home.module.css';
import luaparse from 'luaparse';

export default function Home() {
  const [code, setCode] = useState('');
  const [obfuscated, setObfuscated] = useState('');

  const obfuscateAST = (ast) => {
    let counter = 0;
    const varMap = {};

    const obfuscateIdentifier = (name) => {
      if (!varMap[name]) {
        varMap[name] = `_v${counter++}`;
      }
      return varMap[name];
    };

    const traverse = (node) => {
      if (!node || typeof node !== 'object') return;

      switch (node.type) {
        case 'LocalStatement':
          node.variables.forEach(v => {
            if (v.type === 'Identifier') {
              v.name = obfuscateIdentifier(v.name);
            }
          });
          break;
        case 'Identifier':
          node.name = obfuscateIdentifier(node.name);
          break;
        case 'FunctionDeclaration':
          if (node.identifier && node.identifier.type === 'Identifier') {
            node.identifier.name = obfuscateIdentifier(node.identifier.name);
          }
          node.parameters = node.parameters.map(param => {
            if (param.type === 'Identifier') {
              param.name = obfuscateIdentifier(param.name);
            }
            return param;
          });
          break;
        default:
          break;
      }

      for (const key in node) {
        if (Array.isArray(node[key])) {
          node[key].forEach(traverse);
        } else {
          traverse(node[key]);
        }
      }
    };

    traverse(ast);
    return ast;
  };

  const generateCode = (ast) => {
    // Simples gerador de código a partir do AST
    let code = '';
    const walk = (node) => {
      if (!node) return '';

      switch (node.type) {
        case 'Chunk':
          return node.body.map(walk).join('\n');

        case 'LocalStatement':
          return `local ${node.variables.map(walk).join(', ')} = ${node.init.map(walk).join(', ')}`;

        case 'Identifier':
          return node.name;

        case 'NumericLiteral':
        case 'StringLiteral':
          return node.raw;

        case 'FunctionDeclaration':
          const name = node.identifier ? walk(node.identifier) : '';
          const params = node.parameters.map(walk).join(', ');
          const body = node.body.map(walk).join('\n');
          const end = 'end';
          return `${node.isLocal ? 'local ' : ''}function ${name}(${params})\n${body}\n${end}`;

        case 'CallStatement':
          return walk(node.expression);

        case 'CallExpression':
          return `${walk(node.base)}(${node.arguments.map(walk).join(', ')})`;

        case 'AssignmentStatement':
          return `${node.variables.map(walk).join(', ')} = ${node.init.map(walk).join(', ')}`;

        case 'ReturnStatement':
          return `return ${node.arguments.map(walk).join(', ')}`;

        default:
          return '--[[unsupported node: ' + node.type + ']]';
      }
    };

    code = walk(ast);
    return code;
  };

  const handleObfuscate = () => {
    try {
      const ast = luaparse.parse(code, { comments: false });
      const obfuscatedAST = obfuscateAST(ast);
      const result = generateCode(obfuscatedAST);
      setObfuscated(result);
    } catch (err) {
      console.error(err);
      setObfuscated('Erro ao processar o código.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Lua Obfuscator com AST</h1>
      <textarea
        placeholder="Cole seu código Lua aqui..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={styles.textarea}
      />
      <button onClick={handleObfuscate} className={styles.button}>Obfuscar</button>
      <h2>Resultado:</h2>
      <pre className={styles.result}>{obfuscated}</pre>
    </div>
  );
}
