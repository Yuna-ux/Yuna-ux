
'use client';
import { useState } from 'react';
import luaparse from 'luaparse';

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
    if (Array.isArray(node)) return node.forEach(traverse);

    if (node.type === 'Identifier' && !globalList.includes(node.name)) {
      if (!varMap[node.name]) {
        varMap[node.name] = 'v_' + (counter++).toString(36);
      }
      node.name = varMap[node.name];
    }
    for (let key in node) traverse(node[key]);
  };

  traverse(ast);
  return ast;
};

const generateLuaCodeFromAST = (ast) => {
  // Este é um mock simplificado para fins de demonstração.
  // Para produção, use uma lib como lua-codegen ou escreva um conversor.
  return JSON.stringify(ast, null, 2);
};

export default function Home() {
  const [code, setCode] = useState('');
  const [obfuscated, setObfuscated] = useState('');

  const handleObfuscate = () => {
    try {
      const cleanCode = removeComments(code);
      const codeWithJunk = addJunkCode(cleanCode);
      const ast = luaparse.parse(codeWithJunk);
      const obfAst = renameVariables(ast, luaGlobals);
      const finalCode = generateLuaCodeFromAST(obfAst);
      setObfuscated(finalCode);
    } catch (e) {
      setObfuscated('Erro ao processar: ' + e.message);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Lua Obfuscator</h1>
      <textarea className="w-full h-40 border p-2" value={code} onChange={e => setCode(e.target.value)} placeholder="Insira o código Lua aqui" />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded" onClick={handleObfuscate}>Obfuscar</button>
      <pre className="mt-4 bg-gray-100 p-2 whitespace-pre-wrap">{obfuscated}</pre>
    </main>
  );
}
