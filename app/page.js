import { useState } from 'react'; import luaparse from 'luaparse';

export default function Home() { const [code, setCode] = useState(''); const [obfuscated, setObfuscated] = useState('');

const generateObfuscatedString = (str) => { const chars = str.split('').map(c => c.charCodeAt(0)); const mathExpr = chars.map(c => (${c - 1} + 1)).join(', '); return _s(${mathExpr}); };

const obfuscateAST = (ast) => { let counter = 0; const varMap = {}; const globalFuncs = new Set(); const junkStatements = [ { type: 'CallStatement', expression: { type: 'CallExpression', base: { type: 'Identifier', name: 'print' }, arguments: [{ type: 'StringLiteral', value: 'junk' }] } }, { type: 'LocalStatement', variables: [{ type: 'Identifier', name: '_junk' + Math.random().toString(36).substr(2, 5) }], init: [{ type: 'NumericLiteral', value: Math.floor(Math.random() * 100) }] } ];

const isGlobal = (name) => [
  '_G','assert','collectgarbage','dofile','error','getmetatable','ipairs','load','loadfile','next','pairs','pcall','print','rawequal','rawget','rawlen','rawset','require','select','setmetatable','tonumber','tostring','type','xpcall','coroutine','debug','io','math','os','package','string','table','utf8'
].includes(name);

const walk = (node) => {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) return node.forEach(walk);

  if (node.type === 'Identifier') {
    const originalName = node.name;
    if (!isGlobal(originalName)) {
      if (!varMap[originalName]) {
        const newName = `_v${counter++}`;
        varMap[originalName] = newName;
      }
      node.name = varMap[originalName];
    } else {
      globalFuncs.add(originalName);
    }
  } else if (node.type === 'Comment') {
    node.value = ''; // remove comment
  }

  Object.values(node).forEach(walk);
};

walk(ast);

// Inject junk code at the start of the main chunk
if (ast.body && Array.isArray(ast.body)) {
  ast.body.unshift(...junkStatements);
}

return ast;

};

const handleObfuscate = () => { try { const ast = luaparse.parse(code, { comments: false, luaVersion: '5.1' }); const obfuscatedAst = obfuscateAST(ast); const prelude = local function _s(...) local t={...} for i=1,#t do t[i]=string.char(t[i]) end return table.concat(t) end\n; const obfuscatedCode = prelude + JSON.stringify(obfuscatedAst, null, 2); setObfuscated(obfuscatedCode); } catch (err) { setObfuscated('// Error: ' + err.message); } };

return ( <main className="p-4"> <h1 className="text-xl font-bold mb-2">Lua Obfuscator</h1> <textarea className="w-full h-48 border p-2 mb-2" placeholder="Paste Lua code here..." value={code} onChange={(e) => setCode(e.target.value)} ></textarea> <button
onClick={handleObfuscate}
className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
> Obfuscate </button> <pre className="bg-gray-100 p-2 whitespace-pre-wrap break-all text-sm"> {obfuscated} </pre> </main> ); }

