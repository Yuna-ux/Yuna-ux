'use client';
import { useState } from 'react';
import luaparse from 'luaparse';
import styles from '../styles/Home.module.css';

const luaGlobals = [
  "_G", "assert", "collectgarbage", "coroutine", "debug", "dofile", "error",
  "_ENV", "getmetatable", "io", "ipairs", "load", "loadfile", "math", "next",
  "os", "package", "pairs", "pcall", "print", "rawequal", "rawget", "rawlen",
  "rawset", "require", "select", "setmetatable", "string", "table", "tonumber",
  "tostring", "type", "utf8", "xpcall"
];

const generateObfuscatedString = (str) => {
  const chars = str.split('').map(c => c.charCodeAt(0));
  const mathExpr = chars.map(c => `(${c - 1} + 1)`).join(', ');
  return `_s(${mathExpr})`;
};

const removeComments = (code) => {
  return code.replace(/--.*(?=\n|$)/g, '').replace(/--\[\[.*?\]\]/gs, '');
};

const addJunkCode = (code) => {
  const junkSnippets = [
    "local __x = 1 + 1 - 1",
    "local __y = math.sqrt(4) * 2 / 2",
    "local __z = tostring(123456):reverse():reverse()",
    "local function __junkFunc() return true end",
    "if false then print('never') end"
  ];
  return junkSnippets.join('\n') + '\n' + code + '\n' + junkSnippets.join('\n');
};

const renameVariables = (ast, globalList) => {
  let counter = 0;
  const varMap = {};
  const traverse = (node) => {
    if (node == null || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(traverse); return; }
    if (node.type === 'Identifier') {
      const originalName = node.name;
      if (!globalList.includes(originalName)) {
        if (!varMap[originalName]) {
          varMap[originalName] = 'v_' + (counter++).toString(36);
        }
        node.name = varMap[originalName];
      }
    }
    for (let key in node) traverse(node[key]);
  };
  traverse(ast);
  return ast;
};

const generateLuaCodeFromAST = (node) => {
  if (!node) return '';
  switch(node.type) {
    case 'Chunk': return node.body.map(generateLuaCodeFromAST).join('\n');
    case 'LocalStatement':
      const vars = node.variables.map(generateLuaCodeFromAST).join(', ');
      const inits = node.init ? node.init.map(generateLuaCodeFromAST).join(', ') : '';
      return `local ${vars}${inits ? ' = ' + inits : ''}`;
    case 'Identifier': return node.name;
    case 'StringLiteral': return `\"${node.value}\"`;
    case 'NumericLiteral': return node.value.toString();
    case 'CallStatement': return generateLuaCodeFromAST(node.expression);
    case 'CallExpression':
      const base = generateLuaCodeFromAST(node.base);
      const args = node.arguments.map(generateLuaCodeFromAST).join(', ');
      return `${base}(${args})`;
    case 'FunctionDeclaration':
      const funcName = node.identifier ? generateLuaCodeFromAST(node.identifier) : '';
      const params = node.parameters.map(generateLuaCodeFromAST).join(', ');
      const body = node.body.map(generateLuaCodeFromAST).join('\n');
      return `${node.isLocal ? 'local ' : ''}function ${funcName}(${params})\n${body}\nend`;
    case 'AssignmentStatement':
      const left = node.variables.map(generateLuaCodeFromAST).join(', ');
      const right = node.init.map(generateLuaCodeFromAST).join(', ');
      return `${left} = ${right}`;
    case 'ReturnStatement':
      return `return ${node.arguments.map(generateLuaCodeFromAST).join(', ')}`;
    default:
      return '--[[unsupported node: ' + node.type + ']]';
  }
};

const antiDebug = () => {
  if (window.console && window.console.firebug) {
    throw new Error("Debugging is disabled");
  }
  let start = Date.now();
  debugger;
  let end = Date.now();
  if (end - start > 100) {
    throw new Error("Debugger detected");
  }
};

export default function Home() {
  const [code, setCode] = useState('');
  const [obfuscated, setObfuscated] = useState('');

  const handleObfuscate = () => {
    try {
      antiDebug();
      const cleanCode = removeComments(code);
      const codeWithJunk = addJunkCode(cleanCode);
      const ast = luaparse.parse(codeWithJunk, { comments: false, luaVersion: '5.1' });
      const obfAst = renameVariables(ast, luaGlobals);
      const generatedLua = generateLuaCodeFromAST(obfAst);
      const prelude = "local function _s(...) local t={...} for i=1,#t do t[i]=string.char(t[i]) end return table.concat(t) end\n";
      setObfuscated(prelude + generatedLua);
    } catch (e) {
      setObfuscated("-- Error: " + e.message);
    }
  };

  return (
    <main className={styles.container}>
      <h1>Lua Obfuscator</h1>
      <textarea className={styles.textarea} value={code} onChange={e => setCode(e.target.value)} placeholder="Paste Lua code here..." />
      <button className={styles.button} onClick={handleObfuscate}>Obfuscate</button>
      <pre className={styles.result}>{obfuscated}</pre>
    </main>
  );
}
