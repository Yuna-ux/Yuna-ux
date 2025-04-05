'use client';

import { useState } from 'react'; import styles from '../styles/Home.module.css'; import luaparse from 'luaparse';

export default function Home() { const [code, setCode] = useState(''); const [obfuscated, setObfuscated] = useState('');

const generateObfuscatedString = (str) => { const chars = str.split('').map(c => c.charCodeAt(0)); const mathExpr = chars.map(c => (${c - 1} + 1)).join(', '); return (_s(${mathExpr})); };

const obfuscateAST = (ast) => { let counter = 0; const varMap = {}; const globalFuncs = new Set();

const obfuscateIdentifier = (name) => {
  if (!varMap[name]) {
    varMap[name] = `_v${counter++}`;
  }
  return varMap[name];
};

const traverse = (node, parent = null) => {
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
      if (parent && parent.type === 'CallExpression' && parent.base === node) {
        globalFuncs.add(node.name);
        node.name = obfuscateIdentifier(node.name);
      } else {
        node.name = obfuscateIdentifier(node.name);
      }
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

    case 'StringLiteral':
      node.raw = generateObfuscatedString(node.value);
      break;

    default:
      break;
  }

  for (const key in node) {
    if (Array.isArray(node[key])) {
      node[key].forEach(n => traverse(n, node));
    } else {
      traverse(node[key], node);
    }
  }
};

traverse(ast);
return { ast, globalFuncs };

};

const generateCode = (astObj) => { const { ast, globalFuncs } = astObj; let code = '';

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
      return `${node.isLocal ? 'local ' : ''}function ${name}(${params})\n${body}\nend`;

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

// Cabeçalho com função anônima para reconstruir strings
const header = `local function _s(...) local t={...} local r='' for i=1,#t do r=r..string.char(t[i]) end return r end`;
const globalsAlias = [...globalFuncs].map(fn => `local ${varMap[fn]} = ${fn}`).join('\n');
const junk = `local _junk = 123 * 456 / 789 + 10`;

code = `${header}\n${globalsAlias}\n${junk}\n${walk(ast)}`;
return code;

};

const handleObfuscate = () => { try { const ast = luaparse.parse(code, { comments: false }); const obfuscatedAST = obfuscateAST(ast); const result = generateCode(obfuscatedAST); setObfuscated(result); } catch (err) { console.error(err); setObfuscated('Erro ao processar o código.'); } };

return ( <div className={styles.container}> <h1>Lua Obfuscator com AST</h1> <textarea placeholder="Cole seu código Lua aqui..." value={code} onChange={(e) => setCode(e.target.value)} className={styles.textarea} /> <button onClick={handleObfuscate} className={styles.button}>Obfuscar</button> <h2>Resultado:</h2> <pre className={styles.result}>{obfuscated}</pre> </div> ); }
