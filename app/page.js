'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import CodeEditor from './components/CodeEditor'
import UserList from './components/UserList'

export default function ExecutorPage() {
  const [code, setCode] = useState('print("Hello from WebExecutor!")')
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [password, setPassword] = useState('')
  const [output, setOutput] = useState([])
  const [connectionStatus, setConnectionStatus] = useState('disconnected')

  useEffect(() => {
    const wsUrl = `wss://${window.location.host}/api/ws`
    const ws = new WebSocket(wsUrl)

    ws.onopen = () => {
      setConnectionStatus('connected')
      console.log('WebSocket connected')
    }

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      
      if (data.type === 'users') {
        setUsers(data.users.filter(user => user.name))
      }
      
      if (data.type === 'output') {
        setOutput(prev => [...prev, data.message])
      }
    }

    ws.onclose = () => {
      setConnectionStatus('disconnected')
      console.log('WebSocket disconnected')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      setConnectionStatus('error')
    }

    return () => ws.close()
  }, [])

  const executeCode = () => {
    if (!selectedUser || !password) return
    
    const ws = new WebSocket(`wss://${window.location.host}/api/ws`)
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'execute',
        code: code,
        target: selectedUser,
        password: password
      }))
      ws.close()
    }
  }

  const clearOutput = () => {
    setOutput([])
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
            <span className="text-sm">
              {connectionStatus === 'connected' ? 'Conectado' : 
               connectionStatus === 'error' ? 'Erro de conexão' : 'Desconectado'}
            </span>
          </div>
          
          <div className="flex-1">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Senha de Execução
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
              placeholder="Digite a senha de segurança"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <UserList 
              users={users} 
              onSelect={setSelectedUser}
              selected={selectedUser}
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <CodeEditor value={code} onChange={setCode} />
            
            <div className="flex space-x-3">
              <button
                onClick={executeCode}
                disabled={!selectedUser || !password}
                className={`px-4 py-2 rounded text-sm font-medium ${
                  !selectedUser || !password ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Executar para {selectedUser || '...'}
              </button>
              
              <button
                onClick={clearOutput}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm font-medium"
              >
                Limpar Saída
              </button>
            </div>

            <div className="bg-black p-4 rounded-lg h-64 overflow-y-auto">
              <h3 className="text-sm font-mono mb-2 text-gray-400">Saída:</h3>
              {output.length > 0 ? (
                output.map((msg, i) => (
                  <pre key={i} className={`text-sm font-mono mb-1 ${
                    msg.includes('✅') ? 'text-green-400' : 
                    msg.includes('❌') ? 'text-red-400' : 'text-gray-300'
                  }`}>
                    {msg}
                  </pre>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Nenhuma saída ainda</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
