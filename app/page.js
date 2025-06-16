'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import CodeEditor from '../components/CodeEditor'
import UserList from '../components/UserList'

export default function Home() {
  const [code, setCode] = useState('print("Hello World!")')
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [password, setPassword] = useState('')
  const [output, setOutput] = useState([])

  useEffect(() => {
    const ws = new WebSocket(`wss://${window.location.host}/api/ws`)

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.type === 'users') setUsers(data.users)
      if (data.type === 'output') setOutput(prev => [...prev, data.message])
    }

    return () => ws.close()
  }, [])

  const executeCode = () => {
    if (!selectedUser || !password) return
    
    const ws = new WebSocket(`wss://${window.location.host}/api/ws`)
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'execute',
        code,
        target: selectedUser,
        password
      }))
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Lua Remote Executor</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <div className="mb-4">
            <label className="block mb-2">Senha de Proteção:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <UserList 
            users={users} 
            onSelect={setSelectedUser}
            selected={selectedUser}
          />
        </div>

        <div className="md:col-span-2">
          <CodeEditor value={code} onChange={setCode} />
          
          <button
            onClick={executeCode}
            disabled={!selectedUser || !password}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Executar para {selectedUser || '...'}
          </button>

          <div className="mt-4 bg-black p-4 rounded">
            {output.map((msg, i) => (
              <pre key={i} className="text-green-400">{msg}</pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
