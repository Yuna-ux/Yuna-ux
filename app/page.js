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
    <div className="executor-container">
      <div className="control-panel">
        <div className="connection-status-bar">
          <div className={`status-indicator ${connectionStatus}`} />
          <span className="status-text">
            {connectionStatus === 'connected' ? 'Conectado' : 
             connectionStatus === 'error' ? 'Erro de conexão' : 'Desconectado'}
          </span>
          
          <div className="password-input-container">
            <label htmlFor="password" className="password-label">
              Senha de Execução
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
              placeholder="Digite a senha de segurança"
            />
          </div>
        </div>

        <div className="executor-grid">
          <div className="user-list-container">
            <UserList 
              users={users} 
              onSelect={setSelectedUser}
              selected={selectedUser}
            />
          </div>

          <div className="code-execution-container">
            <CodeEditor value={code} onChange={setCode} />
            
            <div className="action-buttons">
              <button
                onClick={executeCode}
                disabled={!selectedUser || !password}
                className={`execute-button ${!selectedUser || !password ? 'disabled' : ''}`}
              >
                Executar para {selectedUser || '...'}
              </button>
              
              <button
                onClick={clearOutput}
                className="clear-button"
              >
                Limpar Saída
              </button>
            </div>

            <div className="output-console">
              <h3 className="output-title">Saída:</h3>
              {output.length > 0 ? (
                <div className="output-content">
                  {output.map((msg, i) => (
                    <pre 
                      key={i} 
                      className={`output-line ${
                        msg.includes('✅') ? 'success' : 
                        msg.includes('❌') ? 'error' : 'default'
                      }`}
                    >
                      {msg}
                    </pre>
                  ))}
                </div>
              ) : (
                <p className="empty-output">Nenhuma saída ainda</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
